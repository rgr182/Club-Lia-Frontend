// React imports
import React, { useRef, useState, useEffect } from 'react';

//Redux
import { useDispatch, useSelector } from 'react-redux';
import { openResourceDialog } from '../aulaVirtual/store/resourcesSlice';

// MaterialUI
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/CloseOutlined';
import MenuItem from '@material-ui/core/MenuItem';
import Popover from '@material-ui/core/Popover';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

// MomentJS
import moment from 'moment';
import 'moment/locale/es';

// HTML Parser, Strip HTML, String Process
import parse from 'html-react-parser';
import { stripHtml } from 'string-strip-html';
import processString from 'react-process-string';

// Firebase
import {
	doc,
	getDoc,
	getFirestore,
	getDocs,
	collection,
	onSnapshot,
	addDoc,
	setDoc,
	query,
	deleteDoc
} from 'firebase/firestore';
import { getStorage, ref, uploadBytesResumable, getDownloadURL, listAll, deleteObject } from 'firebase/storage';

// AXIOS
import axios from 'axios';
import db from '../firebaseConfig';

// CSS
import './Chat.css';

// Path to save messages
let liaFirestore = 'LIA/chat';

// Path to storage data
const liaStorage = 'Documents';

// Init Storage on firebase
const st = getStorage();

// Helper vars
let wlocation = '';
const userTypes = [
	'alumno',
	'alumno_secundaria',
	'preescolar',
	'alumnoe0',
	'alumnoe1',
	'alumnoe2',
	'alumnoe3',
	'Alumno-I',
	'Alumno-M',
	'Alumno-A'
];
const fileTypes = ['mp3', 'mp4', 'png', 'jpg', 'jpeg', 'pptx', 'xlsx', 'docx', 'pdf'];
let windowObjectReference = null;

export default function Chat(props) {
	const dispatch = useDispatch();
	const [dataFire, setDataFire] = useState([]);
	const [selectedFile, setSelectedFile] = useState('');
	const [btnChatFlag, setBtnChatFlag] = useState(false);
	const [msjValue, setMsjValue] = useState('');
	const [deleteAux, setDeleteAux] = useState([]);
	const [open, setOpen] = useState(false);
	const [userMenu, setUserMenu] = useState(null);
	const hiddenFileInput = React.useRef(null);
	const [notificationMsj, setNotificationMsj] = useState('');
	const info = useSelector(({ auth }) => auth.user);
	const nameDivider = info.data.displayName.split(/(\s+)/);
	const name = `${nameDivider[0]} ${info.data.lastName}`;

	const configProcess = [
		{
			regex: /(http|https):\/\/(\S+)\.([a-z]{2,}?)(.*?)( |\,|$|\.)/gim,
			fn: (key, result) => {
				const pattern = /(https):\/\/(firebasestorage)\.(googleapis)\.(.*?)( |\,|$|\.)/gm;
				if (pattern.test(`${result[1]}://${result[2]}.${result[3]}${result[4]}`)) {
					return (
						<span key={key}>
							<i
								className="material-icons"
								onClick={ev => getUrl(`${result[1]}://${result[2]}.${result[3]}${result[4]}`)}
							>
								description
							</i>
						</span>
					);
				}
				return (
					<span key={key}>
						<i
							className="material-icons"
							onClick={ev => getUrl(`${result[1]}://${result[2]}.${result[3]}${result[4]}`)}
						>
							link
						</i>
					</span>
				);
			}
		}
		// Disable comment in order to convert string into link (example lia.com)
		/* {
        regex: /(\S+)\.([a-z]{2,}?)(.*?)( |\,|$|\.)/gim,
        fn: (key, result) => <span key={key}>
            <i class="material-icons" onClick={ev => getUrl(`http://${result[1]}.${result[2]}${result[3]}`)}>link</i>
        </span>
    } */
	];

	const handleKeyPress = event => {
		if (event.key === 'Enter') {
			addDocToFirestore(liaFirestore, String(msjValue));
		}
	};

	const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}
		setOpen(false);
	};

	const action = (
		<>
			<IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
				<CloseIcon fontSize="small" />
			</IconButton>
		</>
	);

	const handleClickFileInput = event => {
		hiddenFileInput.current.click();
	};

	const handleChangeFileInput = event => {
		const fileUploaded = event.target.files[0];
		if (fileTypes.includes(String(fileExtension(event.target.files[0]))) == true) {
			setSelectedFile(String(event.target.files[0].name));
			uploadFile(event.target.files[0]);
		} else {
			alert('No es posible adjuntar el archivo seleccionado');
		}
	};

	const getDocumentsFromFirestore = async collectionName => {
		const helperData = [];
		const querySnapshot = await getDocs(collection(db, collectionName));
		querySnapshot.forEach(doc => {
			// Use "doc.data().fieldName" to get the value from specific field
			helperData.push(doc.data());
		});
		setDataFire([...helperData]);
	};

	const addDocToFirestore = async (colletionPath, messageContent) => {
		moment.locale('es-MX');
		if (String(stripHtml(messageContent).result).length > 0) {
			try {
				const docRef = await addDoc(collection(db, colletionPath), {
					message: String(stripHtml(messageContent).result),
					datetime: moment().format(),
					name,
					uuid: info.data.uuid
				});
			} catch (error) {
				alert('Error al agregar un mensaje');
			}
		}
		setMsjValue('');
	};

	const removeCollectionFirestore = async collectionName => {
		const querySnapshot = await getDocs(collection(db, collectionName));
		querySnapshot.forEach(doc => {
			deleteDoc(doc.ref);
		});
	};

	const RemoveAllFilesInStorage = async () => {
		const listRef = ref(st, `${liaStorage}/${wlocation}`);
		listAll(listRef)
			.then(res => {
				res.items.forEach(itemRef => {
					const fileToDelete = ref(st, itemRef._location.path_);
					deleteObject(fileToDelete);
				});
			})
			.catch(error => {
				alert('Error eliminando archivos ');
			});
	};

	const realTimeUpdatesFirestore = collectionPath => {
		const helperUpdate = [];
		const q = query(collection(db, collectionPath));
		const unsubscribe = onSnapshot(q, querySnapshot => {
			let messages = [];
			querySnapshot.forEach(doc => {
				// Use "doc.data().fieldName" to get the value from specific field
				messages.push(doc.data());
			});
			messages = messages.sort(function (a, b) {
				return new Date(a.datetime) - new Date(b.datetime);
			});
			setDataFire([...messages]);
		});
	};

	const changeVisibilityBtn = () => {
		setBtnChatFlag(!btnChatFlag);
	};

	const getUrl = val => {
		setOpen(true);
		setNotificationMsj('Abriendo URL...');
		axios
			.get(`${process.env.REACT_APP_API}/verifyURL`, {
				params: { src: val }
			})
			.then(info => {
				if (info.data.data === 0) {
					// Popup with iframe
					openInternalPopUp(val);
				} else {
					// Open on different tab
					window.open(val);
				}
			});
		setTimeout(() => {
			setOpen(false);
			setNotificationMsj('');
		}, 1000);
	};

	function openInternalPopUp(val) {
		if (windowObjectReference == null || windowObjectReference.closed) {
			windowObjectReference = window.open(
				val,
				'PromoteFirefoxWindowName',
				'width=600,height=480, location=no, toolbar=no, menubar=no, resizable=yes'
			);
		} else {
			windowObjectReference.focus();
		}
	}

	function fileExtension(file) {
		const fileName = file.name;
		const extension = fileName.split('.').pop();
		return extension;
	}

	function uploadFile(file) {
		setOpen(true);
		setNotificationMsj('Guardando archivo...');
		const stRef = ref(st, `${liaStorage}/${wlocation}/${file.name}`);
		fileExtension(file);
		uploadBytesResumable(stRef, file)
			.then(snapshot => {
				// Use "snapshot.totalBytes" to get the size from uploaded file
				// Use "snapshot.metadata" to get metadata information about the uploaded file;
				getDownloadURL(snapshot.ref).then(url => {
					// use "url" to get the linf from uploaded file
					addDocToFirestore(
						liaFirestore,
						`${msjValue} ${String(file.name).replace(/\.[^/.]+$/, '')} ${String(url)}`
					);
				});
			})
			.catch(error => {
				alert('Error al guardar el archivo');
			});
		setTimeout(() => {
			setOpen(false);
			setNotificationMsj('');
		}, 2000);
		setSelectedFile('');
	}

	function linkifyText(text) {
		const urlRegex = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi;
		return text.replace(urlRegex, function (url) {
			return `<a href="${url}"><i class="material-icons">link</i></span></a>`;
		});
	}

	const deleteMessage = async (collectionName, val) => {
        const querySnapshot = await getDocs(collection(db, collectionName));
        querySnapshot.forEach((doc) => {
            if(doc._document.data.value.mapValue.fields.datetime.stringValue == val.datetime && doc._document.data.value.mapValue.fields.uuid.integerValue == val.uuid){
                deleteDoc(doc.ref);
            }
        });   
        setDeleteAux([]);
    }

	useEffect(() => {
		const route = window.location.toString();
		const arrRoute = route.split('/');
		wlocation = String(arrRoute[5]).trim();
		liaFirestore = `${liaFirestore}/${String(wlocation)}`;
		getDocumentsFromFirestore(liaFirestore);
		realTimeUpdatesFirestore(liaFirestore);
	}, []);

	const userMenuClick = (val, event) => {
		setDeleteAux(val);
		setUserMenu(event.currentTarget);
	};

	const userMenuClose = () => {
		setDeleteAux([]);
		setUserMenu(null);
	};

	return (
		<>
			<Snackbar
				open={open}
				autoHideDuration={1000}
				onClose={handleClose}
				message={notificationMsj}
				action={action}
			/>
			<div id="body">
				<div
					id="chat-circle"
					className="btn btn-raised"
					style={{ display: btnChatFlag === false ? 'block' : 'none' }}
					onClick={() => changeVisibilityBtn()}
				>
					Abrir chat
					<div id="chat-overlay" />
				</div>
				<div className="chat-box" style={{ display: btnChatFlag === true ? 'block' : 'none' }}>
					<div className="chat-box-header">
						Club LIA Chat
						<span className="chat-box-toggle">
							<i className="material-icons" onClick={() => changeVisibilityBtn()}>
								close
							</i>
						</span>
					</div>
					<div className="chat-box-body">
						<div className="chat-box-overlay" />
						<div className="chat-logs">
							{dataFire.length === 0
								? null
								: dataFire.map(val => {
										return (
											<div
												id="cm-msg-1"
												className={
													val.uuid == info.data.uuid ? 'chat-msg self' : 'chat-msg user'
												}
											>
												{userTypes.includes(String(props.typeOfUser)) == true ? (
													//  ------------- Chat Design of student -------------
													<>
														<div className={val.uuid == info.data.uuid ? 'right' : 'left'}>
															{val.name}
														</div>
														<div className="cm-msg-text">
															{processString(configProcess)(val.message)}
														</div>
													</>
												) : (
													//  ------------- Chat Design of Teacher -------------
													<>
														<div className="flex flex-row flex-wrap justify-between">
															{val.uuid != info.data.uuid ? (
																<div className="left">{val.name}</div>
															) : null}
															<div>
																<IconButton
																	class={
																		val.uuid == info.data.uuid
																			? 'options-left'
																			: 'options-right'
																	}
																	onClick={event => {
																		userMenuClick(val, event);
																	}}
																>
																	<Icon>more_vert</Icon>
																</IconButton>
															</div>
															{val.uuid == info.data.uuid ? (
																<div className="right">{val.name}</div>
															) : null}
														</div>
														<div className="cm-msg-text">
															{processString(configProcess)(val.message)}
														</div>
													</>
												)}
											</div>
										);
								  })}
						</div>
					</div>

					<div className="chat-input">
						<div style={{ display: 'flex' }}>
							<div style={{ width: '85%' }}>
								<input
									type="text"
									id="chat-input"
									placeholder="Enviar mensaje..."
									onChange={event => setMsjValue(event.target.value)}
									value={msjValue}
									onKeyPress={event => handleKeyPress(event)}
								/>
							</div>
                            {userTypes.includes(String(props.typeOfUser)) != true ?
                                        <div style={{ paddingTop: 10, backgroundColor: '#f4f7f9' }}>
                                            <button class="chat-submit" onClick={ev => dispatch(openResourceDialog())}><i class="material-icons">vertical_split</i></button>
                                        </div>
                                    :null}
							<div style={{ paddingTop: 10, backgroundColor: '#f4f7f9' }}>
								<button className="chat-submit" onClick={handleClickFileInput}>
									<i className="material-icons">attachment</i>
								</button>
							</div>
							<div style={{ paddingTop: 10, backgroundColor: '#f4f7f9' }}>
								<button
									className="chat-submit"
									onClick={() => addDocToFirestore(liaFirestore, String(msjValue))}
								>
									<i className="material-icons">send</i>
								</button>
								<input
									type="file"
									ref={hiddenFileInput}
									onChange={handleChangeFileInput}
									style={{ display: 'none' }}
									value={selectedFile}
								/>
							</div>
						</div>
					</div>
				</div>

				{/* ------------- Chat Menu Options ------------- */}
				<Popover
					open={Boolean(userMenu)}
					anchorEl={userMenu}
					onClose={userMenuClose}
					anchorOrigin={{
						vertical: 'bottom',
						horizontal: 'right'
					}}
					transformOrigin={{
						vertical: 'top',
						horizontal: 'right'
					}}
					classes={{
						paper: 'py-8'
					}}
				>
					<MenuItem
						onClick={() => {
							deleteMessage(liaFirestore, deleteAux);
							userMenuClose();
						}}
					>
						<ListItemIcon className="min-w-40">
							<Icon>delete</Icon>
						</ListItemIcon>
						<ListItemText secondary="Eliminar" />
					</MenuItem>
				</Popover>
			</div>
		</>
	);
}

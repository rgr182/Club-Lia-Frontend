import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { showMessage } from "../../../../store/fuse/messageSlice";
import { closeFileDialog, downloadFile } from '../store/profileSlice';
import axios from 'axios';
import {
	makeStyles,
	Dialog,
	DialogContent,
	Toolbar,
	AppBar,
	IconButton,
	Icon,
	Button,
	CircularProgress,
	Typography,
	Tooltip,
	Card
} from '@material-ui/core';
import clsx from 'clsx';
import { Document, Page, pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const useStyles = makeStyles(theme => ({
	titleDialog: {
		fontFamily: "Poppins",
		fontSize: "20px",
	},
	input: {
		height: '40px',
		width: '98%',
		borderRadius: '25px',
		alignSelf: "center"
	},
	button: {
		alignContent: "center",
		textAlign: "center",
		borderRadius: "45px",
		background: "transparent",
		color: theme.palette.primary.main,
		height: "35px",
		marginTop: "8px",
		marginRight: "7px",
		border: "solid " + theme.palette.primary.main + " 3px",
		fontFamily: 'Poppins',
		padding: '3px',
		textTransform: 'none',
		'&:hover': {
			background: theme.palette.primary.light,
			color: "#fff",
			borderColor: theme.palette.primary.light,

		},
		'& .MuiButton-root, &.Mui-disabled': {
			color: '#BEBEBE',
			backgroundColor: '#F5F5F5',
			borderColor: '#F5F5F5',
		}
	},
	buttonFill: {
		background: theme.palette.primary.light,
		color: "#fff",
		border: "solid " + theme.palette.primary.light + " 3px",
		'&:hover': {
			backgroundColor: theme.palette.primary.main,
			borderColor: theme.palette.primary.main,
		},
		'& .MuiButton-root, &.Mui-disabled': {
			color: '#BEBEBE',
			backgroundColor: '#F5F5F5',
			borderColor: '#F5F5F5',
		}
	},
	section: {
		width: 200,
		'@media max-width: 400': {
			width: 300,
		},
		'@media orientation: landscape': {
			width: 400,
		},
	},
	closeButton: { 
		color: theme.palette.primary.main, 
		fontWeight: 'bold' 
	}
}));

function FileDialog(props) {
	const dispatch = useDispatch();
	const classes = useStyles();
	const fileDialog = useSelector(({ ProfileApp }) => ProfileApp.profile.fileDialog);

	const [numPages, setNumPages] = useState(null);
	const [pageNumber, setPageNumber] = useState(1);

	const [loading, setLoading] = useState(null);
	const [urlFile, setUrlFile] = useState(null);

	const initDialog = useCallback(() => {
		getFile(fileDialog.data.name.replace('public', ''));
	}, [fileDialog.data]);

	useEffect(() => {
		/**
		 * After Dialog Open
		 */
		if (fileDialog.props.open) {
			initDialog();
		}
	}, [fileDialog.props.open, initDialog]);

	function closeComposeDialog() {
		setPageNumber(1);
		setUrlFile(null);
		return dispatch(closeFileDialog());
	}

	function onDocumentLoadSuccess({ numPages }) {
		setNumPages(numPages);
	}

	function getFile(filename) {
		setLoading(true);
		axios({
			url: process.env.REACT_APP_API + '/download-file',
			method: 'POST',
			responseType: 'blob', // important
			data: {
				filename: filename
			}
		}).then(response => {
			const url = window.URL.createObjectURL(new Blob([response.data]));
			setUrlFile(url);
			setLoading(false);
		}).catch(error => {
			setLoading(false);
		});
	}

	function downloadFile() {
		const link = document.createElement('a');
		link.href = urlFile;
		link.setAttribute('download', fileDialog.data.name.slice(fileDialog.data.name.indexOf('_') + 1)); //or any other extension
		document.body.appendChild(link);
		link.click();
	}

	return (
		<Dialog
			classes={{
				paper: 'm-24 rounded-8'
			}}
			{...fileDialog.props}
			onClose={closeComposeDialog}
			fullWidth
			maxWidth="lg"
		>
			<AppBar position="static" elevation={1}>
				<Toolbar className="flex w-full justify-between">
					<div className="flex w-full text-between items-between justify-between">
						<Tooltip title={fileDialog.data && fileDialog.data.name ? fileDialog.data.name.split('/')[fileDialog.data.name.split('/').length - 1].split(/_(.+)/)[1] : 'Titulo del archivo'} placement={'top'}>
							<Typography className={clsx(classes.titleDialog, 'truncate ...')} color="inherit">
								{fileDialog.data && fileDialog.data.name ? fileDialog.data.name.split('/')[fileDialog.data.name.split('/').length - 1].split(/_(.+)/)[1] : 'Titulo del archivo'}
							</Typography>
						</Tooltip>
						<IconButton style={{ backgroundColor: '#fff' }} onClick={() => closeComposeDialog()} size="small">
							<Icon className={classes.closeButton}>close</Icon>
						</IconButton>
					</div>
				</Toolbar>
			</AppBar>
			<DialogContent classes={{ root: 'p-24' }} className='text-center poppins' >
				{fileDialog.props.open &&
					<>
						{!loading ?
							urlFile ?
								<div className='text-center' style={{ minHeight: "600px" }}>
									<Button className={clsx(classes.button, classes.buttonFill, 'px-40')} onClick={downloadFile}>
										Descargar
									</Button>
									{fileDialog.data && fileDialog.data.type == 'pdf' ?
										<>
											<div className='flex justify-center pt-24'>
												<Card elevation={2}>
													<Document file={urlFile} onLoadSuccess={onDocumentLoadSuccess} >
														<Page width={900} className='PDFPage' pageNumber={pageNumber} />
													</Document>
												</Card>
											</div>
											<div className='flex justify-center items-center pt-6'>
												<IconButton onClick={() => setPageNumber(pageNumber - 1)} disable={pageNumber <= 1}><Icon>navigate_before</Icon></IconButton>
												<p>Página {pageNumber} de {numPages}</p>
												<IconButton onClick={() => setPageNumber(pageNumber + 1)} disable={pageNumber >= numPages}><Icon>navigate_next</Icon></IconButton>
											</div>
										</>
										:
										<div className='flex justify-center pt-24'>
											<img src={urlFile} style={{ width: '80%' }} />
										</div>
									}
								</div>
								:
								<div className='flex flex-1 flex-col items-center justify-center' style={{ minHeight: "600px" }}>
									<div className="text-20 mb-16">
										No se pudo consultar el archivo.
									</div>
								</div>
							:
							<div className='flex flex-1 flex-col items-center justify-center' style={{ minHeight: "600px" }}>
								<div className="text-20 mb-16">
									Cargando...
								</div>
								<CircularProgress color="primary" />
							</div>
						}
					</>
				}
			</DialogContent>
		</Dialog>
	);
}

export default FileDialog;

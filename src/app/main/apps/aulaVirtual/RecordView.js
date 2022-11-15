import React, { useState, useEffect } from 'react';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import CircularProgress from '@material-ui/core/CircularProgress';
import Tooltip from '@material-ui/core/Tooltip';
import { useReactMediaRecorder } from 'react-media-recorder';
import { useDispatch, useSelector } from 'react-redux';
import { getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { showMessage } from '../../../store/fuse/messageSlice';
import { getGradeSuject } from './store/aulaSlice.js';
import { FileConfig, validVideo } from 'app/utils/FileConfig';
import { Alert } from '@material-ui/lab';

// Firebase
// Path to save messages
let wlocation = '';
// Path to storage data
const liaStorage = 'Documents';
// Init Storage on firebase
const st = getStorage();

const confVideo = {
	width: 1080,
	height: 720,
	frameRate: 20
};

const blobPropertyBag = {
	type: 'video/mp4'
};

function RecordView() {
	const dispatch = useDispatch();

	const userInfo = useSelector(({ auth }) => auth.user.data);
	const grupo = useSelector(({ AulaVirtualApp }) => AulaVirtualApp.aulaVirtual.meetingAula.response.group_id);
	const gradeSuject = useSelector(({ AulaVirtualApp }) => AulaVirtualApp.aulaVirtual.gradeSuject.data);
	const [start, setStart] = useState('');
	const arrRoute = window.location.toString().split('/');
	const [fileError, setFileError] = useState();

	const {
		status,
		startRecording,
		stopRecording,
		resumeRecording,
		pauseRecording,
		mediaBlobUrl,
		unMuteAudio,
		muteAudio,
		isAudioMuted
	} = useReactMediaRecorder({ screen: true, video: confVideo });

	useEffect(() => {
		if (mediaBlobUrl) {
			uploadVideo(mediaBlobUrl);
		}
	}, [mediaBlobUrl]);

	useEffect(() => {
		if (arrRoute[arrRoute.length - 2].includes('google')) {
			dispatch(getGradeSuject(arrRoute[arrRoute.length - 2]));
		}
	}, []);

	function getNombreArchivo() {
		wlocation = '';
		wlocation = `classes/${userInfo.school_id}/${userInfo.uuid}`;
		if (arrRoute[arrRoute.length - 2].includes('google')) {
			wlocation += `/${arrRoute[arrRoute.length - 3].split('-', 3)[2]}`;
		} else {
			wlocation += grupo ? `/${grupo}` : '';
		}

		let date1 = String(start).split('GMT', 2);
		date1 = date1[0].replaceAll(':', '-');
		const date2 = new Date().toTimeString().replaceAll(':', '-').split(' ', 1)[0];
		if (gradeSuject.subject_id) {
			wlocation += `/${gradeSuject.subject_id}`;
		}
		wlocation += `/${userInfo.displayName}`;
		if (gradeSuject.subject_id) {
			wlocation += ` ${gradeSuject.group_name} ${gradeSuject.subject_name} `;
		}
		wlocation += `${date1 + date2}.mp4`;
	}

	function uploadVideo(mediaBlob) {
		fetch(mediaBlob)
			.then(r => r.blob())
			.then(blob => {
				const file = new File([blob], 'peter.mp4', {type: 'video/mp4'})
				const errorMessage = validVideo(FileConfig.teacherVideo, file)
				setFileError(errorMessage);
				if(errorMessage) {
					return
				}
				getNombreArchivo();
				const stRef = ref(st, `${liaStorage}/${wlocation}`);
				const uploadTask = uploadBytesResumable(stRef, blob);
				uploadTask.on(
					'state_changed',
					snapshot => {
						// Observe state change events such as progress, pause, and resume
						// Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
						const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
						dispatch(showMessage({ message: `Subiendo la clase ${Math.trunc(progress)}%` }));
					},
					error => {
						// Handle unsuccessful uploads
						dispatch(showMessage({ message: 'Error al subir la clase', variant: 'error' }));
					},
					() => {
						// Handle successful uploads on complete
						dispatch(showMessage({ message: 'Se ha terminado de subir la clase', variant: 'success' }));
						// For instance, get the download URL: https://firebasestorage.googleapis.com/...
						/* getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    }); */
					}
				);
			});
	}

	return (
		<div>
			 {fileError && (<Alert severity="error">{fileError}</Alert>)}
			{(grupo || arrRoute[arrRoute.length - 2].includes('google')) && (
				<div className="p-10">
					{(status == 'acquiring_media' || status == 'stopping') && <CircularProgress />}
					{(status == 'idle' ||
						status == 'stopped' ||
						status == 'permission_denied' ||
						status == 'no_specified_media_found' ||
						status == 'media_aborted' ||
						status == 'recorder_error' ||
						status == 'no_constraints' ||
						status == 'invalid_media_constraints') && (
						<Tooltip title="Iniciar grabación" placement="bot">
							<IconButton
								onClick={() => {
									setFileError(null)
									startRecording();
									setStart(new Date());
									unMuteAudio();
								}}
							>
								<label style={{ position: 'absolute', top: '-30px', color: '#FFFFFF', fontSize: '15px' }}>
									Iniciar Grabación
								</label>
								<Icon style={{ color: '#FFFFFF' }}>radio_button_checked</Icon>
							</IconButton>
						</Tooltip>
					)}
					{(status == 'recording' || status == 'paused') && (
						<Tooltip title="Parar grabación" placement="bot">
							<IconButton onClick={stopRecording}>
								<label style={{ position: 'absolute', top: '-30px', color: '#FFFFFF', fontSize: '15px' }}>
									Detener
								</label>
								<Icon style={{ color: '#fff', margin: '0 20px' }}>stop_circle_outlined</Icon>
							</IconButton>
						</Tooltip>
					)}
					{status == 'recording' && (
						<Tooltip title="Pausar grabación" placement="bot">
							<IconButton onClick={pauseRecording}>
								<label style={{ position: 'absolute', top: '-30px', color: '#FFFFFF', fontSize: '15px' }}>
									Pausar
								</label>
								<Icon style={{ color: '#fff', margin: '0 20px' }}>pause_circle_outlined</Icon>
							</IconButton>
						</Tooltip>
					)}
					{status == 'paused' && (
						<Tooltip title="Reanudar grabación" placement="bot">
							<IconButton onClick={resumeRecording}>
								<Icon style={{ color: '#fff', margin: '0 20px' }}>play_circle_outlined</Icon>
							</IconButton>
						</Tooltip>
					)}
					{(status == 'recording' || status == 'paused') && (
						<>
							{isAudioMuted ? (
								<Tooltip title="Activar micrófono" placement="bot">
									<IconButton onClick={unMuteAudio}>
										<label style={{ position: 'absolute', top: '-30px', color: '#FFFFFF', fontSize: '15px' }}>
											Activar micrófono
										</label>
										<Icon style={{ color: '#fff', margin: '0 20px' }}>mic_off</Icon>
									</IconButton>
								</Tooltip>
							) : (
								<Tooltip title="Desactivar micrófono" placement="bot">
									<IconButton onClick={muteAudio}>
										<label style={{ position: 'absolute', top: '-30px', color: '#FFFFFF', fontSize: '15px' }}>
											Desactivar micrófono
										</label>
										<Icon style={{ color: '#fff', margin: '0 20px' }}>mic</Icon>
									</IconButton>
								</Tooltip>
							)}
						</>
					)}
					{/* mediaBlobUrl && <a href={mediaBlobUrl} download="testt.webm" style={{ color: '#fff' }}> QLQ </a> */}
				</div>
			)}
		</div>
	);
}

export default RecordView;

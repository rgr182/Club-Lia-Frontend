import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
	TextTitle: {
		fontWeight: "bold",
		fontSize: "32px",
		color: 'white',
		textShadow: '2px 2px 2px black',
	},
	Text: {
		fontFamily:  ({ nivel, fonts }) => nivel == 2 ? fonts[2] : fonts[0],
		fontSize: ({ nivel }) => nivel == 2 ? "24px" : "18px",
		color: 'white',
		textShadow: '2px 2px 2px black',
		text: "center",
		alignSelf: "center",
	},
	TextInfo: {
		fontFamily:  ({ nivel, fonts }) => nivel == 2 ? fonts[2] : fonts[0],
		fontSize: ({ nivel }) => nivel == 2 ? "22px" : "16px",
		color: 'white',
		textShadow: '2px 2px 2px black',
		text: "center",
		alignSelf: "center",
	},
	container: {
		justifyContent: "center",
		alignItems: "center",
		text: "center",
		textAlign: "center", //*important
		backgroundColor: 'rgba(255, 255, 255, .9)',

	},
	containersInfo: {
		borderRadius: 5,
		backgroundColor: "#000000"
	},
	avatarContainer: {
		paddingLeft: '70px',
		paddingRight: '70px',
	},
	avatar: {
		width: 80,
		height: 80,
		padding: 8,
		background: theme.palette.background.default,
		boxSizing: 'content-box',
		left: '3%',
		transform: 'translateX(-50%)',
		transition: theme.transitions.create('all', {
			duration: theme.transitions.duration.shortest,
			easing: theme.transitions.easing.easeInOut
		}),
		'& > img': {
			borderRadius: '50%'
		}
	},

}));

export default function UserInfoHeader() {
    const dispatch = useDispatch();
	
    const user = useSelector(({ auth }) => auth.user);
	var role = useSelector(({ auth }) => auth.user.role);
    const info = useSelector(({ auth }) => auth.user);
	const level_id = useSelector(({ auth }) => auth.user.data.level_id);
	if (role != 'alumno' && role != 'alumno_secundaria' && role != 'preescolar') {
		level_id == 1 ? role = 'preescolar' : level_id == 2 ? role = 'alumno' : role = 'alumno_secundaria';
	}
	const nivel = (role === 'alumno' && info.grade > 3) || role === 'alumno_secundaria' ? 2 : role === 'preescolar' ? 0 : 1;
	const largest = Math.max(info.data.school_name.length, 14, info.data.displayName.length);

	const fonts = [
		'grobold',
		'rager',
		'haettenschweilerRegular',
	];

	const classes = useStyles({nivel, fonts});

    return (
        <>
            <div className="flex w-full items-center justify-center flex-wrap flex-row">

                <Avatar
                    className={clsx(classes.avatar)}
                    src={user.data.photoURL && user.data.photoURL !== ''
                        ? user.data.photoURL
                        : " assets/images/preescolar/infoestudiante.png"} >
                </Avatar>
                <div id="container" className={clsx(classes.containersInfo), "w-1/2 flex-col"}>
					<div className="flex items-center justify-start">
						<div style={{
							paddingTop: nivel == 2 ? 0 : 3, 
							paddingBottom: nivel == 2 ? 0 : 3, 
							paddingLeft: 5, 
							paddingRight: 5, 
							marginLeft: largest > 24 ? 5 : 60,
							backgroundColor: '#FCDB00', 
							color: '#FFFFFF', 
							borderRadius: 12, 
							fontWeight: "bold",
							textAlign: "center", 
							minWidth: largest * 8.5,
							marginBottom: 5
						}}>
							<Typography className={clsx(classes.TextInfo, nivel != 2 ? fonts[1] : '')}>
								{info.data.displayName}
							</Typography>
						</div>
					</div>
					<div className="flex items-center justify-start">
						<div style={{
							paddingTop: nivel == 2 ? 0 : 3, 
							paddingBottom: nivel == 2 ? 0 : 3, 
							paddingLeft: 5, 
							paddingRight: 5, 
							marginLeft: largest > 24 ? 5 : 60,
							backgroundColor: '#FCDB00', 
							color: '#FFFFFF', 
							borderRadius: 12, 
							fontWeight: "bold",
							textAlign: "center", 
							minWidth: largest * 8.5,
							marginBottom: 5
						}}>
							<Typography className={clsx(classes.TextInfo)}>
								{ info.data.grade == '1' ? 'Primer Grado' : null }
								{ info.data.grade == '2' ? 'Segundo Grado' : null }
								{ info.data.grade == '3' ? 'Tercer Grado' : null }
								{ info.data.grade == '4' ? 'Cuarto Grado' : null }
								{ info.data.grade == '5' ? 'Quinto Grado' : null }
								{ info.data.grade == '6' ? 'Sexto Grado' : null }

							</Typography>
						</div>
					</div>
					<div className="flex items-center justify-start">
						<div style={{
							paddingTop: nivel == 2 ? 0 : 3, 
							paddingBottom: nivel == 2 ? 0 : 3, 
							paddingLeft: 5, 
							paddingRight: 5, 
							marginLeft: largest > 24 ? 5 : 60,
							backgroundColor: '#FCDB00', 
							color: '#FFFFFF', 
							borderRadius: 12, 
							fontWeight: "bold",
							textAlign: "center", 
							minWidth: largest * 8.5,
						}}>
							<Typography className={clsx(classes.TextInfo)}>
								{info.data.school_name}
							</Typography>
						</div>
					</div>

                </div>
            </div>
        </>

    )
}

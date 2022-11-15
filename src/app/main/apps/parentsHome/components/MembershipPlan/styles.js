import { makeStyles } from '@material-ui/core/styles';
import { THEME } from 'app/fuse-configs/themesConfig';

const useStyles = variant =>
	makeStyles(theme => ({
		container: {
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
			textAlign: 'center',
			width: '80%'
		},
		title: {
			color: `${variant} !important`,
			fontWeight: 'bold',
			marginBlock: '0.5em'
		},
		price: {
			backgroundColor: `${variant} !important`,
			display: 'flex',
			justifyContent: 'center',
			alignContent: 'center',
			width: '100%',
			paddingBlock: '0.5em',
			fontSize: '1.2em',
			fontWeight: 'bold',
			color: 'white',
			borderRadius: '0.5em',
			'&:before': {
				content: '"$"'
			},
			'&:after': {
				content: '"MXN"'
			},
			'&:before, &:after': {
				fontWeight: 'initial',
				fontSize: '0.9em',
				marginInline: '0.5em'
			}
		},
		alert: {
			color: THEME.fonts.color.primary,
			position: 'absolute',
			backgroundColor: '#F8CA27',
			width: '80%',
			paddingBlock: '0.5em',
			borderBottomLeftRadius: '0.5em',
			borderBottomRightRadius: '0.5em',
			top: '-1em',
			marginTop: '-5px',
			textAlign: 'center'
		},
		featuresList: {
			position: 'relative',
			display: 'flex',
			marginTop: '1em',
			flexDirection: 'column',
			paddingTop: '5em',
			alignItems: 'center',
			textAlign: 'left',
			border: `5px solid ${variant}`,
			borderRadius: '0.5em',
			boxShadow: `-15px 15px 0 5px ${variant}`
		},
		feature: {
			display: 'flex',
			paddingInline: '0.5em',
			width: '100%',
			paddingBlock: '0.5em',
			color: THEME.fonts.color.primary,
			borderBottom: '1px solid rgba(0,0,0,0.1)',
			'& img': {
				marginInline: '0.5em',
				alignSelf: 'baseline'
			}
		},
		button: {
			fontFamily: THEME.fonts.primary,
			backgroundColor: 'deepPink',
			color: 'white !important',
			fontWeight: 'bold',
			padding: '0.5em 2em',
			borderRadius: '2em',
			marginBlock: '2em'
		}
	}));

export default useStyles;

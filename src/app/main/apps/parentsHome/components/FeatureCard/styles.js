import { makeStyles } from '@material-ui/core/styles';
import { THEME } from 'app/fuse-configs/themesConfig';

const useStyles = color =>
	makeStyles(theme => ({
		container: {
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
			justifyContent: 'space-evenly',
			padding: '2.5em',
			color: THEME.fonts.color.primary,
			textAlign: 'center',
			boxShadow: '0px 0px 24px rgba(0, 0, 0, 0.15)',
			borderRadius: '2em',
			width: '80%',
			height: 'auto',
			borderBottom: `1em solid ${color}`
		},
		title: {
			fontSize: '1.5em',
			fontWeight: 'bold'
		},
		image: {
			width: '30%',
			aspectRatio: '1/1',
			marginBlock: '1em',
			objectFit: 'contain'
		}
	}));

export default useStyles;

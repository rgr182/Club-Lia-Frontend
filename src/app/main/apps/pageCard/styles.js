import { makeStyles } from '@material-ui/core/styles';
import { THEME } from 'app/fuse-configs/themesConfig';

const useStyles = makeStyles(theme => ({
	container: {
		display: 'flex',
		justifyContent: 'center',
		padding: '25px',
		backgroundColor: theme.palette.background.default,
		fontFamily: THEME.fonts.primary
	},
	card: {
		display: 'flex',
		alignContent: 'center',
		alignItems: 'center',
		flexDirection: 'column',
		width: '100%',
		margin: '5px 5px 25px 5px',
		borderRadius: '10px',
		fontStyle: 'normal',
		color: THEME.fonts.color.primary,
		boxShadow: THEME.palette.boxShadow
	},
	back: {
		position: 'absolute',
		top: '7rem',
		left: '7rem',
		fontWeight: 'bold',
		verticalAlign: 'middle'
	},
	content: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		paddingInline: '7em',
		paddingBlock: '5em',
		width: '100%',
		maxWidth: '94em',
		'& h1': {
			fontFamily: THEME.fonts.title,
			fontSize: '2.5em',
			color: theme.palette.secondary.main,
			margin: 0
		}
	}
}));

export default useStyles;

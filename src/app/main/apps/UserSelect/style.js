import { makeStyles } from '@material-ui/core/styles';
import { THEME } from 'app/fuse-configs/themesConfig';

const useStyles = makeStyles(theme => ({
	container: {
		...THEME.mixins.container
	},
	subtitle: {
		...THEME.mixins.subtitle,
		color: theme.palette.primary.light
	},
	users: {
		display: 'flex',
		flexWrap: 'wrap',
		alignContent: 'center',
		alignItems: 'center'
	},
	userContainer: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		marginInline: '2em',
		cursor: 'pointer'
	},
	user: {
		display: 'flex',
		position: 'relative',
		borderRadius: '50%',
		width: '7em',
		aspectRatio: '1/1',
		padding: '0.5em',
		backgroundColor: theme.palette.background.default,
		'&.selected': {
			backgroundColor: theme.palette.primary.light
		},
		'&.newUser': {
			backgroundColor: theme.palette.primary.light,
			width: '2em',
			height: '2em',
			marginBlock: '2.5em',
			color: 'white !important',
			alignItems: 'center',
			justifyContent: 'center'
		}
	},
	notification: {
		display: 'none',
		position: 'absolute',
		top: '0',
		right: '0',
		'&.selected': {
			display: 'block'
		}
	},
	avatar: {
		width: '100%',
		aspectRatio: '1/1',
		borderRadius: '50%',
		objectFit: 'cover',
		filter: 'brightness(120%) opacity(50%) grayscale(100%)',
		'&.selected': {
			filter: 'none'
		}
	},
	name: {
		color: THEME.fonts.color.primary,
		fontWeight: 'bold',
		marginTop: '1em'
	},
	newUser: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		height: '2em',
		width: '2em',
		padding: '1em',
		backgroundColor: theme.palette.primary.main,
		borderRadius: '50%',
		color: 'white !important',
		marginBottom: '2em',
		marginInline: '1.5em',
		fontWeight: 'bold'
	}
}));

export default useStyles;

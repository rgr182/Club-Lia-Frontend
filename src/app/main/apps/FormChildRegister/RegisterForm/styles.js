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
	description: {
		...THEME.mixins.description
	},
	add: {
		display: 'flex',
		alignItems: 'center',
		color: THEME.fonts.color.primary,
		fontWeight: 'bold',
		marginBlock: '1em',
		fontSize: '1.2em',
		'& span': {
			display: 'flex',
			alignItems: 'center',
			justifyItems: 'center',
			backgroundColor: theme.palette.primary.light,
			color: 'white',
			padding: '0.5em',
			aspectRatio: 1,
			height: '1.5em',
			borderRadius: '50%',
			marginRight: '0.5em'
		}
	},
	footer: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		marginTop: '1em'
	},
	checkbox: {
		display: 'flex',
		alignItems: 'center',
		'& a': {
			marginLeft: '0.5rem',
			color: theme.palette.primary.light
		}
	}
}));

export default useStyles;

import { makeStyles } from '@material-ui/core';
import { THEME } from 'app/fuse-configs/themesConfig';

const useStyles = makeStyles(theme => ({
	container: {
		display: 'grid',
		gridTemplateColumns: '1fr 2fr',
		marginBlock: '2em'
	},
	content: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-between',
		padding: '1em',
		paddingTop: '0',
		color: THEME.fonts.color.primary
	},
	header: {
		display: 'flex',
		alignItems: 'center',
		alignContent: 'center',
		marginBottom: '0.5em'
	},
	notification: {
		marginInline: '1em',
		fontWeight: 'bold',
		color: theme.palette.secondary.main,
		backgroundColor: theme.palette.background.default,
		padding: '0.5em',
		borderRadius: '0.5em'
	},
	desc: {
		color: '#000',
		fontWeight: 400
	},
	price: {
		fontSize: '1.5em',
		fontWeight: 'bold',
		color: theme.palette.primary.light,
		'&::after': {
			content: '" MXN"'
		},
		'&::before': {
			content: '"$ "'
		}
	},
	title: {
		fontSize: '1.5em',
		fontWeight: 'bold',
		marginBottom: '0.5em',
		color: theme.palette.primary.light
	},
	features: {
		listStyle: 'disc',
		marginLeft: '1em',
		marginBottom: '1em'
	},
	feature: {
		marginBottom: '1em'
	},
	button: {
		backgroundColor: theme.palette.primary.light,
		justifySelf: 'start',
		color: 'white !important',
		padding: '0.75em 3em',
		borderRadius: '2em',
		width: 'fit-content',
		fontWeight: 'bold',
		cursor: 'pointer'
	}
}));

export default useStyles;

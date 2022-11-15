import { makeStyles } from '@material-ui/core/styles';
import { THEME } from 'app/fuse-configs/themesConfig';

const useStyles = makeStyles(theme => ({
	card: {
		display: 'grid',
		margin: '0 ',
		justifyContent: 'center',
		gridTemplateColumns: '1fr 1fr',
		'& img': {
			width: '100%',
			aspectRatio: '16/9',
			objectFit: 'cover'
		}
	},
	content: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-between',
		paddingBlock: '2em',
		paddingInline: '3em',
		'& main': {
			fontSize: '1.2em'
		}
	},
	price: {
		color: theme.palette.primary.light,
		fontSize: '2rem',
		fontWeight: 'bold',
		'&:before': {
			content: '"$"'
		},
		'&:after': {
			content: '" MXN"'
		}
	},
	title: {
		color: theme.palette.primary.light,
		fontWeight: 'bold',
		fontSize: '1.8rem'
	},
	desc: {
		fontWeight: 400
	},
	buttons: {
		display: 'grid',
		gridTemplateColumns: '1fr 1fr',
		alignContent: 'center',
		gridGap: '1em',
		marginTop: '1em',
		justifyContent: 'center',
		textAlign: 'center'
	},
	button: {
		fontFamily: THEME.fonts.primary,
		backgroundColor: 'deepPink',
		color: 'white !important',
		fontWeight: 'bold',
		padding: '1em 2em',
		borderRadius: '2em'
	}
}));

export default useStyles;

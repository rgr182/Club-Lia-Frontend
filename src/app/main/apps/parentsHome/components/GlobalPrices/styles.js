import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
	message: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: theme.palette.background.default,
		color: theme.palette.primary.light,
		padding: '0.5em 1em',
		fontSize: '1.1em',
		borderRadius: '1em',
		fontWeight: 'bold',
		'& span:before': {
			content: '"$"'
		},
		'& span:after': {
			content: '" MXN"'
		}
	},
	prices: {
		display: 'grid',
		gridTemplateColumns: '1fr 1fr 1fr',
		width: '100%',
		justifyItems: 'center',
		marginBlock: '2em'
	},
	button: {
		backgroundColor: theme.palette.primary.main,
		color: 'white !important',
		padding: '.5em 5em',
		borderRadius: '2em',
		fontSize: '1em',
		fontWeight: 'bold',
		marginBlock: '5em',
		marginBlockEnd: '3em'
	}
}));

export default useStyles;

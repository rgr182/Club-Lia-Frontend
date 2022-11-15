import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
	footer: {
		display: 'flex',
		justifyContent: 'center',
		width: '100%'
	},
	submit: {
		backgroundColor: theme.palette.primary.light,
		color: 'white',
		fontWeight: 'bold',
		fontSize: '1.2em',
		marginTop: '2em',
		padding: '0.5em 2em',
		borderRadius: '2em',
		transition: 'all 0.3s ease-in',
		'&:hover': {
			cursor: 'pointer',
			transform: 'scale(1.1)'
		},
		'&:disabled': {
			cursor: 'not-allowed',
			backgroundColor: '#ccc',
			'&:hover': {
				transform: 'scale(1)'
			}
		}
	}
}));

export default useStyles;

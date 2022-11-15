import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
	formMessage: {
		display: 'flex',
		backgroundColor: theme.palette.background.default,
		color: theme.palette.secondary.main,
		fontWeight: 'bold',
		alignItems: 'center',
		padding: '0.5em'
	}
}));

export default useStyles;

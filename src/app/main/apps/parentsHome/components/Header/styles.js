import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
	header: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		textAlign: 'center',
		paddingBottom: '2em'
	},
	subtitle: {
		color: theme.palette.primary.light
	}
}));

export default useStyles;

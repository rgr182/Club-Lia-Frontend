import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
	container: {
		display: 'grid',
		gridTemplateColumns: '1fr 1fr',
		justifyItems: 'center',
		marginBlock: '5em'
	},
	list: {
		display: 'grid',
		gridTemplateColumns: '1fr 1fr',
		justifyItems: 'center',
		gap: '1.5em',
		width: '100%',
		height: 'auto'
	}
}));

export default useStyles;

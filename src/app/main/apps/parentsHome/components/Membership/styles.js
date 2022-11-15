import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
	container: {
		display: 'grid',
		gridTemplateColumns: '1fr 1fr',
		justifyItems: 'center',
		marginBlock: '5em',
		width: '70%',
		columnGap: '1em',
		position: 'relative'
	}
}));

export default useStyles;

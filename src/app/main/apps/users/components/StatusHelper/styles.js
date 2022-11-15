import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
	container: {
		width: '100%',
		marginBlock: '5em'
	},
	title: {
		fontWeight: '500'
	},
	content: {
		display: 'grid',
		gridTemplateColumns: 'auto 1fr',
		alignItems: 'center',
		gridGap: '1em',
		marginBlock: '1em'
	}
}));

export default useStyles;

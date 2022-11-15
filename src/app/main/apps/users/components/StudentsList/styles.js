import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
	content: {
		display: 'flex',
		flexDirection: 'column',
		width: '100%',
		alignContent: 'center',
		justifyContent: 'center',
		paddingBlockStart: '3em',
		textAlign: 'center'
	},
	title: {
		color: theme.palette.primary.main,
		marginBottom: '1em !important'
	}
}));

export default useStyles;

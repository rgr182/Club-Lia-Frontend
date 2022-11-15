import { makeStyles } from '@material-ui/core';
import { THEME } from 'app/fuse-configs/themesConfig';

const useStyles = makeStyles(theme => ({
	container: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'flex-end',
		width: '100%',
		paddingBlock: '1em'
	},
	product: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		marginBlock: '1em',
		'& > *': {
			paddingInline: '0.5em'
		}
	},
	quantity: {
		fontWeight: 'bold'
	},
	price: {
		fontWeight: 'bold',
		fontSize: '1.2em',
		color: theme.palette.primary.light,
		'&::before': {
			content: '"$"'
		},
		'&::after': {
			content: '" MXN"'
		}
	},
	totalTitle: {
		fontWeight: 'bold',
		fontSize: '1.2em'
	}
}));

export default useStyles;

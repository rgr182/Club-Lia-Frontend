import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
	container: {
		display: 'flex',
		flexDirection: 'column',
		width: '100%',
		marginBlockEnd: '4em'
	},
	subtitle: {
		fontSize: '1.5em',
		fontWeight: 'bold',
		marginBlock: '1em'
	},
	carousel: {
		'& .rec-dot': {
			boxShadow: 'none',
			backgroundColor: theme.palette.primary.main,
			width: '10px'
		},
		'& .rec-dot_active': {
			backgroundColor: theme.palette.secondary.main,
			width: '12px',
			height: '12px'
		},
		'& .rec-slider': {
			left: '0'
		},
		'& .rec-item-wrapper': {
			width: '100%'
		}
	}
}));

export default useStyles;

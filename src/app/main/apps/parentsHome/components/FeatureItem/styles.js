import { makeStyles } from '@material-ui/core/styles';

const useItemStyles = color =>
	makeStyles(theme => ({
		item: {
			backgroundColor: color,
			width: '100%',
			height: '3em',
			color: 'white',
			paddingBlock: '0.75em',
			borderRadius: '2em',
			fontSize: '1.1em',
			fontWeight: 'bold',
			textAlign: 'center',
			transition: 'all 0.2s ease-in',
			'&:hover': {
				cursor: 'pointer',
				transform: 'scale(1.05)'
			}
		}
	}));

export default useItemStyles;

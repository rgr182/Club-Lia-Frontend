import { makeStyles } from '@material-ui/core/styles';
import { THEME } from 'app/fuse-configs/themesConfig';

const useStyles = makeStyles(theme => ({
	form: {
		paddingTop: '1em'
	},
	input: {
		textAlign: 'left',
		borderRadius: '2em',
		width: '25%',
		fontFamily: THEME.fonts.primary,
		padding: '0',
		'& .MuiSelect-select': {
			padding: '0.75em 2em'
		}
	},
	option: {
		fontFamily: THEME.fonts.primary
	}
}));

export default useStyles;

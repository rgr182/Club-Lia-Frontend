import { makeStyles } from '@material-ui/core/styles';
import { THEME } from 'app/fuse-configs/themesConfig';

const useStyles = makeStyles(theme => ({
	form: {
		paddingTop: '1em',
		display: 'flex',
		alignItems: 'center'
	},
	input: {
		color: THEME.fonts.color.primary,
		fontFamily: THEME.fonts.primary,
		textAlign: 'left',
		width: '50%'
	},
	option: {
		fontFamily: THEME.fonts.primary
	}
}));

export default useStyles;

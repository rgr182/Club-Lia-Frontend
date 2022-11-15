import { makeStyles } from '@material-ui/core/styles';
import { THEME } from 'app/fuse-configs/themesConfig';

const useStyles = makeStyles(theme => ({
	container: {
		display: 'flex',
		flexDirection: 'column'
	},
	label: {
		...THEME.mixins.description,
		'& span': {
			color: theme.palette.primary.main
		}
	},
	input: {
		fontFamily: THEME.fonts.primary,
		padding: '0',
		'& > div': {
			borderRadius: '2em'
		},
		'& .MuiInputBase-input': {
			padding: '0.75em 1em',
			fontFamily: THEME.fonts.primary
		}
	}
}));

export default useStyles;

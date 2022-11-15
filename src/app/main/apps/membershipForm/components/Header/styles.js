import { makeStyles } from '@material-ui/core/styles';
import { THEME } from 'app/fuse-configs/themesConfig';

const useStyles = makeStyles(theme => ({
	container: {
		textAlign: 'left',
		width: '100%',
		marginBlock: '1em'
	},
	subtitle: {
		...THEME.mixins.subtitle,
		color: theme.palette.primary.light
	},
	description: {
		...THEME.mixins.description,
		'& span': {
			color: `${theme.palette.primary.main} !important`
		}
	}
}));

export default useStyles;

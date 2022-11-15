import { makeStyles } from '@material-ui/core/styles';
import { THEME } from 'app/fuse-configs/themesConfig';

const useStyles = makeStyles(theme => ({
	form: {
		marginBlock: '3em',
		display: 'grid',
		gridTemplateColumns: '1fr 1fr 1fr',
		gap: '3em'
	},
	removeBtn: {
		...THEME.mixins.removeBtn
	},

	separator: {
		borderTop: '1px solid rgba(0, 0, 0, 0.1)'
	}
}));

export default useStyles;

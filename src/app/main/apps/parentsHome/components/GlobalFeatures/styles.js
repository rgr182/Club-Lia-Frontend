import { makeStyles } from '@material-ui/core/styles';
import { THEME } from 'app/fuse-configs/themesConfig';

const useStyles = makeStyles(theme => ({
	list: {
		display: 'grid',
		gridTemplateColumns: '1fr 1fr',
		marginBlock: '3em',
		rowGap: '0.5em'
	},
	item: {
		display: 'flex',
		color: THEME.fonts.color.primary,
		fontSize: '1.2em',
		'& img': {
			height: '20px',
			marginInlineEnd: '1em'
		},
		'&:nth-child(2)': {
			gridRow: '1 / span 2',
			gridColumn: 2
		}
	}
}));

export default useStyles;

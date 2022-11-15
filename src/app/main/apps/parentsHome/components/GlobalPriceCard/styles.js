import { makeStyles } from '@material-ui/core/styles';
import { THEME } from 'app/fuse-configs/themesConfig';

const useStyles = makeStyles(theme => ({
	container: {
		display: 'flex',
		flexDirection: 'column',
		textAlign: 'center',
		alignContent: 'center',
		paddingInline: '3em',
		width: '100%'
	},
	title: {
		fontWeight: 'bold',
		fontSize: '1.3em',
		color: theme.palette.secondary.main,
		marginBlock: '0.2em'
	},
	price: {
		fontWeight: 900,
		alignContent: 'center',
		fontSize: '2em',
		marginBottom: '0.2em',
		color: theme.palette.primary.light,
		'&:before': {
			content: '"$"'
		},
		'&:after': {
			content: '" MXN"'
		},
		'&:before, &:after': {
			fontSize: '.5em',
			fontWeight: 'initial',
			verticalAlign: 'middle'
		}
	},
	description: {
		fontSize: '1.2em',
		padding: '1.5em',
		height: '100%',
		color: THEME.fonts.color.primary,
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		borderRadius: '0.5em',
		border: `3px solid ${theme.palette.secondary.main}`,
		boxShadow: `-10px 10px 0 2px ${theme.palette.secondary.main}`
	}
}));

export default useStyles;

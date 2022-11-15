import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
	container: {
		display: 'grid',
		gridTemplateColumns: '1fr 2fr',
		justifyItems: 'center',
		alignItems: 'center',
		marginBlockStart: '2em',
		marginBlockEnd: '4em',
		gap: '1em'
	},
	img: {
		width: '100%',
		objectFit: 'contain',
		padding: '4em',
		aspectRatio: 1
	},
	video: {
		width: '100%',
		objectFit: 'cover',
		aspectRatio: '16/9'
	}
}));

export default useStyles;

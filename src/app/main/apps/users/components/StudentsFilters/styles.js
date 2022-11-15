import { makeStyles } from '@material-ui/core';
import { THEME } from 'app/fuse-configs/themesConfig';

const useStyles = makeStyles(theme => ({
	container: {
		display: 'flex',
		flexDirection: 'column',
		width: '100%'
	},
	header: {
		display: 'flex',
		justifyContent: 'space-between',
		alignContent: 'center'
	},
	title: {
		color: theme.palette.primary.main
	},
	button: {
		...THEME.mixins.removeBtn
	},
	form: {
		display: 'flex',
		justifyContent: 'space-between',
		justifyItems: 'center',
		' & > *': {
			width: '100%',
			marginInline: '0.5em',
			'& label': {
				fontWeight: 'normal',
				fontSize: '1.2rem',
				marginBlockEnd: '0.5em'
			},
			'& .MuiInputBase-formControl': {
				borderRadius: '0.5em'
			}
		}
	}
}));

export default useStyles;

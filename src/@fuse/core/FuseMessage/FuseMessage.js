import { amber, blue, green } from '@material-ui/core/colors';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { hideMessage } from 'app/store/fuse/messageSlice';
import Card from '@material-ui/core/Card';

const useStyles = makeStyles(theme => ({
	root: {},
	success: {
		//backgroundColor: green[600],
		backgroundColor: '#FFFFFF',
		color: '#1CD17A'
	},
	error: {
		//backgroundColor: theme.palette.error.dark,
		//color: theme.palette.getContrastText(theme.palette.error.dark)
		backgroundColor: '#FFFFFF',
		color: 'red'
	},
	info: {
		//backgroundColor: blue[600],
		backgroundColor: '#FFFFFF',
		color: '#00B1FF'
	},
	warning: {
		//backgroundColor: amber[600],
		backgroundColor: '#FFFFFF',
		color: '#00B1FF'
	}
})); 

const variantIcon = {
	success: 'check_circle',
	warning: 'warning',
	error: 'error_outline',
	info: 'info'
};

function FuseMessage(props) {
	const dispatch = useDispatch();
	const state = useSelector(({ fuse }) => fuse.message.state);
	const options = useSelector(({ fuse }) => fuse.message.options);

	const classes = useStyles();

	return (
		<Snackbar
			{...options}
			open={state}
			onClose={() => dispatch(hideMessage())}
			classes={{
				root: classes.root
			}}
			ContentProps={{
				variant: 'body2',
				headlineMapping: {
					body1: 'div',
					body2: 'div',
				}
			}}
		>
			<SnackbarContent
				className={clsx(classes[options.variant])}
				style={{ height: '89px', width: '377px' }}
				message={
					 <div className="flex items-center">
						{variantIcon[options.variant] && <Icon color="inherit">{variantIcon[options.variant]}</Icon>}
						<Typography className="mx-8">{options.message}</Typography>
					</div> 
				}
				/* action={[
					<IconButton key="close" aria-label="Close" color="inherit" onClick={() => dispatch(hideMessage())}>
						<Icon>close</Icon>
					</IconButton>
				]} */
			/>
		</Snackbar>
	);
}

export default React.memo(FuseMessage);

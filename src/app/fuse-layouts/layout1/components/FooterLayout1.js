import AppBar from '@material-ui/core/AppBar';
import { ThemeProvider } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { useSelector } from 'react-redux';
import { selectFooterTheme } from 'app/store/fuse/settingsSlice';
import { makeStyles } from '@material-ui/core/styles';
 
const useStyles = makeStyles(theme => ({
	footer: {
		fontFamily: 'Poppins',
		textAlign: 'center'
	},
	h3: {
		fontFamily: 'Poppins',
		display: 'flex',
		justifyContent: 'center',
		alignContent: 'center'
	}
}));

function FooterLayout1(props) {
	const classes = useStyles(props);
	const footerTheme = useSelector(selectFooterTheme);
	var today = new Date();
	var year = today.getFullYear();
	

	return (
		<div>
			<ThemeProvider theme={footerTheme}>
				<AppBar id="fuse-footer" className="relative z-10" color="white">
					<Toolbar className={classes.h3}>
						<h3><strong>©Club LIA Comunidad {year}</strong></h3>
					</Toolbar>
				</AppBar> 
			</ThemeProvider>
		</div>
	);
}

export default React.memo(FooterLayout1);

import FuseSearch from '@fuse/core/FuseSearch';
import FuseShortcuts from '@fuse/core/FuseShortcuts';
import AppBar from '@material-ui/core/AppBar';
import Hidden from '@material-ui/core/Hidden';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import NavbarMobileToggleButton from 'app/fuse-layouts/shared-components/NavbarMobileToggleButton';
import UserMenu from 'app/fuse-layouts/shared-components/UserMenu';
import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectToolbarTheme } from 'app/store/fuse/settingsSlice';
import SearchInfo from './SearchInfo';
import { search } from 'superagent';
 
const useStyles = makeStyles(theme => ({
	root: {},
	navbar: {
		display: 'flex',
		justifyContent: 'end',
		padding: '0px',
		width: '100%'
	},
	divInput: {
		left: '0px',
		width: '100%'
	},
	input: {
		width: '100%',
		right: '80%'
	}
}));

function ToolbarLayout1(props) {
	const config = useSelector(({ fuse }) => fuse.settings.current.layout.config);
	const toolbarTheme = useSelector(selectToolbarTheme);
	const classes = useStyles(props);
	const [bandera, setBandera] = useState(true);
	var search = "dato";

	useEffect(()=> {
		search = window.location.href;
		if(search.toLowerCase().slice('/apps/eventscalendar')) {
			setBandera(false);
		}else{
			setBandera(true);
		}
	}, []);

	return (
		<ThemeProvider theme={toolbarTheme}>
			<AppBar
				id="fuse-toolbar"
				className={clsx(classes.root, 'flex relative z-10')}
				color="default"
				style={{ backgroundColor: toolbarTheme.palette.background.paper }}
				elevation={2}
			>
				<Toolbar className={classes.navbar}>
					{config.navbar.display && config.navbar.position === 'left' && (
						<Hidden lgUp>
							<NavbarMobileToggleButton className="w-48 h-48 p-0" />
						</Hidden>
					)}

					{/* <div className="flex flex-1">
						<Hidden mdDown>
							<FuseShortcuts className="px-16" />
						</Hidden>
					</div> */} 

					<div className='text-center w-full inputSearch'>
						<SearchInfo className={classes.input} />						
					</div>
					<div className="flex items-rigth px-16">
						{/*<LanguageSwitcher />*/}

						{/*<FuseSearch />*/}

						{/* <QuickPanelToggleButton /> */}

						<UserMenu />
					</div>

					{/* {config.navbar.display && config.navbar.position === 'right' && (
						<Hidden lgUp>
							<NavbarMobileToggleButton />
						</Hidden>
					)} */}
				</Toolbar>
			</AppBar>
		</ThemeProvider>
	);
}

export default React.memo(ToolbarLayout1);

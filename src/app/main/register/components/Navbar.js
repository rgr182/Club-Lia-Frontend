import AppBar from '@material-ui/core/AppBar';
import Hidden from '@material-ui/core/Hidden';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import NavbarMobileToggleButton from 'app/fuse-layouts/shared-components/NavbarMobileToggleButton';
import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectToolbarTheme } from 'app/store/fuse/settingsSlice';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
	root: {},
	navbar: {
		display: 'flex',
		padding: '0px',
		width: '100%',
		'& .material-icons': {
			color: '#4457FF',
			fontWeight: 'bold'
		}
	},
	menuItem: {
		textDecoration: 'none !important',
		color: '#4457FF !important',
		'&:hover': {
			color: '#00b1ff !important'
		}
	},
	text: {
		fontSize: '16px',
		fontWeight: '700',
		fontFamily: 'poppins',
	},
	divInput: {
		left: '0px',
		width: '100%'
	},
	input: {
		width: '100%',
		right: '80%'
	},
	logo: {
		position: 'fixed',
		left: '50%',
		top: '47px',
		transition: '0.2s ease all',
		transform: 'translateX(-50%)'
	}
}));

function Navbar(props) {
	const config = useSelector(({ fuse }) => fuse.settings.current.layout.config);
	const toolbarTheme = useSelector(selectToolbarTheme);
	const classes = useStyles(props);
	const [bandera, setBandera] = useState(true);

	const [scrollPosition, setScrollPosition] = useState(0);
	const handleScroll = () => {
		const position = window.scrollY;
		setScrollPosition(position);
	};

	useEffect(() => {
		// firefox no soporta scroll: overlay
		const isFirefox = typeof InstallTrigger !== 'undefined';
		
		window.addEventListener("scroll", handleScroll);
		document.documentElement.style.height = 'auto';
		document.documentElement.style.overflow = isFirefox ? 'auto' : 'overlay';
		
		return () => {
			window.removeEventListener("scroll", handleScroll);
			// regresa los estilos a la normalidad cuando sales del componenete
			document.documentElement.style.height = '';
			document.documentElement.style.overflow = '';
		};
	}, []);

	return (
		<ThemeProvider theme={toolbarTheme}>
			<AppBar
				id="fuse-toolbar"
				className={clsx(classes.root, 'flex relative md:fixed z-10 navbar')}
				color="default"
				style={{ backgroundColor: toolbarTheme.palette.background.paper, zIndex: '999' }}
				elevation={2}
			>
				<Toolbar className={clsx(classes.navbar)}>
					<Hidden mdUp>
						<div className='flex justify-between w-full items-center'>
							<img className="m-28 w-80" src="assets/images/logos/clublia.png" alt="logo" />
							<NavbarMobileToggleButton className="w-48 h-48 p-0 mr-28" />
						</div>

					</Hidden>
					<Hidden smDown>
						<img 
							style={{ width: scrollPosition == 0 ? '120px' : '80px' }} 
							className={classes.logo} src="assets/images/logos/whitelia.png" 
							alt="logo" 
						/>
						<div className='flex m-28 justify-between w-full items-center'>
							<div className='flex'>
								<MenuItem
									className={classes.menuItem}
									style={{ backgroundColor: 'transparent' }}
									disableRipple
									component="a"
									href={process.env.REACT_APP_BRANDING_PAGE}
									>
									<Typography className={classes.text}>Padres</Typography>
								</MenuItem>
								<MenuItem
									className={classes.menuItem}
									style={{ backgroundColor: 'transparent' }}
									disableRipple
									component="a"
									href={process.env.REACT_APP_BRANDING_PAGE + "/maestros"}
								>
									<Typography className={classes.text}>Maestros</Typography>
								</MenuItem>
								<MenuItem
									className={classes.menuItem}
									style={{ backgroundColor: 'transparent' }}
									disableRipple
									component="a"
									href={process.env.REACT_APP_BRANDING_PAGE + "/escuelas"}
								>
									<Typography className={classes.text}>Escuelas</Typography>
								</MenuItem>
								<MenuItem
									className={classes.menuItem}
									style={{ backgroundColor: 'transparent' }}
									disableRipple
									component="a"
									href={process.env.REACT_APP_BRANDING_PAGE + "/quiero-apoyar"}
								>
									<Typography className={classes.text}>Quiero apoyar</Typography>
								</MenuItem>
							</div>
							<MenuItem
								className={classes.menuItem}
								style={{ backgroundColor: 'transparent' }}
								disableRipple
								component={Link} to="/login"
							>
								<Typography className={clsx(classes.text, 'flex items-rigth px-16')}>Acceso a la comunidad</Typography>
							</MenuItem>

						</div>
					</Hidden>
				</Toolbar>
			</AppBar>
		</ThemeProvider>
	);
}

export default React.memo(Navbar);

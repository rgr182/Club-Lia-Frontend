import * as React from 'react';
import Box from '@material-ui/core/Box';
import Drawer from '@material-ui/core/Drawer';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { useDispatch, useSelector } from 'react-redux';
import { navbarToggleMobile } from 'app/store/fuse/navbarSlice';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import clsx from 'clsx';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
    drawer: {
        '& .MuiDrawer-paper': {
            width: '90%',
        },
        /* '& .MuiDrawer-paperAnchorRight': {
        }, */
        '& .MuiTypography-body1': {
            fontSize: '15px',
            fontWeight: '700',
            fontFamily: 'poppins',
        }
    },
    listItem: {
        color: '#4457FF !important',
        textDecoration: 'none !important',
        '&:hover': {
            color: '#00b1ff !important'
        }
    }

}));

export default function TemporaryDrawer(props) {

    const mobileOpen = useSelector(({ fuse }) => fuse.navbar.mobileOpen);
    const dispatch = useDispatch();
    const classes = useStyles(props);

    const toggleDrawer = () => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        dispatch(navbarToggleMobile());
    };

    const list = () => (
        <Box
            //sx={{ width: 250 }}
            role="presentation"
            onClick={toggleDrawer()}
            onKeyDown={toggleDrawer()}
        >
            <div className='text-right m-16'>
                <Button onClick={toggleDrawer} style={{backgroundColor: 'transparent'}}>
                    <Icon style={{fontSize:'17px'}}>close</Icon>
                </Button>
            </div>
            <Divider />
            <List>
                <ListItem
                    button
                    disableRipple
                    className={classes.listItem}
                    style={{ backgroundColor: 'transparent' }}
                    component="a"
					href={process.env.REACT_APP_BRANDING_PAGE}
                >
                    <ListItemText primary={'Padres'} />
                </ListItem>
            </List>
            <Divider />
            <List>
                <ListItem
                    button
                    disableRipple
                    className={classes.listItem}
                    style={{ backgroundColor: 'transparent' }}
                    component="a"
					href={process.env.REACT_APP_BRANDING_PAGE + "/maestros"}
                >
                    <ListItemText primary={'Maestros'} />
                </ListItem>
            </List>
            <Divider />
            <List>
                <ListItem
                    button
                    disableRipple
                    className={classes.listItem}
                    style={{ backgroundColor: 'transparent' }}
                    component="a"
					href={process.env.REACT_APP_BRANDING_PAGE + "/escuelas"}
                >
                    <ListItemText primary={'Escuelas'} />
                </ListItem>
            </List>
            <Divider />
            <List>
                <ListItem
                    button
                    disableRipple
                    className={classes.listItem}
                    style={{ backgroundColor: 'transparent' }}
                    component="a"
					href={process.env.REACT_APP_BRANDING_PAGE + "/quiero-apoyar"}
                >
                    <ListItemText primary={'Quiero apoyar'} />
                </ListItem>
            </List>
            <Divider />
            <List>
                <ListItem
                    button
                    disableRipple
                    className={classes.listItem}
                    style={{ backgroundColor: 'transparent' }}
                    component={Link} to="/login"
                >
                    <ListItemText primary={'Acceso a la comunidad'} />
                </ListItem>
            </List>
            <Divider />
        </Box>
    );

    return (
        <div>
            <React.Fragment >
                <Drawer
                    anchor={'right'}
                    open={mobileOpen}
                    onClose={toggleDrawer()}
                    className={classes.drawer}
                >
                    {list()}
                </Drawer>
            </React.Fragment>
        </div>
    );
}

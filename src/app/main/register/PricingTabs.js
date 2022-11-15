import React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import PricingPapas from './type/PricingPapas'
import PricingMaestros from './type/PricingMaestros'
import PricingEscuelas from './type/PricingEscuelas'
import Button from '@material-ui/core/Button';
import reducer from './store';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import withReducer from 'app/store/withReducer';
import { getMemberships } from './store/pricingSlice';
import { useDeepCompareEffect } from '@fuse/hooks';

function PricingApp(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          <Typography>{children}</Typography>
          </Box>
      )}
      </div>
  );
}

PricingPapas.propTypes = {

  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    // width: 500,
  },
}));

export default function FullWidthTabs() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

	useDeepCompareEffect(() => {
		dispatch(getMemberships());
	}, [dispatch]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

	const Memberships = useSelector(({ PricingApp }) => PricingApp.pricing.memberships.response);

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="Padres" {...a11yProps(0)} />
          <Tab label="Maestros" {...a11yProps(1)} />
          <Tab label="Escuelas" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        {Memberships[0] ? 
            <PricingApp value={value} index={0} dir={theme.direction}>
                <PricingPapas price1={Memberships[0].price} price2={Memberships[1].price} price3={Memberships[2].price} />
            </PricingApp>
        :<></>}
        {Memberships[3] ? 
            <PricingApp value={value} index={1} dir={theme.direction}>
              <PricingMaestros price1={Memberships[3].price} price2={Memberships[4].price} price3={Memberships[5].price} />
            </PricingApp>
        :<></>}
        {Memberships[6] ? 
            <PricingApp value={value} index={2} dir={theme.direction}>
              <PricingEscuelas price1={Memberships[6].price} price2={Memberships[7].price} price3={Memberships[8].price} />
            </PricingApp>
        :<></>}
      </SwipeableViews>
    </div>
  );
}
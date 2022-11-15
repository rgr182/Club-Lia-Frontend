import NavLinkAdapter from '@fuse/core/NavLinkAdapter';
import FuseUtils from '@fuse/utils';
import Icon from '@material-ui/core/Icon';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { navbarCloseMobile } from 'app/store/fuse/navbarSlice';
import FuseNavBadge from '../FuseNavBadge';

const useStyles = makeStyles(theme => ({
	item: props => ({
		height: 50,
		width: 'calc(88%)',		
		marginRigth: "15px",
		marginLeft: "15px",
		marginBottom: '5px',
		'&.active': {
			backgroundColor: theme.palette.background.default,
			color: theme.palette.primary.main + ' !important',
			pointerEvents: 'none',
			transition: 'border-radius .15s cubic-bezier(0.4,0.0,0.2,1)',
			'& .list-item-text-primary': {
				color: 'inherit',
				marginLeft: "12px",
				fontFamily: "Poppins"
			},
			'& .list-item-icon': {

				filter: theme.palette.filter ? theme.palette.filter : 'invert(22%) sepia(13%) saturate(6%) hue-rotate(19deg) brightness(96%) contrast(103%)',
				marginRigth: "12px"		
			}
		},		
		'& .list-item-text': {
			marginLeft: '6px',
			fontFamily: `'grobold', 'rager'`	
		},
		color: theme.palette.text.primary,
		cursor: 'pointer',
		textDecoration: 'none!important',
	}),
	navbar: {
		height: '100px'
	}
}));

function FuseNavVerticalItem(props) {
	const userRole = useSelector(({ auth }) => auth.user.role);
	const dispatch = useDispatch();

	const theme = useTheme();
	const mdDown = useMediaQuery(theme.breakpoints.down('md'));
	const { item, nestedLevel } = props;
	const classes = useStyles({
		itemPadding: nestedLevel > 0 ? 40 + nestedLevel * 16 : 24
	});
	const { t } = useTranslation('navigation');
 
	const hasPermission = useMemo(() => FuseUtils.hasPermission(item.auth, userRole), [item.auth, userRole]);

	if (!hasPermission) {
		return null;
	} 

	return (
		<ListItem
			button
			component={NavLinkAdapter}
			to={item.url}
			activeClassName="active"
			className={clsx(classes.item, 'list-item')}
			onClick={ev => mdDown && dispatch(navbarCloseMobile())}
			exact={item.exact}
		>
			{item.icon && (
				<img width="18px" height="20px" src={item.icon} className="list-item-icon text-16 flex-shrink-0" color={item.color}/>
			)}
 
			<ListItemText
				className="list-item-text"
				primary={item.translate ? t(item.translate) : item.title}
				classes={{ primary: 'text-16 list-item-text' }}
			/>

			{item.badge && <FuseNavBadge badge={item.badge} />}
		</ListItem>
	);
}

FuseNavVerticalItem.propTypes = {
	item: PropTypes.shape({
		id: PropTypes.string.isRequired,
		title: PropTypes.string,
		icon: PropTypes.string,
		url: PropTypes.string
	})
};

FuseNavVerticalItem.defaultProps = {};

const NavVerticalItem = withRouter(React.memo(FuseNavVerticalItem));

export default NavVerticalItem;

import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setItemsUnstarred, setItemsStarred, removeItems } from './store/itemSlice';

function ItemsMultiSelectMenu(props) {
	const dispatch = useDispatch();
	const { selectedItemIds } = props;

	const [anchorEl, setAnchorEl] = useState(null);

	function openSelectedItemMenu(event) {
		setAnchorEl(event.currentTarget);
	}

	function closeSelectedItemsMenu() {
		setAnchorEl(null);
	}

	return (
		<>
			<IconButton
				className="p-0"
				aria-owns={anchorEl ? 'selectedItemsMenu' : null}
				aria-haspopup="true"
				onClick={openSelectedItemMenu}
			>
				<Icon>more_horiz</Icon>
			</IconButton>
			<Menu
				id="selectedItemsMenu"
				anchorEl={anchorEl}
				open={Boolean(anchorEl)}
				onClose={closeSelectedItemsMenu}
			>
				<MenuList>
					<MenuItem
						onClick={() => {
							dispatch(removeItems(selectedItemIds));
							closeSelectedItemsMenu();
						}}
					>
						<ListItemIcon className="min-w-40">
							<Icon>delete</Icon>
						</ListItemIcon>
						<ListItemText primary="Remove" />
					</MenuItem>
					<MenuItem
						onClick={() => {
							dispatch(setItemsStarred(selectedItemIds));
							closeSelectedItemsMenu();
						}}
					>
						<ListItemIcon className="min-w-40">
							<Icon>star</Icon>
						</ListItemIcon>
						<ListItemText primary="Starred" />
					</MenuItem>
					<MenuItem
						onClick={() => {
							dispatch(setItemsUnstarred(selectedItemIds));
							closeSelectedItemsMenu();
						}}
					>
						<ListItemIcon className="min-w-40">
							<Icon>star_border</Icon>
						</ListItemIcon>
						<ListItemText primary="Unstarred" />
					</MenuItem>
				</MenuList>
			</Menu>
		</>
	);
}

export default ItemsMultiSelectMenu;

import React, { useEffect, useState } from 'react';
import useStyles from './style';
import JwtService from 'app/services/jwtService';
import { useDispatch } from 'react-redux';
import { showMessage } from 'app/store/fuse/messageSlice';

const UserSelect = ({ navigateToRegister, selectedUsers, isMembership }) => {
	const classes = useStyles();
	const [childs, setChilds] = useState([]);
	const [indexTemp, setIndexTemp] = useState(0);
	const dispatch = useDispatch();
	const handleChangeCurrentUser = id => {
		const item = childs.findIndex(child => child.id === id);
		if (item !== -1){
			let _childs = [...childs];
			if (isMembership && indexTemp != item)
				_childs[indexTemp].selected = false;
			_childs[item].selected = !!!_childs[item].selected;
			setChilds(_childs);
			selectedUsers(_childs);
			setIndexTemp(item);
		}
	};
	const load = async () => {
		try {
			const res = await JwtService.getChilds();
			setChilds(res.data?.childs || []);
		} catch (error) {
			dispatch(showMessage({message:"Ha ocurrido un error los hijos registrados",variant: 'error'}));
			console.log('>>: error > ', error)
		}
	};
	useEffect(() => {
		load();
	}, []);

	return (
		<>
			<section className={classes.container}>
				<h2 className={classes.subtitle}>Elige uno o varios hijos</h2>
				<main className={classes.users}>
					{childs.map(user => (
						(!isMembership || user.role_id == '34') &&
						<button
							type="button"
							key={user.id}
							className={classes.userContainer}
							onClick={() => handleChangeCurrentUser(user.id)}
						>
							<div className={`${classes.user} ${user.selected ? 'selected' : ''}`}>
								<img
									src="assets/images/logos/check.svg"
									alt="check"
									className={`${classes.notification} ${user.selected ? 'selected' : ''}`}
								/>
								<img
									src={user.avatar_path || 'assets/images/avatars/bootFace.png'}
									alt={user.name}
									className={`${classes.avatar} ${user.selected ? 'selected' : ''}`}
								/>
							</div>
							<span className={classes.name}>{`${user.name} ${user.last_name}`}</span>
						</button>
					))}
					<button type="button" className={classes.userContainer} onClick={navigateToRegister}>
						<p className={`${classes.user} ${'newUser'}`}>+</p>
						<span className={classes.name}>Agregar usuario</span>
					</button>
				</main>
			</section>
		</>
	);
};

export default UserSelect;

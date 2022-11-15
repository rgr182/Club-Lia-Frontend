import React, { useCallback, useState } from 'react';
import { Redirect, useHistory } from 'react-router';
import useStyles from './styles';
import useCustomForm from './hooks/useCustomForm';
import useMembership from './hooks/useMembership';
import useUsers from './hooks/useUsers';
import PageCard from '../pageCard/PageCard';
import Header from './components/Header/Header';
import UserSelect from '../UserSelect/UserSelect';
import RegisterForm from '../FormChildRegister/RegisterForm/RegisterForm';
import { initialFormState } from '../FormChildRegister/formConfig';
import PriceFooter from '../FormChildRegister/PriceFooter/PriceFooter';
import JwtService from 'app/services/jwtService';
import { useDispatch } from 'react-redux';
import { showMessage } from 'app/store/fuse/messageSlice';

const MembershipForm = () => {
	const classes = useStyles();
	const [childs, setChilds] = useState([]);
	const dispatch = useDispatch();
	const history = useHistory();
	const { currentMembership, isRegister, navigateRegister } = useMembership();
	const { currentUsers, selectUser, hasSelected, currentActive } = useUsers();
	const { form, handleChange, isValidSend, changeSendValid, setForm } = useCustomForm(
		[initialFormState],
	);
	const selectedUsers = useCallback((users) => {
		setChilds(users || []);
	}, [childs]);
	
	const handleSubmit = useCallback(async () => {
		try {
			localStorage.removeItem('id_order');
			if(isRegister){
				await JwtService.saveChilds({
					membership: currentMembership,
					childs: form
				}).then(res => {
					if (res.status == 'Success' && res.data) {
						if (res.data.order) {
							localStorage.setItem('id_order', res.data.order);
							window.open(res.data.init_point, "_self");
						} else {
							dispatch(showMessage({message: res.data, variant: 'error'}));
						}
					}
				}).catch(error => {
					console.log('>>: error > ', error);
					if (error.response && error.response.data.message.msg) {
						dispatch(showMessage({message: error.response.data.message.msg, variant: 'error'}));
					} else {
						dispatch(showMessage({message: 'Ha ocurrido un error!', variant: 'error'}));
					}
				});
			}else{
				const _childs = childs.filter(element => element.selected);
				await JwtService.saveBoosterMembership({
					childs: _childs,
					membership: currentMembership
				}).then(res => {
					if (res.status == 'Success' && res.data) {
						console.log(res.data);
						if (res.data.order) {
							localStorage.setItem('id_order', res.data.order);
							window.open(res.data.init_point, "_self");
						} else {
							dispatch(showMessage({message: res.data, variant: 'error'}));
						}
					}
				}).catch(error => {
					console.log('>>: error > ', error);
					dispatch(showMessage({message: error.response?.data?.message?.msg || 'Disculpe, ha ocurrido un error', variant: 'error'}));
				});
			}
		} catch (error) {
			dispatch(showMessage({message: error.response?.data?.msg || 'Disculpe, ha ocurrido un error',variant: 'error'}));
			console.log('>>: error > ', error)
		}
	}, [currentMembership, childs, isRegister, form]);

	if (!currentMembership) return <Redirect to="/apps/products/membresias" />;
	return (
		<PageCard>
			<h1>Adquiere una membresía de reforzamiento</h1>
			<Header

			/>
			{isRegister ? (
				<RegisterForm
					form={form}
					handleChange={handleChange}
					isValidSend={isValidSend}
					changeSendValid={changeSendValid}
					setForm={setForm}
					price={currentMembership.price}
					isMembership
				/>
			) : (
				<UserSelect
					navigateToRegister={navigateRegister}
					changeSendValid={changeSendValid}
					currentUsers={currentUsers}
					selectUser={selectUser}
					hasSelected={hasSelected}
					selectedUsers={selectedUsers}
					isMembership
				/>
			)}
			<PriceFooter
				quantity={isRegister ? form.length : currentActive}
				value={currentMembership.price}
				title={`Membresía ${currentMembership.name}`}
			/>
			<footer className={classes.footer}>
				{/* disabled={!childs.length && !!currentMembership} */}
				<button onClick={handleSubmit} className={classes.submit}>
					Continuar
				</button>
			</footer>
		</PageCard>
	);
};

export default MembershipForm;

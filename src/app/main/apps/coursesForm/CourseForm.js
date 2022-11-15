import React, { useCallback, useEffect, useLayoutEffect, useMemo, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import {useDispatch} from 'react-redux';
import useStyles from './styles';
import PageCard from '../pageCard/PageCard';
import Header from './components/Header/Header';
import UserSelect from '../UserSelect/UserSelect';
import RegisterForm from '../FormChildRegister/RegisterForm/RegisterForm';
import useCustomForm from './hooks/useCustomForm';
import { initialFormState } from '../FormChildRegister/formConfig';
import CourseCard from './components/CourseCard/CourseCard';
import useUsers from './hooks/useUsers';
import PriceFooter from '../FormChildRegister/PriceFooter/PriceFooter';
import JwtService from 'app/services/jwtService';
import { showMessage } from 'app/store/fuse/messageSlice';

const MembershipForm = () => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const { type: courseId } = useParams();
	const history = useHistory();
	const [currentCourse, setCurrentCourse] = useState(null);
	const [isRegister, setIsRegister] = useState(false);
	const [isCourse, setIsCourse] = useState(false);
	const [isDisabled, setIsDisabled] = useState(true);
	const [navigateRegister, setNavigateRegister] = useState('');
	const [childs, setChilds] = useState([]);
	const load = useCallback(async () => {
		try {
			const res = await JwtService.getStudentCourse(courseId);
			const _currentCourse = res?.data?.course || null;
			setIsCourse(history.location.pathname.includes('cursos'))
			if (!_currentCourse) {
				history.push('/apps/products/cursos');
			} else {
				setCurrentCourse(_currentCourse);
				setIsRegister(history.location.pathname.includes('new'));
				setNavigateRegister(`/apps/products/cursos/${_currentCourse?.id}/new`);
			}
		} catch (error) {
			dispatch(showMessage({message:"Ha ocurrido un error obteniendo el curso seleccionado",variant: 'error'}));
			console.log('>>: error > ', error);
		}
	}, [courseId, dispatch, showMessage]);
	useLayoutEffect(() => {
		load();
	}, [courseId]);
	const { currentUsers, selectUser, hasSelected, currentActive } = useUsers();
	
	const { form, handleChange, isValidSend, changeSendValid, setForm } = useCustomForm(
		[initialFormState],
		// handleSubmit
	);
	const handleNavigateRegister = useCallback(() => {
		history.push(navigateRegister);
	}, [navigateRegister]);

	const selectedUsers = useCallback(
		users => {
			setChilds(users || []);
		},
		[childs]
	);

	const handleSubmit = useCallback(async () => {
		try {
			localStorage.removeItem('id_order');
			if(isCourse && isRegister){
				await JwtService.saveCourseChilds({
					course: currentCourse,
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
					dispatch(showMessage({message: error.response?.data?.message?.msg || 'Disculpe, ha ocurrido un error', variant: 'error'}));
				});
			}else{
				const _childs = childs.filter(element => element.selected);
				await JwtService.saveBoosterMembersip({
					course: currentCourse,
					childs: _childs
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
					dispatch(showMessage({message: error.response?.data?.message?.msg || 'Disculpe, ha ocurrido un error', variant: 'error'}));
				});
			}	
		} catch (error) {
			dispatch(showMessage({message: error.response?.data?.msg || 'Disculpe, ha ocurrido un error',variant: 'error'}));
			console.log('>>: error > ', error)
		}
	}, [childs, form, currentCourse, isCourse, isRegister]);

	useEffect(() => {
		let _isDisabled = false;
		if(isCourse && isRegister){
			_isDisabled = !!currentCourse && !form.length;
		}else{
			const _childs = childs.filter(element => element.selected);
			_isDisabled = !_childs.length && !!currentCourse;
		}
		setIsDisabled(_isDisabled);
	}, [childs, form, currentCourse, isCourse, isRegister]);
	
	

	return (
		<PageCard>
			<h1>Adquiere un curso</h1>
			<Header />
			{!!currentCourse && <CourseCard course={currentCourse} />}
			{isRegister ? (
				<RegisterForm
					form={form}
					handleChange={handleChange}
					isValidSend={isValidSend}
					changeSendValid={changeSendValid}
					setForm={setForm}
					price={currentCourse?.price || 0}
				/>
			) : (
				<UserSelect
					navigateToRegister={handleNavigateRegister}
					changeSendValid={changeSendValid}
					currentUsers={currentUsers}
					selectUser={selectUser}
					hasSelected={hasSelected}
					selectedUsers={selectedUsers}
				/>
			)}
			<PriceFooter
				quantity={isRegister ? form.length : currentActive}
				value={currentCourse?.price || 0}
				title={currentCourse?.title || ''}
			/>
			<footer className={classes.footer}>
				{/* disabled={!childs.length && !!currentCourse} */}
				<button
					onClick={handleSubmit}
					className={classes.submit}
					// onClick={() => handleSubmitButtonDisable()}
					disabled={isDisabled}
					// disabled={handleSubmitButtonDisable}
				>
					Continuar
				</button>
			</footer>
		</PageCard>
	);
};

export default MembershipForm;

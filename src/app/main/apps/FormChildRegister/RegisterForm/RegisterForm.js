import { CheckboxFormsy } from '@fuse/core/formsy';
import Formsy from 'formsy-react';
import React from 'react';
import FormChildRegister from '../FormChildRegister';
import { initialFormState } from '../formConfig';
import PriceFooter from '../PriceFooter/PriceFooter';
import useStyles from './styles';

const RegisterForm = ({ form, handleChange, changeSendValid, setForm, price, isMembership }) => {
	const classes = useStyles();
	const addChild = () => setForm([...form, initialFormState]);

	const deleteChild = index => {
		const copyForm = [...form];
		copyForm.splice(index, 1);
		setForm(copyForm);
	};

	const terms = `${process.env.REACT_APP_BRANDING_PAGE}/terminos-y-condiciones/`;
	const privacy = `${process.env.REACT_APP_BRANDING_PAGE}/politica-de-privacidad/`;

	return (
		<Formsy className={classes.container}>
			<h2 className={classes.subtitle}>Registro</h2>
			<p className={classes.description}> Por favor, llena los siguientes campos con los datos</p>
			{form.map((_, index) => (
				<FormChildRegister
					key={index}
					content={form[index]}
					handleChange={handleChange(index)}
					changeSendValid={changeSendValid}
					hasDelete={form.length > 1}
					deleteChild={() => deleteChild(index)}
				/>
			))}
			{!isMembership &&
				<button type="button" onClick={addChild} className={classes.add}>
					<span>+</span> Añadir otro hijo
				</button>
			}
			<footer className={classes.footer}>
				<p>* Campos Obligatorios</p>
				<label className={classes.checkbox}>
					<CheckboxFormsy name="terms" />
					He leido y acepto los
					<a href={terms}> términos y condiciones</a>
				</label>
				<label className={classes.checkbox}>
					<CheckboxFormsy name="privacy" />
					He leido y acepto la
					<a href={privacy}> política de privacidad</a>
				</label>
			</footer>
		</Formsy>
	);
};

export default RegisterForm;

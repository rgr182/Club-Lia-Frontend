import React, { useRef } from 'react';
import Formsy from 'formsy-react';
import useStyles from './styles';
import { gradeOptions, handleSubmit } from './formConfig';
import FormTextField from '../FormUtils/FormTextField/FormTextFIeld';
import FormSelectField from '../FormUtils/FormSelectField/FormSelectField';
import FormMessage from '../FormUtils/FormMessage/FormMessage';

const FormChildRegister = ({ content, changeSendValid, handleChange, hasDelete = false, deleteChild }) => {
	const classes = useStyles();

	const { name, grade, level, lastName, email, username, password, password_confirmation } = content;

	const levels = gradeOptions.find(course => +course.value === +grade).level;

	return (
		<>
			<Formsy
				onValidSubmit={handleSubmit}
				onValid={() => changeSendValid(true)}
				onInvalid={() => changeSendValid(false)}
				className={classes.form}
			>
				<FormTextField label="Nombre(s)" name="name" value={name} handleChange={handleChange} required />
				<FormTextField
					label="Apellido(s)"
					name="lastName"
					value={lastName}
					handleChange={handleChange}
					required
				/>
				<FormSelectField
					label="Grado Escolar"
					name="grade"
					value={grade}
					handleChange={handleChange}
					options={gradeOptions}
				/>
				<FormSelectField
					label="Nivel Educativo"
					name="level"
					value={level}
					handleChange={handleChange}
					options={levels}
				/>
				<FormTextField
					label="Correo electronico (de tu hijo/a)"
					name="email"
					value={email}
					handleChange={handleChange}
					type="email"
					required
				/>
				<FormMessage> Recuerda: Para cada hijo el correo deberá ser distinto. </FormMessage>
				<FormTextField
					label="Crea un usuario para tu hijo/a"
					name="username"
					value={username}
					handleChange={handleChange}
					required
				/>
				<FormTextField
					label="Crea la contraseña"
					name="password"
					value={password}
					handleChange={handleChange}
					type="password"
					required
				/>
				<FormTextField
					label="Confirma la contraseña"
					name="password_confirmation"
					value={password_confirmation}
					handleChange={handleChange}
					type="password"
					passCheck={password}
					required
				/>
			</Formsy>

			{hasDelete && (
				<button type="button" onClick={deleteChild} className={classes.removeBtn}>
					Borrar
				</button>
			)}

			<hr className={classes.separator} />
		</>
	);
};

export default FormChildRegister;

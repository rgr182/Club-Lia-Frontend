import { includeSpecialCharacters } from '../../../../utils/helpers';

const hasSpecialCharacters = (_, str) => (str ? includeSpecialCharacters(str) : true);

const validations = {
	default: {
		validations: { minLength: 3, maxLength: 150 },
		errors: {
			minLength: 'Debe tener al menos 3 caracteres',
			maxLength: 'Debe tener como máximo 150 caracteres'
		}
	},
	text: {
		validations: { minLength: 3, maxLength: 150, hasSpecialCharacters },
		errors: {
			minLength: 'Debe tener al menos 3 caracteres',
			maxLength: 'Debe tener como máximo 150 caracteres',
			hasSpecialCharacters: 'No debe contener caracteres especiales'
		}
	},
	email: {
		validations: { isEmail: true },
		errors: { isEmail: 'Debe ser un email válido' }
	},
	password: {
		validations: { minLength: 6, maxLength: 20 },
		errors: { minLength: 'Debe tener al menos 6 caracteres', maxLength: 'Debe tener como máximo 20 caracteres' }
	},
	number: {
		validations: { isNumeric: true, maxLength: 10 },
		errors: {
			isNumeric: 'Debe ser un número válido',
			maxLength: 'Debe tener como máximo 10 caracteres'
		}
	}
};

const composeConfig = ({ type, passCheck }) => {
	const config = validations[type]
		? {
				validations: { ...validations.default.validations, ...validations[type].validations },
				errors: { ...validations.default.errors, ...validations[type].errors }
		  }
		: validations.default;

	if (passCheck) {
		return {
			validations: { ...config.validations, passCheck: (_, str) => str === passCheck },
			errors: { ...config.errors, passCheck: 'Las contraseñas no coinciden' }
		};
	}

	return config;
};

export default composeConfig;

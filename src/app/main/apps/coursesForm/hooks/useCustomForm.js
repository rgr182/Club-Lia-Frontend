import { useState } from 'react';

const useCustomForm = (initialFormState, handleSubmit) => {
	const [form, setForm] = useState(initialFormState);
	const [isValidSend, setIsValidSend] = useState(false);

	const changeSendValid = value => setIsValidSend(value);

	const customHandleChange = id => ({ target }, customName) => {
		if (customName) target.name = customName;
		const copyForm = [...form];
		copyForm[id] = { ...copyForm[id], [target.name]: target.value };

		setForm([...copyForm]);
	};

	return {
		form,
		handleChange: customHandleChange,
		isValidSend,
		changeSendValid,
		setForm
	};
};

export default useCustomForm;

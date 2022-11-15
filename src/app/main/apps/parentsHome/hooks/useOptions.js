import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import options from './options';

const useOptions = () => {
	const history = useHistory();
	const { option: optionInParams } = useParams();
	const currentOption = options.find(option => option.value === optionInParams);

	const changeOption = event => {
		const { value } = event.target;
		const selectedOption = options[value];
		history.push(`/apps/products/${selectedOption.value}`);
	};

	const optionPos = value => options.findIndex(option => option.value === value);

	return {
		options,
		currentOption,
		changeOption,
		optionPos
	};
};

export default useOptions;

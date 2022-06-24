import React, { useState } from 'react';

import './Form.scss';

const Form = props => {
	const [city, setCity] = useState('');
	const [showFormError, setShowFormError] = useState(false);

	const handleInputValidate = e => {
		setCity(e.target.value);
	};

	const handleSendRequest = () => {
		props.handlegeGetCityWeatcher(city);
		setCity('');
	};

	const handleValidateForm = () => {
		if (city.length < 3) {
			setShowFormError(true);
		} else {
			setShowFormError(false);
			handleSendRequest();
		}
	};

	return (
		<div className='form-wrapper'>
			<input
				type='text'
				className='form-wrapper__input'
				placeholder='City name'
				value={city}
				onChange={e => handleInputValidate(e)}
			/>
			<button className='form-wrapper__btn' onClick={handleValidateForm}>
				Search
			</button>

			{showFormError && (
				<p className='form-wrapper__error'>
					City name must have a minimum 3 characters
				</p>
			)}
		</div>
	);
};

export default Form;

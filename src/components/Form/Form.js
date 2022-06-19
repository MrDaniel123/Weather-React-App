import React, { useState } from 'react';

import './Form.scss';

const Form = props => {
	const [city, setCity] = useState('');

	const handleInputValidate = e => {
		setCity(e.target.value);
	};

	const handleSendRequest = () => {
		props.handlegeGetCityWeatcher(city);
		setCity('');
	};
	return (
		<div className='form-wrapper'>
			<input
				type='text'
				className='form-wrapper__input'
				placeholder='Wpisz miastio'
				value={city}
				onChange={e => handleInputValidate(e)}
			/>
			<button className='form-wrapper__btn' onClick={handleSendRequest}>
				Szukaj
			</button>
		</div>
	);
};

export default Form;

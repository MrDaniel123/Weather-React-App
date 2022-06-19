import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun } from '@fortawesome/free-solid-svg-icons';

import './HourTempInfo.scss';

const HourTempInfo = props => {
	return (
		<div className='hour-temp-info'>
			<FontAwesomeIcon icon={faSun} className='hour-temp-info__icon' />
			<h4 className='hour-temp-info__temp'>
				{props.temp}
				<span>&#8451;</span>
			</h4>
			<p className='hour-temp-info__hour'>{`${
				props.hour > 9 ? props.hour : `0${props.hour}`
			}:00:00`}</p>
		</div>
	);
};

export default HourTempInfo;

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun } from '@fortawesome/free-solid-svg-icons';
import { faCloudRain } from '@fortawesome/free-solid-svg-icons';
import { faCloudSun } from '@fortawesome/free-solid-svg-icons';

import './WeatcherDayInfo.scss';

const HourTempInfo = ({ weatcherInformation }) => {
	const temp = weatcherInformation.temperature;
	const hour = weatcherInformation.hour;
	const wind = weatcherInformation.wind * 3.6;
	const weatcherInfo = weatcherInformation.weatcher;

	const handleHangeIcon = () => {
		if (weatcherInfo === 'Rain') {
			return (
				<FontAwesomeIcon
					icon={faCloudRain}
					className='weatcher-day-info__icon'
				/>
			);
		} else if (weatcherInfo === 'Clear') {
			return (
				<FontAwesomeIcon icon={faSun} className='weatcher-day-info__icon' />
			);
		} else if (weatcherInfo === 'Clouds') {
			return (
				<FontAwesomeIcon
					icon={faCloudSun}
					className='weatcher-day-info__icon'
				/>
			);
		} else {
			//*TODO  Else options writting
			return (
				<FontAwesomeIcon
					icon={faCloudSun}
					className='weatcher-day-info__icon'
				/>
			);
		}
	};

	return (
		<div className='weatcher-day-info'>
			<p className='weatcher-day-info__hour'>{hour}:00</p>
			<p className='weatcher-day-info__temp'>{temp}&#8451;</p>
			{handleHangeIcon()}
			<p className='weatcher-day-info__wind'>{wind.toFixed(2)} km/h</p>
		</div>
	);
};

export default HourTempInfo;

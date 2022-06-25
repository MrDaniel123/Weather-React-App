import React, { useEffect, useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun } from '@fortawesome/free-solid-svg-icons';
import { faCloudRain } from '@fortawesome/free-solid-svg-icons';
import { faCloudSun } from '@fortawesome/free-solid-svg-icons';

import './WeatcherDayInfo.scss';

const HourTempInfo = ({ weatcherInformation }) => {
	const [iconColor, setIconColor] = useState();

	const temp = weatcherInformation.temperature;
	const hour = weatcherInformation.hour;
	const wind = weatcherInformation.wind * 3.6;
	const weatcherInfo = weatcherInformation.weatcher;

	useEffect(() => {
		if (weatcherInfo === 'Rain') {
			setIconColor({
				color: 'rgb(8 36 137)',
			});
		} else if (weatcherInfo === 'Clear') {
			setIconColor({
				color: 'rgb(255 224 0)',
			});
		} else if (weatcherInfo === 'Clouds') {
			setIconColor({
				color: 'rgb(108 108 108)',
			});
		}
	}, [weatcherInfo]);

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
			{console.log('Rerender ')}
			<p className='weatcher-day-info__hour'>{hour}:00</p>
			<p className='weatcher-day-info__temp'>{temp}&#8451;</p>
			<div className='weatcher-day-info__icon-wrapper' style={iconColor}>
				{handleHangeIcon()}
			</div>
			<p className='weatcher-day-info__wind'>{wind.toFixed(2)} km/h</p>
		</div>
	);
};

export default HourTempInfo;

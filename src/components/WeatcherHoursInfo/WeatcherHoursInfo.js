import React from 'react';

import HourTempInfo from '../HourTempInfo/HourTempInfo';

import './WeatcherHoursInfo.scss';

const WeatcherHoursInfo = props => {
	const showWeatcherHours = props.data.list.map(dateHour => {
		const timeNumbers = new Date(dateHour.dt * 1000);
		const hour = timeNumbers.getHours();

		const temperature = dateHour.main.temp;

		return (
			<HourTempInfo key={dateHour.dt_txt} hour={hour} temp={temperature} />
		);
	});

	return <div className='weatcher-hours-info-wrapper'>{showWeatcherHours}</div>;
};

export default WeatcherHoursInfo;

import React from 'react';

import WeatcherDayInfo from '../WeatcherDayInfo/WeatcherDayInfo';

import './WeatcherForNextDays.scss';

const WeatcherHoursInfo = ({ data }) => {
	const limitedDataArray = data.list.slice(0, 3);

	const weatcherDayInfoComponent = limitedDataArray.map(dataList => {
		let time = dataList.dt;
		let date = new Date(time * 1000);
		let hour = date.getHours() - 2;

		let tempInfo = {
			temperature: dataList.main.temp,
			hour: hour,
			weatcher: dataList.weather[0].main,
			wind: dataList.wind.speed,
		};
		return <WeatcherDayInfo weatcherInformation={tempInfo} key={dataList.dt} />;
	});

	return (
		<div className='weatcher-for-next-days'>{weatcherDayInfoComponent}</div>
	);
};

export default WeatcherHoursInfo;

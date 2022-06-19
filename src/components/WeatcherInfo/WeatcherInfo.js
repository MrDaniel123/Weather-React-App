import React from 'react';

import './WeatcherInfo.scss';

const WeatcherInfo = ({ data }) => {
	const dateBuilder = date => {
		let months = [
			'January',
			'February',
			'March',
			'April',
			'May',
			'June',
			'July',
			'August',
			'September',
			'October',
			'November',
			'December',
		];
		let days = [
			'Sunday',
			'Monday',
			'Tuesday',
			'Wednesday',
			'Thursday',
			'Friday',
			'Saturday',
		];

		const day = days[date.getDay()];
		const monthNumber = date.getDate();
		const month = months[date.getMonth()];
		const year = date.getFullYear();

		return `${day} ${monthNumber} ${month} ${year}`;
	};

	const { name, country } = data.city;

	const temperature = data.list[0].main.temp;
	const clouds = data.list[0].weather[0].main;

	return (
		<div className='weatcher-info'>
			<h2 className='weatcher-info__location'>
				{name} {country}
			</h2>
			<p className='weatcher-info__date'>{dateBuilder(new Date())}</p>
			<div className='weatcher-info__temperature'>
				{temperature}
				<span>&#8451;</span>
			</div>
			<p className='weatcher-info__clouds'>{clouds}</p>
		</div>
	);
};

export default WeatcherInfo;

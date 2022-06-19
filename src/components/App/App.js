import React, { useState, useEffect } from 'react';

import WeatcherInfo from '../../components/WeatcherInfo/WeatcherInfo';
import Form from '../Form/Form';
import WeatcherHoursInfo from '../WeatcherHoursInfo/WeatcherHoursInfo';
import LoadingCircle from '../LoadingCircle/LoadingCircle';

import './App.scss';

function App() {
	const [weatcherData, setWeatcherData] = useState();
	const [weatcherDataIsLoading, setWeatcherDataIsLoading] = useState();

	useEffect(() => {
		const getGeoPosition = () => {
			return new Promise((resolve, reject) => {
				const error = () => {
					resolve('GeoPosition Error');
				};

				const success = position => {
					let geolocation = [];
					geolocation.push(position.coords.latitude);
					geolocation.push(position.coords.longitude);
					resolve(geolocation);
				};
				navigator.geolocation.getCurrentPosition(success, error);
			});
		};

		const getWeatcherInfo = geolocation => {
			const [lat, lon] = geolocation;
			const options = {
				method: 'GET',
				headers: {
					'X-RapidAPI-Key':
						'270e9aff58msh4ff8379b029990cp185d1bjsn9aa76844ab72',
					'X-RapidAPI-Host': 'community-open-weather-map.p.rapidapi.com',
				},
			};

			fetch(
				`https://community-open-weather-map.p.rapidapi.com/forecast?units=metric&lat=${lat}&lon=${lon}&lang=pl`,
				options
			)
				.then(response => response.json())
				.then(response => {
					setWeatcherData(response);
					setWeatcherDataIsLoading(true);
				})
				.catch(err => {
					setWeatcherDataIsLoading(false);
					console.log('Error:', err);
				});
		};

		getGeoPosition()
			.then(response => {
				return getWeatcherInfo(response);
			})
			.catch(err => {
				console.log(err);
			});
	}, []);

	const handleGetWeatcherInOtcherCity = city => {
		const options = {
			method: 'GET',
			headers: {
				'X-RapidAPI-Key': '270e9aff58msh4ff8379b029990cp185d1bjsn9aa76844ab72',
				'X-RapidAPI-Host': 'community-open-weather-map.p.rapidapi.com',
			},
		};

		fetch(
			`https://community-open-weather-map.p.rapidapi.com/forecast?q=${city}&units=metric&lang=pl`,
			options
		)
			.then(response => response.json())
			.then(response => setWeatcherData(response))
			.catch(err => console.error(err));
	};

	const handlegeGetCityWeatcher = city => {
		handleGetWeatcherInOtcherCity(city);
	};

	return (
		<div className='app-wrapper'>
			<Form handlegeGetCityWeatcher={handlegeGetCityWeatcher} />
			{weatcherDataIsLoading ? (
				<WeatcherInfo data={weatcherData} />
			) : (
				<LoadingCircle />
			)}
			{weatcherDataIsLoading && <WeatcherHoursInfo data={weatcherData} />}
		</div>
	);
}

export default App;

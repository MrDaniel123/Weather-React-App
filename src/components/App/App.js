import React, { useState, useEffect } from 'react';

import WeatcherInfo from '../../components/WeatcherInfo/WeatcherInfo';
import Form from '../Form/Form';
import WeatcherHoursInfo from '../WeatcherHoursInfo/WeatcherHoursInfo';
import LoadingCircle from '../LoadingCircle/LoadingCircle';
import GeolocationInfo from '../GeolocationInfo/GeolocationInfo';

import './App.scss';

function App() {
	const [weatcherData, setWeatcherData] = useState();
	const [weatcherDataIsLoading, setWeatcherDataIsLoading] = useState();
	const [geolocationAllowet, setGeolocationAllowet] = useState(true);

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

			fetch(
				`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=afa8c092c0ac34e52fe43eb6523d07f6&units=metric`
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

		navigator.permissions
			.query({ name: 'geolocation' })
			.then(function (result) {
				if (result.state === 'granted') {
					setGeolocationAllowet(true);
					getGeoPosition()
						.then(response => {
							return getWeatcherInfo(response);
						})
						.catch(err => {
							console.log(err);
						});
				} else {
					setGeolocationAllowet(false);
				}
			});
	}, []);

	const handleGetWeatcherInOtcherCity = city => {
		console.log(city);

		fetch(
			`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=afa8c092c0ac34e52fe43eb6523d07f6&units=metric`
		)
			.then(response => response.json())
			.then(response => setWeatcherData(response))
			.then(response => console.log(response))
			.catch(err => console.error(err));
	};

	const handlegeGetCityWeatcher = city => {
		handleGetWeatcherInOtcherCity(city);
	};

	return (
		<div className='app-wrapper'>
			<Form handlegeGetCityWeatcher={handlegeGetCityWeatcher} />
			{!geolocationAllowet ? <GeolocationInfo /> : null}
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

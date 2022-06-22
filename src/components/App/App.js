import React, { useState, useEffect } from 'react';

import WeatcherInfo from '../../components/WeatcherInfo/WeatcherInfo';
import Form from '../Form/Form';
import WeatcherForNextDays from '../WeatcherForNextDays/WeatcherForNextDays';
import LoadingCircle from '../LoadingCircle/LoadingCircle';
import GeolocationInfo from '../GeolocationInfo/GeolocationInfo';
import WrongCityInfo from '../WrongCityInfo/WrongCityInfo';

import './App.scss';

function App() {
	const [weatcherData, setWeatcherData] = useState();
	const [weatcherDataIsLoading, setWeatcherDataIsLoading] = useState(false);
	const [geolocationAllowet, setGeolocationAllowet] = useState(true);
	const [wrongCityName, setWrongCityName] = useState(false);

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
			console.log(geolocation);

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
		fetch(
			`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=afa8c092c0ac34e52fe43eb6523d07f6&units=metric`
		)
			.then(response => response.json())
			.then(response => {
				if (response.cod !== '200') {
					return false;
				} else {
					return response;
				}
			})
			.then(response => {
				if (response) {
					setWrongCityName(false);
					setWeatcherData(response);
					setWeatcherDataIsLoading(true);
					setGeolocationAllowet(true);
				} else {
					setWrongCityName(true);
				}
			})
			.catch(err => console.error(err));
	};

	const handlegeGetCityWeatcher = city => {
		handleGetWeatcherInOtcherCity(city);
	};

	return (
		<div className='app-wrapper'>
			<Form handlegeGetCityWeatcher={handlegeGetCityWeatcher} />

			{!geolocationAllowet ? <GeolocationInfo /> : null}

			{wrongCityName ? <WrongCityInfo /> : null}

			{weatcherDataIsLoading ? (
				<WeatcherInfo data={weatcherData} />
			) : (
				<LoadingCircle />
			)}

			{weatcherDataIsLoading && <WeatcherForNextDays data={weatcherData} />}
		</div>
	);
}

export default App;

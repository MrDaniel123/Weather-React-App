import React, { useState, useEffect } from 'react';

import WeatcherInfo from '../../components/WeatcherInfo/WeatcherInfo';
import Form from '../Form/Form';
import WeatcherForNextDays from '../WeatcherForNextDays/WeatcherForNextDays';
import LoadingCircle from '../LoadingCircle/LoadingCircle';
import GeolocationInfo from '../GeolocationInfo/GeolocationInfo';
import WrongCityInfo from '../WrongCityInfo/WrongCityInfo';

import './App.scss';

import housePNG from '../../assets/House.png';
import treePNG from '../../assets/Tree.png';

const API_KEY = process.env.REACT_APP_API_KEY;

function App() {
	const [weatcherData, setWeatcherData] = useState();
	const [weatcherDataIsLoading, setWeatcherDataIsLoading] = useState(false);
	const [geolocationAllowet, setGeolocationAllowet] = useState(true);
	const [wrongCityName, setWrongCityName] = useState(false);

	const [backgroundStyle, setBackgroundStyle] = useState({
		background: `linear-gradient(
			179.7deg,
			rgba(255, 219, 126, 0) 0.26%,
			#c1c524 99.75%
		)`,
	});

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
				`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
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

	useEffect(() => {
		if (weatcherData) {
			if (weatcherData.list[0].weather[0].main === 'Clear') {
				setBackgroundStyle({
					background: `linear-gradient(179.7deg, rgb(195 181 147) 0.26%, rgb(165 169 26) 99.75%)`,
				});
			} else if (weatcherData.list[0].weather[0].main === 'Rain') {
				setBackgroundStyle({
					background: `linear-gradient(rgb(163 215 241) 0%, rgb(4 36 54) 81.33%)`,
				});
			} else if (weatcherData.list[0].weather[0].main === 'Clouds') {
				setBackgroundStyle({
					background: `linear-gradient(rgb(197 197 197) 0%, rgb(7 131 201) 81.33%)`,
				});
			}
		}
	}, [weatcherData]);

	const handleGetWeatcherInOtcherCity = city => {
		fetch(
			`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
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
		<div className='app-wrapper' style={backgroundStyle}>
			<Form handlegeGetCityWeatcher={handlegeGetCityWeatcher} />

			{!geolocationAllowet ? <GeolocationInfo /> : null}

			{wrongCityName ? <WrongCityInfo /> : null}

			{weatcherDataIsLoading ? (
				<WeatcherInfo data={weatcherData} />
			) : (
				<LoadingCircle />
			)}

			{weatcherDataIsLoading && <WeatcherForNextDays data={weatcherData} />}

			<div className='app-wrapper__image-wrap'>
				<img
					src={housePNG}
					alt='A house Draw'
					className='app-wrapper__house-img'
				/>
				<img
					src={treePNG}
					alt='A tree Draw'
					className='app-wrapper__tree-img'
				/>
			</div>
		</div>
	);
}

export default App;

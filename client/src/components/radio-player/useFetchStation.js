import { useEffect, useState } from 'react';

function useFetchStation(country) {
	const [stations, setStations] = useState(null);
	const [status, setStatus] = useState('idle');
	const [stationSearch, setStationSearch] = useState('');

	useEffect(() => {
		setStatus('loading');
		if (country !== '') {
			getStations();
		}

		async function getStations() {
			// query stations by country code and limit to first 200 stations
			await fetch(process.env.REACT_APP_API_URL + `${country}/${stationSearch}`)
				.then((res) => res.json())
				.then((data) => {
					setStations(data);
					setStatus('completed');
				});
		}
	}, [country, stationSearch]);

	return { stations, status, setStationSearch };
}

export default useFetchStation;

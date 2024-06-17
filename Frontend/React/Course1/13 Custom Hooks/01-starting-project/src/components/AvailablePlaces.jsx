import { useFetch } from '../hooks/useFetch.js';

import Places from './Places.jsx';
import Error from './Error.jsx';

import { sortPlacesByDistance } from '../loc.js';
import { fetchAvailablePlaces } from '../http.js';

// 데이터를 가져와 정렬하는 함수를 새로 만들어서 useFetch 커스텀 훅에 전달
async function fetchSortedPlaces() {
  const places = await fetchAvailablePlaces();

  // Promise로 변환해서 반환
  return new Promise((resolve) => {
    navigator.geolocation.getCurrentPosition((position) => {
      const sortedPlaces = sortPlacesByDistance(
        places,
        position.coords.latitude,
        position.coords.longitude
      );

      resolve(sortedPlaces);
    });
  });
}

export default function AvailablePlaces({ onSelectPlace }) {
  // const [isFetching, setIsFetching] = useState(false);
  // const [availablePlaces, setAvailablePlaces] = useState([]);
  // const [error, setError] = useState();

  const {
    isFetching,
    error,
    fetchedData: availablePlaces,
  } = useFetch(fetchSortedPlaces, []);

  if (error) {
    return <Error title="An error occurred!" message={error.message} />;
  }

  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      isLoading={isFetching}
      loadingText="Fetching place data..."
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}

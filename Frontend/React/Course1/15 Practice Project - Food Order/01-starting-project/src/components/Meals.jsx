import useHttp from '../hooks/useHttp';

import MealItem from './MealItem';
import Error from './Error';

const requestConfig = {};

function Meals() {
  const {
    data: loadedMeals,
    error,
    isLoading,
  } = useHttp('http://localhost:3000/meals', requestConfig, []);

  if (isLoading) return <p className="center">Fetching meals...</p>;

  if (error) return <Error title="Failed to fetch meals" message={error} />;
  // if (!data) return <p>No meals found.</p>;

  return (
    <ul id="meals">
      {loadedMeals.map((meal) => (
        <MealItem key={meal.id} meal={meal} />
      ))}
    </ul>
  );
}

export default Meals;

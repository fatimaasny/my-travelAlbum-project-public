import Places from "./Places";
import Error from "./Error";
import { fetchAvailablePlaces } from "../CallApi";

import { useFetch } from "../hooks/useFetch";

function AvailablePlaces({ onSelectPlace }) {
  const {
    isLoading,
    data: availablePlaces,
    error,
  } = useFetch(fetchAvailablePlaces);

  if (error) {
    return <Error title={"خطای اتصال به سرور"} message={error} />;
  }

  return (
    <Places
      title="مکان های دیدنی جذاب"
      places={availablePlaces}
      isLoading={isLoading}
      loadingText={"در حال دریافت اطلاعات از سرور......."}
      fallbackText="مکانی موجود نیست."
      onSelectPlace={onSelectPlace}
    />
  );
}

export default AvailablePlaces;

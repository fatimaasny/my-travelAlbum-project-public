import React, { useEffect, useState } from "react";
import Places from "./Places";
import Error from "./Error";
import { fetchAvailablePlaces } from "../CallApi";

function AvailablePlaces({ onSelectPlace }) {
  const [isLoading, setIsLoading] = useState(false);
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [error, setError] = useState();
  useEffect(() => {
    const fetchPlaces = async () => {
      setIsLoading(true);

      try {
        const places = await fetchAvailablePlaces();
        setAvailablePlaces(places);
      } catch (error) {
        setError("در اتصال به سرور خطایی رخ داده است.");
      }

      setIsLoading(false);
    };
    fetchPlaces();
  }, []);

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

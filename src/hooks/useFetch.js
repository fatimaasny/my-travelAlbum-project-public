import { useState, useEffect } from "react";

export function useFetch(apiFn) {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        const dataOfFetch = await apiFn();
        setData(dataOfFetch);
      } catch (error) {
        setError("در اتصال به سرور خطایی رخ داده است.");
      }

      setIsLoading(false);
    };
    fetchData();
  }, [apiFn]);

  return { isLoading, data, setData, error };
}

export function usePut(apiFn) {
  const [putData, setPutData] = useState([]);
  const [putError, setPutError] = useState();

  const sendData = async (body) => {
    try {
      const res = await apiFn(body);
      setPutData(res);
    } catch (error) {
      setPutError(
        "در ارسال اطلاعات به سرور خطایی رخ داده است، لطفا مجددا تلاش کنید."
      );
    }
  };
  return { putData, putError, setPutError, sendData };
}



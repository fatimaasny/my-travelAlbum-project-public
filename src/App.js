import "./App.css";

import { useEffect, useRef, useState } from "react";
import { updateUserPlaces, fetchUserPlaces } from "./CallApi";
import { useFetch } from "./hooks/useFetch";
import { usePut } from "./hooks/useFetch";

import imgTrip from "./images/trip.jpg";
import AvailablePlaces from "./components/AvailablePlaces";
import Modal from "./components/Modal";
import Error from "./components/Error";
import Places from "./components/Places";
import DeletePlace from "./components/DeletePlace";

function App() {
  const selectedPlace = useRef();
  // const [errorUpdatingPlaces, setErrorUpdatingPlaces] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // اینجا واسه اینه که ما از سرور مکان های منتخب رو که کاربر قبلا انتخاب کرده رو بگیریم که
  // با هر رفرش صفحه این مکان ها نپره چون صرفا توی استیت گذاشتن با رفرش صفحه میپره
  // توی بک اند ما واسه
  // user-places
  // هم یک
  // GET
  // داریم

  // این مخصوص places
  // هست
  const {
    isLoading,
    data: userPlaces,
    setData: setUserPlaces,
    error,
  } = useFetch(fetchUserPlaces);

  const { putData, putError, setPutError, sendData } = usePut(updateUserPlaces);

  const {
    // putData: deleteData,
    // putError: deleteError,
    // setPutError: setDeleteError,
    sendData: sendDeletedData,
  } = usePut(updateUserPlaces);

  const handleStartDeletePlace = (place) => {
    setIsModalOpen(true);
    selectedPlace.current = place;
  };

  const handleStopDeletePlace = () => {
    setIsModalOpen(false);
  };

  const handleSelectPlace = async (selectedPlace) => {
    // رویکرد 1
    // اول استیت لیست رو آپدیت میکنیم و خوشبینانه فکر میکنیم که احتمالا خطایی رخ نمیده
    // بعد میایم و توی سرور لیست رو آپدیت میکنیم با متد put

    // رویکرد 2
    // اول سرور رو آپدیت کرد لیستش رو
    // بعد اومد  استیت لیست  مکان ها رو اپدیت کرد

    try {
      // await updateUserPlaces([selectedPlace, ...userPlaces]); // api
      sendData([selectedPlace, ...userPlaces]);
      setUserPlaces((oldSelectedPlaces) => {
        if (!oldSelectedPlaces) {
          oldSelectedPlaces = [];
        }
        if (oldSelectedPlaces.some((place) => place.id === selectedPlace.id)) {
          return oldSelectedPlaces;
        }
        return [selectedPlace, ...oldSelectedPlaces];
      });
    } catch (error) {
      // setErrorUpdatingPlaces({
      //   message: error.message || "اطلاعات به درستی ثبت نشد.",
      // });

      setUserPlaces(userPlaces);
    }
  };

  function handleErrorUpdatingPlace() {
    // setErrorUpdatingPlaces(null);
    setPutError(null);
  }

  const handleDletePlace = async () => {
    try {
      // اول توی سرور آپدیت میکنیم لیست رو
      // await updateUserPlaces(
      //   userPlaces.filter((place) => place.id !== selectedPlace.current.id)
      // );
      sendDeletedData(
        userPlaces.filter((place) => place.id !== selectedPlace.current.id)
      );

      // بعد استیت لیست رو آپدیت میکنیم
      setUserPlaces((prevUserPlaces) =>
        prevUserPlaces.filter((place) => place.id !== selectedPlace.current.id)
      );
    } catch (error) {
      // setErrorUpdatingPlaces({
      //   message: error.message || "امکان حذف اطلاعات وجود ندارد.",
      // });
      // نیاز نیست چون
      // setDeleteError
      // رو داریم
    }

    setIsModalOpen(false);
  };
  if (error) {
    return <Error title="خطایی رخ داده است." message={error.message} />;
  }
  return (
    <>
      <Modal open={putError} onClose={handleErrorUpdatingPlace}>
        {putError && (
          <Error
            title="خطای اتصال به سرور..."
            message={putError.message}
            onConfirm={handleErrorUpdatingPlace}
          />
        )}
      </Modal>
      <Modal open={isModalOpen} onClose={handleStopDeletePlace}>
        <DeletePlace
          onConfirm={handleDletePlace}
          onCancle={handleStopDeletePlace}
        />
      </Modal>
      <div className="App">
        <header>
          <img src={imgTrip} className="logo" alt="trip image" />
          <h1 className="title">آلبوم سفر</h1>
          <p className="text">
            یک آلبوم از مکان هایی که دوست دارید به آن جا سفر کنید، برای خودتان
            بسازید.
          </p>
        </header>
        <main>
          {isLoading ? (
            <p>Loading Data . . . </p>
          ) : (
            <Places
              title="من دوست دارم سفر کنم به..."
              places={userPlaces}
              fallbackText="مکان هایی که دوست دارید را از بین مکان های زیر انتخاب کنید"
              onSelectPlace={handleStartDeletePlace}
            />
          )}

          <AvailablePlaces onSelectPlace={handleSelectPlace} />
        </main>
      </div>
    </>
  );
}

export default App;

import "./App.css";

import imgTrip from "./images/trip.jpg";
import AvailablePlaces from "./components/AvailablePlaces";
import Places from "./components/Places";
import { useRef, useState } from "react";
import { updateUserPlaces } from "./CallApi";

function App() {
  const selectedPlace = useRef();
  const [userPlaces, setUserPlaces] = useState([]);

  const handleSelectPlace = async (selectedPlace) => {
    // اول آپدیت کنیم مکان های انتخاب شده توسط یوزر رو
    setUserPlaces((oldSelectedPlaces) => {
      if (!oldSelectedPlaces) {
        // اگه خالی بود و هیچی توش نبود بزارش مساوی آرایه خالی
        oldSelectedPlaces = [];
      }
      if (oldSelectedPlaces.some((place) => place.id === selectedPlace.id)) {
        // روش یه حلقه بزنیم ببینیم حداقل یکی مثل این مکان توی لیست موجود هست
        // و اگه موجود بود دیگه اضافه اش نمیکنیم و همون لیست قبلی رو میفرستیم
        return oldSelectedPlaces;
      }
      // در نهایت میایم به اول لیست اضافه میکنیم مکان جدید رو و لیست قبلی رو کپی میکنیم.
      return [selectedPlace, ...oldSelectedPlaces];
    });
    // حالا بیایم و این مکان ها رو توی سرور ذخیره کنیم

    // await updateUserPlaces(userPlaces);
    await updateUserPlaces([selectedPlace, ...userPlaces]);
  };

  return (
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
        <Places
          title="من دوست دارم سفر کنم به..."
          places={userPlaces}
          fallbackText="مکان هایی که دوست دارید را از بین مکان های زیر انتخاب کنید"
        />
        <AvailablePlaces onSelectPlace={handleSelectPlace} />
      </main>
    </div>
  );
}

export default App;

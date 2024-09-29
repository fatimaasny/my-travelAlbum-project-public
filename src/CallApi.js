export async function fetchAvailablePlaces() {
  const response = await fetch("http://localhost:3000/places");
  if (!response.ok) {
    throw new Error("اطلاعات به درستی دریافت نشده است، مجددا تلاش کنید.");
  }
  const res = await response.json();
  return res.places;
}

export async function updateUserPlaces(places) {
  const response = await fetch("http://localhost:3000/user-places", {
    methed: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ places }),
  });
  if (!response.ok) {
    throw new Error("اطلاعات به درستی ثبت نشد، مجددا تلاش کنید.");
  }
  const res = await response.json();
  return res.message;
}

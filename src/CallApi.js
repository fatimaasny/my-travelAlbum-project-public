// لیست تمام مکان ها داخل سرور
export async function fetchAvailablePlaces() {
  const response = await fetch("http://localhost:3000/places");
  if (!response.ok) {
    throw new Error("اطلاعات به درستی دریافت نشده است، مجددا تلاش کنید.");
  }
  const res = await response.json();
  return res.places;
}

// لیست مکان های منتخب کاربر درون سرور
export async function fetchUserPlaces() {
  const response = await fetch("http://localhost:3000/user-places");
  if (!response.ok) {
    throw new Error("اطلاعات به درستی دریافت نشده است، مجددا تلاش کنید.");
  }
  const resData = await response.json();
  return resData.places;
}

// آپدیت لیست منتخب با
// اضافه شدن مکان مورد علاقه جدید : PUT
// یا
// بخاطر حذف مکان مورد علاقه : DELETE

export async function updateUserPlaces(places) {
  const response = await fetch("http://localhost:3000/user-places", {
    method: "PUT",
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

import { useEffect } from "react";
import styles from "./DeletePlace.module.css";
import TimeProgressBar from "./TimeProgressBar";

function DeletePlace({ onConfirm, onCancle }) {
  const TIMER = 3000;

  useEffect(() => {
    const timer = setTimeout(() => {
      onConfirm();
      //   بعد از گذشت 3 ثانیه اگه روی هیچ کدوم از دکمه ها نزنیم
      //   خودش میاد و حذف میکنه از سرور این مکان رو
    }, TIMER);
    return () => {
      clearTimeout(timer);
    };
  }, [onConfirm]);

  return (
    <div className={styles.content}>
      <h2>آیا مطمئن هستید؟</h2>
      <h4>آیا واقعا می‌خواهید این مکان را حذف کنید؟</h4>
      <div className={styles.buttons}>
        <button onClick={onConfirm}>بله مطمئنم</button>
        <button onClick={onCancle}>نه پشیمون شدم</button>
      </div>
      <TimeProgressBar timer={TIMER} />
    </div>
  );
}

export default DeletePlace;

import { useEffect } from 'react';

import ProgressBar from './ProgressBar.jsx';

const TIMER = 3000;

export default function DeleteConfirmation({ onConfirm, onCancel }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onConfirm();
    }, TIMER);

    return () => {
      clearTimeout(timer);
    };
  }, [onConfirm]);

  return (
    <div id="delete-confirmation">
      <h2>آیا مطمئن هستید؟</h2>
      <p>آیا واقعا می خواهید این مکان را حذف کنید؟</p>
      <div id="confirmation-actions">
        <button onClick={onCancel} className="button-text">
          نه پشیمون شدم
        </button>
        <button onClick={onConfirm} className="button">
          بله مطمئنم
        </button>
      </div>
      <ProgressBar timer={TIMER} />
    </div>
  );
}

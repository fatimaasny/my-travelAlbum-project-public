import styles from "./Error.module.css";

function Error(props) {
  return (
    <div className={styles.error}>
      <h3>{props.title}</h3>
      <p>{props.message}</p>
      <div className={styles.button}>
        <button onClick={props.onConfirm}>بستن</button>
      </div>
    </div>
  );
}

export default Error;

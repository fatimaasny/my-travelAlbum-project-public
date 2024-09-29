import styles from "./Places.module.css";
function Places({
  title,
  places,
  fallbackText,
  isLoading,
  loadingText,
  onSelectPlace,
}) {
  return (
    <section className={styles["places-category"]}>
      <h2>{title}</h2>
      {isLoading && <p className={styles["fallbak-text"]}>{loadingText}</p>}
      {!isLoading && places.length === 0 && (
        <p className={styles["fallbak-text"]}>{fallbackText}</p>
      )}
      {!isLoading && places.length > 0 && (
        <ul className={styles.places}>
          {places.map((place) => (
            <li key={place.id} className={styles["place-item"]}>
              <button
                onClick={() => {
                  onSelectPlace(place);
                }}
              >
                <img
                  src={`http://localhost:3000/${place.image.src}`}
                  alt={place.image.alt}
                />
                <h3>{place.title}</h3>
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default Places;

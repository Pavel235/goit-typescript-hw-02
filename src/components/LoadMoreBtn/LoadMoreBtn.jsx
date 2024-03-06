import styles from "./LoadMoreBtn.module.css";

export default function LoadMoreBtn({ handleClick }) {
  return (
    <button
      className={styles.buttonElement}
      type="button"
      onClick={handleClick}
    >
      Load more
    </button>
  );
}

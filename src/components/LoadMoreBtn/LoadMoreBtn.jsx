import styles from "./LoadMoreBtn.module.css";

export default function LoadMoreBtn({ handleClick, currentPage, allPages }) {
  return (
    <button
      className={styles.buttonElement}
      type="button"
      onClick={handleClick}
      disabled={currentPage > allPages}
    >
      Load more
    </button>
  );
}

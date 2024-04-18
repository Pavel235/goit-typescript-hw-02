import styles from "./LoadMoreBtn.module.css";
import { LoadMoreBtnProps } from "./LoadMoreBtn.types";

const LoadMoreBtn: React.FC<LoadMoreBtnProps> = ({
  handleClick,
  currentPage,
  allPages,
}) => {
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
};

export default LoadMoreBtn;

import styles from "./LoadMoreBtn.module.css";

interface LoadMoreBtnProps {
  handleClick: () => void;
  currentPage: number;
  allPages: number;
}

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

import styles from "./ImageCard.module.css";
import { Props } from "./ImageCard.types";

const ImageCard: React.FC<Props> = ({ image, onClick, imageData }) => {
  const handleClick = () => {
    onClick(imageData);
  };

  return (
    <div onClick={handleClick}>
      <img
        className={styles.imgElement}
        src={image.urls.small}
        alt={image.alt_description}
      />
    </div>
  );
};

export default ImageCard;

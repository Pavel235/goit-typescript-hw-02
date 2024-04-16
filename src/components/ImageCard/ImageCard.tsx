import styles from "./ImageCard.module.css";

interface Image {
  urls: {
    small: string;
  };

  alt_description: string;
}

interface ImageData {
  imageUrl: string;
  description: string;
  likes: number;
  location: string;
}

interface Props {
  image: Image;
  onClick: (data: ImageData) => void;
  imageData: ImageData;
}

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

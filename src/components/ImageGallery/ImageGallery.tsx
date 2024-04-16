import ImageCard from "../ImageCard/ImageCard";
import styles from "./ImageGallery.module.css";

interface ImageItem {
  id: number;
  urls: {
    regular: string;
  };
  alt_description: string;
  likes: number;
  user: {
    location: string;
  };
}

interface ImageData {
  imageUrl: string;
  description: string;
  likes: number;
  location: string;
}

interface Props {
  items: ImageItem[];
  onImageInfo: (data: ImageData) => void;
}

const ImageGallery: React.FC<Props> = ({ items, onImageInfo }) => {
  return (
    <ul className={styles.listOfImages}>
      {items.map((item) => (
        <li className={styles.listElement} key={item.id}>
          <ImageCard
            image={item}
            onClick={onImageInfo}
            imageData={{
              imageUrl: item.urls.regular,
              description: item.alt_description,
              likes: item.likes,
              location: item.user.location,
            }}
          />
        </li>
      ))}
    </ul>
  );
};

export default ImageGallery;

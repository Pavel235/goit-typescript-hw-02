import ImageCard from "../ImageCard/ImageCard";
import styles from "./ImageGallery.module.css";

export default function ImageGallery({ items }) {
  return (
    <ul className={styles.listOfImages}>
      {items.map((item) => (
        <li className={styles.listElement} key={item.id}>
          <ImageCard image={item} />
        </li>
      ))}
    </ul>
  );
}

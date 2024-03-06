import styles from "./ImageCard.module.css";

export default function ImageCard({ image, onClick, imageData }) {
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
}

import Modal from "react-modal";
import styles from "./ImageModal.module.css";

interface ImageData {
  imageUrl: string;
  description: string;
  likes: number;
  location?: string;
}

interface Props {
  isOpen: boolean;
  onRequestClose: () => void;
  imageData?: ImageData;
}

const ImageModal: React.FC<Props> = ({ isOpen, onRequestClose, imageData }) => {
  if (!imageData) {
    return ;
  }

  const { imageUrl, description, likes, location } = imageData;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      shouldCloseOnEsc={true}
      shouldCloseOnOverlayClick={true}
      className={styles.modalContent}
      overlayClassName={styles.overlay}
      closeTimeoutMS={400}
    >
      <img className={styles.imgElement} src={imageUrl} alt="modal-image" />
      <div className={styles.listBox}>
        <p className={styles.textElement}>Description: {description}</p>
        <p className={styles.textElement}>Likes: {likes}</p>
        {location && <p className={styles.textElement}>Location: {location}</p>}
      </div>
    </Modal>
  );
};

export default ImageModal;

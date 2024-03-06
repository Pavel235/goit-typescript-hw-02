import Modal from "react-modal";
import "./ImageModal.css";

export default function ImageModal({ isOpen, onRequestClose, imageData }) {
  if (!imageData) {
    return;
  }

  const { imageUrl, description, likes, location } = imageData;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      shouldCloseOnEsc={true}
      shouldCloseOnOverlayClick={true}
      className="modal-content"
      overlayClassName="overlay"
      closeTimeoutMS={400}
    >
      <img className="img-element" src={imageUrl} alt="modal-image" />
      <div className="list-box">
        <p className="text-element">Description: {description}</p>
        <p className="text-element">Likes: {likes}</p>
        {location && <p className="text-element">Location: {location}</p>}
      </div>
    </Modal>
  );
}

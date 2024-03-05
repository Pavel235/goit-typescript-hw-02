import Modal from "react-modal";

export default function ImageModal({ isOpen, onRequestClose, imageUrl }) {
  const customStyles = {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    content: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      border: "none",
      background: "none",
    },
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={customStyles}
    ></Modal>
  );
}

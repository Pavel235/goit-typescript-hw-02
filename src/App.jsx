import { useEffect, useRef, useState } from "react";
import "./App.css";
import SearchBar from "./components/SearchBar/SearchBar";
import searchPhotos from "./images-api";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import Loader from "./components/Loader/Loader";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import ImageModal from "./components/ImageModal/ImageModal";
import Modal from "react-modal";

function App() {
  const [photos, setPhotos] = useState([]);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImageData, setSelectedImageData] = useState(null);

  useEffect(() => {
    Modal.setAppElement(document.getElementById("root"));
  }, []);

  useEffect(() => {
    if (query === "") {
      return;
    }

    async function getImages() {
      try {
        setIsLoading(true);
        setError(false);
        const data = await searchPhotos(query, page);
        setPhotos((prevPhotos) => {
          return [...prevPhotos, ...data];
        });
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }

    getImages();
  }, [query, page]);

  useEffect(() => {
    if (page > 1 && !isLoading) {
      const screenHeight = window.innerHeight;

      const scrollHeight = screenHeight * 0.93;

      window.scrollBy({
        top: scrollHeight,
        behavior: "smooth",
      });
    }
  }, [page, isLoading]);

  const getPhotos = (newQuery) => {
    if (newQuery === query && page === 1) {
      return;
    }

    setQuery(newQuery);
    setPage(1);
    setPhotos([]);
  };

  const handlePages = () => {
    setPage(page + 1);
  };

  const openModal = (imageData) => {
    setSelectedImageData(imageData);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <SearchBar onSubmit={getPhotos} />
      {photos.length > 0 && (
        <ImageGallery items={photos} onImageInfo={openModal} />
      )}
      {error && <ErrorMessage />}
      {photos.length > 0 && !isLoading && (
        <LoadMoreBtn handleClick={handlePages} />
      )}
      {isLoading && <Loader />}
      <ImageModal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        imageData={selectedImageData}
      />
    </>
  );
}

export default App;

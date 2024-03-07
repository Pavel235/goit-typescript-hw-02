import { useEffect, useState } from "react";
import "./App.css";
import SearchBar from "./components/SearchBar/SearchBar";
import searchPhotos from "./images-api";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import Loader from "./components/Loader/Loader";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import ImageModal from "./components/ImageModal/ImageModal";
import Modal from "react-modal";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [photos, setPhotos] = useState([]);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImageData, setSelectedImageData] = useState(null);
  const [totalPages, setTotalPages] = useState(null);
  const [isSearchCompleted, setIsSearchCompleted] = useState(false);
  const [noMoreNotifications, setNoMoreNotifications] = useState(false);

  useEffect(() => {
    Modal.setAppElement(document.getElementById("root"));

    if (query === "") {
      return;
    }

    setIsSearchCompleted(false);

    setNoMoreNotifications(false);

    async function getImages() {
      try {
        setIsLoading(true);
        setError(false);
        const data = await searchPhotos(query, page, setTotalPages);

        setPhotos((prevPhotos) => {
          return [...prevPhotos, ...data];
        });
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
        setIsSearchCompleted(true);
      }
    }

    getImages();
  }, [query, page]);

  useEffect(() => {
    if (photos.length === 0 && totalPages === 0 && isSearchCompleted) {
      toast.info("Unfortunately, there are no photos for this request.", {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });

      setTotalPages(null);
    }

    if (
      totalPages !== null &&
      page > totalPages &&
      photos.length !== 0 &&
      isSearchCompleted &&
      !noMoreNotifications
    ) {
      toast.warn("Unfortunately, there are no more photos for this request.", {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });

      setNoMoreNotifications(true);
    }
  }, [page, isSearchCompleted, totalPages, photos, noMoreNotifications]);

  useEffect(() => {
    if (page > 1 && !isLoading) {
      const screenHeight = window.innerHeight;

      const scrollHeight = screenHeight * 0.88;

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
      {photos.length > 0 && !isLoading && !error && (
        <LoadMoreBtn
          handleClick={handlePages}
          currentPage={page}
          allPages={totalPages}
        />
      )}
      {isLoading && <Loader />}
      <ImageModal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        imageData={selectedImageData}
      />
      <ToastContainer />
    </>
  );
}

export default App;

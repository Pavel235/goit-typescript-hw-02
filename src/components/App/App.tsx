import { useEffect, useState } from "react";
import "./App.css";
import SearchBar from "../SearchBar/SearchBar";
import searchPhotos, { PhotoData } from "../../images-api";
import ImageGallery from "../ImageGallery/ImageGallery";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import ImageModal from "../ImageModal/ImageModal";
import Modal from "react-modal";
import { LoaderProps } from "../Loader/Loader.types";
import { ImageData } from "./App.types";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [photos, setPhotos] = useState<PhotoData[]>([]);
  const [query, setQuery] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedImageData, setSelectedImageData] = useState<ImageData | null>(
    null
  );
  const [totalPages, setTotalPages] = useState<number | null>(null);
  const [isSearchCompleted, setIsSearchCompleted] = useState<boolean>(false);
  const [noMoreNotifications, setNoMoreNotifications] =
    useState<boolean>(false);

  const loaderProps: LoaderProps = {
    visible: true,
    height: "96",
    width: "96",
    color: "grey",
    strokeWidth: "5",
    animationDuration: "0.75",
    ariaLabel: "rotating-lines-loading",
    wrapperStyle: {},
    wrapperClass: "styles.loaderElement",
  };

  useEffect(() => {
    Modal.setAppElement(document.getElementById("root") as HTMLElement);

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

    if (page > 1 && !isLoading) {
      const screenHeight = window.innerHeight;

      const scrollHeight = screenHeight * 0.88;

      window.scrollBy({
        top: scrollHeight,
        behavior: "smooth",
      });
    }
  }, [
    page,
    isSearchCompleted,
    totalPages,
    photos,
    noMoreNotifications,
    isLoading,
  ]);

  const getPhotos = (newQuery: string) => {
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

  const openModal = (imageData: ImageData) => {
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
      {photos.length > 0 && !isLoading && !error && totalPages !== null && (
        <LoadMoreBtn
          handleClick={handlePages}
          currentPage={page}
          allPages={totalPages}
        />
      )}
      {isLoading && <Loader {...loaderProps}/>}
      {selectedImageData !== null && (
        <ImageModal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          imageData={selectedImageData}
        />
      )}
      <ToastContainer />
    </>
  );
}

export default App;

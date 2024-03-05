import { useEffect, useRef, useState } from "react";
import "./App.css";
import SearchBar from "./components/SearchBar/SearchBar";
import searchPhotos from "./images-api";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import Loader from "./components/Loader/Loader";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";

function App() {
  const [photos, setPhotos] = useState([]);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

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

  return (
    <>
      <SearchBar onSubmit={getPhotos} />
      {photos.length > 0 && <ImageGallery items={photos} />}
      {error && <ErrorMessage />}
      {photos.length > 0 && !isLoading && (
        <LoadMoreBtn handleClick={handlePages} />
      )}
      {isLoading && <Loader />}
    </>
  );
}

export default App;

import { useRef } from "react";
import toast, { Toaster } from "react-hot-toast";
import styles from "./SearchBar.module.css";

export default function SearchBar({ onSubmit }) {
  const inputRef = useRef(0);

  const handleSubmit = (e) => {
    e.preventDefault();

    const inputValue = inputRef.current.value;

    if (inputValue.trim() === "") {
      toast.error("Please enter text to search images", {
        duration: 4000,
        position: "top-right",
      });
      return;
    }

    onSubmit(inputValue);
  };

  return (
    <header className={styles.headerElement}>
      <form onSubmit={handleSubmit}>
        <input
          className={styles.inputElement}
          ref={inputRef}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
        <button className={styles.buttonElement} type="submit">
          Search
        </button>
        <Toaster />
      </form>
    </header>
  );
}

import { FormEvent, useRef } from "react";
import toast, { Toaster } from "react-hot-toast";
import styles from "./SearchBar.module.css";

interface SearchBarProps {
  onSubmit: (query: string) => void;
}

export default function SearchBar({ onSubmit }: SearchBarProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const inputValue = inputRef.current?.value || "";

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

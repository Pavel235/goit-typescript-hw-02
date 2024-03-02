import { useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function SearchBar({ onSubmit }) {
  const inputRef = useRef(0);

  const handleSubmit = (e) => {
    e.preventDefault();

    let inputValue = inputRef.current.value;

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
    <header>
      <form onSubmit={handleSubmit}>
        <input
          ref={inputRef}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
        <button type="submit">Search</button>
        <Toaster />
      </form>
    </header>
  );
}

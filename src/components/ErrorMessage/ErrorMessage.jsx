import styles from "./ErrorMessage.module.css";

export default function ErrorMessage() {
  return (
    <b className={styles.textElement}>
      Something went wrong! Please reload the page!
    </b>
  );
}

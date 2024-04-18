import { RotatingLines } from "react-loader-spinner";
import styles from "./Loader.module.css";
import { Props } from "./Loader.types";

const Loader: React.FC<Props> = ({
  visible,
  height,
  width,
  color,
  strokeWidth,
  animationDuration,
  ariaLabel,
  wrapperStyle,
  wrapperClass,
}) => {
  return (
    <RotatingLines
      visible={true}
      height="96"
      width="96"
      color="grey"
      strokeWidth="5"
      animationDuration="0.75"
      ariaLabel="rotating-lines-loading"
      wrapperStyle={{}}
      wrapperClass={styles.loaderElement}
    />
  );
};

export default Loader;

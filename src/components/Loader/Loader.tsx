import { RotatingLines } from "react-loader-spinner";
import styles from "./Loader.module.css";

interface Props {
  visible: boolean;
  height: string;
  width: string;
  color: string;
  strokeWidth: string;
  animationDuration: string;
  ariaLabel: string;
  wrapperStyle: React.CSSProperties;
  wrapperClass: string;
}

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

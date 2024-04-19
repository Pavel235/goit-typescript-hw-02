import { RotatingLines } from "react-loader-spinner";
import styles from "./Loader.module.css";
import { LoaderProps } from "./Loader.types";

const Loader = <Props extends LoaderProps>({
  visible,
  ...rest
}: Props): JSX.Element => {
  return (
    <RotatingLines
      visible={true}
      {...rest}
      wrapperClass={styles.loaderElement}
    />
  );
};

export default Loader;

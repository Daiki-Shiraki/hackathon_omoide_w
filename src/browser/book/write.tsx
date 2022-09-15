import type { FunctionComponent } from "react";

import styles from "./css/write.module.css";

const Component: FunctionComponent<Props> = (props) => {
  const write = props.write;
  return <div className={styles.container}></div>;
};

export default Component;

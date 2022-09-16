import type { FunctionComponent } from "react";

import styles from "../css/title.module.css";

const Component: FunctionComponent = () => {
  return (
    <div className={styles.title}>
      <div className={styles.omoide}>想い出</div>
      <div className={styles.w}>W</div>
    </div>
  );
};

export default Component;

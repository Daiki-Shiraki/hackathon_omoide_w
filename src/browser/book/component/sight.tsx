import type { FunctionComponent } from "react";

import styles from "../css/sight.module.css";

type Props = {
  name: string;
};
const Component: FunctionComponent<Props> = (props) => {
  const name = props.name;

  return (
    <div className={styles.sight}>
      <div className={styles.name}>
        {name}
      </div>
    </div>
  );
};

export default Component;

import type { FunctionComponent } from "react";
import Action from "./component/action";
import Canvas from "./component/canvas";
import Sight from "./component/sight";

import styles from "./css/style.module.css";

const Component: FunctionComponent = () => {
  return (
    <div className={styles.container}>
      <div>
        <Sight />
      </div>
      <div>
        <Canvas />
      </div>
      <div>
        <Action />
      </div>
    </div>
  );
};

export default Component;

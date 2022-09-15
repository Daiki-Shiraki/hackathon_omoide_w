import { bookMode } from "@/types/book";
import type { FunctionComponent } from "react";

import styles from "../css/action.module.css";

type Props = {
  mode: bookMode;
  setMode: Function;
  getLocation: Function;
};
const Component: FunctionComponent<Props> = (props) => {
  const mode = props.mode;
  const setMode = props.setMode;
  const getLocation = props.getLocation;

  return (
    <div className={styles.action}>
      <div className={styles.mode}>
        {mode === "read" && ( //TODO 範囲外ならdisable
          <button onClick={() => setMode("write")}>書き込み</button>
        )}
        {mode === "write" && (
          <button onClick={() => setMode("read")}>閲覧に戻る</button>
        )}
      </div>
      <div className={styles.location}>
        <button onClick={() => getLocation()}>位置情報更新</button>
      </div>
    </div>
  );
};

export default Component;

//import { bookType } from "@/types/book";
import type { FunctionComponent } from "react";

import styles from "../css/switch.module.css";

type Props = {
  //type: bookType;
  limitBreak: boolean;
  setBook: Function;
};
const Component: FunctionComponent<Props> = (props) => {
  //const type = props.type;
  const limitBreak = props.limitBreak;
  const setBook = props.setBook;

  return (
    <div className={styles.switch}>
      <button onClick={() => setBook("unlimited")}>公開モード</button>
      <button onClick={() => setBook("limited")} disabled={!limitBreak}>
        限定モード
      </button>
    </div>
  );
};

export default Component;

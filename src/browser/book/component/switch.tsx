//import { bookType } from "@/types/book";
import type { FunctionComponent } from "react";

//import styles from "../css/name.module.css";

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
    <div>
        <button onClick={() => setBook("limited")}>公開モード</button>
        <button onClick={() => setBook("unlimited")} disabled={!limitBreak}>限定モード</button>
    </div>
    );
};

export default Component;
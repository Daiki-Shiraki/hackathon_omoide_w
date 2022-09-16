import { bookData } from "@/types/database";
import type { FunctionComponent } from "react";

import styles from "../css/card.module.css";

type Props = {
  data: bookData;
  odd: boolean;
};
const Component: FunctionComponent<Props> = (props) => {
  const name = props.data.name;
  const canvas = props.data.canvas;
  const odd = props.odd;
  const sightId = props.data.sight_ID;

  const redirectToBook = () => {
    window.location.href = `./book?id=${sightId}`;
  };

  return (
    <div className={odd ? styles.even : styles.odd}>
      <div className={styles.card} onClick={redirectToBook}>
        <img className={styles.ulb} src={canvas} />
        <div className={styles.name}>{name}</div>
      </div>
    </div>
  );
};

export default Component;

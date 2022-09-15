import { headlineData } from "@/types/home";
import type { FunctionComponent } from "react";

import styles from "../css/card.module.css";

type Props = {
  data: headlineData;
  odd: boolean;
};
const Component: FunctionComponent<Props> = (props) => {
  const name = props.data.name;
  const unlimitedBook = props.data.unlimitedBook;
  const odd = props.odd;

  return (
    <div className={odd ? styles.even : styles.odd}>
      <div className={styles.card}>
        <img className={styles.ulb} src={unlimitedBook} />
        <div className={styles.name}>{name}</div>
      </div>
    </div>
  );
};

export default Component;

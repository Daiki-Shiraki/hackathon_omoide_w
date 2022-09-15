import type { FunctionComponent } from "react";
import Search from "./search";
import Title from "./title";

import styles from "../css/header.module.css";

type Props = {
  setSearch: Function;
};
const Component: FunctionComponent<Props> = (props) => {
  const setSearch = props.setSearch;

  return (
    <div className={styles.header}>
      <div className={styles.title}>
        <Title />
      </div>
      <div className={styles.search}>
        <Search setSearch={setSearch} />
      </div>
    </div>
  );
};

export default Component;

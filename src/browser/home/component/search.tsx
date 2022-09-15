import { FunctionComponent } from "react";

import styles from "../css/search.module.css";

type Props = {
  setSearch: Function;
};
const Component: FunctionComponent<Props> = (props) => {
  const setSearch = props.setSearch;

  return (
    <div className={styles.search}>
      <input onChange={(e) => setSearch(e.target.value ?? "")} type="text" placeholder="名称で検索" />
    </div>
  );
};

export default Component;

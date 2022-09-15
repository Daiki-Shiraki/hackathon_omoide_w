import { FunctionComponent, useState } from "react";
import Header from "./component/header";
import Headline from "./component/headline";

import styles from "./css/style.module.css";

const Component: FunctionComponent = () => {
  const [searchParm, setSearchParm] = useState<string>("");

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Header setSearch={setSearchParm} />
      </div>
      <div className={styles.headline}>
        <Headline param={searchParm} />
      </div>
    </div>
  );
};

export default Component;

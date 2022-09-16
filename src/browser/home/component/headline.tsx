import { bookData } from "@/types/database";
import { FunctionComponent, useEffect, useState } from "react";
import { getRecent, getSearchResults } from "../script/api";
import Card from "./card";

import styles from "../css/headline.module.css";

type Props = {
  param: string;
};
const Component: FunctionComponent<Props> = (props) => {
  const param = props.param;
  const [data, setData] = useState<bookData[]>();

  useEffect(() => {
    (async () => {
      let ignore = false;
      if (param) {
        const data = await getSearchResults(param);
        if (!ignore) setData(data);
      } else {
        const data = await getRecent();
        if (!ignore) setData(data);
      }
      return () => {
        ignore = true;
      };
    })();
  }, [param]);

  return (
    <div className={styles.headline}>
      {data &&
        data.map((d, i) => {
          return <Card key={d.id} data={d} odd={!!(i % 2)} />;
        })}
    </div>
  );
};

export default Component;

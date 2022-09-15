import type { FunctionComponent } from "react";
import { useEffect, useState } from "react";
import Action from "./component/action";
import Canvas from "./component/canvas";
import Sight from "./component/sight";

import styles from "./css/style.module.css";
import { getData } from "./script/api";

const getParams = (urlParamStr: string) => {
  const data = urlParamStr.substring(1);
  const params = data.split("&").reduce((acc, param) => {
    const temp = param.split("=") as [string, string];
    return {
      ...acc,
      [temp[0]]: temp[1],
    };
  }, {});
  return params;
};

const Component: FunctionComponent = () => {
  const params = getParams(window.location.search) as { id: string };
  const [data, setData] = useState();
  useEffect(() => {
    const id = params.id;
    navigator.geolocation.getCurrentPosition(async (position) => {
      console.log(position);
      const coords = position.coords;
      const data = await getData(id, {
        latitude: coords.latitude,
        longitude: coords.longitude,
      });
      setData(data);
    });
  }, [params.id]);
  console.log(data);

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

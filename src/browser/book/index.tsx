import type { bookMode } from "@/types/book";
import type { initData } from "@/types/database";
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
  console.log(params);
  return params;
};

const Component: FunctionComponent = () => {
  const params = getParams(window.location.search) as { id: string };
  const [data, setData] = useState<initData>();
  const [mode, setMode] = useState<bookMode>("read");

  const getLocation = () => {
    if (!navigator.geolocation) {
      alert("位置情報が取得できませんでした");
      return;
    }
    const id = params.id;
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const coords = position.coords;
        const data = await getData(id, {
          latitude: coords.latitude,
          longitude: coords.longitude,
        });
        setData(data);
      },
      () => {
        alert("位置情報が取得できませんでした");
      }
    );
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(getLocation, []);

  return (
    <div className={styles.container}>
      <div className={styles.sight}>
        <Sight name={data?.sightName ?? ""} />
      </div>
      <div className={styles.canvas}>
        <Canvas write={mode === "write"} />
      </div>
      <div className={styles.action}>
        <Action mode={mode} setMode={setMode} getLocation={getLocation} />
      </div>
    </div>
  );
};

export default Component;

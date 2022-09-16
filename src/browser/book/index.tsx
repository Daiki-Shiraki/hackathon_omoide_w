import type { bookMode, bookType } from "@/types/book";
import type { initData } from "@/types/database";
import type { FunctionComponent } from "react";
import { useEffect, useState } from "react";
import Action from "./component/action";
import Canvas from "./component/canvas";
import Sight from "./component/sight";
import Switch from "./component/switch";

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
  const id = params.id;
  const [position, setPosition] = useState<[number, number]>([0, 0]);

  const [data, setData] = useState<initData>();
  const [mode, setMode] = useState<bookMode>("read"); //TODO default "read"
  const [book, setBook] = useState<bookType>("unlimited");

  const adaptData = async (pos: [number, number] = position) => {
    const data = await getData(id, {
      latitude: pos[0],
      longitude: pos[1],
    });
    setData(data);
  };

  const getLocation = () => {
    if (!navigator.geolocation) {
      alert("位置情報が取得できませんでした");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const coords = position.coords;
        setPosition([coords.latitude, coords.longitude]);
        await adaptData([coords.latitude, coords.longitude]);
      },
      () => {
        alert("位置情報が取得できませんでした");
        //setPosition([0, 0]);
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
      <div>
        <Switch limitBreak={!!data?.limitBreak} setBook={setBook} />
      </div>
      <div className={styles.canvas}>
        <Canvas
          key={data?.sightName}
          write={mode === "write"}
          limit={book}
          data={data}
          id={params.id}
          adaptData={adaptData}
        />
      </div>
      <div className={styles.action}>
        <Action
          mode={mode}
          setMode={setMode}
          getLocation={getLocation}
          limitBreak={!!data?.limitBreak}
        />
      </div>
    </div>
  );
};

export default Component;

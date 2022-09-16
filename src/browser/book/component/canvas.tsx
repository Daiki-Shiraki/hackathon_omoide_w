import { FunctionComponent, useState } from "react";
import type { bookType, bookMode } from "@/types/book";
import type { initData, bookData } from "@/types/database";
import React, { useRef } from "react";
// import Image1 from "../../images/image1.png";
import Image3 from "../../images/image3.png";

import styles from "../css/canvas.module.css";
import { postImg } from "../script/api";

const scale = 1 / 4;

//大きさ取得
// interface IProps {
//   width: number;
//   height: number;
// }

interface IRect {
  width: number;
  height: number;
  left: number;
  right: number;
  top: number;
  bottom: number;
}

type Props = {
  write: boolean;
  limit: bookType;
  data: initData | undefined;
  id: string;
  adaptData: Function;
};
const Component: FunctionComponent<Props> = (props) => {
  const write = props.write;
  const limit = props.limit;
  const data = props.data;
  const id = props.id;
  const adaptData = props.adaptData;

  // const [dataURI, setDataURI] = useState<string>(books![0]!.canvas); // DBから受け取った画像を格納
  const [dataURI, setDataURI] = useState<string>(data?.unlimitedBookData?.[0]?.canvas || Image3); // DBから受け取った画像を格納
  const [supportTouch, setSupportTouch] = useState<boolean>(false);

  //それ以前のキャンバス読み込み
  //デバイスの大きさ取得
  const [size, setSize] = useState<[number, number]>([0, 0]);

  let canvasRef = useRef<HTMLCanvasElement | null>(null);
  let mouseX: number | null = null;
  let mouseY: number | null = null;

  const getContext = (): CanvasRenderingContext2D => {
    const canvas: any = canvasRef.current;
    return canvas.getContext("2d");
  };

  const reset = (dataURI: string, width = size[0], height = size[1]) => {
    console.log("reset");
    const ctx = getContext();
    // ctx.clearRect(0, 0, width, height);
    ctx.clearRect(0, 0, width, height);
    const background = new Image();
    background.src = dataURI; // 画像のパスを指定
    background.onload = () => {
      const imgWidth = background.width;
      const imgHeight = background.height;
      const rate = Math.max(width / imgWidth, height / imgHeight);
      const w = imgWidth * rate;
      const h = imgHeight * rate;
      const x = (width - w) / 2;
      const y = (height - h) / 2;
      ctx.drawImage(background, x, y, w, h);
      // console.log("lo-",x,y,w,h);
    };
  };

  React.useEffect(() => {
    const uri = (limit === "limited" ? data?.unlimitedBookData?.[0]?.canvas : data?.limitedBookData?.[0]?.canvas) || Image3;
    console.log("読み込み", limit)
    setDataURI(uri)
    reset(dataURI)
  }, [limit])

  React.useEffect(() => {
    const supportTouch = "ontouchend" in document;
    setSupportTouch(supportTouch);
    const width = document.documentElement.clientWidth * scale;
    const height = document.documentElement.clientHeight * 0.8 * scale;
    setSize([width, height]);
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    if (!canvas) return;
    canvas.width = width;
    canvas.height = height;
    // 背景に画像を塗りつぶし
    reset(dataURI, width, height);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const DrawingLine = (clientX: number, clientY: number) => {
    const canvas: any = canvasRef.current;
    const rect: IRect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    // console.log("left,top=", rect.left, rect.top);
    Draw(~~(x * scale), ~~(y * scale));
  };

  //Mouseで描画開始
  const OnClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (e.button !== 0) {
      return;
    }
    DrawingLine(e.clientX, e.clientY);
    // console.log("onclick");
  };

  //Mouseで差分により描画
  const OnMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (e.buttons !== 1) {
      return;
    }
    DrawingLine(e.clientX, e.clientY);
    // console.log("onMove");
  };

  // 描画終了
  const DrawEnd = (_: React.MouseEvent<HTMLCanvasElement>) => {
    mouseX = null;
    mouseY = null;
    // console.log("DrawEnd");
  };

  const Draw = (x: number, y: number) => {
    const ctx = getContext();
    ctx.beginPath();
    ctx.globalAlpha = 1.0;
    if (mouseX === null || mouseY === null) {
      ctx.moveTo(x, y);
    } else {
      ctx.moveTo(mouseX, mouseY);
    }
    ctx.lineTo(x, y);
    ctx.lineCap = "round";
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#000000";
    ctx.stroke();
    mouseX = x;
    mouseY = y;
    // console.log("Draw");
  };

  //Touchで描画開始
  const OnTouch = (e: React.TouchEvent<HTMLCanvasElement>) => {
    const touchX = e.touches[0]?.clientX;
    const touchY = e.touches[0]?.clientY;
    if (!touchX || !touchY) return;
    DrawingLine(touchX, touchY);
    // console.log("ontouch");
  };

  //Touchで差分により描画
  const OnSwipe = (e: React.TouchEvent<HTMLCanvasElement>) => {
    const touchX = e.touches[0]?.clientX;
    const touchY = e.touches[0]?.clientY;
    if (!touchX || !touchY) return;
    DrawingLine(touchX, touchY);
    // console.log("onMove");
  };

  //描画終了
  const SwipeEnd = (_: React.TouchEvent<HTMLCanvasElement>) => {
    mouseX = null;
    mouseY = null;
    // console.log("SwipeEnd");
  };

  const Memory = async () => {
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    const tmp = canvas.toDataURL();
    await postImg(tmp, limit, id);
    await adaptData();
    reset(dataURI);
    //setDataURI(tmp);
    // console.log("limit=", limit);
  };

  //リセット or 違うノート設定用（？）
  return (
    <div className={styles.canvas}>
      <canvas
        id="canvas"
        onMouseDown={(e) => !supportTouch && write && OnClick(e)}
        onMouseMove={(e) => !supportTouch && write && OnMove(e)}
        onMouseUp={(e) => !supportTouch && write && DrawEnd(e)}
        onMouseOut={(e) => !supportTouch && write && DrawEnd(e)}
        onTouchStart={(e) => write && OnTouch(e)}
        onTouchMove={(e) => write && OnSwipe(e)}
        onTouchEnd={(e) => write && SwipeEnd(e)}
        ref={canvasRef}
      />
      {write && (
        <div className={styles.action}>
          <button onClick={() => reset(dataURI)}>リセット</button>
          <button onClick={Memory}>記録</button>
        </div>
      )}
    </div>
  );
};

export default Component;

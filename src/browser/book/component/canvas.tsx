import { FunctionComponent, useState } from "react";
import React, { useRef } from "react";
import Image1 from "../../images/image1.png";

import styles from "../css/canvas.module.css";

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
};
const Component: FunctionComponent<Props> = (props) => {
  const write = props.write;
  const [dataURI, setDataURI] = useState<string>(Image1); // DBから受け取った画像を格納

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

  const reset = (width = size[0], height = size[1]) => {
    console.log("reset");
    const ctx = getContext();
    // ctx.clearRect(0, 0, width, height);
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
    };
  };

  React.useEffect(() => {
    const width = document.documentElement.clientWidth;
    const height = document.documentElement.clientHeight * 0.8;
    setSize([width, height]);
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    if (!canvas) return;
    canvas.width = width;
    canvas.height = height;

    // 背景に画像を塗りつぶし
    reset(width, height);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //描画開始
  const OnClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (e.button !== 0) {
      return;
    }
    const canvas: any = canvasRef.current;
    const rect: IRect = canvas.getBoundingClientRect();
    const x = ~~(e.clientX - rect.left);
    const y = ~~(e.clientY - rect.top);
    Draw(x, y);
  };

  //差分により描画
  const OnMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (e.buttons !== 1) {
      return;
    }
    const canvas: any = canvasRef.current;
    const rect: IRect = canvas.getBoundingClientRect();
    const x = ~~(e.clientX - rect.left);
    const y = ~~(e.clientY - rect.top);
    Draw(x, y);
  };

  const DrawEnd = (_: React.MouseEvent<HTMLCanvasElement>) => {
    mouseX = null;
    mouseY = null;
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
    ctx.lineWidth = 10;
    ctx.strokeStyle = "#000000";
    ctx.stroke();
    mouseX = x;
    mouseY = y;
  };

  const Memory = () => {
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    const tmp = canvas.toDataURL();
    setDataURI(tmp);
    console.log("save", tmp);
  };

  //リセット or 違うノート設定用（？）
  return (
    <div className={styles.canvas}>
      <canvas
        id="canvas"
        onMouseDown={(e) => write && OnClick(e)}
        onMouseMove={(e) => write && OnMove(e)}
        onMouseUp={(e) => write && DrawEnd(e)}
        onMouseOut={(e) => write && DrawEnd(e)}
        ref={canvasRef}
      />
      {write && (
        <div className={styles.action}>
          <button onClick={() => reset()}>リセット</button>
          <button onClick={Memory}>記録</button>
        </div>
      )}
    </div>
  );
};

export default Component;

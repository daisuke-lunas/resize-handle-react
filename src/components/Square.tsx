import { useState } from "react";
import { Line } from "react-konva";
import ResizeHandle from "./ResizeHandle";

const Square = (props: any) => {
  const [isHover, setIsHover] = useState(false);

  const onHover = (evt: any) => {
    setIsHover(true);
  };

  const onLeave = () => {
    setIsHover(false);
  };

  return (
    <>
      <Line
        key={props.id + "-square-line"}
        id={props.id + "-square"}
        points={props.points}
        fill={props.fill}
        stroke={"#dcdcdc"}
        opacity={0.8}
        closed={true}
        onPointerEnter={onHover}
        onPointerLeave={onLeave}
      ></Line>
      <ResizeHandle
        key={props.id + "handle"}
        id={props.id + "handle"}
        points={props.points}
        show={isHover}
        onResizeEnd={props.onResizeEnd}
      ></ResizeHandle>
    </>
  );
};

export default Square;

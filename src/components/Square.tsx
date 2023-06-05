import { KonvaEventObject } from "konva/lib/Node";
import { useState } from "react";
import { Line } from "react-konva";
import ResizeHandle from "./ResizeHandle";

const Square = (props: any) => {
  const [isDragging, setDragging] = useState(false);
  const [isHover, setIsHover] = useState(false);

  const onDragStart = (evt: KonvaEventObject<DragEvent>) => {
    props.onDragStart(evt);
    setDragging(true);
  };

  const onDragEnd = (evt: KonvaEventObject<DragEvent>) => {
    props.onDragEnd(evt);
    setDragging(false);
  };

  const onHover = () => {
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
        stroke={isDragging ? "brack" : "#dcdcdc"}
        opacity={0.8}
        closed={true}
        draggable={true}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onPointerEnter={onHover}
        onPointerLeave={onLeave}
      ></Line>
      <ResizeHandle
        key={"handle"}
        id={"handle"}
        points={props.points}
        isHover={isHover}
      ></ResizeHandle>
    </>
  );
};

export default Square;

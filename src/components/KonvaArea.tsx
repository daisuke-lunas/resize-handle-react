import { KonvaEventObject } from "konva/lib/Node";
import React from "react";
import { Group, Layer, Stage } from "react-konva";
import Square from "./Square";

const KonvaArea = (props: any) => {
  const distributionLayer = React.useRef(null);
  const draggingLayer = React.useRef(null);

  const onDragStart = (evt: KonvaEventObject<DragEvent>) => {
    evt.target.moveTo(draggingLayer.current);
  };

  const onDragEnd = (evt: KonvaEventObject<DragEvent>) => {
    evt.target.moveTo(distributionLayer.current);
  };

  return (
    <div
      style={{
        width: props.width,
        height: props.height,
        margin: 16,
        border: "1px solid #dcdcdc",
      }}
    >
      <Stage width={props.width} height={props.height}>
        <Layer key="distribution-layer" ref={distributionLayer}>
          <Group key={"group"}>
            <Square
              key={"square"}
              id={"square"}
              points={[200, 200, 280, 200, 280, 280, 200, 280]}
              fill={"#89b717"}
              onDragStart={onDragStart}
              onDragEnd={onDragEnd}
            ></Square>
          </Group>
          <Group key={"group1"}>
            <Square
              key={"square1"}
              id={"square1"}
              points={[300, 200, 320, 200, 320, 260, 300, 260]}
              fill={"cyan"}
              onDragStart={onDragStart}
              onDragEnd={onDragEnd}
            ></Square>
          </Group>
        </Layer>
        <Layer key="dragging-layer" ref={draggingLayer}></Layer>
      </Stage>
    </div>
  );
};

export default KonvaArea;

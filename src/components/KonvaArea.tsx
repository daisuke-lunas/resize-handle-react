import { KonvaEventObject } from "konva/lib/Node";
import React, { useState } from "react";
import { Group, Layer, Line, Stage } from "react-konva";

const KonvaArea = (props: any) => {
  const distributionLayer = React.useRef(null);
  const draggingLayer = React.useRef(null);

  const [isDragging, setDragging] = useState(false);

  const onDragStart = (evt: KonvaEventObject<DragEvent>) => {
    evt.target.moveTo(draggingLayer.current);
    setDragging(true);
  };

  const onDragEnd = (evt: KonvaEventObject<DragEvent>) => {
    evt.target.moveTo(distributionLayer.current);
    setDragging(false);
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
      <Stage
        width={props.width}
        height={props.height}
        style={{ marginTop: "8px" }}
      >
        <Layer key="distribution-layer" ref={distributionLayer}>
          <Group key={"-group"}>
            <Line
              key={"line-key"}
              id={"line-id"}
              points={[200, 200, 280, 200, 280, 280, 200, 280]}
              fill={"#89b717"}
              stroke={isDragging ? "brack" : "#dcdcdc"}
              opacity={0.8}
              closed={true}
              draggable={true}
              onDragStart={onDragStart}
              onDragEnd={onDragEnd}
            ></Line>
          </Group>
        </Layer>
        <Layer key="dragging-layer" ref={draggingLayer}></Layer>
      </Stage>
    </div>
  );
};

export default KonvaArea;

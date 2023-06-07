import { KonvaEventObject } from "konva/lib/Node";
import React, { useState } from "react";
import { Layer, Stage } from "react-konva";
import Square from "./Square";
import { Shape, ShapeConfig } from "konva/lib/Shape";
import { Stage as Stg } from "konva/lib/Stage";

const KonvaArea = (props: any) => {
  const [squarePos, updateSquarePos] = useState([
    [200, 200, 280, 200, 280, 280, 200, 280],
    [300, 200, 320, 200, 320, 260, 300, 260],
  ]);
  const distributionLayer = React.useRef(null);
  const draggingLayer = React.useRef(null);

  const onDragStart = (evt: KonvaEventObject<DragEvent>, idx: number) => {
    evt.target.moveTo(draggingLayer.current);
  };

  const onDragEnd = (evt: KonvaEventObject<DragEvent>, idx: number) => {
    evt.target.moveTo(distributionLayer.current);
    updateSquarePos(
      squarePos.map((pos, i) => {
        if (i === idx) {
          return adjustPoints(evt.target);
        } else {
          return pos;
        }
      })
    );
  };

  const adjustPoints = (target: Shape<ShapeConfig> | Stg): number[] => {
    const x = target.attrs.x;
    // target.attrs.x = 0;
    const y = target.attrs.y;
    // target.attrs.y = 0;
    const oldPoints = target.attrs.points as number[];
    const newPoints = oldPoints.map((p, idx) => {
      if (idx % 2 === 0) {
        return p + x;
      } else {
        return p + y;
      }
    });
    target.attrs.points = newPoints;
    return newPoints;
  };

  const onResizeEnd = (points: number[], idx: number) => {
    updateSquarePos(
      squarePos.map((pos, i) => {
        if (i === idx) {
          return points;
        } else {
          return pos;
        }
      })
    );
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
          <Square
            key={"square"}
            id={"square"}
            points={squarePos[0]}
            fill={"#89b717"}
            onDragStart={(evt: KonvaEventObject<DragEvent>) =>
              onDragStart(evt, 0)
            }
            onDragEnd={(evt: KonvaEventObject<DragEvent>) => onDragEnd(evt, 0)}
            onResizeEnd={(points: number[]) => onResizeEnd(points, 0)}
          ></Square>

          <Square
            key={"square1"}
            id={"square1"}
            points={squarePos[1]}
            fill={"cyan"}
            onDragStart={(evt: KonvaEventObject<DragEvent>) =>
              onDragStart(evt, 1)
            }
            onDragEnd={(evt: KonvaEventObject<DragEvent>) => onDragEnd(evt, 1)}
            onResizeEnd={(points: number[]) => onResizeEnd(points, 1)}
          ></Square>
        </Layer>
        <Layer key="dragging-layer" ref={draggingLayer}></Layer>
      </Stage>
    </div>
  );
};

export default KonvaArea;

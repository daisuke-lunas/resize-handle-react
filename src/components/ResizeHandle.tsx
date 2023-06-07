import { KonvaEventObject } from "konva/lib/Node";
import { useState } from "react";
import { Circle, Group, Line } from "react-konva";

interface _props {
  id: string;
  points: number[];
  show: boolean;
  onResizeEnd?: () => void;
}

interface _coordinate {
  key: string;
  x: number;
  y: number;
}

const ResizeHandle = (props: _props) => {
  const [show, setShow] = useState(props.show);
  const [draggingKey, setDraggingKey] = useState("");

  const initCoordinateList = () => {
    const list: _coordinate[] = [];
    props.points.forEach((point, idx) => {
      const i = Math.floor(idx / 2);
      if (idx % 2 === 0) {
        // 偶数番目 == X座標、かつ、まだ座標を入れてない
        list[i] = {
          x: point,
          key: props.id + "-hdl-" + idx,
        } as _coordinate;
      } else {
        // 奇数番目 == Y座標、かつ、もうX座標は入ってる
        list[i].y = point;
      }
    });
    return list;
  };

  const [coordinatesList, setCoordinates] = useState(initCoordinateList());

  const onHover = (evt: any) => {
    setShow(true);
  };

  const onLeave = () => {
    setShow(false);
  };

  const onDragStart = (coordKey: string) => {
    // dragしている対象を特定
    setDraggingKey(coordKey);
    setShow(true);
  };

  const onDragMove = (evt: KonvaEventObject<DragEvent>) => {
    // ドラッグしている間、その線自体が動く描画
    const startIdx = coordinatesList.findIndex((c) => c.key === draggingKey);
    const start = coordinatesList[startIdx];
    const end =
      startIdx === coordinatesList.length - 1
        ? coordinatesList[0]
        : coordinatesList[startIdx + 1];
    const canMoveX = start.x === end.x;
    const circleX = (start.x + end.x) / 2;
    const circleY = (start.y + end.y) / 2;

    evt.target.attrs.x = canMoveX ? evt.target.attrs.x : circleX;
    evt.target.attrs.y = !canMoveX ? evt.target.attrs.y : circleY;
    setCoordinates(
      coordinatesList.map((cd) => {
        if (cd.key === start.key || cd.key === end.key) {
          cd.x = canMoveX ? evt.target.attrs.x : cd.x;
          cd.y = !canMoveX ? evt.target.attrs.y : cd.y;
          return cd;
        } else {
          return cd;
        }
      })
    );
    // ただし、X方向・Y方向のどちらに動いていいかは、制約する
    // 隣接している線にも伝達して、末端を合わせて伸ばす描画
  };

  const onDragEnd = (coordKey: string) => {
    setDraggingKey("");
    setShow(false);
    if (props.onResizeEnd) {
      props.onResizeEnd();
    }
  };

  return (
    <>
      {coordinatesList.map((coord, idx, list) => {
        const start = coord;
        const end = idx === list.length - 1 ? list[0] : list[idx + 1];
        return (
          <Group key={coord.key + "-grp"}>
            <Line
              key={coord.key + "-line"}
              points={[start.x, start.y, end.x, end.y]}
              stroke={props.show || show ? "red" : "transparent"}
              onPointerEnter={onHover}
              onPointerLeave={onLeave}
            ></Line>
            <Circle
              key={coord.key + "-cir"}
              x={(start.x + end.x) / 2}
              y={(start.y + end.y) / 2}
              radius={4}
              fill={props.show || show ? "red" : "transparent"}
              onPointerEnter={onHover}
              onPointerLeave={onLeave}
              draggable={true}
              onDragStart={() => onDragStart(coord.key)}
              onDragMove={onDragMove}
              onDragEnd={() => onDragEnd(coord.key)}
            ></Circle>
          </Group>
        );
      })}
    </>
  );
};

export default ResizeHandle;

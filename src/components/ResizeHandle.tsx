import { Circle, Group, Line } from "react-konva";

interface _props {
  id: string;
  points: number[];
  isHover: boolean;
}

interface _coordinate {
  key: string;
  x: number;
  y: number;
}

const ResizeHandle = (props: _props) => {
  const coordinatesList: _coordinate[] = [];
  props.points.forEach((point, idx) => {
    const i = Math.floor(idx / 2);
    if (idx % 2 === 0) {
      // 偶数番目 == X座標、かつ、まだ座標を入れてない
      coordinatesList[i] = {
        x: point,
        key: props.id + "-hdl-" + idx,
      } as _coordinate;
    } else {
      // 奇数番目 == Y座標、かつ、もうX座標は入ってる
      coordinatesList[i].y = point;
    }
  });
  // x,y座標をセットで取り出し、
  // その2点間の中間に、ハンドルを置く

  // そのハンドルはドラッグ＆ドロップできる

  // ドラッグしている間、その線自体が動く描画
  // ただし、X方向・Y方向のどちらに動いていいかは、制約する
  // 隣接している線にも伝達して、末端を合わせて伸ばす描画

  // このハンドル状にホバーした時だけ表示するオプション？

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
              stroke={props.isHover ? "red" : "transparent"}
            ></Line>
            <Circle
              key={coord.key + "-cir"}
              x={(start.x + end.x) / 2}
              y={(start.y + end.y) / 2}
              radius={4}
              fill={props.isHover ? "red" : "transparent"}
            ></Circle>
          </Group>
        );
      })}
    </>
  );
};

export default ResizeHandle;

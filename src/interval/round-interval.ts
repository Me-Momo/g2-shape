// 自定义 shape, 支持图片形式的气泡
import { registerShape, Types } from '@antv/g2';

/**
 * 处理 rect path 的 radius
 * @returns 返回矩形 path 的四个角的 arc 半径
 */
export function parseRadius(
  radius: number | number[],
  minLength: number
): number[] {
  let r1 = 0;
  let r2 = 0;
  let r3 = 0;
  let r4 = 0;
  if (Array.isArray(radius)) {
    if (radius.length === 1) {
      r1 = r2 = r3 = r4 = radius[0];
    } else if (radius.length === 2) {
      r1 = r3 = radius[0];
      r2 = r4 = radius[1];
    } else if (radius.length === 3) {
      r1 = radius[0];
      r2 = r4 = radius[1];
      r3 = radius[2];
    } else {
      r1 = radius[0];
      r2 = radius[1];
      r3 = radius[2];
      r4 = radius[3];
    }
  } else {
    r1 = r2 = r3 = r4 = radius;
  }

  // 处理 边界值
  if (r1 + r2 > minLength) {
    r1 = r1 ? minLength / (1 + r2 / r1) : 0;
    r2 = minLength - r1;
  }

  if (r3 + r4 > minLength) {
    r3 = r3 ? minLength / (1 + r4 / r3) : 0;
    r4 = minLength - r3;
  }

  return [r1 || 0, r2 || 0, r3 || 0, r4 || 0];
}

/**
 * 圆角、倒角的矩形 interval
 * @param condition 条件
 * @param style 样式: r1, r2, r3 从大到小
 */
export function registerRoundInterval(style: { radius: number | number[] }) {
  registerShape('interval', 'round-interval', {
    draw(cfg, container) {
      const points = cfg.points as Types.Point[];
      let path = [];
      path.push(['M', points[0].x, points[0].y]);
      path.push(['L', points[1].x, points[1].y]);
      path.push(['L', points[2].x, points[2].y]);
      path.push(['L', points[3].x, points[3].y]);
      path.push('Z');
      path = this.parsePath(path); // 将 0 - 1 转化为画布坐标

      const group = container.addGroup();
      const minLength = Math.min(
        path[2][1] - path[1][1],
        path[0][2] - path[1][2]
      );
      group.addShape('rect', {
        attrs: {
          x: path[1][1], // 矩形起始点为左上角
          y: path[1][2],
          width: path[2][1] - path[1][1],
          height: path[0][2] - path[1][2],
          fill: cfg.color,
          radius: parseRadius(style.radius, minLength)
        }
      });

      return group;
    }
  });
}

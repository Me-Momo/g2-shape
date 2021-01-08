// 自定义 shape, 支持图片形式的气泡
import { registerShape, Types } from '@antv/g2';

/**
 * 棒棒糖图
 * @param style
 */
export function registerLollipop(style: { radius?: number }) {
  registerShape('interval', 'lollipop', {
    draw(cfg, container) {
      console.info(cfg.customInfo);
      const group = container.addGroup();
      const points = cfg.points as Types.Point[];
      const { radius } = style;

      let path = [];
      path.push(['M', points[0].x, points[0].y]);
      path.push(['L', points[1].x, points[1].y]);
      path.push(['L', points[2].x, points[2].y]);
      path.push(['L', points[3].x, points[3].y]);
      path.push('Z');
      path = this.parsePath(path); // 将 0 - 1 转化为画布坐标
      const width = path[2][1] - path[1][1];
      //    const width = 5;
      const height = path[0][2] - path[1][2];
      // 矩形起始点为左上角
      const x = path[1][1];
      const y = path[1][2];
      const r = radius || (Math.min(width, height) / 2) * 1.5;

      group.addShape('rect', {
        attrs: {
          x, // 矩形起始点为左上角
          y: y,
          width,
          height,
          ...(cfg.defaultStyle || {}),
          fill: cfg.color
        }
      });
      group.addShape('circle', {
        attrs: {
          x: x + width / 2, // 矩形起始点为左上角
          y: y,
          r,
          ...(cfg.defaultStyle || {}),
          fill: cfg.color
        }
      });

      return group;
    }
  });
}

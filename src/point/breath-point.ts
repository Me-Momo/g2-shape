import { registerShape, Types } from '@antv/g2';

/**
 * 三层 circle 的心跳频率 point
 * @param condition 条件
 * @param style 样式: r1, r2, r3 从大到小
 */
export function registerBreathPoint(
  condition: (datum: Types.Datum) => boolean,
  style: {
    fill: string;
    fillOpacity?: number;
    r1: number;
    r2: number;
    r3: number;
  }
) {
  registerShape('point', 'breath-point', {
    draw(cfg, container) {
      const point = {
        x: Array.isArray(cfg.x) ? cfg.x[0] : cfg.x,
        y: Array.isArray(cfg.y) ? cfg.y[0] : cfg.y
      };
      const { fill, fillOpacity = 1, r1, r2, r3 } = style;
      const group = container.addGroup();
      if (condition(cfg.data)) {
        const decorator1 = group.addShape('circle', {
          attrs: {
            x: point.x,
            y: point.y,
            r: r1,
            fill,
            opacity: fillOpacity * 0.5
          }
        });
        const decorator2 = group.addShape('circle', {
          attrs: {
            x: point.x,
            y: point.y,
            r: r1,
            fill,
            opacity: fillOpacity * 0.5
          }
        });
        const decorator3 = group.addShape('circle', {
          attrs: {
            x: point.x,
            y: point.y,
            r: r1,
            fill,
            opacity: fillOpacity * 0.5
          }
        });
        decorator1.animate(
          {
            r: r1 * 2,
            opacity: 0
          },
          {
            duration: 1800,
            easing: 'easeLinear',
            repeat: true
          }
        );
        decorator2.animate(
          {
            r: r1 * 2,
            opacity: 0
          },
          {
            duration: 1800,
            easing: 'easeLinear',
            repeat: true,
            delay: 600
          }
        );
        decorator3.animate(
          {
            r: r1 * 2,
            opacity: 0
          },
          {
            duration: 1800,
            easing: 'easeLinear',
            repeat: true,
            delay: 1200
          }
        );
        group.addShape('circle', {
          attrs: {
            x: point.x,
            y: point.y,
            r: r2,
            fill,
            opacity: fillOpacity * 0.7
          }
        });
        group.addShape('circle', {
          attrs: {
            x: point.x,
            y: point.y,
            r: r3,
            fill,
            opacity: fillOpacity
          }
        });
      }

      return group;
    }
  });
}

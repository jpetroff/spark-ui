import { getRectFromPoints } from "./from-points.ts";
import type { Rect } from "./types.ts";

const { min, max } = Math

export function union(...rs: Rect[]): Rect {
  const pMin = {
    x: min(...rs.map((r) => r.minX)),
    y: min(...rs.map((r) => r.minY)),
  }
  const pMax = {
    x: max(...rs.map((r) => r.maxX)),
    y: max(...rs.map((r) => r.maxY)),
  }
  return getRectFromPoints(pMin, pMax)
}

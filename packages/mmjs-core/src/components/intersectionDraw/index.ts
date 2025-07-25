import IntersectionDraw from "./intersectionDraw.vue";

export type IntersectionDrawInstanceType = InstanceType<
  typeof IntersectionDraw
>;
export { IntersectionDraw };

/**
 * @deprecated ^0.11.0 版本后，IntersectionDraw 将来的某个版本弃用默认导出，使用具名导出 
 */
export default IntersectionDraw;
console.warn(
  " ^0.11.0 版本后，IntersectionDraw 将来的某个版本弃用默认导出，使用具名导出 "
);

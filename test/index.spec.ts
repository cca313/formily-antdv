/*
 * @Author: Gavin
 * @Date: 2021-10-08 18:03:04
 * @LastEditors: Gavin
 * @LastEditTime: 2021-10-08 18:03:04
 * @FilePath: \formily-antdv\test\index.spec.ts
 * @Descriptions: todo
 */
import { version } from "../packages/index";
test("当前项目版本为 1.0.0", () => {
  expect(version).toBe("1.0.0");
});

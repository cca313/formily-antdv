/*
 * @Author: Gavin Chan
 * @Date: 2021-10-11 11:54:06
 * @LastEditors: Gavin
 * @LastEditTime: 2021-10-19 15:28:31
 * @FilePath: \formily-antdv\packages\input\index.ts
 * @Descriptions: todo
 */
import { connect, mapProps, mapReadPretty } from "@formily/vue";
import Input from "ant-design-vue/es/input";
import { PreviewText } from "../preview-text/index";

const GInput = connect(
  Input,
  mapProps({ readOnly: "readonly" }),
  mapReadPretty(PreviewText)
);

const TextArea = connect(
  Input.TextArea,
  mapProps({ readOnly: "readonly" }),
  mapReadPretty(PreviewText)
);

export { GInput, TextArea };

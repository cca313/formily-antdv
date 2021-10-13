/*
 * @Author: Gavin Chan
 * @Date: 2021-10-11 11:54:06
 * @LastEditors: Gavin
 * @LastEditTime: 2021-10-11 14:22:54
 * @FilePath: \formily-antdv\packages\input\index.ts
 * @Descriptions: todo
 */
import { connect, mapProps, mapReadPretty } from "@formily/vue";
import { Input as AInput } from "ant-design-vue";
import { PreviewText } from "../preview-text/index";
// import type { Input } from 'ant-design-vue'

// export type InputProps = AInputProps;

const BasicInput = connect(
  AInput,
  mapProps({ readOnly: "readonly" }),
  mapReadPretty(PreviewText)
);

const TextArea = connect(
  AInput.TextArea,
  mapProps({ readOnly: "readonly" }),
  mapReadPretty(PreviewText)
);

export { BasicInput, TextArea };

/*
 * @Author: Gavin Chan
 * @Date: 2021-10-11 12:24:23
 * @LastEditors: Gavin
 * @LastEditTime: 2021-10-11 14:19:32
 * @FilePath: \formily-antdv\packages\preview-text\index.ts
 * @Descriptions: todo
 */
import { h, defineComponent } from "vue";

export const PreviewText = defineComponent({
  name: "PireviewText",
  props: ["display"],
  setup(props, { attrs, slots }) {
    return () => {
      return h("div", {}, { default: () => [props.display] });
    };
  },
});

import { generateClasses } from "@formkit/themes";
import { defaultConfig } from "@formkit/vue";
import "@formkit/core";

const myDefaultConfig = defaultConfig({
  config: {
    classes: generateClasses({
      global: {
        // main
        outer: "w-full",
        wrapper: "",
        inner: "",
        label: "",
        input:
          "bg-neutral-50 placeholder:text-neutral-500 placeholder:text-sm focus:outline-none w-full py-2 px-4 border-b border-neutral-500 w-full",
        help: "",
        messages: "",
        message: "text-sm px-4 py-1 text-center mt-1",
        // secondary
        fieldset: "",
        legend: "",
        // input selection
        options: "",
        option: "",
        optionHelp: "",
        // icons
        decorator: "",
        decoratorIcon: "",
        // specific
        selectIcon: "",
        // input file
        fileList: "hidden",
        fileItem: "hidden",
        fileItemIcon: "",
        fileName: "",
        fileRemove: "hidden",
        noFiles: "hidden",
        noFilesIcon: "",
        fileRemoveIcon: "",
      },
      // select: {
      //   input: "text-neutral-500",
      //   options: "p-4 ",
      //   option: "text-neutral-500 hover:bg-neutral-100",
      // },
      submit: {
        input:
          "$reset btn-1",
      },
      form: {
        messages: "$reset hidden",
      },
    }),
  },
});

export default myDefaultConfig;

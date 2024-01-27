import { useState } from "react";
import { ChronPageHeader, ChronBreadcrumbs } from "components/Chron";
import { Add } from "components/Chron/icons";
import Close from "components/Chron/icons/close";
import { Emoji, List, Image } from "components/Chron/icons/icons";
import { useHistory } from "react-router-dom";
import RichTextEditor from "react-rte";
const Top = () => {
  const histroy = useHistory();
  return (
    <div className="flex items-center justify-between relative mb-2">
      <Close
        onClick={() => {
          histroy.push("/chron");
        }}
      />

      <div className="cursor-pointer flex px-6 py-3 rounded-full shadow-shadow-lg red-gradient shadow">
        <div className="font-lato font-bold text-white text-sm tracking-[0.70px] leading-[21px] whitespace-nowrap">
          Post Now
        </div>
      </div>
    </div>
  );
};

function AddChronicles() {
  const [state, setState] = useState(RichTextEditor.createEmptyValue());
  const onTextChange = (value) => {
    setState(value);
  };
  const toolbarConfig = {
    // Optionally specify the groups to display (displayed in the order listed).
    display: ["INLINE_STYLE_BUTTONS", "BLOCK_TYPE_BUTTONS"],
    INLINE_STYLE_BUTTONS: [
      { label: "Bold", style: "BOLD", className: "custom-css-class" },
      { label: "Italic", style: "ITALIC" },
      { label: "Underline", style: "UNDERLINE" },
    ],
    BLOCK_TYPE_DROPDOWN: [
      { label: "Normal", style: "unstyled" },
      { label: "Heading Large", style: "header-one" },
      { label: "Heading Medium", style: "header-two" },
      { label: "Heading Small", style: "header-three" },
    ],
    BLOCK_TYPE_BUTTONS: [
      { label: "UL", style: "unordered-list-item" },
      { label: "OL", style: "ordered-list-item" },
    ],
  };
  return (
    <div className="w-full h-95vh relative -top-2 py-4 px-2">
      <Top />
      <div className="w-full h-full px-4 py-2">
        <h3 className="text-red-400 text-lg font-bold font-satoshi leading-[27px] tracking-tight mb-6">
          New Chronicle
        </h3>
        <h5 className="text-zinc-800 text-sm font-semibold font-lato leading-[21px] tracking-tight">
          Add Your Chronicle
        </h5>
        {/* <textarea
          placeholder="start typing..."
          className="mt-4 w-full h-[120px] px-4 py-3 bg-neutral-50 rounded border border-zinc-100 justify-start items-start gap-2 inline-flex font-lato outline-none placeholder:text-stone-300"
        /> */}
        <RichTextEditor
          placeholder="start typing..."
          value={state}
          onChange={onTextChange}
          toolbarConfig={toolbarConfig}
          className="mt-4 w-full h-[200px] bg-neutral-50 rounded border border-zinc-100 gap-2 font-lato outline-none placeholder:text-stone-300"
        />
        <div className="w-full flex justify-end py-2 gap-4">
          <Emoji />
          <Image />
          <List />
        </div>
      </div>
    </div>
  );
}

export default AddChronicles;

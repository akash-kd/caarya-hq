import { createChronicles } from "config/APIs/chronicles";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import RichTextEditor from "react-rte";

const Top = ({ onPostClick }) => {
  const histroy = useHistory();
  return (
    <div className="flex items-center justify-between relative mb-2">
      {/* Icon: Close*/}
      <image
        src="/assets/svg/chron/close.svg"
        onClick={() => histroy.push("/chronicle")}
      />

      <div
        className="cursor-pointer flex px-6 py-3 rounded-full shadow-shadow-lg red-gradient shadow"
        onClick={onPostClick}
      >
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
    console.log(value.toString("html"));
    setState(value);
  };

  const onPostClick = () => {
    const user = JSON.parse(localStorage.getItem("admin"));
    createChronicles({ message: state.toString("html") });
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
      <Top onPostClick={onPostClick} />
      <div className="w-full h-full px-4 py-2">
        <h3 className="text-red-400 text-lg font-bold font-satoshi leading-[27px] tracking-tight mb-6">
          New Chronicle
        </h3>
        <h5 className="text-zinc-800 text-sm font-semibold font-lato leading-[21px] tracking-tight">
          Add Your Chronicle
        </h5>
        <RichTextEditor
          placeholder="start typing..."
          value={state}
          onChange={onTextChange}
          toolbarConfig={toolbarConfig}
          className="mt-4 w-full h-[200px] bg-neutral-50 rounded border border-zinc-100 gap-2 font-lato outline-none placeholder:text-stone-300"
        />
        <div className="w-full flex justify-end py-2 gap-4">
          {/* Icons: Emoji, Image and List */}
          <image src="/assets/svg/chron/emoji.svg" alt="Emoji Icon" />
          <image src="/assets/svg/chron/image.svg" alt="Image Icon" />
          <image src="/assets/svg/chron/list.svg" alt="List  Icon" />
        </div>
      </div>
    </div>
  );
}

export default AddChronicles;

import { PlusCircle } from "@phosphor-icons/react";
import ChronosButton from "../Buttons";

export default function EmptyState({
  text = "No Items Found!",
  image = "/assets/images/empty/accessDenied.svg",
  cta,
  ctaText,
  noImage,
}) {
  return (
    <div
      className={`flex justify-center items-center flex-col py-10 gap-4 ${
        !noImage ? "lg:min-h-[30vh]" : "lg:min-h-[10vh]"
      }`}
    >
      {!noImage && (
        <div className="relative h-[149px] w-[192px] overflow-hidden">
          <img
            src={image}
            alt="empty epics"
            className="relative h-full w-full object-contain"
          />
        </div>
      )}
      <p className="text-gray-500 text-sm">{text}</p>
      {cta && (
        <ChronosButton
          tertiary
          text={ctaText}
          onClick={cta}
          icon={<PlusCircle size={16} />}
          iconReverse
        />
      )}
    </div>
  );
}

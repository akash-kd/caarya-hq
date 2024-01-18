/**
 * Chronos Button Component
 * @param {String} text
 * @param {Function} onClick
 * @param {Boolean} primary
 * @param {Boolean} secondary
 * @param {Boolean} tertiary
 * @returns
 */

function ChronosButton({
  text = "Add",
  onClick,
  primary,
  secondary,
  tertiary,
  icon,
  loader,
  floating,
  embed,
  disabled,
  yellow,
  red,
  modal,
  iconReverse,
  purple,
  white,
  float,
  underline,
}) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`py-3 px-4 flex flex-row items-center justify-center font-lato ${
        float ? "floating-cta" : ""
      } ${underline ? "underline underline-offset-2" : ""} ${
        floating
          ? primary
            ? "floating-primary-cta"
            : "floating-secondary-cta"
          : primary
          ? modal
            ? "primary-modal-cta"
            : red
            ? "primary-red-cta"
            : purple
            ? "primary-purple-cta"
            : yellow
            ? "primary-yellow-cta"
            : "primary-cta"
          : secondary
          ? modal
            ? "secondary-modal-cta"
            : yellow
            ? "secondary-yellow-cta"
            : "secondary-cta"
          : tertiary
          ? red
            ? "tertiary-red-cta"
            : "tertiary-cta"
          : embed
          ? "embed-cta"
          : white
          ? "!bg-white text-primary-yellow-darker border border-primary-yellow-darker rounded-md"
          : "text-white font-medium bg-primary-indigo-650 border border-primary-indigo-650  py-2.5 px-3.5 inter rounded-10px secondary-shadow text-sm leading-4 cursor-pointer transition ease-in-out duration-150 hover:scale-105"
      } `}
    >
      <p
        className={`flex ${
          iconReverse ? "flex-row-reverse" : "flex-row"
        } items-center gap-1`}
      >
        {text} {icon && icon}
      </p>
      {loader && (
        <div
          className={`w-4 h-4 bg-transparent ${
            secondary ? "border-primary-yellow-darkest" : "border-white"
          } border-2 rounded-full border-t-0 animate-spin ml-2`}
        />
      )}
    </button>
  );
}

export default ChronosButton;

import { Switch } from "@headlessui/react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

/**
 * Displays the toggle switch V2
 * @param {String} label
 * @param {Boolean} enabled - boolean value to indicate whether enabled or not enabled
 * @param {Function} setEnabled - toggle function
 * @param {Boolean} labelLeft - position of label
 * @param {String} textSize - controls the size of the text
 * @returns
 */

export default function Toggle({
  label,
  enabled,
  setEnabled,
  labelLeft,
  labelTop,
  textSize = "text-xs",
}) {
  return (
    <Switch.Group
      as="div"
      className={`flex items-center ${
        labelLeft
          ? "flex-row-reverse"
          : labelTop
          ? "flex-col-reverse"
          : "flex-row"
      }`}
    >
      <Switch
        checked={enabled}
        onChange={() => setEnabled(!enabled)}
        className={classNames(
          enabled
            ? "bg-primary-yellow-darkest border-primary-yellow-darkest "
            : "bg-primary-yellow-lightest border-primary-yellow-lightest",
          "relative inline-flex flex-shrink-0 h-4 w-8 border-2 rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-transparent"
        )}
      >
        <span
          aria-hidden="true"
          className={classNames(
            enabled ? "translate-x-4" : "translate-x-0",
            "pointer-events-none inline-block h-3 w-3 rounded-full border-2 bg-white shadow transform ring-0 transition ease-in-out duration-200"
          )}
        />
      </Switch>
      <Switch.Label as="span" className="">
        <span
          className={`${textSize} font-normal text-primary-gray-450 inter leading-3 ${
            labelLeft ? "mr-2" : labelTop ? "mb-2" : "ml-2"
          }`}
        >
          {label}
        </span>
      </Switch.Label>
    </Switch.Group>
  );
}

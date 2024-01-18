import { UserCircleIcon } from "@heroicons/react/solid";
import { useSelector } from "react-redux";

const getComment = (date) => {
  try {
    const time = new Date(date);
    const today = new Date();
    today.setMilliseconds(
      Math.floor(today.getMilliseconds() / (60 * 60 * 1000)) * (60 * 60 * 1000)
    );
    let diff = (time.getTime() - today.getTime()) / (60 * 60 * 24 * 1000);
    const isDue = diff < 0;
    diff = Math.round(Math.abs(diff));
    if (diff === 0) return "Today";
    return `Commented ${diff} day ago`;
  } catch (err) {
    console.log("Error", err);
    return "Today";
  }
};

const GetMessageComment = (comment) => {
  const squad = useSelector((state) => state.user.squad);

  let words = comment.split(" ");
  let elements = [];

  words.map((item) => {
    if (item.includes("@")) {
      let name = item.substr(1);

      let image = squad.find((e) => e?.first_name.includes(name))?.image
        ?.url ? (
        <img
          src={squad.find((e) => e?.first_name.includes(name))?.image?.url}
          alt=""
          className="h-5 w-5 rounded-full mr-1"
        />
      ) : (
        <UserCircleIcon className="h-5 w-5 text-primary-gray-300" />
      );
      console.log(image);
      elements.push(
        <div className="flex flex-row items-center space-x-1">
          <p>@</p> {image} &nbsp; &nbsp;
        </div>
      );
    } else {
      elements.push(<p>{item} &nbsp;</p>);
    }
  });

  return elements;
};

export { getComment, GetMessageComment };

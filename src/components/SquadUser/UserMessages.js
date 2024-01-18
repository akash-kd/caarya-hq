import empty from "assets/svg/commentsEmptyState.svg";
import { UserCircleIcon } from "@heroicons/react/solid";

// Redux
import { useSelector } from "react-redux";

function UserMessages({ messages }) {
  const squad = useSelector((state) => state.user.squad?.teamMembers);

  const getComment = (date) => {
    try {
      const time = new Date(date);
      const today = new Date();
      today.setMilliseconds(
        Math.floor(today.getMilliseconds() / (60 * 60 * 1000)) *
          (60 * 60 * 1000)
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

  const getMessageComment = (comment) => {
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

  return (
    <div className="w-full px-5 pb-5 space-y-5">
      {messages.length > 0 ? (
        messages.map((item) => {
          return (
            <div key={item?.taskId} className="space-y-2.5">
              <h1 className="text-xs ml-5 font-lato font-semibold leading-4 text-primary-gray-900">
                {item?.title}
              </h1>
              {console.log(item)}
              <div className="flex flex-col space-y-2.5">
                {item?.comments.length > 0 &&
                  item?.comments.map((comment, index) => {
                    return (
                      <div
                        key={index}
                        className="p-2.5 relative flex flex-col w-full bg-white"
                        style={{ borderRadius: "20px" }}
                      >
                        <div className="flex flex-row items-start space-x-3 w-full">
                          <div className={`h-8 w-8 rounded-full bg-gray-300`}>
                            {comment?.creator?.image?.url ? (
                              <img
                                src={comment?.creator?.image?.url}
                                alt="squad"
                                className="object-cover"
                              />
                            ) : (
                              <UserCircleIcon className="h-8 w-8" />
                            )}
                          </div>
                          <div className="flex flex-col items-start space-y-1.5 w-11/12">
                            <div className="flex flex-col items-start space-y-1 w-full">
                              <h1 className="font-lato text-primary-gray-1000 text-xs font-normal">
                                {comment?.creator?.first_name}
                              </h1>
                              <p className="font-lato text-primary-gray-300 text-3xs font-normal">
                                {getComment(comment.createdAt)}
                              </p>
                            </div>
                            <div className="font-lato font-normal text-2xs flex flex-row items-center text-primary-gray-450 w-full">
                              {getMessageComment(comment.message)}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          );
        })
      ) : (
        <div className="flex flex-col items-center min-h-50vh justify-center">
          <img src={empty} alt="" className="object-cover" />
          <p className="mt-5 font-karla font-semibold text-xs text-center text-primary-gray-450">
            No messages yet
          </p>
        </div>
      )}
    </div>
  );
}

export default UserMessages;

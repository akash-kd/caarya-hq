import React, { useState, useEffect } from "react";
import * as TaskAPI from "config/APIs/task/task";
import { ChatAltIcon, TagIcon, UserCircleIcon } from "@heroicons/react/solid";
import {
  AtSymbolIcon,
  PaperClipIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/outline";
import EmptyState from "components/Comman/EmptyState";

// Redux
import { useSelector } from "react-redux";

import empty from "assets/svg/commentsEmptyState.svg";

function TaskChats({ taskId, taskComments, onUpdate }) {
  const allSquad = useSelector((state) => state.user.squadList);
  const [squad, setSquad] = useState([]);
  const [comments, setComments] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showSuggestionsInner, setShowSuggestionsInner] = useState(false);
  const [newComment, setNewComment] = useState({
    message: "",
    users: [],
    attachments: [],
  });

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      setComments(taskComments);
    }

    return () => {
      isMounted = false;
    };
  }, [taskComments]);

  // useEffect(() => {
  //   let isMounted = true;
  //   if (isMounted) {
  //     setSquad(allSquad?.teamMembers);
  //   }

  //   return () => {
  //     isMounted = false;
  //   };
  // }, [allSquad]);

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      userOfATask();
    }

    return () => {
      isMounted = false;
    };
  }, []);

  const userOfATask = async () => {
    setSquad(allSquad);

    // try {
    //   const res = await TaskAPI.getTasksUsers(taskId);
    //   const users = res?.data?.data?.response;
    //   setSquad(users);
    // } catch (err) {
    //   console.log("Task users error", err);
    // }
  };

  const createComment = async () => {
    const { users, attachments, ...values } = newComment;
    const body = {
      users: users.map((e) => e.id),
      attachments: attachments.map((e) => e.id),
      comment: { ...values, individualTaskId: taskId },
    };
    try {
      await TaskAPI.addComment(body);
      setNewComment({
        message: "",
        users: [],
        attachments: [],
      });
      onUpdate();
    } catch (err) {
      console.log("Add comment error", err);
    }
    setNewComment({
      message: "",
      users: [],
      attachments: [],
    });
  };

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

  const getMessageComment = (comment, users) => {
    let words = comment.split(" ");
    let elements = [];

    words.map((item) => {
      if (item.includes("@")) {
        let name = item.substr(1);

        let image = squad
          .concat(users)
          ?.find((e) => e?.first_name.includes(name))?.image?.url ? (
          <img
            src={
              squad.concat(users)?.find((e) => e?.first_name.includes(name))
                ?.image?.url
            }
            alt=""
            className="h-5 w-5 rounded-full mr-1"
          />
        ) : (
          <UserCircleIcon className="h-5 w-5 text-primary-gray-300" />
        );

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

  useEffect(() => {
    const handleClick = (e) => {
      const elem = document.getElementById("add-comment");

      if (elem === document.activeElement) {
        console.log("Element has focus!");
        setShowSuggestions(true);
        setShowSuggestionsInner(true);
      } else {
        console.log(`Element is not focused.`);

        setShowSuggestionsInner(false);
      }
    };

    window.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, []);

  useEffect(() => {
    if (!showSuggestionsInner) {
      setTimeout(() => {
        setShowSuggestions(false);
      }, 200);
    }
  }, [showSuggestionsInner]);

  return (
    <div className="w-full mt-5 px-2.5 ">
      <div className="px-5 pb-6 max-h-50vh">
        {comments.length > 0 && (
          <div className="flex flex-col space-y-2.5">
            {(comments || [])?.map((comment, index) => (
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
                    <div className="font-lato font-normal text-2xs flex flex-row flex-wrap break-all items-center text-primary-gray-450 w-full">
                      {getMessageComment(comment.message, comment?.users)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        {comments.length === 0 && (
          <div className="flex flex-col items-center min-h-50vh justify-center">
            <p className="font-lato font-normal text-xs text-center text-primary-gray-250 mb-2.5">
              Use @ to mention someone
            </p>
            <img src={empty} alt="" className="object-cover" />
            <p className="mt-5 font-karla font-semibold text-xs text-center text-primary-gray-450">
              No comments yet
            </p>
          </div>
        )}
      </div>
      <div className="w-11/12 ml-1.5 pb-2 fixed bottom-20 bg-white pt-2 bg-opacity-10 backdrop-blur backdrop-filter">
        <div
          className={`w-full  ${
            showSuggestions ? "suggestion-box-expanded pb-2" : "suggestion-box"
          }`}
        >
          <div
            className={`w-full overflow-x-auto ${
              showSuggestions ? "flex" : "hidden"
            } flex-row items-center space-x-5`}
          >
            {squad.length > 0 &&
              squad.map((person) => {
                return (
                  <div
                    onClick={() => {
                      let t = [...newComment.users];
                      let message = newComment.message;
                      if (t.find((e) => e.id == person.id)) {
                        t = t.filter((e) => e.id != person.id);
                        message = message.replace(
                          `@${person?.first_name.split(" ")[0]} `,
                          ""
                        );
                      } else {
                        t.push(person);
                        message =
                          message + ` @${person?.first_name.split(" ")[0]} `;
                      }
                      setNewComment({
                        ...newComment,
                        users: t,
                        message: message,
                      });
                    }}
                    className={`${
                      showSuggestionsInner
                        ? "suggestions-slide-in"
                        : "suggestions-slide-out"
                    } flex flex-col items-center space-x-1 py-0.5 px-2.5 rounded-full ${
                      newComment.users.find((e) => e.id == person.id)
                        ? "bg-primary-yellow-dark text-yellow-50 font-bold"
                        : "bg-primary-yellow-lighter text-primary-yellow-darkest font-normal"
                    }`}
                  >
                    {/* <div
                      className={`h-8 w-8 rounded-full bg-gray-300 ${
                        newComment.users.find((e) => e.id == person.id)
                          ? "ring-gray-500 ring-4"
                          : ""
                      }`}
                    >
                      {person?.image?.url ? (
                        <img
                          src={person?.image?.url}
                          alt="squad"
                          className="object-cover rounded-full"
                        />
                      ) : (
                        <UserCircleIcon className="h-8 w-8" />
                      )}
                    </div> */}
                    <p className="text-2xs font-lato">{person?.first_name}</p>
                  </div>
                );
              })}
          </div>
        </div>
        <div className="w-full">
          <div className="flex flex-row items-center justify-between h-10 border-primary-gray-250 bg-transparent border-t w-full">
            <input
              id="add-comment"
              placeholder="Add a comment"
              value={newComment?.message}
              name="comment"
              className="text-xs font-lato bg-transparent p-0 h-10 placeholder:text-gray-400 w-11/12 focus:outline-none border-0"
              onChange={(e) => {
                setNewComment({ ...newComment, message: e.target.value });
              }}
            ></input>

            <div
              onClick={() => {
                createComment();
              }}
              className="h-6 w-6 flex flex-row items-center justify-center rounded-full"
              // style={{ background: "#0497AE" }}
            >
              <img src="/assets/svg/send.svg" alt="" className="w-5" />
              {/* <PaperAirplaneIcon
                
                className="text-white h-3.5 transform rotate-45 ml-0.5 mb-0.5"
              /> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TaskChats;

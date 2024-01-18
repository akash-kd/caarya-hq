import React, { useState, useEffect } from "react";
import * as TaskAPI from "config/APIs/task/task";
import { showToast } from "redux/toaster";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import EditDetails from "./EditTask";
import ViewDetails from "./ViewTask";
import ViewEditDetails from "./Details";

function Details({ taskId, taskDetails, onUpdate }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [details, setDetails] = useState({});
  const [editable, setEditable] = useState(false);
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    setDetails(taskDetails);
  }, [taskDetails]);

  const deleteTask = async () => {
    setFetching(true);
    try {
      const response = await TaskAPI.deleteTasks(taskId);
      if (response.data) {
        dispatch(showToast({ message: "Task Deleted!" }));
        history.goBack();
      }
    } catch (err) {
      console.log("Delete task error", err);
      switch (err.response?.status) {
        case 401:
          dispatch(showToast({ message: "Unauthorized!", type: "error" }));
          break;
        default:
          dispatch(
            showToast({ message: "Something went wrong!", type: "error" })
          );
      }
    }
    setFetching(false);
  };

  const handleUpdate = async () => {
    const update = { ...details };
    update["type_id"] = update.type?.id;

    delete update.type;
    delete update.goal;
    let body = {
      task: update,
    };
    try {
      const response = await TaskAPI.updateTasks(details.id, body);
      const { task } = response.data.data;
      onUpdate();
    } catch (err) {
      switch (err.response?.status) {
        case 401:
          dispatch(showToast({ message: "Unauthorized!", type: "error" }));
          break;
        default:
          dispatch(
            showToast({ message: "Something went wrong!", type: "error" })
          );
      }
    }
  };

  return (
    <div className="w-full mt-2.5 lg:mt-5 h-70vh lg:max-h-90vh lg:h-80vh px-2.5 overflow-y-auto">
      <ViewEditDetails
        details={details}
        setDetails={setDetails}
        onUpdate={() => handleUpdate()}
        onDelete={() => deleteTask()}
      />
      {/* {editable ? (
        <EditDetails
          setEditable={(val) => {
            setEditable(val);
          }}
          onUpdate={() => handleUpdate()}
          details={details}
          setDetails={setDetails}
          onDelete={() => deleteTask()}
        />
      ) : (
        <ViewDetails
          fetching={fetching}
          details={details}
          setEditable={(val) => {
            setEditable(val);
          }}
        />
      )} */}
    </div>
  );
}

export default Details;

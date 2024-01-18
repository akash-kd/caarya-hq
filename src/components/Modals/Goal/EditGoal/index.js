import React, { useEffect, useState } from "react";
import { XIcon } from "@heroicons/react/solid";
import { useDispatch } from "react-redux";
import * as GoalAPI from "config/APIs/task/goal";
import Drawer from "@mui/material/Drawer";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import { showToast } from "redux/toaster";
import DateInput from "components/Comman/Inputs/DateInput";
import ChronosButton from "components/Comman/Buttons";
import { ChevronRightIcon } from "@heroicons/react/outline";

const defaultValue = {
  title: "",
  date: null,
  status: null,
};

const EditGoal = ({
  onUpdate,
  editValues,
  closeModal,
  isOpen,
  category,
  goal,
  project,
  onDelete,
}) => {
  const dispatch = useDispatch();
  const [newTaskData, setNewTaskData] = useState({ ...defaultValue });
  const [userList, setUserList] = useState();
  const [fieldErrors, setFieldErrors] = useState({});
  const [goals, setGoals] = useState([]);
  const [updating, setUpdating] = useState(false);
  const [creating, setCreating] = useState(false);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [focusTitle, setFocusTitle] = useState(isOpen);

  // Assigning Category
  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      setNewTaskData((state) => ({ ...state, category }));
    }
    return () => {
      isMounted = false;
    };
  }, [category]);

  // Assigning Project
  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      setNewTaskData((state) => ({ ...state, project_id: project?.id }));
    }
    return () => {
      isMounted = false;
    };
  }, [project]);

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      if (editValues) {
        const { students, ...task } = editValues;
        setSelectedStudents(students || []);
        setNewTaskData({ ...task });
      }
    }
    return () => {
      isMounted = false;
    };
  }, [editValues]);

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      setFieldErrors({});

      if (isOpen) {
        setFocusTitle(true);
      }
    }

    return () => {
      setFocusTitle(false);
      isMounted = false;
    };
  }, [isOpen]);

  const handleChange = (value, field, e) => {
    var data = { ...newTaskData };
    data[field] = value;
    setNewTaskData(data);
    if (field !== "title") {
      setFocusTitle(false);
    }

    if (Object.keys(fieldErrors).length > 0) {
      setFieldErrors({});
    }
  };

  const showSuccessNotification = (message) => {
    dispatch(showToast({ message }));
  };

  const showErrorNotification = (message) => {
    dispatch(showToast({ message, type: "error" }));
  };

  const handleUpdate = async () => {
    if (!newTaskData.due_date) {
      newTaskData.due_date = new Date();
    }
    setUpdating(true);
    const { ...update } = newTaskData;
    update["project_id"] = project?.id;
    try {
      const response = await GoalAPI.updateGoal(newTaskData.id, {
        update,
        owners: selectedStudents.map((e) => e.id),
      });

      closeModal();
      onUpdate();
      setNewTaskData(defaultValue);
      setSelectedStudents([]);
      showSuccessNotification("Goal successfully updated!");
    } catch (err) {
      console.log(err);
      switch (err.response?.status) {
        case 422:
          let error = {},
            { data } = err.response.data;
          for (let key of Object.keys(data)) {
            if (key.split(".")[0] === "update")
              error[key.split(".")[1]] = data[key];
          }
          setFieldErrors(error);
          break;
        case 401:
          showErrorNotification(err.response?.data?.message);
          break;
        default:
          showErrorNotification("One or more fields is incorrect!");
      }
    }
    setUpdating(false);
  };

  return (
    <Drawer
      anchor={window.innerWidth < 1024 ? "bottom" : "right"}
      PaperProps={{
        style: {
          borderRadius: window.innerWidth < 1024 ? "20px 20px 0px 0px" : "0px",
          maxHeight: "100vh",
          width: window.innerWidth < 1024 ? "100%" : "560px",
        },
      }}
      open={isOpen}
      onClose={() => {
        closeModal();
        setNewTaskData(defaultValue);
      }}
      transitionDuration={250}
    >
      <div className="modals-component md:max-w-xl lg:h-screen lg:pt-20 mx-auto w-full transform transition-all ease-in-out duration-150">
        <div className="flex flex-row items-end justify-between px-5 pt-5 rounded-t-20px">
          <h5
            className="font-lato font-bold text-sm text-primary-gray-1000 flex flex-col items-start"
            id="exampleModalLiveLabel"
          >
            Update {newTaskData?.title}
          </h5>
          {/* <p className="font-lato font-normal text-primary-gray-1000 text-sm">
          {showStep}/4
        </p> */}

          <button
            aria-label="Close"
            type="button"
            onClick={() => {
              closeModal();
              setNewTaskData(defaultValue);
              // setShowStep(1);
            }}
          >
            <XIcon className="h-6 w-6 text-primary-gray-1000" />
          </button>
        </div>
        {project && (
          <div className="flex flex-row items-stretch justify-between px-5 mt-2.5">
            <div className="space-y-2 w-full">
              {project && (
                <p className="font-lato font-normal text-sm text-primary-gray-1000 flex flex-row items-center">
                  <img
                    src={
                      project?.image?.url || "/assets/images/icons/rocket.png"
                    }
                    alt=""
                    className="h-5 w-5 rounded mr-1.5"
                  />
                  {project?.title}
                </p>
              )}
            </div>
          </div>
        )}

        <div className="mt-3.5 px-5 flex w-full flex-col items-start space-y-5 h-auto transition-all ease-in-out duration-150">
          <div className="big-title-input w-full bg-transparent">
            <TextareaAutosize
              minRows={1}
              autoFocus={focusTitle}
              onBlur={(e) => {
                handleChange(e.target.value, "title", e);
              }}
              placeholder="What do you want to do?"
              style={{ fontSize: "26px" }}
              className="text-2xl border-0 focus:border-0 p-0 w-full bg-transparent focus:ring-0 focus:outline-none font-lato font-semibold w-full text-gray-700"
              invalid={fieldErrors.title}
              value={newTaskData.title}
              onChange={(e) => handleChange(e.target.value, "title", e)}
            />
          </div>

          {/* <Row className="w-full text-left">
            <Col className="" md="12">
              <FormGroup className="flex flex-col items-start">
                <label>Whom do you want to assign to?</label>
                <UserSelect
                  mySquad={true}
                  userList={userList}
                  selectedUsers={selectedStudents}
                  onSelect={(students) => setSelectedStudents(students)}
                />
              </FormGroup>
            </Col>
          </Row> */}
          <div className="w-full text-left">
            <label>Start Date</label>
            <br />
            <DateInput
              date={
                typeof newTaskData.start_date === "string"
                  ? new Date(newTaskData.start_date)
                  : newTaskData.start_date
              }
              onChange={(value) => handleChange(value, "start_date")}
            />
          </div>
          <div className="w-full text-left">
            <label>End Date</label>
            <br />
            <DateInput
              date={
                typeof newTaskData.end_date === "string"
                  ? new Date(newTaskData.end_date)
                  : newTaskData.end_date
              }
              onChange={(value) => handleChange(value, "end_date")}
            />
          </div>
          <ChronosButton
            text="Delete"
            tertiary
            red
            onClick={() => {
              onDelete(newTaskData);
              closeModal();
            }}
          />
        </div>
        <div className="mt-8 flex w-full flex-row items-center justify-between px-5 pb-5">
          <ChronosButton
            text="Cancel"
            secondary
            onClick={() => {
              closeModal();
            }}
          />

          <ChronosButton
            loader={creating}
            text="Update"
            primary
            icon={<ChevronRightIcon className="w-4 h-4" />}
            onClick={() => {
              handleUpdate();
            }}
          />
        </div>
      </div>
    </Drawer>
  );
};

export default EditGoal;

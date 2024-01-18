import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  ProjectCategories,
  ProjectTypes,
  PROJECT_TYPE_COMPANY_GOALS,
} from "helpers/projects";
import * as ProjectAPI from "config/APIs/project";
import { useHistory } from "react-router";
import { showToast } from "redux/toaster";
import ConfirmModal from "components/Modals/Common/ConfirmModal";
import ImageSelector from "components/Comman/Inputs/ImageSelector";
import ImageRadioInput from "components/Comman/Inputs/ImageRadioInput";
import { Switch } from "@headlessui/react";
import { classNames } from "helpers/utils/classNames";
import DateInput from "components/Comman/Inputs/DateInput";
import RadioInput from "components/Comman/Inputs/RadioInput";
import { ArrowLeftIcon, UserIcon } from "@heroicons/react/solid";
import { CheckIcon } from "@heroicons/react/outline";
import AddMembers from "components/Modals/AddMembers";

function EditBanner({ project, setEditable, setProject, isEditable }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const [newProjectData, setNewProjectData] = useState();
  const [lists, setLists] = useState([]);
  const [fieldErrors, setFieldErrors] = useState({});
  const [selectedLists, setSelectedLists] = useState([]);
  const [deleteProject, setDeleteProject] = useState();
  const [selectedOffering, setSelectedOffering] = useState();
  const [showAddMembersModal, setShowAddMembersModal] = useState(false);
  const [projectTypes, setProjectTypes] = useState(ProjectTypes);

  useEffect(() => {
    // fetchLists();

    setNewProjectData(project);
  }, [isEditable]);

  // const fetchLists = async () => {
  //   try {
  //     let response = selectedOffering
  //       ? await OfferingAPI.getOfferingNodes({ offeringId: selectedOffering })
  //       : await getAllNodesAdmin(); // TODO: Change according to new response and add search, filter, sort if required

  //     const fetchedNodes =
  //       response.data.data.nodes || response.data.data.response;
  //     response = await getAllOfferingsAdmin();
  //     const { offerings: fetchedOfferings } = response.data.data;
  //     setLists((state) => ({
  //       ...state,
  //       nodes: fetchedNodes,
  //       offerings: fetchedOfferings,
  //     }));
  //   } catch (err) {
  //     console.log("List fetch error", err);
  //   }
  // };

  const handleUpdate = async () => {
    const { node, image, ...body } = newProjectData;
    body["image_id"] = image?.id;
    body["node_id"] = node?.id;

    try {
      const response = await ProjectAPI.update(body.id, {
        update: body,
      });
      const { project } = response.data.data;
      showSuccessNotification("Project Updated Successfully!");
      setNewProjectData(newProjectData);
      setProject(newProjectData);
      setEditable(false);
    } catch (err) {
      console.log("Error", err);
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
  };

  const handleDelete = async () => {
    try {
      await ProjectAPI.destroy({ projectId: deleteProject.id });
      setDeleteProject();
      history.push("/admin/project");
    } catch (err) {
      console.log("Project delete error", err);
    }
  };

  const showSuccessNotification = (message) => {
    dispatch(showToast({ message }));
  };

  const showErrorNotification = (message) => {
    dispatch(showToast({ message, type: "error" }));
  };

  const handleChange = (value, field) => {
    var data = { ...newProjectData };
    data[field] = value;
    setNewProjectData(data);
  };

  const addMembers = async (id, profiles) => {
    try {
      let body = {
        update: newProjectData,
        owners: profiles.map((e) => e.id),
      };

      const response = await ProjectAPI.update(id, body);

      let newP = newProjectData;
      newP.owners = profiles;
      setNewProjectData(newP);
      setProject(newP);
      dispatch(showToast({ message: "Owners updated successfully!" }));
    } catch (err) {
      switch (err.response?.status) {
        case 401:
          dispatch(showToast({ message: "Unauthorized!", type: "error" }));
          break;
        default:
          dispatch(
            showToast({ message: err.response?.data?.message, type: "error" })
          );
      }
    }
  };

  return (
    <>
      <AddMembers
        type="Owners"
        selected={newProjectData?.owners}
        isOpen={showAddMembersModal}
        closeModal={() => setShowAddMembersModal(false)}
        id={newProjectData?.id}
        onUpdate={(id, profiles) => {
          addMembers(id, profiles);
          setShowAddMembersModal(false);
        }}
      />

      <ConfirmModal
        isOpen={!!deleteProject}
        closeModal={() => setDeleteProject(null)}
        onAccept={() => handleDelete()}
        text={
          <>
            Are you sure you want to delete the following project:{" "}
            {newProjectData?.title}
          </>
        }
      />
      <div className="pt-3 pb-4">
        <div className="bg-white p-5 rounded-xl relative">
          <div className="absolute top-3 left-3">
            <ArrowLeftIcon
              onClick={() => {
                setEditable(false);
              }}
              className="w-4 text-primary-gray-1000 mr-2"
            />
          </div>
          <CheckIcon
            onClick={() => {
              handleUpdate();
            }}
            className="h-4 w-4 text-caarya-red-lighter absolute top-3 right-3"
          />
          <form className="space-y-4">
            <div>
              <div className="rounded-lg">
                <img
                  className="rounded-lg h-20 w-auto mx-auto"
                  alt="..."
                  src={
                    newProjectData?.image
                      ? newProjectData?.image.url
                      : "/assets/svg/icon/rocket.svg"
                  }
                />
              </div>
              <div className="flex flex-row items-center justify-between">
                <div>
                  <label>Project Cover</label>
                  <ImageSelector
                    disabled={!isEditable}
                    showName={false}
                    image={newProjectData?.image}
                    onSuccess={(file) => handleChange(file, "image")}
                    onDelete={() => handleChange(null, "image")}
                  />
                </div>
                <div>
                  <Switch.Group as="div" className="flex items-start flex-col">
                    <Switch.Label
                      as="input-label"
                      className="mr-3 text-2xs text-primary-gray-1000 mb-1 font-lato"
                    >
                      Active
                    </Switch.Label>
                    <Switch
                      checked={newProjectData?.is_active}
                      onChange={() =>
                        handleChange(!newProjectData?.is_active, "is_active")
                      }
                      className={classNames(
                        newProjectData?.is_active
                          ? "bg-primary-yellow-light"
                          : "bg-primary-gray-200",
                        "relative inline-flex flex-shrink-0 h-4 w-8 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-yellow-light"
                      )}
                    >
                      <span
                        aria-hidden="true"
                        className={classNames(
                          newProjectData?.is_active
                            ? "translate-x-4"
                            : "translate-x-0",
                          "pointer-events-none inline-block h-3 w-3 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"
                        )}
                      />
                    </Switch>
                  </Switch.Group>
                </div>
              </div>
            </div>

            {newProjectData?.type !== PROJECT_TYPE_COMPANY_GOALS && (
              <div>
                <label>Project Type</label>
                <div className="w-full">
                  <ImageRadioInput
                    valueList={projectTypes.map((e) => e.value)}
                    lgGrid={2}
                    value={
                      projectTypes.find((e) => e.value == newProjectData?.type)
                        ?.value
                    }
                    setValue={(item) => {
                      handleChange(item, "type");
                    }}
                    labelList={projectTypes.map((e) => e.label)}
                    img={projectTypes.map((el) => ({
                      image: el?.image,
                      icon: el?.icon,
                    }))}
                  />
                </div>
              </div>
            )}

            <div className="mt-2">
              <div>
                <label>Project Category</label>
                <div className="w-full">
                  <RadioInput
                    value={newProjectData?.category}
                    setValue={(e) => {
                      handleChange(e, "category");
                    }}
                    list={ProjectCategories}
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col items-start">
              <label>Title</label>
              <input
                className="text-primary-gray-1000 border-0 px-0 focus:border-0 w-full focus:ring-0 focus:outline-none bg-transparent font-medium font-lato text-xs"
                invalid={fieldErrors?.title}
                placeholder="Title"
                type="text"
                value={newProjectData?.title}
                onChange={(e) => handleChange(e.target.value, "title")}
              />
              {fieldErrors.title?.msg && (
                <p className="text-3xs font-normal text-red-400 mt-0.5 font-lato">
                  {fieldErrors.title?.msg}
                </p>
              )}
            </div>

            <div>
              <label>Description</label>

              <input
                className="text-primary-gray-1000 border-0 px-0 focus:border-0 w-full focus:ring-0 focus:outline-none bg-transparent font-normal font-lato text-xs"
                disabled={!isEditable}
                invalid={fieldErrors?.description}
                placeholder="Description"
                type="textarea"
                value={newProjectData?.description}
                onChange={(e) => handleChange(e.target.value, "description")}
              />
              {fieldErrors.description?.msg && (
                <p className="text-3xs font-normal text-red-400 mt-0.5 font-lato">
                  {fieldErrors.description?.msg}
                </p>
              )}
            </div>
            <div className="w-full">
              <h1 className="font-normal text-primary-gray-1000 font-lato text-xs mb-2.5">
                Owners
              </h1>
              <div
                onClick={() => {
                  setShowAddMembersModal(true);
                }}
                className="mt-2 grid grid-cols-2 gap-4"
              >
                {newProjectData?.owners?.length > 0 &&
                  newProjectData?.owners.map((person) => {
                    return (
                      <div
                        className="flex flex-row items-center"
                        key={person?.id}
                      >
                        {person?.image?.url ? (
                          <img
                            src={person?.image?.url}
                            className="rounded-full h-8 w-8 mr-2"
                            alt=""
                          />
                        ) : (
                          <UserIcon className="rounded-full h-8 w-8 mr-2 theme-gray-500" />
                        )}
                        <p className="text-gray-700 font-lato font-normal text-2xs">
                          {person?.first_name}
                        </p>
                      </div>
                    );
                  })}
              </div>
              {newProjectData?.owners?.length === 0 && (
                <p
                  onClick={() => {
                    setShowAddMembersModal(true);
                  }}
                  className="text-primary-gray-450 font-lato font-normal text-2xs"
                >
                  Add Owners
                </p>
              )}
            </div>
            <div className="flex flex-row items-center">
              <div>
                <label>Start Date</label>
                <br />
                <DateInput
                  date={newProjectData?.start_date}
                  onChange={(value) => handleChange(value, "start_date")}
                />
              </div>

              <div>
                <label>End Date</label>
                <br />
                <DateInput
                  date={newProjectData?.end_date}
                  onChange={(value) => handleChange(value, "end_date")}
                />
              </div>
            </div>

            <div>
              {/* <div md="6">
                    <div>
                      <label>Offering</label>
                      <div className="w-full">
                        <Select
                          disabled={!isEditable}
                          options={lists.offerings?.map((item) => ({
                            value: item?.id,
                            label: item?.name,
                          }))}
                          onChange={(item) => {
                            setSelectedOffering(
                              item.value == "" ? null : item.value
                            );
                          }}
                          value={{
                            label:
                              lists.offerings?.find(
                                (e) => e.id === selectedOffering
                              )?.name || "None",
                            value:
                              lists.offerings?.find(
                                (e) => e.id === selectedOffering
                              )?.id || "",
                          }}
                        />
                      </div>
                    </div>
                  </div> */}

              {/* <div md="6">
                    <div>
                      <label>Node</label>
                      <div className="w-full">
                        <Select
                          disabled={!isEditable}
                          options={lists.nodes?.map((item) => ({
                            value: item?.id,
                            label: item?.title,
                          }))}
                          onChange={(item) => {
                            handleChange(
                              lists.nodes?.find((e) => e.id === item.value),
                              "node"
                            );
                          }}
                          value={{
                            label:
                              lists.nodes?.find(
                                (e) => e.id === newProjectData?.node?.id
                              )?.title || "None",
                            value:
                              lists.nodes?.find(
                                (e) => e.id === newProjectData?.node?.id
                              )?.id || "",
                          }}
                        />
                      </div>
                    </div>
                  </div> */}
            </div>
          </form>
          <div className="flex flex-div justify-end w-full">
            <div className="flex flex-div items-center justify-center">
              {/* {projectPermission(newProjectData) && (
                <button
                  divor="outline"
                  className="capitalize font-medium text-xs rounded"
                  onClick={() => {
                    setDeleteProject(newProjectData);
                  }}
                >
                  Delete
                </button>
              )} */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditBanner;

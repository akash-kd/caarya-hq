import { useState } from "react";
import { MinusIcon } from "@heroicons/react/outline";
import { destroy } from "config/APIs/project";
import ConfirmModal from "components/Modals/Common/ConfirmModal";
import { deleteAProject, fetchAllProjects } from "redux/projects";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useDispatch } from "react-redux";

function ProjectCard({ project }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [openMobileCreateModal, setOpenMobileCreateModal] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [deleteProject, setDeleteProject] = useState();
  const handleDelete = async () => {
    try {
      setDeleting(true);
      await destroy({ projectId: deleteProject.id });
      dispatch(deleteAProject({ id: deleteProject?.id }));
      setDeleteProject();
      dispatch(fetchAllProjects());
      setDeleting(false);
    } catch (err) {
      console.log("Project delete error", err);
    }
  };
  return (
    <>
      <ConfirmModal
        loader={deleting}
        isOpen={deleteProject ? true : false}
        closeModal={() => setDeleteProject(null)}
        onAccept={() => handleDelete()}
        text={
          <>
            Are you sure you want to delete the following battle front:{" "}
            {deleteProject?.title}
          </>
        }
      />
      <div className="bg-white shadow rounded-lg flex flex-col items-start space-y-8 p-4 relative">
        <div className="flex flex-col items-start space-y-2 text-primary-gray-800">
          <h1
            onClick={() => {
              history.push(`/project/${project?.id}`);
            }}
            className="cursor-pointer font-lato text-base font-semibold w-10/12"
          >
            {project?.title}
          </h1>
          <p className="font-lato text-sm font-light">{project?.description}</p>
        </div>
        <div className="px-2 flex flex-row items-center justify-between space-x-2 w-full">
          <div className="text-primary-gray-800 flex flex-row items-stretch -space-x-1 font-lato text-sm font-light">
            {project?.members?.length > 0 ? (
              project?.members?.map((a) => {
                return (
                  <img
                    src={a?.image?.url}
                    alt=""
                    className="bg-primary-gray-100 w-5 h-5 rounded-full object-cover"
                  />
                );
              })
            ) : (
              <p>No members</p>
            )}
          </div>
          <div
            onClick={() => {
              setOpenMobileCreateModal(project);
            }}
            className="text-primary-gray-800 font-lato font-semibold text-sm "
          >
            {project?.goalsLength || 0} Goals
          </div>
        </div>
        <MinusIcon
          onClick={() => {
            setDeleteProject(project);
          }}
          className="w-5 h-5 text-primary-gray-800 absolute right-4 cursor-pointer -top-4"
        />
      </div>
    </>
  );
}

export default ProjectCard;

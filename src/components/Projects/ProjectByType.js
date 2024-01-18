import EmptyState from "components/Comman/EmptyState";
import ProjectCard from "./ProjectCard";

function ProjectByType({ name, image, list, description, category }) {
  return (
    <>
      <div className="flex flex-col w-full space-y-12 py-2.5">
        <div className="flex flex-row items-center space-x-8">
          <div
            style={{ boxShadow: "0px 0px 64px 0px rgba(250, 251, 255, 0.30)" }}
            className="rounded-full lg:w-20 lg:h-20 bg-black bg-opacity-20 flex flex-row items-center justify-center"
          >
            <div
              style={{
                backgroundColor: image?.bgColor,
              }}
              className="w-16 h-16 text-white flex flex-row items-center justify-center rounded-full"
            >
              <div className="w-8 h-8">{image?.svg}</div>
            </div>
          </div>
          <div className="flex flex-col items-start text-primary-gray-800 space-y-2">
            <h1 className="text-2xl font-karla font-medium">{name}</h1>
            <p className="font-lato font-light text-base">
              {description ||
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore "}
            </p>
          </div>
        </div>
        <div className="lg:px-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {list?.length > 0 ? (
            list?.map((project) => {
              return <ProjectCard project={project} />;
            })
          ) : (
            <EmptyState
              image="/assets/images/empty/epic.png"
              text={`No projects for ${name}!`}
            />
          )}
          {/* <div
            onClick={() => {
              setAddNew(true);
            }}
            className="cursor-pointer addNewBattleCard text-primary-gray-800 py-10 px-4 flex flex-col items-center space-y-2"
          >
            <PlusIcon className="w-3 h-3" />
            <p className="font-lato text-base font-semibold">Add Battle Card</p>
          </div> */}
        </div>
      </div>
    </>
  );
}

export default ProjectByType;

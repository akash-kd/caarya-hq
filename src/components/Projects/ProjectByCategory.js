import ProjectByType from "./ProjectByType";

function ProjectByCategory({ list = [], types, category }) {
  return (
    <div className="flex flex-col w-full space-y-10 bg-primary-indigo-900 px-4 pb-20">
      {types?.map((type) => {
        return (
          <ProjectByType
            category={category}
            name={type?.name}
            image={type?.image}
            list={(list || [])?.find((a) => a?.name == type?.name)?.projects}
            description={type?.description}
          />
        );
      })}
    </div>
  );
}

export default ProjectByCategory;

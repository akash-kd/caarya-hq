import ProjectsPageMobile from "components/Projects/MobilePage";

function ProjectsPage() {
  return (
    <>
      <div className="block lg:hidden">
        <ProjectsPageMobile />
      </div>
      <div className="hidden lg:block"></div>
    </>
  );
}

export default ProjectsPage;

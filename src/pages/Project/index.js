import ProjectsPageLaptop from "components/Projects/LaptopPage";
import ProjectsPageMobile from "components/Projects/MobilePage";

function ProjectsPage() {
  return (
    <>
      {/* <div className="block lg:hidden">
        <ProjectsPageMobile />
      </div> */}
      <div className="block">
        <ProjectsPageLaptop />
      </div>
    </>
  );
}

export default ProjectsPage;

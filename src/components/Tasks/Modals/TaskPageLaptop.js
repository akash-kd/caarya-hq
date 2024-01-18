import Drawer from "@mui/material/Drawer";
import Tasks from "pages/Tasks/IndividualPage";

function TaskPageLaptop({ closeModal, isOpen, id }) {
  return (
    <Drawer
      anchor="right"
      PaperProps={{
        style: { borderRadius: "0px", maxHeight: "100vh", width: "560px" },
      }}
      open={isOpen}
      onClose={() => {
        closeModal();
      }}
      transitionDuration={250}
    >
      <div className="modals-component h-screen pt-10 px-5 transform transition-all ease-in-out duration-150">
        <Tasks taskId={isOpen ? id : null} closeModal={closeModal} />
      </div>
    </Drawer>
  );
}

export default TaskPageLaptop;

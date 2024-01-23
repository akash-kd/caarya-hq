import BreadCrumb from "components/Comman/BreadCrumb";
import SimpleTextArea from "components/Comman/Inputs/SimpleTextArea";
import PageHeader from "components/Comman/PageHeader";
import DailyUpdates from "components/TribeVibe/DailyUpdates";
import Engagements from "components/TribeVibe/Engagements";
import Vibe from "components/TribeVibe/Vibe";

function TribeVibe() {
  return (
    <div>
      <BreadCrumb page1="Tribe Vibe" />
      <div className="p-4 w-full flex h-[80vh] overflow-y-auto flex-col space-y-10">
        <PageHeader heading="Tribe Vibe" />
        <DailyUpdates />
        <Vibe />
        <Engagements />
      </div>
    </div>
  );
}

export default TribeVibe;

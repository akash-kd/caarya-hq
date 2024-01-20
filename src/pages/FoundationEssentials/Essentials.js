import { ArrowLeft } from "@phosphor-icons/react/dist/ssr";
import CGC from "components/Essentials/CGC";
import ForStartup from "components/Essentials/ForStartUps";
import ForStudents from "components/Essentials/ForStudents";
import FoundationEssentials from "components/Essentials/Foundation";
import KnowYourTribe from "components/Essentials/KnowYourTribe";
import Socials from "components/Essentials/Socials";
import ToolsAndProducts from "components/Essentials/ToolsAndProducts";
import TopicClusters from "components/Essentials/TopicClusters";
import Ventures from "components/Essentials/Ventures";
import { useParams, useHistory } from "react-router-dom";

function Essentials() {
  const { type } = useParams();
  const history = useHistory();
  return (
    <>
      <div
        onClick={() => {
          history.goBack();
        }}
        className="w-full cursor-pointer fixed top-12 space-x-2 font-lato text-xs z-[50] right-0 left-0 bg-white flex flex-row items-center py-2.5 px-4"
      >
        <ArrowLeft />
        <p>Back</p>
      </div>
      <div className="mt-5">
        {type == "kyt" && <KnowYourTribe />}
        {type == "essentials" && <FoundationEssentials />}
        {type == "toolsProducts" && <ToolsAndProducts />}
        {type == "clusters" && <TopicClusters />}
        {type == "cgc" && <CGC />}
        {type == "students" && <ForStudents />}
        {type == "startups" && <ForStartup />}
        {type == "ventures" && <Ventures />}
        {type == "socials" && <Socials />}
      </div>
    </>
  );
}

export default Essentials;

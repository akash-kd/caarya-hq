import { ArrowLeft } from "@phosphor-icons/react/dist/ssr";
import CGC from "components/Essentials/CGC";
import ForStartup from "components/Essentials/ForStartUps";
import ForStudents from "components/Essentials/ForStudents";
import FoundationEssentials from "components/Essentials/Foundation";
import KnowYourTribe from "components/Essentials/KnowYourTribe";
import Socials from "components/Essentials/Socials";
import ToolsAndProducts from "components/Essentials/ToolsAndProducts";
import TopicClusters from "components/Essentials/TopicClusters";
import Values from "components/Essentials/Values";
import Ventures from "components/Essentials/Ventures";
import What from "components/Essentials/What";
import { useParams } from "react-router-dom";

function Essentials() {
  const { type } = useParams();
  return (
    <>
      {type == "kyt" && <KnowYourTribe />}
      {type == "essentials" && <FoundationEssentials />}
      {type == "toolsProducts" && <ToolsAndProducts />}
      {type == "clusters" && <TopicClusters />}
      {type == "cgc" && <CGC />}
      {type == "students" && <ForStudents />}
      {type == "startups" && <ForStartup />}
      {type == "ventures" && <Ventures />}
      {type == "socials" && <Socials />}
      {type == "values" && <Values />}
      {type == "what" && <What />}
    </>
  );
}

export default Essentials;

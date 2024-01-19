import Card from "components/Dashboard/Card";
import { ArrowLeft } from "@phosphor-icons/react/dist/ssr";
import { useHistory } from "react-router-dom";
const list = [
  { name: "What is Caarya", key: "ftpCount" },
  { name: "Caarya for Students", key: "applicantInFTP" },
  { name: "Caarya for Startups", key: "applicantInFTP" },
  { name: "Caarya for Ventures", path: "/learning" },
  { name: "Our Values", key: "eventCount" },
  { name: "Caarya Growth Centers (CGCs)", key: "newApplicantCount" },
  { name: "CREWs", key: "researchDoneCount" },
  { name: "Topic Clusters", key: "researchDoneCount" },
  { name: "Our Socials", key: "researchDoneCount" },
  { name: "Tools and Products", key: "researchDoneCount" },
];

function FoundationEssentials() {
  const history = useHistory();
  return (
    <>
      <div
        onClick={() => {
          history.goBack();
        }}
        className="w-full fixed top-12 space-x-2 font-lato text-xs z-[50] right-0 left-0 bg-white flex flex-row items-center py-2.5 px-4"
      >
        <ArrowLeft />
        <p>Back</p>
      </div>{" "}
      <div className="bg-primary-gray-50 mt-5 px-4 w-full pt-4 pb-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 h-85vh lg:h-auto overflow-y-auto">
        {list?.map((item) => {
          return <Card item={item} />;
        })}
      </div>
    </>
  );
}

export default FoundationEssentials;

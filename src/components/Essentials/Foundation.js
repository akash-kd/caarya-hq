import Card from "components/Dashboard/Card";
const list = [
  { name: "What is Caarya", key: "ftpCount" },
  { name: "Caarya for Students", path: "/essentials/students" },
  { name: "Caarya for Startups", path: "/essentials/startups" },
  { name: "Caarya for Ventures", path: "/essentials/ventures" },
  { name: "Our Values", key: "eventCount" },
  { name: "Caarya Growth Centers (CGCs)", path: "/essentials/cgc" },
  { name: "CREWs", path: "/essentials/cgc" },
  { name: "Topic Clusters", path: "/essentials/clusters" },
  { name: "Our Socials", path: "/essentials/socials" },
  { name: "Tools and Products", path: "/essentials/toolsProducts" },
];

function FoundationEssentials() {
  return (
    <>
      <div className="bg-primary-gray-50 px-4 w-full pt-4 pb-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 h-85vh lg:h-auto overflow-y-auto">
        {list?.map((item) => {
          return <Card item={item} />;
        })}
      </div>
    </>
  );
}

export default FoundationEssentials;

import Card from "./Card";

const list = [
  { name: "Know your tribe", path: "/essentials/kyt" },
  { name: "Events Calendar", key: "applicantInFTP" },
  { name: "Foundation Essentials", path: "/essentials/essentials" },
  { name: "Knowledge Boosters", path: "/learning" },
  { name: "Chronicles ", key: "eventCount" },
  { name: "Let's talk about us", key: "newApplicantCount" },
  { name: "Let's make us better", key: "researchDoneCount" },
];

function Verse() {
  return (
    <div className="bg-primary-gray-50 -mt-2 px-4 w-full pt-4 pb-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 h-85vh lg:h-auto overflow-y-auto">
      {list?.map((item) => {
        return <Card item={item} />;
      })}
    </div>
  );
}

export default Verse;

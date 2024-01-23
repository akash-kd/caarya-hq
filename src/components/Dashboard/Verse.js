import BreadCrumb from "components/Comman/BreadCrumb";
import Card from "./Card";
import PageHeader from "components/Comman/PageHeader";

const list = [
  {
    name: "Know your tribe",
    path: "/essentials/kyt",
    image: "/assets/images/essentials/1.png",
  },
  {
    name: "Events Calendar",
    key: "applicantInFTP",
    image: "/assets/images/essentials/2.png",
  },
  {
    name: "Foundation Essentials",
    path: "/essentials/essentials",
    image: "/assets/images/essentials/3.png",
  },
  {
    name: "Knowledge Boosters",
    path: "/learning",
    image: "/assets/images/essentials/4.png",
  },
  {
    name: "Chronicles ",
    key: "eventCount",
    image: "/assets/images/essentials/5.png",
  },
  {
    name: "Let's talk about us",
    key: "newApplicantCount",
    image: "/assets/images/essentials/6.png",
  },
  {
    name: "Let's make us better",
    key: "researchDoneCount",
    image: "/assets/images/essentials/7.png",
  },
];

function Verse() {
  return (
    <div className="">
      <BreadCrumb page1="Essentials" />{" "}
      <div className="px-4 w-full pt-4 pb-20 grid grid-cols-1 gap-6 h-85vh lg:h-auto overflow-y-auto">
        <PageHeader heading="Essentials" />
        {list?.map((item) => {
          return <Card item={item} />;
        })}
      </div>
    </div>
  );
}

export default Verse;

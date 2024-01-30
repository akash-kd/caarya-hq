import BreadCrumb from "components/Comman/BreadCrumb";
import Header from "./Header";
import Assessment from "components/Comman/Buttons/Assessment";

function Ventures() {
  return (
    <>
      <BreadCrumb
        back
        page1="Essentials"
        page2="Foundation Essentials"
        page3="Caarya For Ventures"
      />
      <div
        id="indulgence"
        className="h-[80vh] overflow-y-auto pb-10 relative indulgence-bg"
      >
        <div className="container px-4 md:px-20 mx-auto flex flex-wrap flex-col md:flex-row items-center">
          <div className="w-full min-h-screen">
            <div className="w-full flex flex-col items-center justify-center space-y-2 lg:space-y-4">
              <Header
                name="Caarya For Ventures"
                image="/assets/images/essentials/foundation/4.png"
              />

              <div className="w-full max-w-[100vw] z-20 flex flex-row items-center justify-center">
                <h4 className="text-2xl md:text-[32px] font-normal tracking-[2.4px] lg:tracking-[3.2px] lg:leading-[48px] text-black text-center font-satoshi leading-9 w-max">
                  Career Fluidity For Democratized Venture Development{" "}
                </h4>
              </div>

              <div className="w-full max-w-[100vw] z-20 flex flex-row items-center justify-center">
                <h4 className="text-sm font-light lg:text-base leading-6 tracking-[0.35px] text-primary-neutral-500 text-center font-lato max-w-4xl capitalize">
                  Introducing The Future Of{" "}
                  <span className="text-primary-red-medium">
                    Education And Work
                  </span>{" "}
                  Through Collaborative Upskilling And Purpose Driven Career
                  Growth.
                </h4>
              </div>
            </div>
            <ul className="relative max-w-6xl lg:mx-5 xl:mx-auto lg:px-3 pt-8 md:px-8 xl:px-0 mb-16">
              <div className="w-0.5 rounded absolute top-5 left-1/2 bottom-0 hidden lg:block" />
              <IndulgenceCard
                item={{
                  name: "Future-Ready Talent Dynamics",
                  description:
                    "Caarya melds virtual work environments with ongoing upskilling, creating a talent ecosystem that balances technical prowess with human empathy. This approach prepares ventures for the evolving professional world, ensuring a workforce adept in both current and future challenges.",
                  image:
                    window?.innerWidth < 1024
                      ? "/assets/images/essentials/ventures/mobile1.svg"
                      : "/assets/images/essentials/ventures/1.svg",
                }}
                bgColor="#f5fefe"
              />
              <IndulgenceCardReverse
                item={{
                  name: "Collaborative Venture Evolution",
                  description:
                    "Bridging educational outputs with industry needs, Caarya democratizes venture development. We emphasize remote collaboration and ethical workplace culture, fostering an environment ripe for creativity and critical thinking.",

                  image:
                    window?.innerWidth < 1024
                      ? "/assets/images/essentials/ventures/mobile2.svg"
                      : "/assets/images/essentials/ventures/2.svg",
                }}
                bgColor="#eefdfe"
              />
              <IndulgenceCard
                item={{
                  name: "Vision-Centric Work Culture",
                  description:
                    "Focusing beyond traditional employment models, Caarya cultivates a vision-centric work culture. We leverage global trends and AI readiness to align personal goals with collective visions, fostering a workforce driven by passion and innovation.",

                  image:
                    window?.innerWidth < 1024
                      ? "/assets/images/essentials/ventures/mobile3.svg"
                      : "/assets/images/essentials/ventures/3.svg",
                }}
                bgColor="#f5fefe"
              />
              <IndulgenceCardReverse
                item={{
                  name: "Streamlining Ventures with Digital Efficiency",
                  description:
                    "Caarya champions digital proficiency in venture operations, reducing costs through remote work strategies and cross-cultural training. This approach ensures an adaptable and efficient workforce, ready for the digital-first business era.",

                  image:
                    window?.innerWidth < 1024
                      ? "/assets/images/essentials/ventures/mobile4.svg"
                      : "/assets/images/essentials/ventures/4.svg",
                }}
                bgColor="#eefdfe"
              />
            </ul>
            <Assessment />
          </div>
        </div>
      </div>
    </>
  );
}

export default Ventures;

function IndulgenceCard({ item, bgColor }) {
  return (
    <li className="max-w-5xl mx-auto flex flex-col-reverse lg:flex-row items-start lg:items-center justify-between w-full py-6 md:py-16 relative z-20">
      <div className="lg:w-1/2 flex flex-col items-center text-center justify-center space-y-2 pb-8 pt-8 lg:pt-2.5  z-20 lg:bg-transparent lg:pr-8">
        <h1 className="text-lg lg:text-2xl font-light leading-7 lg:leading-9 text-primary-red-medium font-poppins lg:tracking-[1.2px]">
          {item?.name}
        </h1>
        <p className="text-sm font-inter mb-8 leading-5 lg:tracking-[0.7px] text-primary-neutral-800 lg:w-11/12 font-light">
          {item?.description}
        </p>
      </div>

      <div className="float-right lg:w-1/2 mx-auto  md:mt-0  z-20 lg:bg-transparent pb-0">
        <img src={item?.image} alt="" className="object-contain mx-auto" />
      </div>
    </li>
  );
}

function IndulgenceCardReverse({ item, bgColor }) {
  return (
    <li className="max-w-5xl mx-auto flex flex-col-reverse lg:flex-row-reverse items-start lg:items-center justify-between w-full py-6 md:py-16 relative z-20">
      <div className="lg:w-1/2 flex flex-col items-center text-center justify-center space-y-4 pb-8 pt-8 lg:pt-2.5  z-20 lg:bg-transparent lg:pl-8">
        <h1 className="text-lg lg:text-2xl font-light leading-7 lg:leading-9 text-primary-red-medium font-poppins lg:tracking-[1.2px]">
          {item?.name}
        </h1>
        <p className="text-sm font-inter mb-8 leading-5 lg:tracking-[0.7px] text-primary-neutral-800 lg:w-11/12 font-light">
          {item?.description}
        </p>
      </div>
      <div className="float-right lg:w-1/2 mx-auto  md:mt-0 z-20 lg:bg-transparent">
        <img src={item?.image} alt="" className="object-contain mx-auto" />
      </div>
    </li>
  );
}

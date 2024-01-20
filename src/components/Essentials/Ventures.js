import React, { useState, useEffect, useRef } from "react";
// import {
//   useScroll,
//   motion,
//   useMotionValueEvent,
//   useAnimation,
// } from "framer-motion";

// import { useInView } from "react-intersection-observer";
// import { ScrollReveal } from "Components/Common/Helpers/ScrollReveal";

const cardsVariant = {
  visible: {
    opacity: 1,
    transition: { duration: 0.3 },
    translateY: 0,
  },
  hidden: { opacity: 0, translateY: "30%" },
};

function Ventures() {
  //   const [ref, inView] = useInView();
  //   const [ref2, inView2] = useInView();
  //   const { scrollYProgress, scrollY } = useScroll();
  //   const [scrollOffset, setScrollOffset] = useState(-150);
  //   const [fadeOffset, setFadeOffset] = useState();
  //   const [fadeOffsetDiff, setFadeOffsetDiff] = useState(0);
  //   const [maxHeight, setMaxHeight] = useState();
  //   const control_1 = useAnimation();
  //   const control_2 = useAnimation();
  //   const [scrollLegth, setScrollLength] = useState(0);

  //   useEffect(() => {
  //     console.log("inView", inView);
  //     if (inView && fadeOffset - fadeOffsetDiff + 200 >= maxHeight) {
  //       control_1.start("visible");
  //     }
  //   }, [inView, scrollYProgress, fadeOffset, fadeOffsetDiff, maxHeight]);
  //   useEffect(() => {
  //     console.log("inView", inView2);
  //     if (inView2) {
  //       control_2.start("visible");
  //     }
  //   }, [inView2]);
  //   useEffect(() => {
  //     if (window.innerWidth <= 1130 && window.innerWidth > 768) {
  //       setScrollLength("50px");
  //     } else if (window.innerWidth <= 768) {
  //       setScrollLength("20px");
  //     } else {
  //       setScrollLength("60px");
  //     }
  //   }, []);
  //   useEffect(() => {
  //     if (window.innerWidth < 768) {
  //       setScrollOffset(-300);
  //     } else {
  //       setScrollOffset(-500);
  //     }
  //   }, []);
  //   const onScrollPage = () => {
  //     const offset = window?.scrollY;
  //     if (offset > 8 && !maxHeight) {
  //       var ele1 = document.getElementById("indulgence");
  //       if (ele1) {
  //         var offsetHeight = ele1.offsetHeight;
  //         setMaxHeight(offsetHeight - 1000);
  //       }
  //     }
  //     let ele = document.getElementById("indulgence");
  //     if (ele1) {
  //       let offsetDiv = ele.offsetTop;
  //       setFadeOffsetDiff(offsetDiv - 200);
  //       console.log("ppp", offset, offsetDiv);
  //     }
  //     console.log("ppp", offset);
  //   };

  //   useEffect(() => {
  //     window.addEventListener("scroll", onScrollPage, true);
  //     return () => {
  //       window.removeEventListener("scroll", onScrollPage);
  //     };
  //   }, []);
  //   useEffect(() => {}, []);
  //   useMotionValueEvent(scrollY, "change", (latest) => {
  //     console.log(
  //       "Page scroll: ",
  //       latest,
  //       fadeOffset - fadeOffsetDiff,
  //       maxHeight
  //     );
  //     setFadeOffset(latest);
  //   });

  return (
    <div
      id="indulgence"
      className="h-[80vh] overflow-y-auto pb-10 relative indulgence-bg"
    >
      <div className="container px-4 md:px-20 mx-auto flex flex-wrap flex-col md:flex-row items-center">
        <div className="w-full min-h-screen">
          <div className="w-full flex flex-col items-center justify-center space-y-2 lg:space-y-4">
            {/* <ScrollReveal offset={scrollOffset}> */}
            <div
              //   ref={ref2}
              variants={cardsVariant}
              initial="hidden"
              //   animate={control_2}
              className="mt-6 py-4 w-full max-w-[100vw] z-20 flex flex-row items-center justify-center"
            >
              <h4 className="text-xs font-light md:text-sm uppercase px-6 leading-normal text-primary-peddle-500 tracking-[1.2px] lg:tracking-[1.4px] text-center font-poppins pb-2 border-b-2 lg:border-b-4 w-max border-primary-red-medium">
                Students For Startups
              </h4>
            </div>
            {/* </ScrollReveal> */}

            {/* <ScrollReveal offset={scrollOffset}> */}
            <div
              //   ref={ref2}
              variants={cardsVariant}
              initial="visible"
              //   animate={control_2}
              className="w-full max-w-[100vw] z-20 flex flex-row items-center justify-center"
            >
              <h4 className="text-2xl font-light md:text-[32px] px-6 leading-9 tracking-[2.4px] lg:tracking-[3.2px] lg:leading-[48px] text-black text-center font-poppins w-max">
                Career Fluidity For Democratized Venture Development
              </h4>
            </div>
            {/* </ScrollReveal> */}

            {/* <ScrollReveal offset={scrollOffset}> */}
            <div
              //   ref={ref2}
              variants={cardsVariant}
              initial="visible"
              //   animate={control_2}
              className="w-full max-w-[100vw] z-20 flex flex-row items-center justify-center"
            >
              <h4 className="text-sm font-light md:text-base leading-normal text-primary-neutral-800 text-center font-inter max-w-4xl capitalize">
                Introducing the{" "}
                <span className="text-primary-red-medium">
                  future of education and work
                </span>{" "}
                through collaborative upskilling and purpose driven career
                growth.
              </h4>
            </div>
            {/* </ScrollReveal> */}
          </div>
          <ul className="relative max-w-6xl lg:mx-5 xl:mx-auto lg:px-3 pt-8 md:px-8 xl:px-0">
            <div
              //   style={{
              //     height:
              //       fadeOffset - fadeOffsetDiff > maxHeight
              //         ? maxHeight
              //         : fadeOffset - fadeOffsetDiff < 0
              //         ? 10
              //         : fadeOffset - fadeOffsetDiff,
              //     backgroundColor: "#F3F2F2",
              //   }}
              className="w-0.5 rounded absolute top-5 left-1/2 bottom-0 hidden lg:block"
            />
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
        </div>
      </div>
    </div>
  );
}

export default Ventures;

function IndulgenceCard({ item, bgColor }) {
  //   const [ref, inView] = useInView();
  //   const { scrollYProgress } = useScroll();
  //   const control_1 = useAnimation();
  //   const control_2 = useAnimation();
  //   useEffect(() => {
  //     console.log("inView", inView);
  //     if (inView) {
  //       control_1.start("visible");
  //       setTimeout(() => {
  //         control_2.start("visible");
  //       }, 200);
  //     }

  //   }, [inView, scrollYProgress]);

  return (
    <li className="max-w-5xl mx-auto flex flex-col-reverse lg:flex-row items-start lg:items-center justify-between w-full py-6 md:py-16 relative z-20">
      <div
        // ref={ref}
        variants={cardsVariant}
        initial="visible"
        // animate={control_1}
        // style={{
        //   background: window.innerWidth < 768 ? bgColor : "transparent",
        // }}
        className="lg:w-1/2 flex flex-col items-center text-center justify-center space-y-2 pb-8 pt-8 lg:pt-2.5  z-20 lg:bg-transparent lg:pr-8"
      >
        <h1 className="text-lg lg:text-2xl font-light leading-7 lg:leading-9 text-primary-red-medium font-poppins lg:tracking-[1.2px]">
          {item?.name}
        </h1>
        <p className="text-sm font-inter mb-8 leading-5 lg:tracking-[0.7px] text-primary-neutral-800 lg:w-11/12 font-light">
          {item?.description}
        </p>
      </div>

      <div
        variants={cardsVariant}
        initial="visible"
        // animate={control_2}
        className="float-right lg:w-1/2 mx-auto  md:mt-0  z-20 lg:bg-transparent pb-0"
      >
        <img src={item?.image} alt="" className="object-contain mx-auto" />
      </div>
    </li>
  );
}

function IndulgenceCardReverse({ item, bgColor }) {
  //   const [ref, inView] = useInView();
  //   const { scrollYProgress } = useScroll();
  //   const control_1 = useAnimation();
  //   const control_2 = useAnimation();
  //   useEffect(() => {
  //     console.log("inView", inView);
  //     if (inView) {
  //       control_1.start("visible");
  //       setTimeout(() => {
  //         control_2.start("visible");
  //       }, 200);
  //     }
  //     // else {
  //     //     control_2.start("hidden");

  //     //     control_1.start("hidden");
  //     // }
  //   }, [inView, scrollYProgress]);

  return (
    <li className="max-w-5xl mx-auto flex flex-col-reverse lg:flex-row-reverse items-start lg:items-center justify-between w-full py-6 md:py-16 relative z-20">
      {/* <Fade direction="left" delay="250"> */}
      <div
        // ref={ref}
        variants={cardsVariant}
        initial="visible"
        // style={{
        //   background: window.innerWidth < 768 ? bgColor : "transparent",
        // }}
        // animate={control_1}
        className="lg:w-1/2 flex flex-col items-center text-center justify-center space-y-4 pb-8 pt-8 lg:pt-2.5  z-20 lg:bg-transparent lg:pl-8"
      >
        <h1 className="text-lg lg:text-2xl font-light leading-7 lg:leading-9 text-primary-red-medium font-poppins lg:tracking-[1.2px]">
          {item?.name}
        </h1>
        <p className="text-sm font-inter mb-8 leading-5 lg:tracking-[0.7px] text-primary-neutral-800 lg:w-11/12 font-light">
          {item?.description}
        </p>
      </div>
      {/* </Fade>
                                        <Fade direction="right" delay="250"> */}
      <div
        variants={cardsVariant}
        initial="visible"
        // animate={control_2}
        className="float-right lg:w-1/2 mx-auto  md:mt-0 z-20 lg:bg-transparent"
      >
        <img src={item?.image} alt="" className="object-contain mx-auto" />
      </div>
      {/* </Fade> */}
    </li>
  );
}

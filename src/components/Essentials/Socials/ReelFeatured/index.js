function ReelFeatured() {
  return (
    <div>
      <section className="py-8 inter">
        <div className="container max-w-5xl mx-auto m-8">
          <h1 className="pt-2 font-poppins px-6 mx-auto mb-12 text-primary-neutral-800 text-2xl md:text-3.5xl font-medium lg:tracking-[3.2px] text-center  pb-2 border-b-2 lg:border-b-4 w-max border-primary-red-medium">
            Across The Network
          </h1>

          {/* <div className="w-full mb-4 mt-4">
            <div className="h-1 mx-auto red-gradient w-64 my-0 py-0 rounded-t"></div>
          </div> */}
          <div className="flex flex-wrap md:flex-row-reverse flex-row my-8">
            <div className="w-full flex md:w-1/2 px-6">
              <img
                className="w-full rounded-xl object-scale-down"
                src="/assets/images/essentials/socials/event.png"
                alt=""
              />
            </div>

            <div className="w-full flex flex-col md:w-1/2 p-6 mt-6 md:mt-0">
              <p className="mb-6 text-black font-poppins text-xl font-medium lg:tracking-[2.4px]">
                Community Watch
              </p>
              <p className="text-black inter font-light lg:leading-7 lg:tracking-[1.28px] mb-8">
                Community engagements that foster team building by promoting
                collaboration, communication, and shared experiences.
              </p>
              <p className="text-black inter font-light lg:leading-7 lg:tracking-[1.28px] mb-8">
                Our events offer insights into professional work, allowing team
                members to showcase skills, learn from peers, and stay updated
                on industry trends. In startup culture, these engagements help
                students to cultivate a sense of belonging, reinforcing a
                collective mission and passion{" "}
              </p>
              {/* <button className="inter px-3 w-1/2 self-center sm:self-start py-2 mt-4 text-sm font-medium text-white uppercase red-gradient rounded-md hover:bg-indigo-500 focus:outline-none focus:bg-indigo-500">
                Click for a Club Collaboration
              </button> */}
            </div>
          </div>

          <div className="flex flex-wrap flex-row my-8">
            <div className="w-full flex md:w-1/2 px-6 mt-0">
              <img
                className="w-full rounded-xl object-scale-down"
                src="/assets/images/essentials/socials/bottle.jpeg"
                alt=""
              />
            </div>

            <div className="w-full flex flex-col md:w-1/2 p-6 mt-6 md:mt-0">
              <p className="mb-6 text-black font-poppins text-xl font-medium lg:tracking-[2.4px]">
                {" "}
                Slow Living as a Lifestyle Choice
              </p>
              <p className="text-black inter font-light lg:leading-7 lg:tracking-[1.28px] mb-8">
                It means living your life at the right pace for a state of
                bliss. Slow Living brings self-awareness and intention into
                everything that we do. In essence, it is about value creation in
                life, knowing and helping our environment to become sustainable.
              </p>
              <p className="text-black inter font-light lg:leading-7 lg:tracking-[1.28px]">
                <b>What’s In </b> - Being in the Moment, Sustainability, Right
                Pace, Self Awareness. <br />
                <b>What’s out </b> - Rat Race, Hustle, Grind, Material Wealth as
                a source of Pleasure.
              </p>
              {/* <button className="inter px-3 w-1/2 self-center sm:self-start py-2 mt-4 text-sm font-medium text-white uppercase red-gradient rounded-md hover:bg-indigo-500 focus:outline-none focus:bg-indigo-500">
                Make a difference today
              </button> */}
            </div>
          </div>

          <div className="flex flex-wrap md:flex-row-reverse flex-row my-8">
            <div className="w-full flex md:w-1/2 px-6">
              <img
                className="w-full rounded-xl object-scale-down"
                src="/assets/images/essentials/socials/product.png"
                alt=""
              />
            </div>

            <div className="w-full flex flex-col md:w-1/2 p-6 mt-6 md:mt-0">
              <p className="mb-6 text-black font-poppins text-xl font-medium lg:tracking-[2.4px]">
                {" "}
                Product Watch
              </p>
              <p className="text-black inter font-light lg:leading-7 lg:tracking-[1.28px] mb-8">
                Forge is a transformative productivity application designed to
                empower students in managing their work, academics, and personal
                goals with precision. Through intuitive features and a
                mobile-first interface, Forge facilitates holistic time
                management, personalized goal setting, and efficient progress
                tracking, ensuring students achieve their aspirations with
                clarity and ease.{" "}
              </p>
              {/* <button className="inter px-3 w-1/2 self-center sm:self-start py-2 mt-4 text-sm font-medium text-white uppercase red-gradient rounded-md hover:bg-indigo-500 focus:outline-none focus:bg-indigo-500">
                Click for a Club Collaboration
              </button> */}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ReelFeatured;

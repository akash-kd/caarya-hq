function ReelFollowUs({ bgColor = "gradient" }) {
  return (
    <div className="py-8 font-inter">
      <section className="container w-full mx-auto m-8">
        <div className="w-full flex flex-col items-center max-w-7xl mx-auto bg-[#edffff] lg:rounded-[5em] p-16">
          <h1 className="w-full mt-10 mb-3 text-3xl  font-semibold leading-tight text-center text-primary-peddle-500">
            Follow The <span className="text-primary-red-medium">Caarya</span>{" "}
            Network
          </h1>
          <div className="w-full mb-4">
            <div className="h-1 mx-auto bg-white w-1/6 opacity-25 my-0 py-0 rounded-t"></div>
          </div>

          <div className="flex flex-row justify-center pb-16 pt-6">
            <a
              className="p-3"
              href="https://www.instagram.com/caarya.in/?igshid=MDM4ZDc5MmU%3D"
              target="blank"
            >
              <img
                src="/assets/images/essentials/socials/instaBlack.png"
                className="w-12 cursor-pointer hover:opacity-75"
              />
            </a>
            <a
              className="p-3"
              href="https://www.linkedin.com/company/caarya/"
              target="blank"
            >
              <img
                src="/assets/images/essentials/socials/linkedinBlack.png"
                className="w-12 cursor-pointer hover:opacity-75"
              />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ReelFollowUs;

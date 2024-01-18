function Unauthorized() {
  return (
    <div className="w-screen h-screen flex flex-col-reverse md:flex-row items-center justify-center md:space-x-20 p-6 2xl:p-20">
      <div className="w-full md:w-1/2 max-w-lg flex flex-col items-start space-y-6">
        <h1 className="text-primary-red-medium font-karla font-medium text-2xl md:text-4xl">
          You Shall Not Pass...Yet
        </h1>
        <p className="text-primary-gray-1000 font-lato text-sm md:text-base">
          It looks like you've stumbled upon something you can't access just
          yet. Don't worry, it's not you, it's us!
        </p>
        <p className="text-primary-gray-1000 font-lato text-sm md:text-base">
          Seems like you don't have the right credentials to view this content,
          but no problem. If you think this is just a silly mistake, feel free
          to reach out to the admin for a quick fix.
        </p>
        <p className="text-primary-gray-1000 font-lato text-sm md:text-base">
          Thanks for stopping by!
        </p>
      </div>

      <img
        src="/assets/images/empty/accessDenied.svg"
        alt=""
        className="w-full md:w-1/2 max-w-lg h-auto mb-8 md:mb-0"
      />
    </div>
  );
}

export default Unauthorized;

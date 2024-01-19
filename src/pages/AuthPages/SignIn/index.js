import { useHistory } from "react-router-dom";
import LoginCard from "./LoginCard";

function SignIn() {
  const history = useHistory();
  return (
    <section
      className={`relative min-h-[100vh] max-w-[100vw] overflow-y-auto flex flex-col items-center lg:justify-center lg:space-y-14 space-y-[50px] px-4 py-6 mt-[2vh]`}
    >
      <div className="flex flex-col items-center space-y-1.5 lg:space-y-3">
        <img
          src="/assets/caaryaLogos/logo.png"
          alt=""
          className="w-16 h-16 lg:w-20 lg:h-20 scale-105 lg:scale-150"
        />
        <p className="font-poppins text-3xl lg:text-5xl font-semibold text-primary-red-500">
          caarya{" "}
          <span className="font-light text-2xl lg:text-4xl font-manrope">
            HQ
          </span>
        </p>
        <p className="font-satoshi capitalize text-sm lg:text-lg font-light text-primary-neutral-800 tracking-[1.4px]">
          Keep calm and #caaryaon
        </p>
      </div>
      <LoginCard />
    </section>
  );
}

export default SignIn;

import DateTime from "components/Comman/DateTime";
import { useEffect, useState } from "react";
import { useRouteMatch } from "react-router-dom";
import { privateRoutes } from "routes/PrivateRoute";

function PageHeader() {
  const routes = useRouteMatch();
  const [heading, setHeading] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    let page = privateRoutes?.find((p) => p?.path == routes?.path);

    setHeading(page?.name);
    setDescription(page?.description);
  }, []);

  return (
    <div className="flex flex-row items-start justify-between">
      <div className="md:w-8/12 relative">
        <h1
          className={`text-2xl hidden md:flex flex-row items-center text-left font-medium font-karla tracking-tight text-primary-gray-1000`}
        >
          <p>{heading ? heading : ""} </p>
        </h1>
        <p className="font-lato text-sm mt-2.5 text-primary-gray-250">
          {description}
        </p>
      </div>
      <DateTime />
    </div>
  );
}

export default PageHeader;

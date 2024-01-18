export default function BRD({ brd, project }) {
  return (
    <section className="mt-8 pb-8 w-full lg:w-1/2 px-5">
      <h2 className="text-xl capitalize text-primary-yellow-dark font-semibold">
        Business Requirement Document
      </h2>
      <div className="mt-5 shadow-lg p-4 rounded-lg bg-white">
        <h3 className="text-base capitalize font-semibold">Methodology</h3>
        <p className="text-sm text-gray-400 mt-2">{brd?.methodology || "-"}</p>
      </div>
      <div className="mt-5 shadow-lg p-4 rounded-lg bg-white">
        <h3 className="text-base capitalize font-semibold">
          Problem Statement
        </h3>
        <p className="text-sm text-gray-400 mt-2">
          {brd?.problemStatement || "-"}
        </p>
      </div>

      <div className="mt-5 shadow-lg p-4 rounded-lg bg-white">
        <h3 className="text-base capitalize font-semibold">Project Overview</h3>
        <ul className="text-sm mt-2 list-disc ml-8">
          <li className="mb-2">
            <h5 className="font-semibold mb-1.5">Project Description</h5>
            <p className="text-gray-400 ">{brd?.description || "-"}</p>
          </li>
          <li className="mb-2">
            <h5 className="font-semibold mb-1.5">Business Objective</h5>
            <p className="text-gray-400 ">{brd?.businessObjectives || "-"}</p>
          </li>
          <li className="mb-2">
            <h5 className="font-semibold mb-1.5">Business Goals</h5>
            <p className="text-gray-400 ">{brd?.businessGoals || "-"}</p>
          </li>
        </ul>
      </div>

      <div className="mt-5 shadow-lg p-4 rounded-lg bg-white">
        <h3 className="text-base capitalize font-semibold mb-3">
          Success Indicators
        </h3>
        <div className="flex gap-2">
          {brd.successIndicators?.length > 0
            ? brd.successIndicators?.map((i) => {
                return (
                  <div className="bg-primary-yellow-100 px-3 py-1 text-sm font-normal rounded-md shadow-sm">
                    {i}
                  </div>
                );
              })
            : "-"}
        </div>
      </div>

      <div className="mt-5 shadow-lg p-4 rounded-lg bg-white">
        <h3 className="text-base capitalize font-semibold">
          System Perspective
        </h3>
        <ul className="text-sm mt-2 list-disc ml-8">
          <li className="mb-2">
            <h5 className="font-semibold mb-1.5">Assumptions</h5>
            <p className="text-gray-400 ">{brd?.assumptions || "-"}</p>

            {/* <ol className="list-decimal ml-4">
              <li className="text-gray-400 ">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit
              </li>
              <li className="text-gray-400 ">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit
              </li>
              <li className="text-gray-400 ">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit
              </li>
            </ol> */}
          </li>
          <li className="mb-2">
            <h5 className="font-semibold mb-1.5">Constraints</h5>
            <p className="text-gray-400 ">{brd?.constraints || "-"}</p>
            {/* <ol className="list-decimal ml-4">
              <li className="text-gray-400 ">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit
              </li>
              <li className="text-gray-400 ">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit
              </li>
              <li className="text-gray-400 ">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit
              </li>
            </ol> */}
          </li>
        </ul>
      </div>

      <div className="mt-5 shadow-lg p-4 rounded-lg bg-white">
        <h3 className="text-base capitalize font-semibold">
          Stakeholder Identification
        </h3>
        <p className="text-sm text-gray-400 mt-2">
          Identify the stakeholders involved in the project and lay out their
          roles and responsibilities. Who will do the work? What are the
          expectations of each stakeholder? Will the business need to hire any
          additional resources?
        </p>
        <table className="mt-3 w-full">
          <thead className="bg-gray-200">
            <tr>
              <th className="text-left text-sm font-semibold uppercase px-6 py-3">
                Designation (Role+Rank)
              </th>
              <th className="text-left text-sm font-semibold uppercase px-6 py-3">
                Responsibilities
              </th>
            </tr>
          </thead>
          <tbody>
            {project?.owner && (
              <>
                <tr>
                  <td className="text-sm px-6 py-3 font-semibold">
                    {" "}
                    {project?.owner?.first_name}
                    <br />
                    {project?.owner?.designation?.designation_name}
                    <br />
                    {project?.owner?.designation?.role?.role_name},
                    {project?.owner?.designation?.rank?.rank_name}
                  </td>
                  <td className="text-sm font-normal px-6 py-3"> Owner</td>
                </tr>
              </>
            )}{" "}
            {project?.members?.map((member, index) => {
              return (
                <>
                  <tr>
                    <td className="text-sm px-6 py-3 font-semibold">
                      {member?.first_name}
                      <br />
                      {member?.designation?.designation_name}
                      <br />
                      {project?.owner?.designation?.role?.role_name},
                      {project?.owner?.designation?.rank?.rank_name}{" "}
                    </td>
                    <td className="text-sm font-normal px-6 py-3 capitalize">
                      {" "}
                      {member?.userProjects?.type}
                    </td>
                  </tr>
                </>
              );
            })}
          </tbody>
        </table>
      </div>
      {/* <div className="mt-5 shadow-lg p-4 rounded-lg bg-white">
        <h3 className="text-base capitalize font-semibold">Methodology</h3>
        <p className="text-sm text-gray-400 mt-2">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque sit
          officia aliquid beatae, unde magni. Non perferendis minima quo
          aliquam?
        </p>
      </div>

      <div className="mt-5 shadow-lg p-4 rounded-lg bg-white">
        <h3 className="text-base capitalize font-semibold">Project Goals</h3>
        <ul className="text-sm mt-2 list-disc ml-8">
          <li className="mb-2">
            <h5 className="font-semibold mb-1.5">Goal 01</h5>
            <p className="text-gray-400 ">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sequi
              officiis aliquam ex nulla blanditiis fuga.
            </p>
          </li>
          <li className="mb-2">
            <h5 className="font-semibold mb-1.5">Goal 02</h5>
            <p className="text-gray-400 ">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sequi
              officiis aliquam ex nulla blanditiis fuga.
            </p>
          </li>
          <li className="mb-2">
            <h5 className="font-semibold mb-1.5">Goal 03</h5>
            <p className="text-gray-400 ">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sequi
              officiis aliquam ex nulla blanditiis fuga.
            </p>
          </li>
        </ul>
      </div>

      <div className="mt-5 shadow-lg p-4 rounded-lg bg-white">
        <h3 className="text-base capitalize font-semibold">Epics & Stories</h3>
        <ul className="text-sm mt-2 list-disc ml-8">
          <li className="mb-2">
            <h5 className="font-semibold mb-1.5">Assumptions</h5>
            <ol className="list-decimal ml-4">
              <li className="text-gray-400 ">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit
              </li>
              <li className="text-gray-400 ">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit
              </li>
              <li className="text-gray-400 ">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit
              </li>
            </ol>
          </li>
          <li className="mb-2">
            <h5 className="font-semibold mb-1.5">Constraints</h5>
            <ol className="list-decimal ml-4">
              <li className="text-gray-400 ">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit
              </li>
              <li className="text-gray-400 ">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit
              </li>
              <li className="text-gray-400 ">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit
              </li>
            </ol>
          </li>
        </ul>
      </div> */}
    </section>
  );
}

import EmptyState from "components/Comman/EmptyState";
import {
  PROJECT_CATEGORY_AGILE_SCRUM,
  PROJECT_CATEGORY_KANBAN,
} from "helpers/projects";

export default function FRD({ frd, project, epics }) {
  return (
    <section className="mt-8 pb-8 w-full lg:w-1/2 px-5">
      <h2 className="text-xl capitalize text-primary-yellow-dark font-semibold">
        Feature Requirement Document
      </h2>
      <div className="mt-5 shadow-lg p-4 rounded-lg bg-white">
        <h3 className="text-base capitalize font-semibold">Methodology</h3>
        <p className="text-sm text-gray-400 mt-2">
          {frd?.category == PROJECT_CATEGORY_KANBAN
            ? "Waterfall (Goal Based)"
            : "Aigle (Goal,Epics,Stories)"}
        </p>
      </div>

      <div className="mt-5 shadow-lg p-4 rounded-lg bg-white">
        <h3 className="text-base capitalize font-semibold">Project Goals</h3>
        <ul className="text-sm mt-2 list-disc ml-8">
          {frd?.goals?.map((goal, index) => {
            return (
              <li className="mb-2">
                <h5 className="font-semibold mb-1.5">Goal {index + 1}</h5>
                <p className="text-gray-400 ">{goal}</p>
              </li>
            );
          })}{" "}
        </ul>
      </div>

      {project?.category == PROJECT_CATEGORY_AGILE_SCRUM && (
        <div className="mt-5 shadow-lg p-4 rounded-lg bg-white">
          <h3 className="text-base capitalize font-semibold">
            Epics & Stories
          </h3>
          <ul className="text-sm mt-2 list-disc ml-8">
            {epics?.map((epic, index) => {
              return (
                <li className="mb-2">
                  <h5 className="font-semibold mb-1.5">{epic?.title}</h5>

                  {epic?.stories?.length > 0 ? (
                    <ol className="list-decimal ml-4">
                      {epic?.stories?.map((story) => {
                        return (
                          <li className="text-gray-400 ">{story?.title}</li>
                        );
                      })}
                    </ol>
                  ) : null}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </section>
  );
}

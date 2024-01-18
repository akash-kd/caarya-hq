import EmptyState from "components/Comman/EmptyState";

export default function EpicsAndStories({ epics }) {
  return (
    <section className="mt-8 pb-8  w-full lg:w-1/2 px-5">
      <h2 className="text-xl capitalize text-primary-yellow-dark font-semibold">
        Epics & Stories
      </h2>
      {epics?.length > 0 ? (
        epics?.map((epic) => {
          return (
            <div className="mt-5 shadow-lg p-4 rounded-lg bg-white">
              <h3 className="text-base capitalize font-semibold">
                {epic?.title}
              </h3>
              {epic?.stories?.length > 0 ? (
                <ol className="list-decimal ml-8 text-sm mt-2">
                  {epic?.stories?.map((story) => {
                    return <li className="text-gray-400 ">{story?.title}</li>;
                  })}
                </ol>
              ) : (
                <EmptyState text={`${epic?.title} has no story!`} noImage />
              )}
            </div>
          );
        })
      ) : (
        <EmptyState
          text={`No epics for the project!`}
          image="/assets/images/empty/goal.png"
        />
      )}
    </section>
  );
}

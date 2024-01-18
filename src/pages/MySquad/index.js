import SquadPageMobile from "components/MySquad/MobilePage";
import SquadPageLaptop from "components/MySquad/SquadPageLaptop";

function MySquadPage() {
  return (
    <>
      <div className="block lg:hidden">
        <SquadPageMobile />
      </div>

      <div className="hidden lg:block mt-2.5">
        <SquadPageLaptop />
      </div>
    </>
  );
}

export default MySquadPage;

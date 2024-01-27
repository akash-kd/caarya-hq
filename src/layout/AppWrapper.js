import DesktopWrapper from "components/Layout/DesktopWrapper";
import TabBar from "components/Layout/TabBar";
import TopBar from "components/Layout/TopBar";

function AppWrapper({ children }) {
  return (
    <div className="h-screen w-screen overflow-hidden">
      <TopBar />
      <div className="max-h-85vh mt-11 lg:mt-2 py-3 block lg:hidden">
        {children}
      </div>
      <DesktopWrapper>
        <div className="overflow-y-auto mt-11 lg:mt-2 py-3">{children}</div>
      </DesktopWrapper>
      {window?.location?.pathname === "/chron/add" ? <></> : <TabBar />}
    </div>
  );
}

export default AppWrapper;

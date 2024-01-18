import DesktopWrapper from "components/Layout/DesktopWrapper";
import TabBar from "components/Layout/TabBar";
import TopBar from "components/Layout/TopBar";

function AppWrapper({ children }) {
  return (
    <div className="h-screen w-screen overflow-hidden">
      <TopBar />
      <div className="max-h-85vh overflow-y-auto mt-11 lg:mt-2 py-3 block lg:hidden">
        {children}
      </div>
      <DesktopWrapper>
        <div className="overflow-y-auto mt-11 lg:mt-2 py-3">{children}</div>
      </DesktopWrapper>
      <TabBar />
    </div>
  );
}

export default AppWrapper;
import { Outlet, useLocation } from "react-router";
import { ErrorBoundary } from "react-error-boundary";
import { useIsAboutDialogVisible } from "@/hooks/aboutDialog";
import { Fallbacks } from "@usi-inside/errors";
import InfoDialog from "../AboutDialog";

function AppContent() {
  const isAboutDialogVisible = useIsAboutDialogVisible();
  const location = useLocation();

  return (
    <>
      <InfoDialog open={isAboutDialogVisible} />
      <ErrorBoundary
        FallbackComponent={Fallbacks.MainErrorFallback}
        resetKeys={[location.key]}
      >
        <Outlet />
      </ErrorBoundary>
    </>
  );
}

export default AppContent;

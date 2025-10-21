import { useEffect, useState } from "react";
import { LicenseInfo } from "@mui/x-license";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { Api } from "@/api";
import { setAuthenticatedUser } from "@/stores/redux/slices/authenticatedUserSlice";
import { setServerSettings } from "@/stores/redux/slices/settingsSlice";
import { Loading } from "@/components";
import Errors from "@usi-inside/errors";
import { useConsole } from "@usi-inside/notifications";
import { setTos } from "@/stores/redux/slices/tosSlice";
import { ENABLE_TOS } from "@/config";
import { getServerSetting, SettingKeys } from "@/hooks/serverSettings";
import { updateGlobalData } from "@/stores/redux/slices/globalDataSlice";
import { useHasAccess } from "@/hooks/authenticatedUser";
import { getHasGlobalData } from "@/utils/globalData";

function getMUIXLicenseKey(serverSettings, Console) {
  return getServerSetting({
    serverSettings,
    key: SettingKeys.muiXLicenseKey,
    logger: Console,
  });
}

function getReduxServerSettings(settings) {
  const reduxBlackListedSettings = [SettingKeys.muiXLicenseKey];
  return settings.filter((s) => !reduxBlackListedSettings.includes(s.key));
}

function BootstrapProvider({ children = null }) {
  const dispatch = useDispatch();
  const Console = useConsole();
  const hasAccess = useHasAccess();
  const hasGlobalData = getHasGlobalData();
  const [authenticatedUserStored, setAuthenticatedUserStored] = useState(false);
  const [tosDataStored, setTosDataStored] = useState(false);
  const [globalDataStored, setGlobalDataStored] = useState(false);
  const { data: userData, error: userError } =
    Api.Queries.useAuthenticatedUser();
  const { data: tosData, error: tosDataError } = Api.Queries.useTos(
    !ENABLE_TOS || !hasAccess
  );
  const { data: globalData, error: globalDataError } =
    Api.Queries.useGlobalData(!hasGlobalData || !hasAccess);

  useEffect(() => {
    if (userData && !authenticatedUserStored) {
      const { authenticatedUser, settings } = userData;
      // FOR DEBUG PURPOSE:
      // authenticatedUser.powers = [];
      const reduxServerSettings = getReduxServerSettings(settings);
      const muiXLicenseKey = getMUIXLicenseKey(settings, Console);
      LicenseInfo.setLicenseKey(muiXLicenseKey);
      dispatch(setServerSettings(reduxServerSettings));
      dispatch(setAuthenticatedUser(authenticatedUser));
      setAuthenticatedUserStored(true);
    }
  }, [userData, authenticatedUserStored, dispatch, Console]);

  useEffect(() => {
    if (ENABLE_TOS && hasAccess && tosData && !tosDataStored) {
      const { tos } = tosData;
      dispatch(setTos(tos));
      setTosDataStored(true);
    }
  }, [hasAccess, tosData, tosDataStored, dispatch]);

  useEffect(() => {
    if (hasGlobalData && hasAccess && globalData && !globalDataStored) {
      dispatch(updateGlobalData(globalData));
      setGlobalDataStored(true);
    }
  }, [hasGlobalData, hasAccess, globalData, globalDataStored, dispatch]);

  const error = userError ?? tosDataError ?? globalDataError;
  if (error) return <Errors.StartUpError error={error} />;

  const bootstrapComplete =
    authenticatedUserStored &&
    (tosDataStored || !hasAccess || !ENABLE_TOS) &&
    (globalDataStored || !hasAccess || !hasGlobalData);
  if (!bootstrapComplete) return <Loading withLoadingMessage withReload />;

  return children;
}

BootstrapProvider.propTypes = {
  children: PropTypes.node,
};

export default BootstrapProvider;

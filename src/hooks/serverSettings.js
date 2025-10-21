import { useConsole } from "@usi-inside/notifications";
import _ from "lodash";
import { useSelector } from "react-redux";
import Utilities from "@usi-inside/utilities";

const useServerSettings = () =>
  useSelector((state) => state.settings?.server) ?? {};

const SettingKeys = {
  docSizeLimitToUpload: "DOC-SIZE-LIMIT-TO-UPLOAD",
  docDownloadUrl: "DOC-DOWNLOAD-URL",
  environmentHeaderColor: "ENVIRONMENT-HEADER-COLOR",
  muiXLicenseKey: "MUI-X-LICENSE-KEY",
  serviceDeskUrl: "SERVICE-DESK-URL",
  tutorialUrl: "TUTORIAL-URL",
};

const OptionalSettingKeys = [SettingKeys.tutorialUrl];

const getServerSetting = ({
  serverSettings,
  key,
  defaultValue = null,
  logger = null,
}) => {
  const setting = _.find(serverSettings, ["key", key]);
  if (!setting && !OptionalSettingKeys.includes(key) && logger) {
    logger.error(`Server setting with key ${key} is missing!`);
  }
  return Utilities.isPresent(setting?.value) ? setting?.value : defaultValue;
};

const useServerSetting = (key, defaultValue = null) => {
  const Console = useConsole();
  const serverSettings = useServerSettings();

  return getServerSetting({
    serverSettings,
    key,
    defaultValue,
    logger: Console,
  });
};

const useMaxUploadFileSizeBytes = () =>
  parseInt(useServerSetting(SettingKeys.docSizeLimitToUpload, 5242880), 10);

const useDocDownloadUrl = () => useServerSetting(SettingKeys.docDownloadUrl);

const useEnvironmentHeaderColor = (defaultValue = null) =>
  useServerSetting(SettingKeys.environmentHeaderColor, defaultValue);

const useTutorialUrl = () => useServerSetting(SettingKeys.tutorialUrl);

const useServiceDeskUrl = () => useServerSetting(SettingKeys.serviceDeskUrl);

export {
  SettingKeys,
  getServerSetting,
  useMaxUploadFileSizeBytes,
  useDocDownloadUrl,
  useEnvironmentHeaderColor,
  useTutorialUrl,
  useServiceDeskUrl,
};

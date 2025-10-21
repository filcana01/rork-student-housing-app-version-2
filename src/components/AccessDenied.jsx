import { useServiceDeskUrl } from "@/hooks/serverSettings";
import Errors from "@usi-inside/errors";
import { useTranslation } from "react-i18next";

function AccessDenied() {
  const { t } = useTranslation();
  const title = t("access-denied.title");
  const message = t("access-denied.message");
  const messageWithLink = t("access-denied.message-with-link");
  const linkLabel = t("access-denied.link-label");
  const linkUrl = useServiceDeskUrl();

  return (
    <Errors.UnauthorizedApplicationAccess
      title={title}
      message={message}
      messageWithLink={messageWithLink}
      linkLabel={linkLabel}
      linkUrl={linkUrl}
    />
  );
}

export default AccessDenied;

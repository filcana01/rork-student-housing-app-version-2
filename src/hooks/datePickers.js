import { itCH as dateFnsItCH, enGB as dateFnsEnGB } from "date-fns/locale";
import { useTranslation } from "react-i18next";
import { AdapterDateFns } from "@mui/x-date-pickers-pro/AdapterDateFns";

const useAdapterLocaleDateFns = () => {
  const localeMap = {
    en: dateFnsEnGB,
    it: dateFnsItCH,
  };
  const { i18n } = useTranslation();
  const locale = i18n.resolvedLanguage;
  return localeMap[locale];
};

const useAdapterDateFns = () =>
  new AdapterDateFns({ locale: useAdapterLocaleDateFns() });

export { useAdapterLocaleDateFns, useAdapterDateFns };

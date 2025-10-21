import { useAdapterLocaleDateFns } from "@/hooks/datePickers";
import { LocalizationProvider as MuiLocalizationProvider } from "@mui/x-date-pickers-pro";
import { AdapterDateFns } from "@mui/x-date-pickers-pro/AdapterDateFns";

export default function LocalizationProvider(props) {
  const adapterLocale = useAdapterLocaleDateFns();
  return (
    <MuiLocalizationProvider
      {...{ ...props, dateAdapter: AdapterDateFns, adapterLocale }}
    />
  );
}

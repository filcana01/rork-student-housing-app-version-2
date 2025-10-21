import _ from "lodash";
import { useSelector } from "react-redux";
import { globalDataKeys } from "@/stores/redux/slices/globalDataSlice";
import Utilities from "@usi-inside/utilities";

const EN = "en";
const IT = "it";

function getEnhancedItem(item, locale = EN, localizedProperties = []) {
  const supportedLocales = [EN, IT];
  const existingLocale = supportedLocales.includes(locale) ? locale : EN;
  const additionEntries = localizedProperties.map((localizedProperty) => {
    if (
      supportedLocales.every((l) => {
        const key = `${localizedProperty}${_.capitalize(l)}`;
        const val = item[key];
        return Utilities.isPresent(val);
      })
    ) {
      return [
        localizedProperty,
        Utilities.getLocalizedAttribute(
          item,
          localizedProperty,
          existingLocale
        ),
      ];
    }
    return [localizedProperty, null];
  });
  const additions = Object.fromEntries(additionEntries.filter((x) => x));
  return { ...item, ...additions };
}

const useRawGlobalDataEntry = (key) => {
  const rawGlobalDataEntry = useSelector((state) => state.globalData[key]);

  return Object.values(globalDataKeys).includes(key)
    ? rawGlobalDataEntry
    : undefined;
};

const useGlobalDataEntry = (
  key,
  locale = EN,
  localizedProperties = [],
  sortBy = null,
  sortByCast = "string"
) => {
  const globalDataEntry = useRawGlobalDataEntry(key);

  if (Array.isArray(globalDataEntry)) {
    const enhanced = globalDataEntry.map((item) =>
      getEnhancedItem(item, locale, localizedProperties)
    );
    if (sortBy) {
      return enhanced.sort((a, b) => {
        switch (sortByCast) {
          case "number":
            return Number(a[sortBy]) - Number(b[sortBy]);
          default:
            return String(a[sortBy]).localeCompare(String(b[sortBy]), locale);
        }
      });
    }
    return enhanced;
  }
  if (_.isPlainObject(globalDataEntry)) {
    return getEnhancedItem(globalDataEntry, locale, localizedProperties);
  }
  return globalDataEntry;
};

export { useRawGlobalDataEntry, useGlobalDataEntry };

import { defaultLocale, setLocale } from "yup";
import PropTypes from "prop-types";
import { it as yupIt } from "yup-locales";
import { useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";

function YupLocaleProvider({ children = null }) {
  const { i18n } = useTranslation();
  const locale = i18n.resolvedLanguage;
  // YUP PAC (https://github.com/jquense/yup/issues/1910)
  const locales = useMemo(
    () =>
      JSON.parse(
        JSON.stringify({
          it: yupIt,
          en: defaultLocale,
        })
      ),
    []
  );

  useEffect(() => {
    setLocale(locales[locale]);
  }, [locale, locales]);

  return children;
}

YupLocaleProvider.propTypes = {
  children: PropTypes.node,
};

export default YupLocaleProvider;

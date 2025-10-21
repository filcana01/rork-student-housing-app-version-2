/* eslint-disable import/prefer-default-export */
import Utilities from "@usi-inside/utilities";

const firstCharUpperCase = (input) =>
  Utilities.isPresent(input) ? input.charAt(0).toUpperCase() : "?";

const getAcronym = (person) =>
  [
    firstCharUpperCase(person?.firstName),
    firstCharUpperCase(person?.lastName),
  ].join("");

export { getAcronym };

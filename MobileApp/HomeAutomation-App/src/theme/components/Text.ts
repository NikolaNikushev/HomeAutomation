import variable from "../variables/platform";

export default (variables = variable) => {
  const textTheme = {
    fontSize: variables.DefaultFontSize - 1,
    fontFamily: variables.fontFamily,
    color: variables.textColor,
    ".note": {
      color: "#a7a7a7",
      fontSize: variables.noteFontSize,
    },
    ".success": {
      color: variables.brandSuccess,
    },
    ".warning": {
      color: variables.brandWarning,
    },
    ".danger": {
      color: variables.brandDanger,
    },
    ".link": {
      color: "blue",
    },
    ".bold": {
      fontWeight: "bold",
    },
  };

  return textTheme;
};

import React from "react";
import { layoutClasses } from "./layoutClasses";
import { styled } from "./zero-styled";

export function applyHeaderStyles(params) {
  const { height, fullWidth } = params || {};
  const clip = `
    "${layoutClasses.Header} ${layoutClasses.Header} ${layoutClasses.Header}"
    "${layoutClasses.EdgeSidebar} ${layoutClasses.Content} ${layoutClasses.EdgeSidebarRight}"
    "${layoutClasses.EdgeSidebar} ${layoutClasses.Footer} ${layoutClasses.EdgeSidebarRight}"
  `;
  return {
    height,
    ...(fullWidth && { zIndex: 3 }),
    [`.${layoutClasses.Root}:has(&)`]: {
      "--Header-height": height,
      ...(fullWidth && {
        gridTemplateAreas:
          typeof fullWidth === "string"
            ? {
                [fullWidth]: clip,
              }
            : clip,
        "--Header-clipHeight":
          typeof fullWidth === "string"
            ? {
                [fullWidth]: "var(--Header-height)",
              }
            : "var(--Header-height)",
      }),
    },
  };
}
const StyledHeader = styled("header")(({ theme }) => ({
  gridArea: layoutClasses.Header,
  height: 56,
  alignContent: "center",
  display: "flex",
  alignItems: "center",
  top: 0,
  position: "sticky",
  background: (theme.vars || theme).palette.background.paper,
  borderBottom: `1px solid ${(theme.vars || theme).palette.divider}`,
}));
const Header = React.forwardRef(({ className, ...props }, ref) => (
  <StyledHeader
    // @ts-expect-error Material UI issue
    ref={ref}
    className={`${layoutClasses.Header} ${className || ""}`}
    {...props}
  />
));
export default Header;

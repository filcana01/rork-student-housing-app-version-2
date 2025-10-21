import React from "react";
import { layoutClasses } from "./layoutClasses";
import { styled } from "./zero-styled";

const StyledFooter = styled("footer")(({ theme }) => ({
  gridArea: layoutClasses.Footer,
  transition: "all 225ms cubic-bezier(0.0, 0, 0.2, 1) 0ms, color 0s",
  background: (theme.vars || theme).palette.background.paper,
  borderTop: `1px solid ${(theme.vars || theme).palette.divider}`,
}));
const Footer = React.forwardRef(({ className, ...props }, ref) => (
  <StyledFooter
    // @ts-expect-error Material UI issue
    ref={ref}
    className={`${layoutClasses.Footer} ${className || ""}`}
    {...props}
  />
));
export default Footer;

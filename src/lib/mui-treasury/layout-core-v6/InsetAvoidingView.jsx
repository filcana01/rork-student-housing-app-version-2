import React from "react";
import { layoutClasses } from "./layoutClasses";
import { styled } from "./zero-styled";

const StyledInsetAvoidingView = styled("div")({
  marginRight: "var(--InsetSidebarR-width)",
  marginLeft: "var(--InsetSidebarL-width)",
});
const InsetAvoidingView = React.forwardRef(({ className, ...props }, ref) => (
  <StyledInsetAvoidingView
    // @ts-expect-error Material UI issue
    ref={ref}
    className={`${layoutClasses.InsetAvoidingView} ${className || ""}`}
    {...props}
  />
));
export default InsetAvoidingView;

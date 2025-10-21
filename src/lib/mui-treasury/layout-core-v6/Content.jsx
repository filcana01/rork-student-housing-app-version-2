import React from "react";
import { layoutClasses } from "./layoutClasses";
import { styled } from "./zero-styled";
/**
 * Note: StyledContent cannot have `overflow: auto` by default because
 *       it will break the InsetSidebar absolute positioning.
 */
const StyledContent = styled("main")({
  gridArea: layoutClasses.Content,
  minHeight: 0,
  marginTop: "var(--Content-insetTop)",
  marginBottom: "var(--Content-insetBottom)",
});
const Content = React.forwardRef(({ className, ...props }, ref) => (
  <StyledContent
    // @ts-expect-error Material UI issue
    ref={ref}
    className={`${layoutClasses.Content} ${className || ""}`}
    {...props}
  />
));
export default Content;

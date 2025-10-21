import { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import {
  Box,
  CircularProgress,
  Container,
  Link,
  Typography,
} from "@mui/material";
import PropTypes from "prop-types";

const StyledBoxFull = styled(Box)({
  width: "100%",
  height: "80vh",
  minHeight: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
});

const StyledBoxFragment = styled(Box)({
  width: "100%",
  display: "flex",
  flexGrow: 1,
  flexDirection: "column",
  alignItems: "center",
});

const handleReload = (event) => {
  event.preventDefault();
  window.location.reload();
};

const getContent = (withLoadingMessage, withReload, reloadRequired) => {
  if (withReload && reloadRequired) {
    return (
      <>
        <Typography variant="body1">
          The request may have timed out, please reload the page (CTRL+F5) or
          click{" "}
          <Link href={window.location.href} onClick={handleReload}>
            here
          </Link>
          .
        </Typography>
        <Typography variant="body1">
          If the problem persists, exit the browser and then try again.
        </Typography>
      </>
    );
  }
  return (
    <>
      <CircularProgress size={32} thickness={4} />
      {withLoadingMessage && (
        <Typography variant="h6" component="h1">
          Loading
        </Typography>
      )}
    </>
  );
};

function Loading({
  inline = false,
  fragment = false,
  withLoadingMessage = false,
  withReload = false,
}) {
  const [reloadRequired, setReloadRequired] = useState(false);
  const content = getContent(withLoadingMessage, withReload, reloadRequired);

  useEffect(() => {
    let reloadRequiredTimer;
    if (withReload) {
      reloadRequiredTimer = setTimeout(() => {
        setReloadRequired(true);
      }, 15000);
    }
    return () => {
      if (withReload && reloadRequiredTimer) {
        clearTimeout(reloadRequiredTimer);
      }
    };
  }, [withReload]);

  if (inline) {
    return content;
  }
  if (fragment) {
    return <StyledBoxFragment p={10}>{content}</StyledBoxFragment>;
  }
  return (
    <Container maxWidth="xl" sx={{ mt: 2 }}>
      <StyledBoxFull>{content}</StyledBoxFull>
    </Container>
  );
}

Loading.propTypes = {
  inline: PropTypes.bool,
  fragment: PropTypes.bool,
  withLoadingMessage: PropTypes.bool,
  withReload: PropTypes.bool,
};

export default Loading;

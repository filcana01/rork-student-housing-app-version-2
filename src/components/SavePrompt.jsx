import { useCallback } from "react";
import { useBlocker } from "react-router";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import PropTypes from "prop-types";
import { Flash } from "@usi-inside/notifications";

function SavePrompt({ isBlocking, isSaving, onSave }) {
  const shouldBlock = useCallback(
    ({ currentLocation, nextLocation }) =>
      isBlocking && currentLocation.pathname !== nextLocation.pathname,
    [isBlocking]
  );
  const blocker = useBlocker(shouldBlock);
  const blocked = blocker.state === "blocked";

  return (
    <Dialog
      open={blocked}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Unsaved changes</DialogTitle>
      <DialogContent dividers>
        <DialogContentText id="alert-dialog-description">
          There are unsaved changes, what do you want to do?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          onClick={() => blocker.reset()}
          disabled={isSaving}
          autoFocus
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => blocker.proceed()}
          disabled={!isBlocking || isSaving}
        >
          Discard changes & Exit
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={async () => {
            blocker.reset();
            try {
              await onSave();
            } catch {
              Flash.error(
                "Cannot save changes and exit since there are one or more validation errors!"
              );
            }
          }}
          disabled={!isBlocking || isSaving}
        >
          {isSaving ? "Saving changes" : "Save changes"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

SavePrompt.propTypes = {
  isBlocking: PropTypes.bool.isRequired,
  isSaving: PropTypes.bool.isRequired,
  onSave: PropTypes.func.isRequired,
};

export default SavePrompt;

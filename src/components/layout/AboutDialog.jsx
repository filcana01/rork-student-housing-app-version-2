import { useDispatch } from "react-redux";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from "@mui/material";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { format, parseISO } from "date-fns";
import { hideAboutDialog } from "@/stores/redux/slices/aboutDialogSlice";
import { RELEASE_VERSION, RELEASE_DATE, APP_NAME } from "@/config";

function AboutDialog({ open }) {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const handleClose = () => {
    dispatch(hideAboutDialog());
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {t("help-menu.about", { appName: APP_NAME })}
      </DialogTitle>
      <DialogContent dividers>
        <DialogContentText component="div">
          <Typography>
            {t("about.description", { appName: APP_NAME })}
          </Typography>

          <Typography sx={{ mt: 2, fontWeight: "bold" }}>
            {t("about.release-info.title")}
          </Typography>
          <Typography>
            {t("about.release-info.message", {
              version: RELEASE_VERSION,
              date: format(parseISO(RELEASE_DATE), "dd.MM.yyyy"),
            })}
          </Typography>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} autoFocus>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}

AboutDialog.propTypes = {
  open: PropTypes.bool.isRequired,
};

export default AboutDialog;

import { Container, Divider, Grid, Typography } from "@mui/material";
import { MuiMarkdown, getOverrides } from "mui-markdown";
import Utilities from "@usi-inside/utilities";
import { useTranslation } from "react-i18next";
import { useConsole, Flash } from "@usi-inside/notifications";
import { useDispatch } from "react-redux";
import { Api } from "@/api";
import { useNavigate } from "react-router";
import { format, parseISO } from "date-fns";
import { setTos } from "@/stores/redux/slices/tosSlice";
import { useTos } from "@/hooks/tos";
import { useState } from "react";
import { LoadingButton } from "@mui/lab";

function getFormattedDate(dateString) {
  try {
    return dateString ? format(parseISO(dateString), "dd.MM.yyyy") : dateString;
  } catch {
    return dateString;
  }
}

function getFormattedDateTime(dateString) {
  try {
    return dateString
      ? format(parseISO(dateString), "dd.MM.yyyy HH:mm")
      : dateString;
  } catch {
    return dateString;
  }
}

function TermOfServices() {
  const navigate = useNavigate();
  const Console = useConsole();
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const locale = i18n.resolvedLanguage;
  const [savingTos, setSavingTos] = useState();
  const [saveTosAcceptance] = Api.Mutations.useSetTos();
  const tos = useTos();
  const tosCreatedAt = getFormattedDate(tos.createdAt);
  const tosHasBeenAccepted = tos.accepted;
  const tosAcceptedAt = getFormattedDateTime(tos.acceptedAt);
  const content = Utilities.getLocalizedAttribute(tos, "content", locale);

  const doSetTos = async (accepted) => {
    // build mutation input
    const mutationInput = {
      input: {
        idDisclaimer: tos.id,
        accepted,
      },
    };
    // (["Mutation input:", mutationInput]);

    try {
      setSavingTos(true);
      const result = await saveTosAcceptance({
        variables: mutationInput,
      });
      dispatch(setTos(result.data.setTos));
      navigate("./..");
    } catch (error) {
      setSavingTos(false);
      Flash.error(error.message, "error");
      Console.error(error);
    }
  };
  const doAcceptTos = async () => doSetTos(true);

  return (
    <Container maxWidth="md">
      <Grid container spacing={5} flexDirection="columns">
        <Grid
          flexGrow={1}
          sx={{ maxHeight: "calc(100vh - 140px)", overflow: "auto" }}
          size={12}
        >
          <MuiMarkdown
            overrides={{
              ...getOverrides(), // This will keep the other default overrides.
              p: {
                component: "p",
                props: {
                  style: { paddingTop: 1, paddingBottom: 1 },
                },
              },
              li: {
                component: "li",
                props: {
                  style: { paddingTop: 4, paddingBottom: 4 },
                },
              },
            }}
          >
            {content}
          </MuiMarkdown>
          <Divider sx={{ my: 3 }} />
          <Typography variant="body1" gutterBottom>
            {t("privacy-info-and-tos.labels.updated-at", {
              datetime: tosCreatedAt,
            })}
          </Typography>
          {tosHasBeenAccepted === true && (
            <Typography variant="body1" color="success.main" gutterBottom>
              {t("privacy-info-and-tos.labels.accepted-at", {
                datetime: tosAcceptedAt,
              })}
            </Typography>
          )}
        </Grid>
        {!tosHasBeenAccepted && (
          <Grid display="flex" flexGrow={1} justifyContent="center" size={12}>
            <LoadingButton
              variant="contained"
              color="primary"
              onClick={doAcceptTos}
              loading={savingTos}
            >
              {t("privacy-info-and-tos.labels.accept-button")}
            </LoadingButton>
          </Grid>
        )}
      </Grid>
    </Container>
  );
}

export default TermOfServices;

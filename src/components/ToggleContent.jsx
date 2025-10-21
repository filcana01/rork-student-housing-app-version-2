import { useState } from "react";
import { Box, Switch, FormGroup, FormControlLabel } from "@mui/material";
import PropTypes from "prop-types";

function ToggleContent({ label, children }) {
  const [visible, setVisible] = useState(false);

  const handleChange = (event) => {
    setVisible(event.target.checked);
  };

  return (
    <Box sx={{ py: 0, px: 2 }}>
      <FormGroup row>
        <FormControlLabel
          control={
            <Switch checked={visible} onChange={handleChange} name="checked" />
          }
          label={label}
        />
      </FormGroup>
      {visible && <div>{children}</div>}
    </Box>
  );
}

ToggleContent.propTypes = {
  label: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default ToggleContent;

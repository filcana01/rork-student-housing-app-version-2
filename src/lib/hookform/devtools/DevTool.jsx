import { ENABLE_REACT_HOOK_FORM_DEV_TOOLS } from "@/config";
import { DevTool as HookFormDevTool } from "@hookform/devtools";
import PropTypes from "prop-types";

function DevTool(props) {
  return ENABLE_REACT_HOOK_FORM_DEV_TOOLS && <HookFormDevTool {...props} />;
}

DevTool.propTypes = {
  id: PropTypes.string,

  control: PropTypes.object,
  placement: PropTypes.string,
};

export default DevTool;

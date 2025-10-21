import PropTypes from "prop-types";
import { Provider } from "react-redux";
import { store } from "@/stores/redux/store";

function ReduxProvider({ children = null }) {
  return <Provider store={store}>{children}</Provider>;
}

ReduxProvider.propTypes = {
  children: PropTypes.node,
};

export default ReduxProvider;

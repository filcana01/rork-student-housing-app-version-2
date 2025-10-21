import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";

export default function useRefresh(resetRoute = "/loading") {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  let handler;

  const refresh = () => {
    navigate(resetRoute);

    handler = setTimeout(() => navigate(pathname), 10);
  };

  useEffect(() => () => handler && clearTimeout(handler), [handler]);

  return refresh;
}

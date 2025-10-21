/* eslint-disable import/named */
/* eslint-disable no-console */
import {
  ApolloClient,
  ApolloLink,
  CombinedGraphQLErrors,
  CombinedProtocolErrors,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
// import { LocalState } from "@apollo/client/local-state";
// import { Defer20220824Handler } from "@apollo/client/incremental";
import { ErrorLink } from "@apollo/client/link/error";
import {
  API_PATH,
  ENABLE_APOLLO_CLIENT_DEV_TOOLS,
  SHOW_ERROR_DETAILS,
} from "@/config";

const logError = (name, error) => {
  if (!SHOW_ERROR_DETAILS) return;

  const coordinatesParts = [
    ...(error.locations
      ? [`locations: ${JSON.stringify(error.locations)}`]
      : []),
    ...(error.path ? [`path: ${JSON.stringify(error.path)}`] : []),
  ];
  const coordinates =
    coordinatesParts.length > 0 ? ` (${coordinatesParts.join(", ")})` : "";

  console.error(`[${name}]: ${error.message}${coordinates}`);
};

const logErrors = (name, errors) => {
  if (!SHOW_ERROR_DETAILS) return;

  errors.forEach((error) => logError(name, error));
};

const defaultOptions = {
  watchQuery: {
    fetchPolicy: "cache-and-network",
    // errorPolicy: "ignore",
    notifyOnNetworkStatusChange: false, // apollo client v3 default
  },
  query: {
    fetchPolicy: "cache-and-network",
    // errorPolicy: "all",
  },
  mutate: {
    fetchPolicy: "network-only",
  },
};

export default new ApolloClient({
  link: ApolloLink.from([
    new ErrorLink(({ error }) => {
      if (CombinedGraphQLErrors.is(error)) {
        logErrors("GraphQL Error", error.errors);
        return;
      }

      if (CombinedProtocolErrors.is(error)) {
        logErrors("Protocol Error", error.errors);
        return;
      }

      // fallback for other errors
      if (SHOW_ERROR_DETAILS) {
        logError(error?.name ?? "Unknown Error", error);
      }
    }),
    new HttpLink({
      // URI of GraphQL server
      // all environments (proxy parameter in package.json define a fallback for local env)
      uri: API_PATH,
      credentials: "same-origin",
    }),
  ]),

  cache: new InMemoryCache({
    typePolicies: {
      AuthorisationsModel: {
        keyFields: ["guid"],
      },
    },
  }),

  defaultOptions,

  devtools: {
    enabled: ENABLE_APOLLO_CLIENT_DEV_TOOLS,
  },

  /*
  If you are not using the `@client` directive in your application,
  you can safely remove this option.
  */
  // localState: new LocalState({
  //   resolvers: {
  //     Query: {
  //       academicYears: () => [
  //         {
  //           id: 1,
  //           name: "1996-1997",
  //         },
  //         {
  //           id: 2,
  //           name: "1997-1998",
  //         },
  //       ],
  //     },
  //   },
  // }),

  /*
  If you are not using the `@defer` directive in your application,
  you can safely remove this option.
  */
  // incrementalHandler: new Defer20220824Handler(),
});

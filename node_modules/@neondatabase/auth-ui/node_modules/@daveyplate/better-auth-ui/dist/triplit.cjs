"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _nullishCoalesce(lhs, rhsFn) { if (lhs != null) { return lhs; } else { return rhsFn(); } }// src/lib/triplit/use-triplit-hooks.ts
var _react = require('react');

// src/lib/triplit/model-names.ts
var getModelName = ({
  namespace,
  modelNames,
  usePlural = false
}) => {
  return (modelNames == null ? void 0 : modelNames[namespace]) || `${namespace}${usePlural ? "s" : ""}`;
};

// src/lib/triplit/use-conditional-query.ts
var _react3 = require('@triplit/react');

function useConditionalQuery(client, query, options) {
  const stringifiedQuery = !(options == null ? void 0 : options.disabled) && query && JSON.stringify(query);
  const localOnly = !!(options == null ? void 0 : options.localOnly);
  const [remoteFulfilled, setRemoteFulfilled] = _react.useState.call(void 0, false);
  const defaultValue = {
    results: void 0,
    fetching: true,
    fetchingLocal: false,
    fetchingRemote: false,
    error: void 0
  };
  const [subscribe, snapshot] = _react.useMemo.call(void 0, 
    () => stringifiedQuery ? _react3.createStateSubscription.call(void 0, client, query, {
      ...options,
      onRemoteFulfilled: () => setRemoteFulfilled(true)
    }) : [() => () => {
    }, () => defaultValue],
    [stringifiedQuery, localOnly]
  );
  const getServerSnapshot = _react.useCallback.call(void 0, () => snapshot(), [snapshot]);
  const { fetching, ...rest } = _react.useSyncExternalStore.call(void 0, 
    subscribe,
    snapshot,
    getServerSnapshot
  );
  return { fetching: fetching && !remoteFulfilled, ...rest };
}
function useConditionalQueryOne(client, query, options) {
  const { fetching, fetchingLocal, fetchingRemote, results, error } = useConditionalQuery(
    client,
    query ? { ...query, limit: 1 } : query,
    options
  );
  const result = _react.useMemo.call(void 0, () => {
    return _nullishCoalesce((results == null ? void 0 : results[0]), () => ( null));
  }, [results]);
  return { fetching, fetchingLocal, fetchingRemote, result, error };
}

// src/lib/triplit/use-triplit-token.ts


function useTriplitToken(triplit) {
  const connectionStatus = _react3.useConnectionStatus.call(void 0, triplit);
  const payload = _react.useMemo.call(void 0, 
    () => triplit.token ? decodeJWT(triplit.token) : void 0,
    [connectionStatus]
  );
  return { token: payload && triplit.token, payload };
}
function decodeJWT(token) {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64).split("").map((char) => {
        return `%${`00${char.charCodeAt(0).toString(16)}`.slice(-2)}`;
      }).join("")
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error("Failed to decode JWT:", error);
    return null;
  }
}

// src/lib/triplit/use-list-accounts.ts
function useListAccounts({
  triplit,
  modelNames,
  usePlural,
  isPending
}) {
  const modelName = getModelName({
    namespace: "account",
    modelNames,
    usePlural
  });
  const { payload } = useTriplitToken(triplit);
  const { results, error, fetching } = useConditionalQuery(
    triplit,
    (payload == null ? void 0 : payload.sub) && triplit.query(modelName)
  );
  return {
    data: results,
    isPending: isPending || fetching,
    error
  };
}

// src/lib/triplit/use-list-sessions.ts
function useListSessions({
  triplit,
  modelNames,
  usePlural,
  isPending
}) {
  const modelName = getModelName({
    namespace: "session",
    modelNames,
    usePlural
  });
  const { payload } = useTriplitToken(triplit);
  const {
    results: sessions,
    error,
    fetching
  } = useConditionalQuery(triplit, (payload == null ? void 0 : payload.sub) && triplit.query(modelName));
  return {
    data: sessions,
    isPending: isPending || fetching,
    error
  };
}

// src/lib/triplit/use-session.ts
function useSession({
  triplit,
  sessionData,
  isPending,
  refetch,
  usePlural,
  modelNames
}) {
  const modelName = getModelName({
    namespace: "user",
    modelNames,
    usePlural
  });
  const { payload } = useTriplitToken(triplit);
  const { result: user, error } = useConditionalQueryOne(
    triplit,
    (payload == null ? void 0 : payload.sub) && triplit.query(modelName)
  );
  return {
    data: sessionData ? {
      session: sessionData.session,
      user: (sessionData == null ? void 0 : sessionData.user.id) === (user == null ? void 0 : user.id) ? user : sessionData.user
    } : null,
    error,
    isPending,
    refetch: refetch || (() => {
    })
  };
}

// src/lib/triplit/use-triplit-hooks.ts
function useTriplitHooks({
  triplit,
  usePlural = true,
  modelNames,
  sessionData,
  isPending
}) {
  const hooks = _react.useMemo.call(void 0, () => {
    return {
      useSession: () => useSession({
        triplit,
        modelNames,
        usePlural,
        sessionData,
        isPending
      }),
      useListAccounts: () => useListAccounts({
        triplit,
        modelNames,
        usePlural,
        sessionData,
        isPending
      }),
      useListSessions: () => useListSessions({
        triplit,
        modelNames,
        usePlural,
        sessionData,
        isPending
      })
    };
  }, [triplit, modelNames, usePlural, sessionData, isPending]);
  return {
    hooks
  };
}


exports.useTriplitHooks = useTriplitHooks;

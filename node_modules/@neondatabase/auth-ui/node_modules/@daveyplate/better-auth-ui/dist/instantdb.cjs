"use strict";Object.defineProperty(exports, "__esModule", {value: true});// src/lib/instantdb/use-instant-options.ts
var _react = require('react');

// src/lib/instantdb/model-names.ts
var getModelName = ({
  namespace,
  modelNames,
  usePlural = false
}) => {
  return (modelNames == null ? void 0 : modelNames[namespace]) || `${namespace}${usePlural ? "s" : ""}`;
};

// src/lib/instantdb/use-list-accounts.ts

function useListAccounts({
  db,
  modelNames,
  usePlural,
  isPending
}) {
  const { user: authUser, isLoading: authLoading } = db.useAuth();
  const modelName = getModelName({
    namespace: "account",
    modelNames,
    usePlural
  });
  const { data, isLoading, error } = db.useQuery(
    authUser ? { [modelName]: { $: { where: { userId: authUser == null ? void 0 : authUser.id } } } } : null
  );
  const accounts = _react.useMemo.call(void 0, 
    () => data == null ? void 0 : data[modelName],
    [data, modelName]
  );
  return {
    data: accounts,
    isPending: !accounts && (isPending || authLoading || isLoading),
    error: error || null
  };
}

// src/lib/instantdb/use-list-sessions.ts

function useListSessions({
  db,
  modelNames,
  usePlural,
  isPending
}) {
  const { user: authUser, isLoading: authLoading } = db.useAuth();
  const modelName = getModelName({
    namespace: "session",
    modelNames,
    usePlural
  });
  const now = _react.useMemo.call(void 0, () => Date.now(), []);
  const { data, isLoading } = db.useQuery(
    authUser ? {
      [modelName]: {
        $: {
          where: {
            userId: authUser == null ? void 0 : authUser.id,
            expiresAt: { $gte: now }
          }
        }
      }
    } : null
  );
  const sessions = _react.useMemo.call(void 0, () => {
    if (data == null ? void 0 : data[modelName]) {
      return data[modelName].map((session) => ({
        ...session,
        expiresAt: new Date(session.expiresAt),
        createdAt: new Date(session.createdAt),
        updatedAt: new Date(session.updatedAt)
      }));
    }
  }, [data, modelName]);
  return {
    data: sessions,
    isPending: !sessions && (isPending || authLoading || isLoading)
  };
}

// src/lib/instantdb/use-session.ts

function useSession({
  db,
  sessionData,
  isPending,
  refetch,
  usePlural,
  modelNames
}) {
  const { user: authUser, error } = db.useAuth();
  const modelName = getModelName({
    namespace: "user",
    modelNames,
    usePlural
  });
  const { data } = db.useQuery(
    authUser ? { [modelName]: { $: { where: { id: authUser == null ? void 0 : authUser.id } } } } : null
  );
  const user = _react.useMemo.call(void 0, () => {
    var _a;
    if ((_a = data == null ? void 0 : data[modelName]) == null ? void 0 : _a.length) {
      const user2 = data[modelName][0];
      return {
        ...user2,
        createdAt: new Date(user2.createdAt),
        updatedAt: new Date(user2.updatedAt)
      };
    }
    return null;
  }, [data, modelName]);
  return {
    data: sessionData ? {
      session: sessionData.session,
      user: (sessionData == null ? void 0 : sessionData.user.id) === (user == null ? void 0 : user.id) ? user : sessionData.user
    } : null,
    isPending,
    refetch: refetch || (() => {
    }),
    error: error || null
  };
}

// src/lib/instantdb/use-instant-options.ts
function useInstantOptions({
  db,
  usePlural = true,
  modelNames,
  sessionData,
  isPending,
  user
}) {
  const userId = (user == null ? void 0 : user.id) || (sessionData == null ? void 0 : sessionData.user.id);
  const hooks = _react.useMemo.call(void 0, () => {
    return {
      useSession: () => useSession({
        db,
        modelNames,
        usePlural,
        sessionData,
        isPending
      }),
      useListAccounts: () => useListAccounts({
        db,
        modelNames,
        usePlural,
        sessionData,
        isPending
      }),
      useListSessions: () => useListSessions({
        db,
        modelNames,
        usePlural,
        sessionData,
        isPending
      })
    };
  }, [db, modelNames, usePlural, sessionData, isPending]);
  const mutators = _react.useMemo.call(void 0, () => {
    return {
      updateUser: async (data) => {
        if (!userId) {
          throw new Error("Unauthenticated");
        }
        const modelName = getModelName({
          namespace: "user",
          modelNames,
          usePlural
        });
        db.transact([
          db.tx[modelName][userId].update({
            ...data,
            updatedAt: Date.now()
          })
        ]);
      }
    };
  }, [db, userId, modelNames, usePlural]);
  return {
    hooks,
    mutators
  };
}


exports.useInstantOptions = useInstantOptions;

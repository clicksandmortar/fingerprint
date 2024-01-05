/* eslint-disable require-jsdoc */
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { ReactElement, useEffect } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useEntireStore } from "../beautifulSugar/store";
import { Handler } from "../client/handler";
import { useConsentCheck } from "../hooks/useConsentCheck";
import Runners from "./Runners";
import { Triggers } from "./Triggers";

const queryClient = new QueryClient();

export type FingerprintProviderProps = {
  appId?: string;
  consent?: boolean;
  consentCallback?: () => boolean;
  defaultHandlers?: Handler[];
  initialDelay?: number;
  exitIntentTriggers?: boolean;
  idleTriggers?: boolean;
  pageLoadTriggers?: boolean;
  // This is just to please typescript in this one off case.
  // Normally we'd use `children: ReactNode`
  children: ReactElement | null | ReactElement;
};

export function FingerprintProvider(props: FingerprintProviderProps) {
  const { set, addHandlers, difiProps } = useEntireStore();
  const { booted, appId, consentCallback, defaultHandlers } = difiProps;

  // consider the zustand store fully operational if both `get` and `set` functions are no longer undefined
  // WHile building the store, I managed to run into edge cases where thsoe functions were undefined
  // If that is ever the case, please uncomment the line below and set it to false
  // const {get } = useEntireStore();
  // const hasStoreInitiated = !!get && !! set

  const hasStoreInitiated = true;

  const setBooted = React.useCallback(
    (val: boolean) =>
      set((prev) => ({ difiProps: { ...prev.difiProps, booted: val } })),
    [set]
  );

  const matchPropsToDifiProps = React.useCallback(() => {
    set((prev) => ({
      difiProps: {
        ...prev.difiProps,
        ...{ ...props, children: undefined },
      },
    }));
  }, [props, set]);

  const consentGiven = useConsentCheck(props.consent || false, consentCallback);

  useEffect(() => {
    // if the props have never been provided, throw an error.
    if (!props.appId) throw new Error("C&M Fingerprint: appId is required");
    // shove the props into the store for access all over the app
    matchPropsToDifiProps();

    // wait until zustand completes the above, then start taking values from there
    if (!appId) return;
    if (booted) return;
    if (!consentGiven) return;
    if (!hasStoreInitiated) return;
    addHandlers(defaultHandlers || []);
    setBooted(true);
  }, [
    appId,
    consentGiven,
    hasStoreInitiated,
    booted,
    props.appId,
    matchPropsToDifiProps,
    defaultHandlers,
    addHandlers,
    setBooted,
  ]);

  if (!appId) return props.children;
  // TOOD: do we want to return children here?
  // booted is false until consent is true, so this will never be rendered otherwise
  if (!booted) return props.children;

  return (
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary
        onError={(error, info) => console.error(error, info)}
        fallback={<div>An application error occurred.</div>}
      >
        <Runners />
        {props.children}
        <Triggers />
      </ErrorBoundary>
    </QueryClientProvider>
  );
}

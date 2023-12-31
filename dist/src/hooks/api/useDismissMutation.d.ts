export declare type DismissMutationData = {
    campaignId: string;
    variantId: string;
};
/**
 * Mutation to dismiss a persistent trigger (like a banner) and NOT show it again to the current visitor.
 */
export declare const useDismissMutation: () => {
    dismissTrigger: import("@tanstack/react-query").UseMutateFunction<any, unknown, DismissMutationData[], unknown>;
    data: undefined;
    error: null;
    isError: false;
    isIdle: true;
    isLoading: false;
    isSuccess: false;
    status: "idle";
    mutate: import("@tanstack/react-query").UseMutateFunction<any, unknown, DismissMutationData[], unknown>;
    reset: () => void;
    context: unknown;
    failureCount: number;
    failureReason: unknown;
    isPaused: boolean;
    variables: DismissMutationData[] | undefined;
    mutateAsync: import("@tanstack/react-query").MutateFunction<any, unknown, DismissMutationData[], unknown>;
} | {
    dismissTrigger: import("@tanstack/react-query").UseMutateFunction<any, unknown, DismissMutationData[], unknown>;
    data: undefined;
    error: null;
    isError: false;
    isIdle: false;
    isLoading: true;
    isSuccess: false;
    status: "loading";
    mutate: import("@tanstack/react-query").UseMutateFunction<any, unknown, DismissMutationData[], unknown>;
    reset: () => void;
    context: unknown;
    failureCount: number;
    failureReason: unknown;
    isPaused: boolean;
    variables: DismissMutationData[] | undefined;
    mutateAsync: import("@tanstack/react-query").MutateFunction<any, unknown, DismissMutationData[], unknown>;
} | {
    dismissTrigger: import("@tanstack/react-query").UseMutateFunction<any, unknown, DismissMutationData[], unknown>;
    data: undefined;
    error: unknown;
    isError: true;
    isIdle: false;
    isLoading: false;
    isSuccess: false;
    status: "error";
    mutate: import("@tanstack/react-query").UseMutateFunction<any, unknown, DismissMutationData[], unknown>;
    reset: () => void;
    context: unknown;
    failureCount: number;
    failureReason: unknown;
    isPaused: boolean;
    variables: DismissMutationData[] | undefined;
    mutateAsync: import("@tanstack/react-query").MutateFunction<any, unknown, DismissMutationData[], unknown>;
} | {
    dismissTrigger: import("@tanstack/react-query").UseMutateFunction<any, unknown, DismissMutationData[], unknown>;
    data: any;
    error: null;
    isError: false;
    isIdle: false;
    isLoading: false;
    isSuccess: true;
    status: "success";
    mutate: import("@tanstack/react-query").UseMutateFunction<any, unknown, DismissMutationData[], unknown>;
    reset: () => void;
    context: unknown;
    failureCount: number;
    failureReason: unknown;
    isPaused: boolean;
    variables: DismissMutationData[] | undefined;
    mutateAsync: import("@tanstack/react-query").MutateFunction<any, unknown, DismissMutationData[], unknown>;
};

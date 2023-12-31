import { BannerTrigger } from '../../behaviours/Banner/Banner.types';
import { DataCaptureTrigger } from '../../behaviours/Modal/Modal.types';
import { Trigger } from '../../client/types';
/**
* Mutation to mark a trigger as seen and NOT show it again to the current visitor.
*/
export declare const useSeenMutation: () => import("@tanstack/react-query").UseBaseMutationResult<Response, {}, unknown, unknown>;
/**
 * run the seen mutation after a short delay and prevent from
 * re-firing on rerenders
 */
export declare const useSeen: ({ trigger, skip, }: {
    trigger: Trigger | BannerTrigger | DataCaptureTrigger;
    skip: boolean;
}) => {
    data: undefined;
    error: null;
    isError: false;
    isIdle: true;
    isLoading: false;
    isSuccess: false;
    status: "idle";
    reset: () => void;
    context: unknown;
    failureCount: number;
    failureReason: {} | null;
    isPaused: boolean;
    variables: unknown;
    mutateAsync: import("@tanstack/react-query").MutateFunction<Response, {}, unknown, unknown>;
} | {
    data: undefined;
    error: null;
    isError: false;
    isIdle: false;
    isLoading: true;
    isSuccess: false;
    status: "loading";
    reset: () => void;
    context: unknown;
    failureCount: number;
    failureReason: {} | null;
    isPaused: boolean;
    variables: unknown;
    mutateAsync: import("@tanstack/react-query").MutateFunction<Response, {}, unknown, unknown>;
} | {
    data: undefined;
    error: {};
    isError: true;
    isIdle: false;
    isLoading: false;
    isSuccess: false;
    status: "error";
    reset: () => void;
    context: unknown;
    failureCount: number;
    failureReason: {} | null;
    isPaused: boolean;
    variables: unknown;
    mutateAsync: import("@tanstack/react-query").MutateFunction<Response, {}, unknown, unknown>;
} | {
    data: Response;
    error: null;
    isError: false;
    isIdle: false;
    isLoading: false;
    isSuccess: true;
    status: "success";
    reset: () => void;
    context: unknown;
    failureCount: number;
    failureReason: {} | null;
    isPaused: boolean;
    variables: unknown;
    mutateAsync: import("@tanstack/react-query").MutateFunction<Response, {}, unknown, unknown>;
};

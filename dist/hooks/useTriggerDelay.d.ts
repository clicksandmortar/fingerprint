export declare const defaultTriggerCooldown: number;
export declare function useTriggerDelay(cooldownMs?: number): {
    lastTrigerTimeStamp: number | null;
    startCooldown: () => void;
    canNextTriggerOccur: () => boolean;
    getRemainingCooldownMs: () => number;
};

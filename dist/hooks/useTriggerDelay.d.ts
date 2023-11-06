export declare const defaultTriggerCooldown: number;
export declare function useTriggerDelay(cooldownMs?: number): {
    startCooldown: () => void;
    canNextTriggerOccur: () => boolean;
    getRemainingCooldownMs: () => number;
};

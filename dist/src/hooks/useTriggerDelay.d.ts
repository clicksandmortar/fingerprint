export declare function useTriggerDelay(): {
    startCooldown: () => void;
    canNextTriggerOccur: () => boolean;
    getRemainingCooldownMs: () => number;
    getIdleStatusDelay: () => number;
};

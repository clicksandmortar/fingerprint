/// <reference types="react" />
/**
 *  Remove intently overlay if we end up in the Fingerprint cohort
 */
declare const useKillIntently: () => {
    intently: boolean;
    setIntently: import("react").Dispatch<import("react").SetStateAction<boolean>>;
};
export default useKillIntently;

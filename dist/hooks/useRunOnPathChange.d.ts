declare type FuncProp = () => void;
declare type Config = {
    skip?: boolean;
    delay?: number;
};
declare const useRunOnPathChange: (func: FuncProp, config?: Config | undefined) => void;
export default useRunOnPathChange;

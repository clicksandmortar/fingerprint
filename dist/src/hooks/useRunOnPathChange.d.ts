declare type FuncProp = () => void;
declare type Config = {
    skip?: boolean;
    delay?: number;
    name: string;
};
declare const useRunOnPathChange: (func: FuncProp, config?: Config | undefined) => void;
export default useRunOnPathChange;

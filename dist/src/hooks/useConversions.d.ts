import { ComparisonFunc, Operator } from '../client/types';
/**
 * Returns a function that compares a string with the signal parameter
 */
export declare const getFuncByOperator: (operator: Operator, compareWith: string) => ComparisonFunc;
declare const useConversions: () => void;
export default useConversions;

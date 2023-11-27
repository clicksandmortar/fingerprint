import React from 'react';
import { ComparisonFunc, Conversion, Operator } from '../client/types';
export declare const testConversion: Conversion;
/**
 * Returns a function that compares a string with the signal parameter
 */
export declare const getFuncByOperator: (operator: Operator, compareWith: string) => ComparisonFunc;
declare const useConversions: () => {
    conversions: Conversion[];
    setConversions: React.Dispatch<React.SetStateAction<Conversion[]>>;
};
export default useConversions;

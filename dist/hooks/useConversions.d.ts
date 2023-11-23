import React from 'react';
import { Conversion } from '../client/types';
export declare const testConversion: Conversion;
declare const useConversions: () => {
    conversions: Conversion[];
    setConversions: React.Dispatch<React.SetStateAction<Conversion[]>>;
};
export default useConversions;

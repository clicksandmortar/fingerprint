import React from 'react';
import { useBrandColors } from '../../hooks/useBrandConfig';
export declare type ConfigHOCProps = {
    colorConfig: ReturnType<typeof useBrandColors>;
};
declare const ConfigHOC: (props: any) => React.JSX.Element;
export default ConfigHOC;

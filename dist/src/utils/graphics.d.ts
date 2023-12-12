import * as icons from '@fortawesome/free-solid-svg-icons';
export declare type Icon = keyof typeof icons;
export declare function getIcon(key: Icon): "fas" | icons.IconDefinition | "far" | "fal" | "fat" | "fad" | "fab" | "fak" | "fass" | "fasr" | "fasl" | "fast" | icons.IconPack;

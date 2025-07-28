import { LayoutOrient } from './types';
export declare const matchCenterKey: string[];
export declare const translateCenterXMaps: {
    readonly left: "-50%";
    readonly right: "50%";
    readonly default: "0px";
};
export declare const translateCenterYMaps: {
    readonly bottom: "50%";
    readonly top: "-50%";
    readonly default: "0px";
};
export declare const ecOrientValue: {
    [key in LayoutOrient]: LayoutOrient;
};
export declare const innerIocnNames: {
    readonly circle: "circle";
    readonly rect: "rect";
    readonly roundRect: "roundRect";
    readonly triangle: "triangle";
    readonly diamond: "diamond";
    readonly pin: "pin";
    readonly arrow: "arrow";
    readonly none: "none";
};

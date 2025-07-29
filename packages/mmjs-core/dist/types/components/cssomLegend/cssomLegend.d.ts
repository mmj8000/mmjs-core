import { ECharts } from 'echarts';
import { TransfromState } from './types';
type __VLS_Props = {
    ecInstance?: ECharts;
    eventName?: "rendered" | "finished";
    throttleTime?: number;
    disabled?: boolean;
    /**
     * @desc left、right === 'center' 有效
     */
    enchanceCenter?: boolean;
    transfromFn?: TransfromState["transform"];
};
declare const _default: import('vue').DefineComponent<__VLS_Props, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {} & {
    legendToggleSelect: (v: string) => any;
    highlight: (v: string) => any;
    downplay: (v: string) => any;
}, string, import('vue').PublicProps, Readonly<__VLS_Props> & Readonly<{
    onLegendToggleSelect?: ((v: string) => any) | undefined;
    onHighlight?: ((v: string) => any) | undefined;
    onDownplay?: ((v: string) => any) | undefined;
}>, {}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {
    cssomLegendRefKey: HTMLDivElement[];
    cssomLegendWrapRefKey: HTMLDivElement;
}, HTMLDivElement>;
export default _default;

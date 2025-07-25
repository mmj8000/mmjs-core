import { default as CssomLegend } from './cssomLegend';
export * from './const';
export type CssomLegendInstanceType = InstanceType<typeof CssomLegend>;
declare const UseCssomLegend: import('vue').DefineComponent<{
    ecInstance?: import('echarts').ECharts;
}, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<{
    ecInstance?: import('echarts').ECharts;
}> & Readonly<{}>, {}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, HTMLDivElement>;
export { UseCssomLegend as CssomLegend };

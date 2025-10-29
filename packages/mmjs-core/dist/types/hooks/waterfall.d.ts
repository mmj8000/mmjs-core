import { Ref } from 'vue';
/**
 *
 * @param list
 * @param columnCount
 * @returns
 * @example
 * const { colList } = useWaterfallColumns(ref([]), ref(2));
 */
export declare function useWaterfallColumns<T extends Ref<any[]>>(list: T, columnCount: Ref<number> | number): {
    colList: Ref<{
        cols: import('vue').UnwrapRef<T["value"]>;
        id: string;
        colIndex: number;
    }[], {
        cols: T["value"];
        id: string;
        colIndex: number;
    }[] | {
        cols: import('vue').UnwrapRef<T["value"]>;
        id: string;
        colIndex: number;
    }[]>;
};

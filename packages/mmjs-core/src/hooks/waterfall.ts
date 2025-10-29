import { type Ref, ref, unref, watchEffect } from "vue";

/**
 * 
 * @param list 
 * @param columnCount 
 * @returns 
 * @example
 * const { colList } = useWaterfallColumns(ref([]), ref(2));
 */
export function useWaterfallColumns<T extends Ref<any[]>>(
  list: T,
  columnCount: Ref<number> | number
) {
  const colList = ref<{ cols: T["value"]; id: string; colIndex: number }[]>([]);

  watchEffect(() => {
    const colCount = unref(columnCount);
    colList.value = [];
    for (let i = 0; i < colCount; i++) {
      colList.value[i] = {
        cols: [] as any,
        id: `id_${i}`,
        colIndex: i,
      };
    }
    let index = 0;
    list.value?.forEach((item) => {
      colList.value[index].cols.push(item);
      index++;
      if (index >= colCount) {
        index = 0;
      }
    });
  });
  return {
    colList,
  };
}

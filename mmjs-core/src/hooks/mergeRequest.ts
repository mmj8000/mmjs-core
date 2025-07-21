import '@enhances/with-resolvers';

/**
 * 合并相同的请求
 * @example const newFn = useMergeRequest(async () => {})
 */
export function useMergeRequest<T extends (...args: any[]) => any>(fn: T) {
    type ReturnT = ReturnType<T>;
    type ParamsT = Parameters<T>;
    type AwaitedT = Awaited<ReturnT>;
    const requestMap = new Map<string, {
        resolves: ((value: AwaitedT) => void)[];
        rejects: ((reason?: any) => void)[];
        status: 'requesting' | 'finally';
    }>();

    return (...args: ParamsT): Promise<AwaitedT> => {
        const key = JSON.stringify(args);

        let entry = requestMap.get(key);
        if (!entry) {
            entry = {
                resolves: [],
                rejects: [],
                status: 'finally'
            };
            requestMap.set(key, entry);
        }

        const { resolve, reject, promise } = Promise.withResolvers<AwaitedT>();
        entry.resolves.push(resolve);
        entry.rejects.push(reject);

        if (entry.status === 'requesting') {
            return promise;
        }

        entry.status = 'requesting';

        fn(...args).then((res) => {
            entry!.resolves.forEach(value => value(res));
            entry!.resolves = [];
        }).catch((err) => {
            entry!.rejects.forEach(reason => reason(err));
            entry!.rejects = [];
        }).finally(() => {
            entry!.status = 'finally';
            requestMap.delete(key);
        });

        return promise;
    };
}


export function useMergeRequest<T extends (...args: any[]) => any>(fn: T) {
    type returnType = ReturnType<typeof fn>;
    const resolves: ((value: returnType) => void)[] = [];
    const rejects: ((reason?: any) => void)[] = [];
    let status: 'requesting' | 'finally' = 'finally';
    return (...args: Parameters<typeof fn>) => {
        const { resolve, reject, promise } = Promise.withResolvers<Promise<returnType>>();
        resolves.push(resolve);
        rejects.push(reject);
        if (status === 'requesting') {
            return promise;
        }
        status = 'requesting';
        fn(...args).then((res) => {
            resolves.forEach(value => {
                value(res);
            });
            resolves.splice(0, resolves.length);
        }).catch((err) => {
            rejects.forEach(reason => {
                reason(err);
            });
            rejects.splice(0, rejects.length);
        }).finally(() => {
            status = 'finally';
        });
        return promise;
    }
}

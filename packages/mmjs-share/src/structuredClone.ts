// structuredClone.ts
type StructuredCloneable =
  | null
  | undefined
  | boolean
  | number
  | string
  | Date
  | RegExp
  | ArrayBuffer
  | Blob
  | File
  | ImageBitmap
  | Map<unknown, unknown>
  | Set<unknown>
  | Array<StructuredCloneable>
  | { [key: string]: StructuredCloneable }
  | object;

interface StructuredCloneOptions {
  transfer?: Transferable[];
}

const hasNativeStructuredClone = typeof structuredClone === 'function';

function polyfillStructuredClone<T extends StructuredCloneable>(
  value: T,
  _options?: StructuredCloneOptions
): T {
  const cache = new Map<unknown, unknown>();

  function clone<T>(value: T): T {
    if (typeof value !== 'object' || value === null) {
      return value;
    }

    if (cache.has(value)) {
      return cache.get(value) as T;
    }

    if (value instanceof Date) {
      const copy = new Date(value) as unknown as T;
      cache.set(value, copy);
      return copy;
    }

    if (value instanceof RegExp) {
      const copy = new RegExp(value.source, value.flags) as unknown as T;
      cache.set(value, copy);
      return copy;
    }

    if (value instanceof Map) {
      const copy = new Map() as unknown as T;
      cache.set(value, copy);
      (value as Map<unknown, unknown>).forEach((v, k) => {
        (copy as Map<unknown, unknown>).set(clone(k), clone(v));
      });
      return copy;
    }

    if (value instanceof Set) {
      const copy = new Set() as unknown as T;
      cache.set(value, copy);
      (value as Set<unknown>).forEach(v => {
        (copy as Set<unknown>).add(clone(v));
      });
      return copy;
    }

    if (value instanceof ArrayBuffer) {
      const copy = new ArrayBuffer(value.byteLength);
      new Uint8Array(copy).set(new Uint8Array(value));
      cache.set(value, copy);
      return copy as unknown as T;
    }

    if (ArrayBuffer.isView(value)) {
      const bufferClone = clone((value as { buffer: ArrayBuffer }).buffer);
      const TypedArrayConstructor = Object.getPrototypeOf(value).constructor;
      const copy = new TypedArrayConstructor(
        bufferClone,
        (value as { byteOffset: number }).byteOffset,
        (value as unknown as { length: number }).length
      ) as unknown as T;
      cache.set(value, copy);
      return copy;
    }

    if (value instanceof Blob) {
      cache.set(value, value);
      return value;
    }

    const prototype = Object.getPrototypeOf(value);
    const copy = Object.create(prototype);
    cache.set(value, copy);

    const keys = Reflect.ownKeys(value as object);
    for (const key of keys) {
      const descriptor = Object.getOwnPropertyDescriptor(value as object, key)!;
      if (descriptor.get || descriptor.set) {
        Object.defineProperty(copy, key, descriptor);
      } else {
        (copy as Record<PropertyKey, unknown>)[key] = clone(
          (value as Record<PropertyKey, unknown>)[key]
        );
      }
    }

    return copy as T;
  }

  return clone(value);
}

// Lazy initialization
let _structuredClone = function <T extends StructuredCloneable>(
  value: T,
  options?: StructuredCloneOptions
): T {
  if (hasNativeStructuredClone) {
    _structuredClone = (globalThis as any).structuredClone;
  } else {
    _structuredClone = polyfillStructuredClone;
  }
  return _structuredClone(value, options);
};

export const structuredClonePolyfill = <T extends StructuredCloneable>(
  value: T,
  options?: StructuredCloneOptions
): T => _structuredClone(value, options);

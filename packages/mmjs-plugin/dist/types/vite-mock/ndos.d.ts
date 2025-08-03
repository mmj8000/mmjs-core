import { Dirent } from 'node:fs';
type FileFilter = (dirent: Dirent, fullPath: string) => boolean;
interface EnhancedFindFilesOptions {
    /** 自定义过滤器函数 */
    filter?: FileFilter;
    /** 是否递归搜索子目录，默认 false */
    recursive?: boolean;
    /** 要排除的文件/目录正则 */
    exclude?: RegExp;
}
/**
 * 增强型文件搜索函数（更灵活的类型定义）
 * @param dirPath 要搜索的目录路径
 * @param options 配置选项
 * @returns 包含匹配文件的完整路径数组
 */
export declare function enhancedFindFiles(dirPath: string, options?: EnhancedFindFilesOptions): Promise<string[]>;
export {};

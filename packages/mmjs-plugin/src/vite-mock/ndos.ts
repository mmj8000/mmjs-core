import { Dirent, promises as fs } from 'node:fs';
import path from 'node:path';

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
export async function enhancedFindFiles(
    dirPath: string,
    options: EnhancedFindFilesOptions = {}
): Promise<string[]> {
    const {
        filter = defaultFilter,
        recursive = false,
        exclude
    } = options;

    try {
        const items = await fs.readdir(dirPath, { withFileTypes: true });
        const files: string[] = [];

        await Promise.all(items.map(async (item) => {
            const fullPath = path.join(dirPath, item.name);

            // 检查是否在排除列表中
            if (exclude && exclude.test(item.name)) {
                return;
            }

            if (item.isFile() && filter(item, fullPath)) {
                files.push(fullPath);
            } else if (item.isDirectory() && recursive) {
                const subFiles = await enhancedFindFiles(fullPath, options);
                files.push(...subFiles);
            }
        }));

        return files;
    } catch (error) {
        console.error(`Error reading directory ${dirPath}:`, error);
        return [];
    }
}

// 默认过滤器：查找包含 $id 的文件
function defaultFilter(dirent: Dirent, fullPath: string): boolean {
    return dirent.name.includes('$id');
}
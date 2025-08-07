import { existsSync, mkdirSync, statSync, writeFile, WriteFileOptions } from "node:fs";
import { allowCharset, allowExt, customContentTypeToExt, logLevelState, serverConfig } from "./options";
import path from "node:path";
import { appendFile } from "node:fs/promises";
import mime from "mime-types";
import { IncomingMessage } from "node:http";

const styles = {
  // 文本颜色
  black: "\x1b[30m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  magenta: "\x1b[35m",
  cyan: "\x1b[36m",
  white: "\x1b[37m",
  gray: "\x1b[90m",

  // 背景颜色
  bgBlack: "\x1b[40m",
  bgRed: "\x1b[41m",
  bgGreen: "\x1b[42m",
  bgYellow: "\x1b[43m",
  bgBlue: "\x1b[44m",
  bgMagenta: "\x1b[45m",
  bgCyan: "\x1b[46m",
  bgWhite: "\x1b[47m",

  // 样式
  reset: "\x1b[0m",
  bright: "\x1b[1m",
  dim: "\x1b[2m",
  italic: "\x1b[3m",
  underline: "\x1b[4m",
  blink: "\x1b[5m",
  reverse: "\x1b[7m",
  hidden: "\x1b[8m",
};

export function colorize(text, ...stylesToApply) {
  return stylesToApply.map((s) => styles[s]).join("") + text + styles.reset;
}

export function uniBeforeStrLog() {
  return (
    colorize(new Date().toLocaleTimeString(), "gray") +
    " " +
    colorize("[Mock]", "cyan", "bold")
  );
}
let parentLog = "";
export const non_write_loggger = {
  success(data) {
    if (parentLog === data) return;
    parentLog = data;
    return (
      logLevelState.isLogSuccess &&
      console.log(`${uniBeforeStrLog()}`, colorize(data, "green"))
    );
  },
  info(data) {
    if (parentLog === data) return;
    parentLog = data;
    return logLevelState.isLogInfo && console.log(`${uniBeforeStrLog()}`, data);
  },
  wran(data) {
    if (parentLog === data) return;
    parentLog = data;
    return (
      logLevelState.isLogWarn &&
      console.log(`${uniBeforeStrLog()}`, colorize(data, "yellow"))
    );
  },
  error(data) {
    if (parentLog === data) return;
    parentLog = data;
    return console.log(`${uniBeforeStrLog()}`, colorize(data, "red"));
  },
};
export const logger = {
  success(data) {
    non_write_loggger.success(data);
  },
  info(data) {
    non_write_loggger.info(data);
  },
  wran(data) {
    non_write_loggger.wran(data);
  },
  error(data) {
    non_write_loggger.error(data);
  },
};

export function existsSyncByMkdir(file: string) {
  try {
    const dirName = path.dirname(file);
    if (!existsSync(dirName)) {
      mkdirSync(dirName, { recursive: true });
    }
  } catch (err) {
    non_write_loggger.error(err);
  }
}

export function writeMockFile(
  file: string,
  data: string | NodeJS.ArrayBufferView,
  options: WriteFileOptions,
  print = true
) {
  existsSyncByMkdir(file);
  writeFile(file, data, options, (err: NodeJS.ErrnoException | null) => {
    if (!err) {
      print && non_write_loggger.success(`💧 Write File Successify ${file}`);
    } else {
      non_write_loggger.wran(err);
    }
  });
}

export async function appendFileFn(
  file: string,
  data: string,
  options: WriteFileOptions,
  print = true
) {
  existsSyncByMkdir(file);
  try {
    await appendFile(file, data, options);
    print && non_write_loggger.success(`💧 Append File Successify ${file}`);
  } catch (err) {
    non_write_loggger.wran(err);
  }
}

export function safeUrlToFilename(url) {
  // 基本验证和提取
  const matches = url.match(/^(https?):\/\/([^\/:]+)(?::(\d+))?(\/.*)?$/i);
  if (!matches) return "invalid_url";

  const protocol = matches[1];
  const hostname = matches[2];
  const port = matches[3] || (protocol === "https" ? "443" : "80");
  const path = (matches[4] || "").replace(/\//g, "_");

  // 构建文件名并替换非法字符
  let filename = `${hostname}_${port}`;
  if (path && path !== "_") {
    filename += path;
  }

  return filename
    .replace(/[^a-z0-9_]/gi, "_")
    .replace(/_+/g, "_")
    .toLowerCase();
}


export function useContentType(contentType: string | undefined) {
  let charset: BufferEncoding = mime.charset(contentType) || serverConfig.encoding || allowCharset[0];
  charset = charset.toLocaleLowerCase() as BufferEncoding;
  let mimeType = mime.extension(contentType) || customContentTypeToExt[contentType!] || serverConfig.fileExt.slice(1);
  let isInnerTempType = !(serverConfig.templateMimeType?.length) || serverConfig.templateMimeType.includes(mimeType);
  let fileExt: string = serverConfig.fileExt;
  let encoding = allowCharset.includes(charset)
    ? charset
    : allowCharset[0];

  if (isInnerTempType) {
    encoding = allowCharset[0];
  } else {
    fileExt = `.${mimeType}`;
  }

  return {
    charset,
    encoding,
    isInnerTempType,
    fileExt,
    mimeType,
  }
}

export function getContentTypeByPath(readPath: string) {
  return mime.contentType(readPath);
}

export function findMatchingTemplatePath(paths: string[], userUrl: string): string | null {
  // 标准化用户URL（统一使用正斜杠，移除开头/结尾分隔符和扩展名）
  const normalizedUserUrl = userUrl.replace(/^[\\/]|[\\/]$/g, '')
    .replace(/\\/g, '/')
    .replace(/\.[^/.]+$/, '');
  const userSegments = normalizedUserUrl.split('/');

  // 按路径深度排序，优先匹配更长的路径
  const sortedPaths = [...paths].sort((a, b) =>
    b.split(/[\\/]/).length - a.split(/[\\/]/).length
  );

  for (const templatePath of sortedPaths) {
    // 标准化模板路径（统一使用正斜杠，移除扩展名）
    const normalizedTemplate = templatePath.replace(/^[\\/]|[\\/]$/g, '')
      .replace(/\\/g, '/')
      .replace(/\.[^/.]+$/, '');
    const templateSegments = normalizedTemplate.split('/');

    // 如果段数不匹配，跳过
    if (templateSegments.length !== userSegments.length) {
      continue;
    }

    let isMatch = true;

    // 逐段比较
    for (let i = 0; i < templateSegments.length; i++) {
      const templateSeg = templateSegments[i];
      const userSeg = userSegments[i];

      // 检查是否是参数段（$开头的）
      const isParamSegment = /^\$[^/]+$/.test(templateSeg);

      // 如果是固定段，必须完全匹配（不区分大小写）
      if (!isParamSegment && templateSeg.toLowerCase() !== userSeg.toLowerCase()) {
        isMatch = false;
        break;
      }
    }

    if (isMatch) {
      return templatePath; // 返回原始模板路径
    }
  }

  return null;
}


export function fileExists(filePath: string) {
  try {
    statSync(filePath);
    return true;
  } catch (err) {
    return false;
  }
}


export function getHeaderMimeTypeKey(req: IncomingMessage) {
  return req.method === 'GET' ? 'accept' : "content-type";
}
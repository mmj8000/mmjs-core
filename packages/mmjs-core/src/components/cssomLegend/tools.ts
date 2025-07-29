export function calculateViewBox(pathData: string = "") {
  let minX = Infinity,
    minY = Infinity;
  let maxX = -Infinity,
    maxY = -Infinity;

  // 简化版path解析逻辑
  const commands = pathData.match(/[a-df-z][^a-df-z]*/gi);
  commands?.forEach((cmd) => {
    const nums = cmd
      .slice(1)
      .trim()
      .split(/[\s,]+/)
      .map(Number);
    for (let i = 0; i < nums.length; i += 2) {
      const x = nums[i],
        y = nums[i + 1];
      if (!isNaN(x)) minX = Math.min(minX, x);
      if (!isNaN(y)) minY = Math.min(minY, y);
      if (!isNaN(x)) maxX = Math.max(maxX, x);
      if (!isNaN(y)) maxY = Math.max(maxY, y);
    }
  });

  return `${minX} ${minY} ${maxX - minX + 2} ${maxY - minY + 2}`;
}

/**
 *
 * @param str
 * @example
 * const parsed = parseRichFormatString("{name|Union Ads}\n{test|测试}");
 * @returns
 */
export function parseRichFormatString(str: string) {
  const result: {
    type: "text" | "rich";
    content: string;
    name?: string;
  }[] = [];
  const regex = /\{([^}|]+)\|([^}]+)\}/g;
  let match;
  let lastIndex = 0;

  while ((match = regex.exec(str)) !== null) {
    // 添加普通文本（如果有）
    if (match.index > lastIndex) {
      result.push({
        type: "text",
        content: str.substring(lastIndex, match.index),
      });
    }

    // 添加富文本部分
    result.push({
      type: "rich",
      name: match[1],
      content: match[2] ?? "",
    });

    lastIndex = match.index + match[0].length;
  }

  // 添加剩余的普通文本（如果有）
  if (lastIndex < str.length) {
    result.push({
      type: "text",
      content: str.substring(lastIndex),
    });
  }

  return result;
}

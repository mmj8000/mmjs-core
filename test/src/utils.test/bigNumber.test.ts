import { describe, expect, it, test } from "vitest";

const w = 10000;

function bigNumber2(num, decimal = 0) {
  const resultObj = {
    value: num,
    decimal: "",
    result: num,
    unit: "",
    result2: "",
  };
  let _num = num;
  if (typeof _num !== "number") {
    _num = +num;
  }
  if (Number.isNaN(_num)) {
    return resultObj;
  }
  if (_num < w) {
    resultObj.value = _num;
    return resultObj;
  }
  resultObj.unit = "万";
  const result = _num / w;
  const [a, b] = `${result}`.split(".");
  const intValue = Number(a);
  const decimalValue = b ? b.substring(0, decimal) : "";
  resultObj.value = intValue;
  resultObj.decimal = decimalValue;
  if (!decimalValue) {
    resultObj.result = Number(intValue);
    resultObj.result2 = `${intValue}${resultObj.unit}`
  } else {
    resultObj.result = Number(`${intValue}.${decimalValue}`);
    resultObj.result2 = `${intValue}.${decimalValue}${resultObj.unit}`
  }
  return resultObj;
}
describe("大数点格式函数", () => {
  it("测试保留小数两位", () => {
    expect(bigNumber2(80900, 1).result2).toBe('8.0万');
    expect(bigNumber2(80900, 2).result2).toBe("8.09万");
    expect(bigNumber2(80900, 3).result2).toBe("8.09万");
    expect(bigNumber2(81000, 1).result2).toBe("8.1万");
    expect(bigNumber2(80000, 1).result2).toBe("8.0万");
  });
});

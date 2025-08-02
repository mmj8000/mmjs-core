
exports.enabled = true;

/**
 * @type {import('mmjs-plugin/vite-mock').MockTemplate}
 */
exports.mock = (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", true); // 允许携带凭证
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS"); // 按需调整
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization"); // 按需调整
  res.setHeader("Content-Type", "application/json");
  res.setHeader(
    "Vary",
    "Origin, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("X-XSS-Protection", "0");
  res.setHeader("Pragma", "no-cache");
  res.setHeader("Expires", "0");
  // 设置 Cookie
  res.setHeader(
    "Set-Cookie",
    "sutpc-login-token-SYS=4544ccb5-1eae-4272-baea-2a77348122b5;path=/"
  );
  res.setHeader("Set-Cookie", "sutpc-login-timezone-SYS=GMT++8:00;path=/");
  res.setHeader("Set-Cookie", "sutpc-login-territory-SYS=CN;path=/");
  res.setHeader("Set-Cookie", "sutpc-login-language-SYS=zh-CN;path=/");

 return { resultCode: "TCM-000", resultMsg: "", data: "admin", t: Date.now() }
};

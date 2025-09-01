function c(e = ["*"]) {
  return {
    name: "vite:server:cors",
    configureServer(s) {
      s.middlewares.use((t, r, o) => {
        r.setHeader("Access-Control-Allow-Origin", e), r.setHeader("Access-Control-Allow-Headers", e), o();
      });
    }
  };
}
export {
  c as useCors
};

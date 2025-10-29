function h(o, a, r) {
  const t = [], n = a.at(-1);
  return Object.entries(o).forEach(([i, p]) => {
    const e = i.match(`../${n}/(.*?)/index.vue`);
    if (!(e != null && e[1]) || !p) return;
    const c = e[1] || "", s = c.replace(/\//ig, ":"), $ = `../${a.join("/")}/${c}/index.vue`, u = {
      component: o[$],
      name: `${n}-${s}`,
      path: `/${n}/` + c,
      meta: {
        title: s,
        matchs: e
      }
    };
    if (r) {
      t.push(r(u));
      return;
    }
    t.push(u);
  }), t;
}
export {
  h as createMetaGlobRoutes
};

export const buildPagination = (page = 1, limit = 12) => {
  const p = Math.max(1, Number(page) || 1);
  const l = Math.min(100, Number(limit) || 12);
  const skip = (p - 1) * l;
  return { page: p, limit: l, skip };
};

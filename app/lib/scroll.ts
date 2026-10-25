// Shared, non-reactive scroll/pointer state read by the 3D scene every frame.
// `station` is a float: 0 = hero, 1 = about, ... (index of the [data-station] section
// currently crossing the middle of the viewport, interpolated between neighbours).
export const world = { station: 0, px: 0, py: 0 };

export function updateStation() {
  const els = document.querySelectorAll<HTMLElement>('[data-station]');
  if (!els.length) return;
  const mid = window.scrollY + window.innerHeight * 0.5;
  let s = 0;
  els.forEach((el, i) => {
    const top = el.offsetTop;
    const next = els[i + 1]?.offsetTop ?? top + el.offsetHeight;
    if (mid >= top) s = i + Math.min(1, (mid - top) / Math.max(1, next - top));
  });
  world.station = Math.min(s, els.length - 1);
}

export const createCanvas = (ref: HTMLCanvasElement) => {
  const ctx = ref.getContext("2d");
  if (!ctx) return;
  ctx.fillStyle = "#f0f0f0";
  ctx.fillRect(0, 0, 200, 100);
  ctx.fillStyle = "#e0f0ff";
  ctx.fillRect(10, 50, 130, 40);
  ctx.strokeStyle = "#72b9fc";
  ctx.lineWidth = 2;
  ctx.strokeRect(10, 50, 130, 40);
};

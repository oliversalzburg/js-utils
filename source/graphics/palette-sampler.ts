import { mustExist } from "../nil.js";
import { Palette, paletteName } from "./palette.js";

/**
 * Renders the colors of a palette into a canvas.
 * @param palette - The palette to render.
 * @param canvas - The canvas element to render to.
 * @group Graphics
 */
export const renderPaletteSample = (
  palette: Palette,
  canvas: HTMLCanvasElement | OffscreenCanvas,
) => {
  const context = mustExist(
    canvas.getContext("2d") as CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D | null,
  );
  context.globalAlpha = 255;

  const step = canvas.width / palette.colors.length;
  for (let x = 0; x < palette.colors.length; ++x) {
    const fillColor = (palette.colors[x] << 8) | 0xff;
    context.fillStyle = `#${fillColor.toString(16).padStart(8, "0")}`;
    context.fillRect(x * step, 0, step, canvas.height);
  }

  context.font = "13px monospace";
  context.fillStyle = "#ffffffff";
  context.fillText(paletteName(palette.paletteIndex), 5, canvas.height * 0.8);
};

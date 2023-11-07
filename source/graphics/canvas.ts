import { mustExist } from "../nil.js";
import {
  blend,
  blendAdditive,
  blendSubtractive,
  fromRGBA,
  getA,
  getB,
  getG,
  getR,
} from "./core.js";

/**
 * A wrapper around {@linkcode https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement HTMLCanvasElement}
 * to provide some convience for double-buffered drawing.
 */
export class Canvas {
  /**
   * The {@linkcode https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement HTMLCanvasElement}
   * we're interacting with.
   */
  readonly canvas: HTMLCanvasElement;

  /**
   * The width of the canvas.
   */
  readonly width: number;

  /**
   * The height of the canvas.
   */
  readonly height: number;

  /**
   * The {@linkcode https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2 CanvasRenderingContext2D}
   * we're using to draw to the canvas.
   */
  readonly context: CanvasRenderingContext2D;

  /**
   * The {@linkcode https://developer.mozilla.org/en-US/docs/Web/API/ImageData ImageData} object
   * that represents our frontbuffer, which is the canvas itself.
   */
  readonly pixMap: ImageData;

  /**
   * Our backbuffer.
   */
  readonly buffer: Uint8ClampedArray;

  /**
   * Constructs a new {@link Canvas}.
   * @param canvas The canvas to wrap.
   * @param width The width of the canvas.
   * @param height The height of the canvas.
   */
  constructor(canvas: HTMLCanvasElement, width: number, height: number) {
    this.canvas = canvas;
    this.width = width;
    this.height = height;

    this.context = mustExist(this.canvas.getContext("2d"), "Unable to create rendering context.");
    this.pixMap = this.context.createImageData(width, height);
    this.buffer = this.pixMap.data;

    this.context.font = "12px sans-serif";
  }

  /**
   * Draws the backbuffer onto the canvas.
   */
  update() {
    this.context.putImageData(this.pixMap, 0, 0);
  }

  /**
   * Returns the color of a pixel in the backbuffer.
   * @param x The X coordinate to retrieve.
   * @param y The X coordinate to retrieve.
   * @returns The color of the pixel at the given local.
   */
  getPixel32(x: number, y: number) {
    const bufferOffset = Math.trunc((x + y * this.width) * 4);
    return fromRGBA(
      this.buffer[bufferOffset + 0],
      this.buffer[bufferOffset + 1],
      this.buffer[bufferOffset + 2],
      this.buffer[bufferOffset + 3],
    );
  }

  /**
   * Colors a pixel in the backbuffer.
   * @param x The X coordinate to color.
   * @param y The Y coordinate to color.
   * @param color The color to place at the coordinate.
   */
  setPixel32(x: number, y: number, color: number) {
    const bufferOffset = Math.trunc((x + y * this.width) * 4);
    this.buffer[bufferOffset + 0] = getR(color);
    this.buffer[bufferOffset + 1] = getG(color);
    this.buffer[bufferOffset + 2] = getB(color);
    this.buffer[bufferOffset + 3] = getA(color);
  }

  /**
   * Fills the entire backbuffer with the given color.
   * @param color The color to fill the backbuffer with.
   */
  clearWith(color: number) {
    const r = getR(color);
    const g = getG(color);
    const b = getB(color);
    const a = getA(color);
    for (let bufferOffset = 0; bufferOffset < this.width * this.height * 4; bufferOffset += 4) {
      this.buffer[bufferOffset + 0] = r;
      this.buffer[bufferOffset + 1] = g;
      this.buffer[bufferOffset + 2] = b;
      this.buffer[bufferOffset + 3] = a;
    }
  }
}

/**
 * Linearly blends a new pixel with an existing color value in a {@link Canvas}.
 * @param canvas The {@link Canvas} to interact with.
 * @param x The X coordinate at which to place the pixel.
 * @param y The Y coordinate at which to place the pixel.
 * @param color The color of the pixel.
 * @param alpha The alpha value to use to blend the pixel with existing color at the location.
 */
export const putPixel32 = (canvas: Canvas, x: number, y: number, color: number, alpha: number) => {
  if (canvas.width < x || x < 0 || canvas.height < y || y < 0) {
    return;
  }

  x = Math.trunc(x);
  y = Math.trunc(y);

  if (alpha > 255) {
    alpha = 255;
  }
  const srcColor = canvas.getPixel32(x, y);
  const newColor = blend(srcColor, color, alpha);
  canvas.setPixel32(x, y, newColor);
};

/**
 * Additively blends a new pixel with an existing color value in a {@link Canvas}.
 * @param canvas The {@link Canvas} to interact with.
 * @param x The X coordinate at which to place the pixel.
 * @param y The Y coordinate at which to place the pixel.
 * @param color The color of the pixel.
 * @param alpha The alpha value to use to blend the pixel with existing color at the location.
 */
export const putPixel32Add = (
  canvas: Canvas,
  x: number,
  y: number,
  color: number,
  alpha: number,
) => {
  if (canvas.width < x || x < 0 || canvas.height < y || y < 0) {
    return;
  }

  x = Math.round(x);
  y = Math.round(y);

  if (alpha > 255) {
    alpha = 255;
  }
  const srcColor = canvas.getPixel32(x, y);
  const newColor = blendAdditive(srcColor, color, alpha);
  canvas.setPixel32(x, y, newColor);
};

/**
 * Subtractively blends a new pixel with an existing color value in a {@link Canvas}.
 * @param canvas The {@link Canvas} to interact with.
 * @param x The X coordinate at which to place the pixel.
 * @param y The Y coordinate at which to place the pixel.
 * @param color The color of the pixel.
 * @param alpha The alpha value to use to blend the pixel with existing color at the location.
 */
export const putPixel32Sub = (
  canvas: Canvas,
  x: number,
  y: number,
  color: number,
  alpha: number,
) => {
  if (canvas.width < x || x < 0 || canvas.height < y || y < 0) {
    return;
  }

  x = Math.round(x);
  y = Math.round(y);

  if (alpha > 255) {
    alpha = 255;
  }
  const srcColor = canvas.getPixel32(x, y);
  const newColor = blendSubtractive(srcColor, color, alpha);
  canvas.setPixel32(x, y, newColor);
};

/**
 * Linearly blends a new pixel with an existing color value in a {@link Canvas}.
 * Compared to {@link putPixel32}, this function supports sub-pixel placement, but is dramatically slower.
 * @param canvas The {@link Canvas} to interact with.
 * @param x The X coordinate at which to place the pixel.
 * @param y The Y coordinate at which to place the pixel.
 * @param color The color of the pixel.
 * @param alpha The alpha value to use to blend the pixel with existing color at the location.
 */
export const putSubPixel32 = (
  canvas: Canvas,
  x: number,
  y: number,
  color: number,
  alpha: number,
) => {
  if (canvas.width < x || x < 0 || canvas.height < y || y < 0) {
    return;
  }

  const xweight = x - Math.trunc(x);
  const yweight = y - Math.trunc(y);
  const xweightn = 1 - xweight;
  const yweightn = 1 - yweight;

  const alpha0 = xweightn * yweightn * alpha;
  const alpha1 = xweight * yweightn * alpha;
  const alpha2 = xweightn * yweight * alpha;
  const alpha3 = xweight * yweight * alpha;

  putPixel32(canvas, x + 0, y + 0, color, alpha0);
  putPixel32(canvas, x + 1, y + 0, color, alpha1);
  putPixel32(canvas, x + 0, y + 1, color, alpha2);
  putPixel32(canvas, x + 1, y + 1, color, alpha3);
};

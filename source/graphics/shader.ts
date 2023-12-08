import { InvalidOperationError } from "../errors/InvalidOperationError.js";
import { mustExist } from "../nil.js";

/**
 * Provides the input as-is.
 *
 * This method exists only to make use of the template string tag in code,
 * which allows us to use in-IDE support for GLSL, even if there is no build
 * process to interpret the tag.
 * @param input - Should only be the source of a fragment shader.
 * @returns The fragment shader as-is.
 * @group Graphics
 * @group GLSL
 * @group WebGL
 * @group Tags
 * @group Strings
 */
export const frag = (input: TemplateStringsArray): string => input.join();

/**
 * Provides the input as-is.
 *
 * This method exists only to make use of the template string tag in code,
 * which allows us to use in-IDE support for GLSL, even if there is no build
 * process to interpret the tag.
 * @param input - Should only be the source of a vertex shader.
 * @returns The vertex shader as-is.
 * @group Graphics
 * @group GLSL
 * @group WebGL
 * @group Tags
 * @group Strings
 */
export const vert = (input: TemplateStringsArray): string => input.join();

/**
 * Construction options for a {@linkcode !WebGLShader}.
 * @group Graphics
 * @group GLSL
 * @group WebGL
 */
export interface ShaderOptions {
  /**
   * The GLSL source code of the shader.
   */
  source: string;

  /**
   * The type of the shader.
   */
  type: WebGL2RenderingContext["FRAGMENT_SHADER"] | WebGL2RenderingContext["VERTEX_SHADER"];
}

/**
 * Constructs a new shader.
 * @param gl - The rendering context in which to create the shader.
 * @param options - The construction options for the shader.
 * @returns The shader.
 * @group Graphics
 * @group GLSL
 * @group WebGL
 */
export const createShader = (gl: WebGL2RenderingContext, options: ShaderOptions): WebGLShader => {
  const shader: WebGLShader = mustExist(gl.createShader(options.type));
  const shader_source = options.source.replace(/^\s*/, "");
  gl.shaderSource(shader, shader_source);
  gl.compileShader(shader);
  const compileStatus: unknown = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
  if (!compileStatus) {
    const errorMessage = gl.getShaderInfoLog(shader);
    throw new InvalidOperationError(`Could not compile shader\n${errorMessage}`);
  }
  return shader;
};

/**
 * Creates a new WebGL program.
 * @param gl - The rendering context in which to create the program.
 * @param shaders - The shaders we want to create.
 * @param transformFeedbackVaryings - Which values to record in transform
 * feedback buffer? See {@linkcode !WebGLTransformFeedback}.
 * @returns The program.
 * @group Graphics
 * @group GLSL
 * @group WebGL
 */
export const createGLProgram = (
  gl: WebGL2RenderingContext,
  shaders: Array<ShaderOptions>,
  transformFeedbackVaryings: Array<string> | null,
): WebGLProgram => {
  const program = mustExist(gl.createProgram());
  for (const shader_info of shaders) {
    const shader = createShader(gl, shader_info);
    gl.attachShader(program, shader);
  }

  if (transformFeedbackVaryings !== null) {
    gl.transformFeedbackVaryings(program, transformFeedbackVaryings, gl.INTERLEAVED_ATTRIBS);
  }

  gl.linkProgram(program);
  const link_status: unknown = gl.getProgramParameter(program, gl.LINK_STATUS);
  if (!link_status) {
    const error_message = gl.getProgramInfoLog(program);
    throw new InvalidOperationError(`Could not link program.\n${error_message}`);
  }
  return program;
};

/**
 * Create a buffer with random data in 2 channels (red/green).
 * @param width - Width of the buffer.
 * @param height - Height of the buffer.
 * @returns The buffer.
 * @group Graphics
 * @group GLSL
 * @group WebGL
 * @group Random
 */
export const randomRGData = (width: number, height: number) => {
  const data = new Array<number>();
  for (let i = 0; i < width * height; ++i) {
    data.push(Math.random() * 255.0);
    data.push(Math.random() * 255.0);
  }
  return new Uint8Array(data);
};

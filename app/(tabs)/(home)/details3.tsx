import React from 'react';
import { View } from 'react-native';
import { GLView } from 'expo-gl';

export default function App() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <GLView style={{ width: 300, height: 300 }} onContextCreate={onContextCreate} />
    </View>
  );
}

interface GLContext {
  viewport: (x: number, y: number, width: number, height: number) => void;
  clearColor: (r: number, g: number, b: number, a: number) => void;
  createShader: (type: number) => WebGLShader | null;
  shaderSource: (shader: WebGLShader, source: string) => void;
  compileShader: (shader: WebGLShader) => void;
  createProgram: () => WebGLProgram | null;
  attachShader: (program: WebGLProgram, shader: WebGLShader) => void;
  linkProgram: (program: WebGLProgram) => void;
  useProgram: (program: WebGLProgram) => void;
  clear: (mask: number) => void;
  drawArrays: (mode: number, first: number, count: number) => void;
  flush: () => void;
  endFrameEXP: () => void;
  VERTEX_SHADER: number;
  FRAGMENT_SHADER: number;
  COLOR_BUFFER_BIT: number;
  POINTS: number;
  drawingBufferWidth: number;
  drawingBufferHeight: number;
}

function onContextCreate(gl: GLContext) {
  gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
  gl.clearColor(0, 1, 1, 1);

  // Create vertex shader (shape & position)
  const vert = gl.createShader(gl.VERTEX_SHADER);
  if (!vert) throw new Error("Failed to create vertex shader");
  gl.shaderSource(
    vert,
    `
    void main(void) {
      gl_Position = vec4(0.0, 0.0, 0.0, 1.0);
      gl_PointSize = 150.0;
    }
  `
  );
  gl.compileShader(vert);

  // Create fragment shader (color)
  const frag = gl.createShader(gl.FRAGMENT_SHADER);
  if (!frag) throw new Error("Failed to create fragment shader");
  gl.shaderSource(
    frag,
    `
    void main(void) {
      gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
    }
  `
  );
  gl.compileShader(frag);

  // Link together into a program
  const program = gl.createProgram();
  if (!program) throw new Error("Failed to create program");
  gl.attachShader(program, vert);
  gl.attachShader(program, frag);
  gl.linkProgram(program);
  gl.useProgram(program);

  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.drawArrays(gl.POINTS, 0, 1);

  gl.flush();
  gl.endFrameEXP();
}

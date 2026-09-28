import { useEffect, useRef } from 'react';

/* ─────────────────────────────────────────────────────────────
   GradientBackground — WebGL animated gradient
   ─────────────────────────────────────────────────────────────
   Tweak guide:
   • Colors        → constants C0–C3  in FRAG_SRC
   • Band positions→ smoothstep ranges in ramp()  (0.30, 0.52 etc.)
   • Ripple amount → amplitudes 0.045 and 0.025  (band edge waviness)
   • Ripple speed  → the multipliers after  t *  (0.35 and 0.28)
   • Breathe depth → 0.025 in  sin(t * 0.12)    (global pulse amount)
   • Breathe speed → the 0.12 in  sin(t * 0.12)
   • Overall speed → `speed` prop (default 1.0)
   ───────────────────────────────────────────────────────────── */

const FALLBACK_GRADIENT =
  'linear-gradient(160deg, #0a494f 0%, #b478d4 50%, #8fd8f5 100%)';

const FRAG_SRC = `
  precision highp float;
  uniform vec2  uRes;
  uniform float uTime;

  const vec3 C0 = vec3(0.039, 0.286, 0.310);
  const vec3 C1 = vec3(0.706, 0.471, 0.831); // #b478d4
  const vec3 C2 = vec3(0.561, 0.847, 0.961); // old C3 (#8fd8f5)

  vec3 ramp(float x) {
    vec3 c = C0;
    // Widened range for a soft "perfume spray" spread
    c = mix(c, C1, smoothstep(0.10, 0.80, x));
    c = mix(c, C2, smoothstep(0.50, 1.00, x));
    return c;
  }

  void main() {
    // uv.y: 0.0 = bottom, 1.0 = top
    vec2 uv = gl_FragCoord.xy / uRes;
    float t  = uTime;

    // Horizontal-only ripple — bends band edges left/right, never reorders colors.
    // Max amplitude increased slightly for more visible fluid motion
    float ripple = 0.075 * sin(uv.x * 6.2832 + t * 0.6)
                 + 0.040 * sin(uv.x * 11.0   - t * 0.45 + 1.7);

    // Slightly deeper and faster breathing for overall gradient flow
    float breathe = 0.050 * sin(t * 0.3);

    // Diagonal tilt: curves the colors UP on the left and DOWN on the right, 
    // now with a slight slow flex over time so the curve feels alive.
    float tilt = (uv.x - 0.5) * (0.4 + 0.08 * sin(t * 0.2));

    // v: 0 = top → C0 (dark teal), 1 = bottom → C2 (sky blue). Order is fixed.
    float v = clamp(1.0 - uv.y + ripple + breathe - tilt, 0.0, 1.0);

    vec3 col = ramp(v);

    // Tiny dither to prevent banding
    float n = fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453);
    col += (n - 0.5) / 255.0;

    gl_FragColor = vec4(col, 1.0);
  }
`;

const VERT_SRC = `
  attribute vec2 aPos;
  void main() { gl_Position = vec4(aPos, 0.0, 1.0); }
`;

function compileShader(gl: WebGLRenderingContext, type: number, src: string): WebGLShader | null {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, src);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.warn('[GradientBackground] shader compile error:', gl.getShaderInfoLog(shader) || '(no info log)');
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

function buildProgram(gl: WebGLRenderingContext): WebGLProgram | null {
  const vert = compileShader(gl, gl.VERTEX_SHADER, VERT_SRC);
  const frag = compileShader(gl, gl.FRAGMENT_SHADER, FRAG_SRC);
  if (!vert || !frag) return null;
  const prog = gl.createProgram();
  if (!prog) return null;
  gl.attachShader(prog, vert);
  gl.attachShader(prog, frag);
  gl.linkProgram(prog);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
    console.warn('[GradientBackground] program link error:', gl.getProgramInfoLog(prog));
    return null;
  }
  gl.deleteShader(vert);
  gl.deleteShader(frag);
  return prog;
}

export interface GradientBackgroundProps {
  speed?: number;
  resolution?: number;
  className?: string;
}

export const GradientBackground = ({
  speed = 0.5,
  resolution = 0.5,
  className = '',
}: GradientBackgroundProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const gl = canvas.getContext('webgl', {
      antialias: false,
      depth: false,
      stencil: false,
      alpha: false,
      powerPreference: 'low-power',
    });

    if (!gl || gl.isContextLost()) return;

    const prog = buildProgram(gl);
    if (!prog) return;

    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);

    const aPos = gl.getAttribLocation(prog, 'aPos');
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(prog, 'uRes');
    const uTime = gl.getUniformLocation(prog, 'uTime');

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const scale = resolution * dpr;
      const w = Math.round(canvas.clientWidth * scale);
      const h = Math.round(canvas.clientHeight * scale);
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
      }
    };
    resize();

    let rafId = 0;
    let elapsed = 0;
    let last = performance.now();
    let isPaused = false;

    const draw = (now: number) => {
      if (gl.isContextLost()) return;
      const dt = Math.min((now - last) / 1000, 0.1);
      last = now;
      elapsed += dt * speed;
      resize();
      if (canvas.width === 0 || canvas.height === 0) {
        rafId = requestAnimationFrame(draw);
        return;
      }
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uTime, elapsed);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      if (!prefersReduced) rafId = requestAnimationFrame(draw);
    };

    const handleVisibility = () => {
      if (document.hidden) {
        isPaused = true;
        cancelAnimationFrame(rafId);
      } else if (isPaused) {
        isPaused = false;
        last = performance.now();
        rafId = requestAnimationFrame(draw);
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);

    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) {
        isPaused = true;
        cancelAnimationFrame(rafId);
      } else if (isPaused) {
        isPaused = false;
        last = performance.now();
        rafId = requestAnimationFrame(draw);
      }
    }, { threshold: 0 });
    io.observe(canvas);

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    rafId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener('visibilitychange', handleVisibility);
      io.disconnect();
      ro.disconnect();
      // Do NOT call loseContext() here — React StrictMode double-invokes
      // effects in dev, and loseContext() leaves the context in a broken
      // state for the second mount. The browser GCs the context naturally.
      gl.deleteBuffer(buf);
      gl.deleteProgram(prog);
    };
  }, [speed, resolution]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      style={{ background: FALLBACK_GRADIENT }}
    />
  );
};

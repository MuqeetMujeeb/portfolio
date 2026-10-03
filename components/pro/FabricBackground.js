"use client";

import { useEffect, useRef } from "react";
import { on, prefersReducedMotion } from "@/lib/pro/fx";

// Woven charcoal fabric drawn in a WebGL fragment shader: slow wave folds, a
// fine twill weave, sheen and a vignette. A "ripple" event (page changes)
// sends a pulse through the folds. Falls back to the CSS weave on <body>.
const VS = "attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}";
const FS = `precision mediump float;
uniform vec2 r;uniform float t;uniform float dpr;uniform float pulse;uniform float pt;
float h(vec2 p){
 float v=0.55*sin(p.x*1.05+p.y*0.38+t*0.32);
 v+=0.32*sin(p.x*0.55-p.y*1.15+t*0.21+1.3);
 v+=0.16*sin((p.x+p.y)*2.2+t*0.47+sin(p.y*0.8+t*0.12)*1.6);
 float d=length(p-vec2(2.6,1.4));
 v+=pulse*0.55*sin(d*2.6-pt*5.0)*exp(-d*0.25);
 return v;}
void main(){
 vec2 uv=gl_FragCoord.xy/r.y;
 vec2 p=uv*3.2;
 float e=0.012;
 float hx=h(p+vec2(e,0.))-h(p-vec2(e,0.));
 float hy=h(p+vec2(0.,e))-h(p-vec2(0.,e));
 vec3 n=normalize(vec3(-hx/(2.*e)*0.62,-hy/(2.*e)*0.62,1.));
 vec3 l=normalize(vec3(-0.45,0.62,0.68));
 float diff=clamp(dot(n,l),0.,1.);
 float sheen=pow(clamp(dot(n,normalize(l+vec3(0.,0.,1.))),0.,1.),14.);
 vec2 g=gl_FragCoord.xy/dpr;
 float warp=0.5+0.5*sin(g.x*2.1);
 float weft=0.5+0.5*sin(g.y*2.1);
 float tw=mod(floor((g.x+g.y)/3.),2.);
 float weave=mix(warp,weft,tw);
 float grain=fract(sin(dot(floor(g),vec2(12.9898,78.233)))*43758.5453);
 vec3 base=mix(vec3(0.045,0.047,0.052),vec3(0.30,0.303,0.315),diff*diff);
 base+=vec3(0.16,0.155,0.145)*sheen;
 base*=0.86+0.16*weave;
 base+=(grain-0.5)*0.018;
 vec2 q=gl_FragCoord.xy/r;
 base*=0.78+0.22*smoothstep(1.15,0.15,length(q-vec2(0.5,0.55)));
 gl_FragColor=vec4(base,1.);}`;

export default function FabricBackground() {
  const ref = useRef(null);

  useEffect(() => {
    const c = ref.current;
    const gl = c.getContext("webgl", { antialias: false, premultipliedAlpha: false });
    if (!gl) { c.style.display = "none"; return; }
    const sh = (type, src) => { const s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s); return gl.getShaderParameter(s, gl.COMPILE_STATUS) ? s : null; };
    const v = sh(gl.VERTEX_SHADER, VS), f = sh(gl.FRAGMENT_SHADER, FS);
    if (!v || !f) { c.style.display = "none"; return; }
    const pr = gl.createProgram(); gl.attachShader(pr, v); gl.attachShader(pr, f); gl.linkProgram(pr);
    if (!gl.getProgramParameter(pr, gl.LINK_STATUS)) { c.style.display = "none"; return; }
    gl.useProgram(pr);
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(pr, "p"); gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    const u = (n) => gl.getUniformLocation(pr, n);
    const uR = u("r"), uT = u("t"), uD = u("dpr"), uP = u("pulse"), uPT = u("pt");
    const reduce = prefersReducedMotion();
    let dpr = 1, pulse = 0, pulseT = 0, raf = 0;

    const draw = (t) => {
      gl.uniform2f(uR, c.width, c.height); gl.uniform1f(uT, t); gl.uniform1f(uD, dpr);
      gl.uniform1f(uP, pulse); gl.uniform1f(uPT, pulseT);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };
    const size = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      c.width = Math.round(innerWidth * dpr); c.height = Math.round(innerHeight * dpr);
      gl.viewport(0, 0, c.width, c.height);
      if (reduce) draw(12);
    };
    window.addEventListener("resize", size);
    size();
    const off = on("ripple", () => { if (!reduce) { pulse = 1; pulseT = 0; } });

    if (reduce) draw(12);
    else {
      let last = performance.now();
      const loop = (now) => {
        const dt = Math.min((now - last) / 1000, 0.05); last = now;
        if (pulse > 0) { pulse = Math.max(0, pulse - dt * 0.55); pulseT += dt; }
        if (!document.hidden) draw(now / 1000);
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
    }
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", size); off(); };
  }, []);

  return (
    <>
      <canvas id="fabric" ref={ref} aria-hidden="true" />
      <div className="scrim" aria-hidden="true" />
    </>
  );
}

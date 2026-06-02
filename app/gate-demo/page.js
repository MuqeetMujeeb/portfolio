"use client";

import { useState, useRef } from "react";
import { profile } from "@/lib/profile";

const VARIANTS = [
  { id: "torch", label: "Torch Reveal" },
  { id: "lever", label: "Lever Pull" },
  { id: "bridge", label: "Drawbridge" },
  { id: "seal", label: "Wax Seal" },
  { id: "iris", label: "Iris / Spyglass" },
  { id: "doors", label: "Torch Doors" },
];

export default function GateDemo() {
  const [variant, setVariant] = useState("torch");
  const [run, setRun] = useState(0);

  const pick = (v) => {
    setVariant(v);
    setRun((r) => r + 1);
  };

  return (
    <div className="demo-root">
      <div className="demo-bar">
        {VARIANTS.map((v) => (
          <button
            key={v.id}
            className={variant === v.id ? "active" : ""}
            onClick={() => pick(v.id)}
          >
            {v.label}
          </button>
        ))}
        <button onClick={() => setRun((r) => r + 1)}>↻ Replay</button>
        <span className="spacer" />
        <a href="/">← back to site</a>
      </div>

      <div className="demo-stage" key={`${variant}-${run}`}>
        {variant === "torch" && <TorchReveal />}
        {variant === "lever" && <LeverPull />}
        {variant === "bridge" && <DrawbridgeDrop />}
        {variant === "seal" && <WaxSeal />}
        {variant === "iris" && <IrisReveal />}
        {variant === "doors" && <TorchDoors />}
      </div>

      <style jsx global>{`
        .demo-root {
          position: fixed;
          inset: 0;
          z-index: 1000;
          background: #070503;
          font-family: var(--font-garamond), Georgia, serif;
          overflow: hidden;
        }
        .demo-bar {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          z-index: 20;
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 0.5rem;
          padding: 0.7rem 1rem;
          background: linear-gradient(180deg, rgba(0, 0, 0, 0.75), transparent);
        }
        .demo-bar .spacer {
          flex: 1;
        }
        .demo-bar button,
        .demo-bar a {
          font-family: var(--font-cinzel), serif;
          font-size: 0.64rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          padding: 0.5rem 0.85rem;
          border: 1px solid #a9852f;
          background: rgba(20, 14, 8, 0.55);
          color: #e7c97a;
          cursor: pointer;
          border-radius: 3px;
          transition: all 0.25s ease;
        }
        .demo-bar button:hover,
        .demo-bar a:hover {
          background: rgba(205, 164, 77, 0.25);
        }
        .demo-bar button.active {
          background: #cda44d;
          color: #0e0a06;
          border-color: #e7c97a;
        }
        .demo-stage {
          position: absolute;
          inset: 0;
        }
        .demo-caption {
          position: absolute;
          bottom: 1.6rem;
          left: 50%;
          transform: translateX(-50%);
          z-index: 8;
          font-family: var(--font-cinzel), serif;
          font-size: 0.62rem;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: rgba(231, 201, 122, 0.7);
          text-align: center;
        }
        /* shared trigger button */
        .ignite {
          position: absolute;
          left: 50%;
          top: calc(50% + 95px);
          transform: translateX(-50%);
          z-index: 6;
          font-family: var(--font-cinzel), serif;
          font-size: 0.78rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          padding: 0.95rem 2rem;
          border: 1.5px solid #cda44d;
          background: rgba(20, 14, 8, 0.5);
          color: #f3e8cf;
          cursor: pointer;
          border-radius: 3px;
          backdrop-filter: blur(3px);
          animation: pulseGlow 2.4s ease-in-out infinite;
        }
        .ignite:hover {
          background: #cda44d;
          color: #0e0a06;
        }
        @keyframes pulseGlow {
          0%,
          100% {
            box-shadow: 0 0 0 rgba(231, 201, 122, 0);
          }
          50% {
            box-shadow: 0 0 26px rgba(231, 201, 122, 0.5);
          }
        }
        @keyframes flick {
          from {
            transform: translateX(-50%) scale(1, 1);
          }
          to {
            transform: translateX(-51%) scale(0.93, 1.12);
          }
        }

        /* ===================== TORCH REVEAL ===================== */
        .torch {
          position: absolute;
          inset: 0;
          background: #000;
          overflow: hidden;
        }
        .torch-scene {
          position: absolute;
          inset: 0;
          background: url("/images/home.png") center/cover;
          clip-path: circle(0% at 50% 50%);
          transition: clip-path 2.6s cubic-bezier(0.6, 0, 0.2, 1);
        }
        .torch.lit .torch-scene {
          clip-path: circle(150% at 50% 50%);
        }
        .torch-flash {
          position: absolute;
          left: 50%;
          top: 50%;
          width: 320px;
          height: 320px;
          border-radius: 50%;
          transform: translate(-50%, -50%) scale(0.15);
          background: radial-gradient(
            circle,
            rgba(255, 214, 130, 0.8),
            rgba(255, 150, 50, 0.35) 45%,
            transparent 68%
          );
          mix-blend-mode: screen;
          opacity: 0;
          pointer-events: none;
          z-index: 2;
        }
        .torch.lit .torch-flash {
          animation: torchFlash 2.6s ease forwards;
        }
        @keyframes torchFlash {
          0% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.15);
          }
          14% {
            opacity: 1;
          }
          100% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(9);
          }
        }
        .torch-flame {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          width: 80px;
          height: 110px;
          z-index: 3;
          opacity: 0.55;
          transition: opacity 1.8s ease;
          pointer-events: none;
        }
        .torch.lit .torch-flame {
          opacity: 0;
          transition: opacity 2s ease 0.5s;
        }
        .flame-glow {
          position: absolute;
          left: 50%;
          top: 50%;
          width: 150px;
          height: 150px;
          transform: translate(-50%, -50%);
          border-radius: 50%;
          background: radial-gradient(
            circle,
            rgba(255, 170, 60, 0.5),
            transparent 70%
          );
        }
        .flame-core {
          position: absolute;
          bottom: 8px;
          left: 50%;
          transform: translateX(-50%);
          width: 38px;
          height: 64px;
          background: radial-gradient(
            ellipse at 50% 80%,
            #fff3c0,
            #ffb347 38%,
            #ff6a00 68%,
            transparent 74%
          );
          border-radius: 50% 50% 45% 45% / 60% 60% 42% 42%;
          filter: blur(1px);
          animation: flick 0.16s infinite alternate;
        }

        /* ===================== LEVER PULL ===================== */
        .lever-stage {
          position: absolute;
          inset: 0;
          background: #070503;
          overflow: hidden;
        }
        .lever-scene {
          position: absolute;
          inset: 0;
          background: url("/images/home.png") center/cover;
        }
        .lever-door {
          position: absolute;
          top: 0;
          bottom: 0;
          width: 50%;
          background-image: url("/images/gate.jpg");
          background-size: 200% 100%;
          box-shadow: inset 0 0 120px rgba(0, 0, 0, 0.7);
          transition: transform 1.9s cubic-bezier(0.7, 0, 0.2, 1);
          z-index: 2;
        }
        .lever-door.left {
          left: 0;
          background-position: left center;
          border-right: 2px solid rgba(0, 0, 0, 0.6);
        }
        .lever-door.right {
          right: 0;
          background-position: right center;
        }
        .lever-stage.open .lever-door.left {
          transform: translateX(-100%);
        }
        .lever-stage.open .lever-door.right {
          transform: translateX(100%);
        }
        .lever-track {
          position: absolute;
          right: 7%;
          top: 50%;
          transform: translateY(-50%);
          width: 16px;
          height: 230px;
          background: rgba(0, 0, 0, 0.55);
          border: 2px solid #a9852f;
          border-radius: 10px;
          z-index: 8;
          box-shadow: 0 0 26px rgba(0, 0, 0, 0.7);
        }
        .lever-knob {
          position: absolute;
          left: 50%;
          width: 52px;
          height: 52px;
          margin-left: -26px;
          border-radius: 50%;
          background: radial-gradient(circle at 35% 30%, #f3e8cf, #cda44d 55%, #846421);
          border: 2px solid #e7c97a;
          box-shadow: 0 6px 18px rgba(0, 0, 0, 0.6), 0 0 16px rgba(231, 201, 122, 0.4);
          cursor: grab;
          touch-action: none;
          z-index: 9;
        }
        .lever-knob:active {
          cursor: grabbing;
        }
        .lever-hint {
          position: absolute;
          right: 7%;
          top: calc(50% + 145px);
          transform: translateX(40%);
          z-index: 8;
          font-family: var(--font-cinzel), serif;
          font-size: 0.6rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(231, 201, 122, 0.8);
          white-space: nowrap;
          animation: pulseGlow 2.4s ease-in-out infinite;
        }

        /* ===================== DRAWBRIDGE ===================== */
        .bridge-stage {
          position: absolute;
          inset: 0;
          background: #070503;
          overflow: hidden;
        }
        .bridge-scene {
          position: absolute;
          inset: 0;
          background: url("/images/home.png") center/cover;
        }
        .bridge-persp {
          position: absolute;
          inset: 0;
          perspective: 1500px;
          z-index: 2;
        }
        .bridge-panel {
          position: absolute;
          inset: 0;
          background: url("/images/gate.jpg") center/cover;
          transform-origin: bottom center;
          box-shadow: inset 0 0 140px rgba(0, 0, 0, 0.7);
          transition: transform 2.1s cubic-bezier(0.55, 0, 0.25, 1);
        }
        .bridge-stage.open .bridge-panel {
          transform: rotateX(-82deg);
        }
        .chain {
          position: absolute;
          top: 0;
          width: 12px;
          height: 0;
          z-index: 3;
          border-radius: 6px;
          background: repeating-linear-gradient(
            to bottom,
            #e7c97a 0 4px,
            #846421 4px 7px,
            #cda44d 7px 11px,
            #5a4418 11px 14px
          );
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.6);
          opacity: 0;
          transition: height 2.1s cubic-bezier(0.55, 0, 0.25, 1),
            opacity 0.5s ease;
        }
        .chain-left {
          left: 17%;
        }
        .chain-right {
          right: 17%;
        }
        .bridge-stage.open .chain {
          height: 52%;
          opacity: 0.9;
        }

        /* ===================== WAX SEAL ===================== */
        .seal-stage {
          position: absolute;
          inset: 0;
          overflow: hidden;
          background: #1a120a;
        }
        .seal-scene {
          position: absolute;
          inset: 0;
          background: url("/images/home.png") center/cover;
        }
        .seal-cover {
          position: absolute;
          top: 0;
          bottom: 0;
          width: 50%;
          z-index: 2;
          background-color: #e2d3b0;
          background-image: radial-gradient(
              circle at 30% 20%,
              rgba(168, 133, 47, 0.18),
              transparent 55%
            ),
            radial-gradient(
              circle at 70% 80%,
              rgba(80, 58, 30, 0.2),
              transparent 55%
            );
          transition: transform 1.6s cubic-bezier(0.7, 0, 0.2, 1) 0.3s;
        }
        .seal-cover.left {
          left: 0;
          box-shadow: inset -24px 0 50px rgba(80, 58, 30, 0.35);
        }
        .seal-cover.right {
          right: 0;
          box-shadow: inset 24px 0 50px rgba(80, 58, 30, 0.35);
        }
        .seal-stage.broken .seal-cover.left {
          transform: translateX(-100%);
        }
        .seal-stage.broken .seal-cover.right {
          transform: translateX(100%);
        }
        .wax {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          width: 130px;
          height: 130px;
          z-index: 5;
          background: none;
          border: none;
          cursor: pointer;
        }
        .wax::after {
          content: "";
          position: absolute;
          inset: -12px;
          border: 1px solid rgba(231, 201, 122, 0.45);
          border-radius: 50%;
          animation: pulseGlow 2.4s ease-in-out infinite;
        }
        .seal-stage.broken .wax {
          pointer-events: none;
        }
        .seal-stage.broken .wax::after {
          display: none;
        }
        .wax-half {
          position: absolute;
          top: 0;
          width: 50%;
          height: 100%;
          background: radial-gradient(circle at 50% 38%, #c2282f, #7e1118 72%);
          box-shadow: inset 0 0 18px rgba(0, 0, 0, 0.4);
          transition: transform 0.7s cubic-bezier(0.6, -0.3, 0.7, 1),
            opacity 0.7s ease;
        }
        .wax-half.wl {
          left: 0;
          border-radius: 65% 10% 60% 62% / 62% 10% 60% 60%;
        }
        .wax-half.wr {
          right: 0;
          border-radius: 10% 65% 62% 60% / 10% 62% 60% 60%;
        }
        .seal-stage.broken .wax-half.wl {
          transform: translate(-70px, 30px) rotate(-32deg);
          opacity: 0;
        }
        .seal-stage.broken .wax-half.wr {
          transform: translate(70px, 34px) rotate(34deg);
          opacity: 0;
        }
        .wax-crest {
          position: absolute;
          inset: 0;
          display: grid;
          place-items: center;
          z-index: 1;
          font-family: var(--font-cinzel-decorative), var(--font-cinzel), serif;
          font-weight: 900;
          font-size: 3.4rem;
          color: #f0d894;
          text-shadow: 0 2px 6px rgba(0, 0, 0, 0.6);
          transition: opacity 0.4s ease;
        }
        .seal-stage.broken .wax-crest {
          opacity: 0;
        }

        /* ===================== IRIS / SPYGLASS ===================== */
        .iris-stage {
          position: absolute;
          inset: 0;
          background: #000;
          overflow: hidden;
        }
        .iris-scene {
          position: absolute;
          inset: 0;
          background: url("/images/home.png") center/cover;
          clip-path: circle(7% at 50% 50%);
          transition: clip-path 2.2s cubic-bezier(0.6, 0, 0.2, 1);
        }
        .iris-stage.open .iris-scene {
          clip-path: circle(150% at 50% 50%);
        }
        .iris-ring {
          position: absolute;
          left: 50%;
          top: 50%;
          width: 17vw;
          height: 17vw;
          transform: translate(-50%, -50%);
          border-radius: 50%;
          border: 6px solid #cda44d;
          box-shadow: 0 0 0 3px #846421, 0 0 40px rgba(231, 201, 122, 0.5),
            inset 0 0 30px rgba(0, 0, 0, 0.6);
          transition: width 2.2s cubic-bezier(0.6, 0, 0.2, 1),
            height 2.2s cubic-bezier(0.6, 0, 0.2, 1), opacity 2.2s ease,
            border-width 2.2s ease;
          z-index: 3;
          pointer-events: none;
        }
        .iris-stage.open .iris-ring {
          width: 260vw;
          height: 260vw;
          opacity: 0;
          border-width: 2px;
        }

        /* ===================== TORCH-FLICKER DOORS ===================== */
        .tdoors-stage {
          position: absolute;
          inset: 0;
          background: #070503;
          overflow: hidden;
        }
        .tdoors-scene {
          position: absolute;
          inset: 0;
          background: url("/images/home.png") center/cover;
        }
        .tdoor {
          position: absolute;
          top: 0;
          bottom: 0;
          width: 50%;
          background-image: url("/images/gate.jpg");
          background-size: 200% 100%;
          box-shadow: inset 0 0 120px rgba(0, 0, 0, 0.7);
          transition: transform 1.9s cubic-bezier(0.7, 0, 0.2, 1);
          z-index: 2;
        }
        .tdoor.left {
          left: 0;
          background-position: left center;
          border-right: 2px solid rgba(0, 0, 0, 0.6);
        }
        .tdoor.right {
          right: 0;
          background-position: right center;
        }
        .tdoors-stage.open .tdoor.left {
          transform: translateX(-100%);
        }
        .tdoors-stage.open .tdoor.right {
          transform: translateX(100%);
        }
        .td-flicker {
          position: absolute;
          inset: 0;
          z-index: 3;
          pointer-events: none;
          mix-blend-mode: screen;
          background: radial-gradient(
              circle at 20% 42%,
              rgba(255, 160, 50, 0.3),
              transparent 34%
            ),
            radial-gradient(
              circle at 80% 46%,
              rgba(255, 160, 50, 0.3),
              transparent 34%
            );
          animation: torchDance 2.4s infinite ease-in-out;
        }
        .tdoors-stage.open .td-flicker {
          opacity: 0;
          transition: opacity 0.8s ease;
        }
        @keyframes torchDance {
          0%,
          100% {
            opacity: 0.65;
            filter: brightness(1);
          }
          25% {
            opacity: 0.9;
            filter: brightness(1.18);
          }
          50% {
            opacity: 0.5;
          }
          70% {
            opacity: 1;
            filter: brightness(1.25);
          }
        }
        .td-torch {
          position: absolute;
          top: 40%;
          width: 30px;
          height: 56px;
          z-index: 4;
          transition: opacity 0.6s ease;
        }
        .td-torch.tl {
          left: 15%;
        }
        .td-torch.tr {
          right: 15%;
        }
        .tdoors-stage.open .td-torch {
          opacity: 0;
        }
        .td-flame {
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 26px;
          height: 46px;
          background: radial-gradient(
            ellipse at 50% 80%,
            #fff3c0,
            #ffb347 40%,
            #ff6a00 70%,
            transparent 75%
          );
          border-radius: 50% 50% 45% 45% / 60% 60% 42% 42%;
          filter: blur(1px);
          animation: flick 0.16s infinite alternate;
        }
      `}</style>
    </div>
  );
}

/* ---------------------------------- variants ---------------------------------- */

function TorchReveal() {
  const [lit, setLit] = useState(false);
  return (
    <div className={`torch ${lit ? "lit" : ""}`}>
      <div className="torch-scene" />
      <div className="torch-flash" />
      <div className="torch-flame">
        <div className="flame-glow" />
        <div className="flame-core" />
      </div>
      {!lit && (
        <button className="ignite" onClick={() => setLit(true)}>
          Ignite the Torch
        </button>
      )}
      <div className="demo-caption">Torch-lit reveal</div>
    </div>
  );
}

function LeverPull() {
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState(0);
  const dragging = useRef(false);
  const moved = useRef(false);
  const trackRef = useRef(null);
  const KNOB = 52;

  const pull = () => {
    setPos(1);
    setOpen(true);
  };
  const onDown = (e) => {
    dragging.current = true;
    moved.current = false;
    e.currentTarget.setPointerCapture?.(e.pointerId);
  };
  const onMove = (e) => {
    if (!dragging.current || !trackRef.current || open) return;
    moved.current = true;
    const rect = trackRef.current.getBoundingClientRect();
    let y = (e.clientY - rect.top - KNOB / 2) / (rect.height - KNOB);
    y = Math.max(0, Math.min(1, y));
    setPos(y);
    if (y >= 0.92) {
      dragging.current = false;
      pull();
    }
  };
  const onUp = () => {
    if (!dragging.current) return;
    dragging.current = false;
    if (pos > 0.65) pull();
    else if (!moved.current) pull();
    else setPos(0);
  };

  return (
    <div className={`lever-stage ${open ? "open" : ""}`}>
      <div className="lever-scene" />
      <div className="lever-door left" />
      <div className="lever-door right" />
      <div className="lever-track" ref={trackRef}>
        <div
          className="lever-knob"
          style={{ top: `calc(${pos} * (100% - ${KNOB}px))` }}
          onPointerDown={onDown}
          onPointerMove={onMove}
          onPointerUp={onUp}
        />
      </div>
      {!open && <div className="lever-hint">Pull the lever ↓</div>}
      <div className="demo-caption">Pull the lever / chain</div>
    </div>
  );
}

function DrawbridgeDrop() {
  const [open, setOpen] = useState(false);
  return (
    <div className={`bridge-stage ${open ? "open" : ""}`}>
      <div className="bridge-scene" />
      <div className="chain chain-left" />
      <div className="chain chain-right" />
      <div className="bridge-persp">
        <div className="bridge-panel" />
      </div>
      {!open && (
        <button className="ignite" onClick={() => setOpen(true)}>
          Lower the Drawbridge
        </button>
      )}
      <div className="demo-caption">Drawbridge lowering</div>
    </div>
  );
}

function WaxSeal() {
  const [broken, setBroken] = useState(false);
  return (
    <div className={`seal-stage ${broken ? "broken" : ""}`}>
      <div className="seal-scene" />
      <div className="seal-cover left" />
      <div className="seal-cover right" />
      <button
        className="wax"
        onClick={() => setBroken(true)}
        aria-label="Break the seal"
      >
        <span className="wax-half wl" />
        <span className="wax-half wr" />
        <span className="wax-crest">{profile.shortName[0]}</span>
      </button>
      <div className="demo-caption">Wax seal break</div>
    </div>
  );
}

function IrisReveal() {
  const [open, setOpen] = useState(false);
  return (
    <div className={`iris-stage ${open ? "open" : ""}`}>
      <div className="iris-scene" />
      <div className="iris-ring" />
      {!open && (
        <button className="ignite" onClick={() => setOpen(true)}>
          Open the Spyglass
        </button>
      )}
      <div className="demo-caption">Iris / spyglass</div>
    </div>
  );
}

function TorchDoors() {
  const [open, setOpen] = useState(false);
  return (
    <div className={`tdoors-stage ${open ? "open" : ""}`}>
      <div className="tdoors-scene" />
      <div className="tdoor left" />
      <div className="tdoor right" />
      <div className="td-flicker" />
      <div className="td-torch tl">
        <span className="td-flame" />
      </div>
      <div className="td-torch tr">
        <span className="td-flame" />
      </div>
      {!open && (
        <button className="ignite" onClick={() => setOpen(true)}>
          Open the Gate
        </button>
      )}
      <div className="demo-caption">Torch flicker on the doors</div>
    </div>
  );
}

import React, { useMemo, useRef, useState } from "react";

const ORIGIN_MAP = {
  "top-center": "50% 0%",
  "top-left": "0% 0%",
  "top-right": "100% 0%",
  right: "100% 50%",
  left: "0% 50%",
  "bottom-center": "50% 100%",
  "bottom-right": "100% 100%",
  "bottom-left": "0% 100%",
};

function createRays(total, spread, origin) {
  const horizontal = origin.includes("left") || origin.includes("right");
  const baseRange = horizontal ? 102 : 84;
  const range = baseRange * Math.max(0.5, spread);

  return Array.from({ length: total }, (_, index) => {
    const t = total <= 1 ? 0.5 : index / (total - 1);
    const offset = (t - 0.5) * range;
    const width = 1 + ((index * 7) % 4);
    const opacity = 0.06 + (index % 5) * 0.035;
    const delay = index * 0.11;

    return { angle: offset, width, opacity, delay };
  });
}

export default function LightRays({
  raysOrigin = "top-center",
  raysColor = "#ffffff",
  raysSpeed = 1,
  lightSpread = 0.5,
  rayLength = 1,
  pulsating = false,
  fadeDistance = 1,
  saturation = 1,
  followMouse = false,
  mouseInfluence = 0.5,
  noiseAmount = 0,
  distortion = 0,
  className = "",
}) {
  const frameRef = useRef(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const rays = useMemo(() => createRays(20, lightSpread, raysOrigin), [lightSpread, raysOrigin]);

  const origin = ORIGIN_MAP[raysOrigin] ?? ORIGIN_MAP["top-center"];
  const speed = Math.max(0.2, raysSpeed);
  const influence = followMouse ? Math.max(0, Math.min(1, mouseInfluence)) : 0;
  const translateX = mouse.x * influence * 48;
  const translateY = mouse.y * influence * 38;
  const rotateZ = mouse.x * influence * 8;

  const onMove = (event) => {
    if (!followMouse || !frameRef.current) return;

    const rect = frameRef.current.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;

    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    setMouse({ x, y });
  };

  const onLeave = () => {
    if (!followMouse) return;
    setMouse({ x: 0, y: 0 });
  };

  return (
    <div
      ref={frameRef}
      className={`light-rays ${className}`.trim()}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{
        "--lr-color": raysColor,
        "--lr-origin": origin,
        "--lr-speed": speed,
        "--lr-length": Math.max(0.5, rayLength),
        "--lr-fade": Math.max(0.4, fadeDistance),
        "--lr-saturation": Math.max(0, saturation),
        "--lr-noise": Math.max(0, noiseAmount),
        "--lr-distortion": Math.max(0, distortion),
      }}
      aria-hidden="true"
    >
      <div
        className={`light-rays-core${pulsating ? " is-pulsating" : ""}`}
        style={{
          transform: `translate3d(${translateX}px, ${translateY}px, 0) rotate(${rotateZ}deg)`,
        }}
      >
        {rays.map((ray, index) => (
          <span
            key={`${ray.angle}-${index}`}
            className="light-ray"
            style={{
              "--ray-angle": `${ray.angle}deg`,
              "--ray-width": `${ray.width}px`,
              "--ray-opacity": ray.opacity,
              "--ray-delay": `${ray.delay}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}

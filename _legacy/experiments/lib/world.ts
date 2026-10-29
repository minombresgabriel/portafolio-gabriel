import * as THREE from "three";
import { planets, type PlanetId } from "@/data/portfolio";

/**
 * The solar system layout. The sun sits at the origin and lights every
 * planet, so camera stops are placed on the sun-facing side of each planet
 * (rotated a little) to get a lit face with a soft terminator and rim.
 */

type PlanetLayout = { orbit: number; angle: number; y: number; radius: number; view: number; spin: number };

export const LAYOUT: Record<PlanetId, PlanetLayout> = {
  engine: { orbit: 26, angle: 0.35, y: 0.8, radius: 1.55, view: 6.6, spin: 0.05 },
  shield: { orbit: 42, angle: 1.25, y: -1.2, radius: 1.2, view: 6.8, spin: 0.06 },
  crystal: { orbit: 58, angle: 2.15, y: 1.5, radius: 1.25, view: 5.6, spin: 0.08 },
  station: { orbit: 74, angle: 3.0, y: -0.6, radius: 1.7, view: 6.8, spin: 0.05 },
  signal: { orbit: 90, angle: 3.85, y: 1.0, radius: 1.25, view: 6.4, spin: 0.03 },
};

export const SUN_POSITION = new THREE.Vector3(0, 0, 0);

export const planetPosition = (id: PlanetId) => {
  const l = LAYOUT[id];
  return new THREE.Vector3(Math.cos(l.angle) * l.orbit, l.y, Math.sin(l.angle) * l.orbit);
};

export const PLANET_POSITIONS = Object.fromEntries(
  planets.map((p) => [p.id, planetPosition(p.id)]),
) as Record<PlanetId, THREE.Vector3>;

const UP = new THREE.Vector3(0, 1, 0);

/** Where the camera sits to look at a planet: sun-side, swung ~55° around. */
const viewFrom = (id: PlanetId, distance: number) => {
  const p = PLANET_POSITIONS[id];
  const toSun = SUN_POSITION.clone().sub(p).setY(0).normalize();
  const dir = toSun.applyAxisAngle(UP, 0.95);
  return p.clone().addScaledVector(dir, distance).addScaledVector(UP, distance * 0.16);
};

export type CameraStop = {
  position: THREE.Vector3;
  target: THREE.Vector3;
  /** Horizontal screen shift of the target, as a fraction of viewport width. */
  framing: number;
  /** Framing while the case study panel is open. */
  caseFraming: number;
};

const engine = PLANET_POSITIONS.engine;

export const CONTACT_CAMERA = new THREE.Vector3(18, 78, 170);

export const CAMERA_STOPS: CameraStop[] = [
  // Home: the first planet, huge and centred, sitting above the tagline.
  {
    position: viewFrom("engine", 5.6),
    target: engine.clone().add(new THREE.Vector3(0, -0.75, 0)),
    framing: 0,
    caseFraming: 0,
  },
  ...planets.map((p) => ({
    position: viewFrom(p.id, LAYOUT[p.id].view),
    target: PLANET_POSITIONS[p.id].clone(),
    framing: -0.15,
    caseFraming: -0.27,
  })),
  // Contact: pull back to reveal the whole system.
  {
    position: CONTACT_CAMERA.clone(),
    target: new THREE.Vector3(0, -6, 0),
    framing: 0.17,
    caseFraming: 0.17,
  },
];

/** Camera basis at the contact stop, used to place Earth in the foreground. */
const contactBasis = (() => {
  const m = new THREE.Matrix4().lookAt(CONTACT_CAMERA, CAMERA_STOPS.at(-1)!.target, UP);
  const right = new THREE.Vector3().setFromMatrixColumn(m, 0);
  const up = new THREE.Vector3().setFromMatrixColumn(m, 1);
  const forward = new THREE.Vector3().setFromMatrixColumn(m, 2).negate();
  return { right, up, forward };
})();

const fromContactCamera = (f: number, r: number, u: number) =>
  CONTACT_CAMERA.clone()
    .addScaledVector(contactBasis.forward, f)
    .addScaledVector(contactBasis.right, r)
    .addScaledVector(contactBasis.up, u);

export const EARTH_POSITION = fromContactCamera(34, 8, -6.5);
export const MESSAGE_ORIGIN = fromContactCamera(30, -11, -2);

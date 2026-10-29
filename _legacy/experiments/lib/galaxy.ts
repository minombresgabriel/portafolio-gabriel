import * as THREE from "three";
import { planets } from "@/data/portfolio";

/**
 * Galaxy layout. A logarithmic spiral: angle = arm + WIND * ln(r).
 * The five projects live on the main arm, ordered outward from the core,
 * so travelling between them is a journey along the spiral.
 */

export const GALAXY_RADIUS = 60;
export const ARMS = 4;
export const WIND = 1.85;
export const CORE_RADIUS = 2;
/** Galaxy spin in radians per second (rigid, slow). */
export const GALAXY_SPIN = 0.008;

export const armAngle = (arm: number, r: number) =>
  (arm / ARMS) * Math.PI * 2 + WIND * Math.log(Math.max(r, CORE_RADIUS) / CORE_RADIUS);

const onArm = (r: number, arm = 0, lift = 0) => {
  const a = armAngle(arm, r);
  return new THREE.Vector3(Math.cos(a) * r, lift, Math.sin(a) * r);
};

const CLUSTER_RADII = [13, 21, 29.5, 38, 47];

export const CLUSTERS = planets.map((p, i) => ({
  id: p.id,
  name: p.name,
  color: p.color,
  position: onArm(CLUSTER_RADII[i], 0, 0.4),
}));

const UP = new THREE.Vector3(0, 1, 0);

export type CameraStop = { position: THREE.Vector3; target: THREE.Vector3; framing: number };

/** Look at a cluster from just outside it, facing inward so the core glows behind. */
const clusterView = (c: THREE.Vector3): CameraStop => {
  const outward = c.clone().setY(0).normalize();
  const side = new THREE.Vector3().crossVectors(UP, outward);
  return {
    position: c.clone().addScaledVector(outward, 8.5).addScaledVector(side, 2.5).addScaledVector(UP, 3.4),
    target: c.clone(),
    // The planet sits at 25% of the width, clear of the dossier on the right.
    framing: -0.25,
  };
};

// All in galaxy-local space; the rig rotates them with the galaxy.
export const CAMERA_STOPS: CameraStop[] = [
  { position: new THREE.Vector3(0, 58, 104), target: new THREE.Vector3(0, -13, 0), framing: 0 },
  ...CLUSTERS.map((c) => clusterView(c.position)),
  { position: new THREE.Vector3(-30, 125, 190), target: new THREE.Vector3(0, -18, 0), framing: 0.17 },
];

/** Where the contact comet starts and ends (galaxy-local). */
export const COMET_FROM = new THREE.Vector3(-95, 30, 60);
export const COMET_TO = new THREE.Vector3(0, 0, 0);

import { ArcRotateCamera, Scene, Vector3 } from "@babylonjs/core";

export function setupCamera(scene: Scene) {
  const camera = new ArcRotateCamera(
    "camera",
    -Math.PI * 0.5,
    Math.PI * 0.25,
    12,
    Vector3.Zero(),
    scene
  );
  scene.activeCamera = camera;
  camera.wheelPrecision = 70;
  camera.minZ = 0.3;
  camera.lowerRadiusLimit = 4;
  camera.upperRadiusLimit = 30;
  camera.panningSensibility = 0;

  return camera;
}

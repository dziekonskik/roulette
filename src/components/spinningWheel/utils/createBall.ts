import { Color3, MeshBuilder, Scene } from "@babylonjs/core";
import { decorationMaterial } from "./wheelResult/decorationMaterial";

export function createBall(scene: Scene) {
  const ball = MeshBuilder.CreateSphere("ball", { diameter: 0.15 });
  ball.material = decorationMaterial(scene, new Color3(0.92, 0.92, 0.92));
  return ball;
}

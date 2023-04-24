import {
  DynamicTexture,
  MeshBuilder,
  Scene,
  StandardMaterial,
} from "@babylonjs/core";
import { BETTING_BASE_RADIUS, wheelNumbers } from "../wheelConfig";

export function wheelSlice(scene: Scene, color: string, number: number) {
  const slice = MeshBuilder.CreateCylinder(`slice-${number}`, {
    arc: 1 / wheelNumbers.length,
    tessellation: 100,
    diameter: BETTING_BASE_RADIUS * 2,
    height: 0.2,
    enclose: true,
  });
  const dynamicTexture = new DynamicTexture(
    `dynamicTexture-${number}`,
    { width: 250, height: 500 },
    scene
  );
  const sliceMaterial = new StandardMaterial(`sliceMaterial-${number}`, scene);
  sliceMaterial.diffuseTexture = dynamicTexture;
  const context = dynamicTexture.getContext() as CanvasRenderingContext2D;
  context.textAlign = "center";

  dynamicTexture.drawText(
    number.toString(),
    235,
    275,
    "bold 20px monospace",
    "white",
    color,
    true,
    true
  );
  slice.material = sliceMaterial;

  return slice;
}

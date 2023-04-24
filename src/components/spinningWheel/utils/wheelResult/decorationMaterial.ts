import { Color3, Scene, StandardMaterial } from "@babylonjs/core";

export function decorationMaterial(scene: Scene) {
  const decorationMaterial = new StandardMaterial("ringMaterial", scene);
  decorationMaterial.diffuseColor = new Color3(0, 0, 0);
  decorationMaterial.specularColor = new Color3(1, 1, 1);
  decorationMaterial.specularPower = 128;

  return decorationMaterial;
}

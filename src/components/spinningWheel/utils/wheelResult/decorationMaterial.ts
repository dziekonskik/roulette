import { Color3, Scene, StandardMaterial } from "@babylonjs/core";

export function decorationMaterial(scene: Scene, color: Color3) {
  const decorationMaterial = new StandardMaterial("ringMaterial", scene);
  decorationMaterial.diffuseColor = color;
  decorationMaterial.specularColor = new Color3(1, 1, 1);
  decorationMaterial.specularPower = 128;

  return decorationMaterial;
}

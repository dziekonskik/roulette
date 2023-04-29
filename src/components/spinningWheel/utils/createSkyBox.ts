import { MeshBuilder, Scene, StandardMaterial, Texture } from "@babylonjs/core";

export function createSkyBox(scene: Scene) {
  const skyboxTexture = new Texture("/dsgn_23.jpg");
  const skyMaterial = new StandardMaterial("skyMaterial", scene);
  skyMaterial.diffuseTexture = skyboxTexture;
  skyMaterial.backFaceCulling = false;
  const skyBox = MeshBuilder.CreateBox("skyBox", { size: 1000.0 }, scene);
  skyBox.material = skyMaterial;
  skyBox.position.z = -400;
}

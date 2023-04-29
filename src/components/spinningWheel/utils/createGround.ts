import { MeshBuilder, Scene, StandardMaterial, Texture } from "@babylonjs/core";

export function createGround(scene: Scene) {
  const ground = MeshBuilder.CreateGround(
    "ground",
    { width: 6, height: 6 },
    scene
  );
  const groundBox = MeshBuilder.CreateBox(
    "groundBox",
    { width: 6, height: 6 },
    scene
  );

  ground.position.y -= 0.2;
  groundBox.position.y -= 0.71;
  groundBox.rotation.x = Math.PI / 2;
  const groundMaterial = new StandardMaterial("groundMaterial", scene);
  groundMaterial.diffuseTexture = new Texture("/dark-green-wall.jpg");
  ground.material = groundMaterial;
  groundBox.material = groundMaterial;

  return ground;
}

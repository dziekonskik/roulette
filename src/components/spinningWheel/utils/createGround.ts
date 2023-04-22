import { MeshBuilder, Scene, StandardMaterial, Texture } from "@babylonjs/core";

export function createGround(scene: Scene) {
  const ground = MeshBuilder.CreateBox(
    "ground",
    { width: 6, height: 6 },
    scene
  );

  ground.rotation.x = Math.PI / 2;
  ground.position.y -= 0.5;
  const groundMaterial = new StandardMaterial("groundMaterial", scene);
  groundMaterial.diffuseTexture = new Texture("/dark-green-wall.jpg");
  ground.material = groundMaterial;
}

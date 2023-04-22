import {
  MeshBuilder,
  Scene,
  StandardMaterial,
  Texture,
  Vector3,
} from "@babylonjs/core";

export function createSpinningWheel(scene: Scene) {
  const wheelBox = MeshBuilder.CreateCylinder(
    "wheel",
    {
      diameter: 4,
      height: 1,
      tessellation: 100,
      cap: 0,
    },
    scene
  );
  const wheelCap = MeshBuilder.CreateTorus(
    "wheel",
    {
      diameter: 3.8,
      thickness: 0.2,
      tessellation: 100,
    },
    scene
  );
  const innerWheel = MeshBuilder.CreateLathe(
    "innerWheel",
    {
      shape: [
        new Vector3(1, 1, 1),
        new Vector3(2, 2, 3),
        new Vector3(1.2, 1, 1),
      ],
    },
    scene
  );
  const wheelMaterial = new StandardMaterial("wheelMaterial", scene);
  const wheelMaterial2 = new StandardMaterial("wheelMaterial2", scene);
  wheelMaterial.diffuseTexture = new Texture(
    "/brown-wooden-textured-flooring-background.jpg"
  );
  wheelMaterial2.diffuseTexture = new Texture("/weathered-wooden-surface.jpg");
  innerWheel.position.y = -1;
  wheelCap.position.y = 1;
  wheelBox.position.y = 0.5;
  wheelBox.material = wheelMaterial;
  innerWheel.material = wheelMaterial2;
  wheelCap.material = wheelMaterial;

  return innerWheel;
}

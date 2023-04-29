import {
  Mesh,
  MeshBuilder,
  Scene,
  StandardMaterial,
  Texture,
  Vector3,
} from "@babylonjs/core";

export function createSpinningWheelBox(scene: Scene) {
  const wheelBox = MeshBuilder.CreateCylinder(
    "wheel",
    {
      diameter: 5,
      height: 0.7,
      tessellation: 100,
      cap: 0,
    },
    scene
  );
  const wheelCap = MeshBuilder.CreateTorus(
    "wheel",
    {
      diameter: 4.8,
      thickness: 0.2,
      tessellation: 100,
    },
    scene
  );
  const wall = MeshBuilder.CreateLathe(
    "wall",
    {
      shape: [
        new Vector3(1.8, 0.75, 2),
        new Vector3(2.5, 1.4, 1),
        new Vector3(1.758, 1.03, 2),
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
  wall.position.y = -1;
  wheelCap.position.y = 0.5;
  wheelBox.position.y = 0.15;
  wheelBox.material = wheelMaterial;
  wall.material = wheelMaterial2;
  wheelCap.material = wheelMaterial;

  return Mesh.MergeMeshes(
    [wheelBox, wheelCap, wall],
    true,
    false,
    undefined,
    false,
    true
  ) as Mesh;
}

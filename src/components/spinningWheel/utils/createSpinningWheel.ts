import {
  MeshBuilder,
  Scene,
  StandardMaterial,
  Texture,
  Vector3,
} from "@babylonjs/core";
import { resultWheel } from "./wheelResult/resultWheel";

export function createSpinningWheel(scene: Scene) {
  const wheelBox = MeshBuilder.CreateCylinder(
    "wheel",
    {
      diameter: 5,
      height: 0.5,
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
  const spinnigWall = MeshBuilder.CreateLathe(
    "spinnigWall",
    {
      shape: [
        new Vector3(2, 1, 1),
        new Vector3(2.5, 1.4, 2),
        new Vector3(1.8, 1.1, 1),
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
  spinnigWall.position.y = -1;
  wheelCap.position.y = 0.5;
  wheelBox.position.y = 0.3;
  wheelBox.material = wheelMaterial;
  spinnigWall.material = wheelMaterial2;
  wheelCap.material = wheelMaterial;

  const spinningBase = resultWheel(scene);

  return { spinnigWall, spinningBase };
}

import { Mesh, MeshBuilder, Scene } from "@babylonjs/core";
import { BETTING_BASE_RADIUS, wheelNumbers } from "../wheelConfig";
import { decorationMaterial } from "./decorationMaterial";
import { tower } from "./tower";
import { wheelSlice } from "./wheelSlice";

const sliceRotation = (index: number) =>
  ((2 * Math.PI) / wheelNumbers.length) * index;

export function resultWheel(scene: Scene) {
  const bettingBase = MeshBuilder.CreateDisc("bettingBase", {
    radius: BETTING_BASE_RADIUS,
  });
  bettingBase.rotation.x = Math.PI / 2;

  const slices: Mesh[] = [];
  wheelNumbers.forEach(({ color, number }, index) => {
    const slice = wheelSlice(scene, color, number);
    slice.rotation.y = sliceRotation(index);
    slices.push(slice);
  });

  const decorMaterial = decorationMaterial(scene);

  const innerRing = MeshBuilder.CreateTorus("innerRing", {
    diameter: BETTING_BASE_RADIUS * 1.5,
    thickness: 0.03,
    tessellation: 100,
  });
  const outerRing = MeshBuilder.CreateTorus("innerRing", {
    diameter: BETTING_BASE_RADIUS * 2,
    thickness: 0.04,
    tessellation: 100,
  });

  innerRing.position.y = 0.1;
  outerRing.position.y = 0.1;
  innerRing.material = decorMaterial;
  outerRing.material = decorMaterial;

  const towerMesh = tower(scene);
  towerMesh.material = decorMaterial;
  towerMesh.rotation.z = -Math.PI / 2;
  towerMesh.position.y = 1;

  return Mesh.MergeMeshes(
    [bettingBase, innerRing, outerRing, ...slices],
    true,
    false,
    undefined,
    false,
    true
  ) as Mesh;
}

import { Mesh, MeshBuilder, Scene, Vector3 } from "@babylonjs/core";

export function tower(scene: Scene) {
  const makeCurve = (range: number, nbSteps: number) => {
    const path = [];
    const stepSize = range / nbSteps;
    for (let i = -range / 4; i < range / 2; i += stepSize) {
      let t = i / Math.PI;
      let x = Math.sin(t) + i;
      path.push(new Vector3(x, 0, 0));
    }
    return path;
  };

  const curve = makeCurve(5, 2);

  const radiusChange = (index: number) => {
    const t = ((index / Math.PI) * 2) / 8;
    const radius = Math.sin(t) + index / 50;
    return radius;
  };

  const tower = MeshBuilder.CreateTube(
    "tube",
    {
      path: curve,
      radiusFunction: radiusChange,
      sideOrientation: Mesh.DOUBLESIDE,
    },
    scene
  );
  const spheres: Mesh[] = [];
  for (let i = 0; i < 3; i++) {
    const sphere = MeshBuilder.CreateSphere(
      `sphere-${i}`,
      { diameter: Number(`0.${i + 1}`) },
      scene
    );
    sphere.position.x = -(3 - i) / 2;
    spheres.push(sphere);
  }

  return Mesh.MergeMeshes(
    [tower, ...spheres],
    true,
    false,
    undefined,
    false,
    true
  ) as Mesh;
}

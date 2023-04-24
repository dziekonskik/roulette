import {
  CSG,
  MeshBuilder,
  Scene,
  StandardMaterial,
  Vector3,
} from "@babylonjs/core";

export function createHollowBox(scene: Scene) {
  const box = MeshBuilder.CreateBox(
    "box",
    { width: 1, height: 1, depth: 1 },
    scene
  );
  const innerBox = MeshBuilder.CreateBox(
    "innerBox",
    { width: 0.8, height: 0.8, depth: 0.4 },
    scene
  );
  innerBox.rotation.x = Math.PI / 2;
  innerBox.position = new Vector3(0, 0.5, 0);
  var csgBox1 = CSG.FromMesh(box);
  var csgBox2 = CSG.FromMesh(innerBox);
  const hollowBoxMaterial = new StandardMaterial("hollowBoxMaterial", scene);
  var result = csgBox1.subtract(csgBox2);
  var mesh = result.toMesh("result", hollowBoxMaterial, scene);

  box.dispose();
  innerBox.dispose();
  mesh.name = "hollowBox";
  mesh.position.y += 4;
  mesh.rotation.x = Math.PI / 4;

  return mesh;
}

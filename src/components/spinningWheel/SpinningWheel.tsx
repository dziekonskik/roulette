import {
  ArcRotateCamera,
  HemisphericLight,
  Mesh,
  Scene,
  Vector3,
} from "@babylonjs/core";
import { SceneComponent } from "./SceneComponent";
import styles from "./spinningWheel.module.scss";
import { createGround } from "./utils/createGround";
import { createSkyBox } from "./utils/createSkyBox";
import { createSpinningWheel } from "./utils/createSpinningWheel";

let spinnigWall: Mesh;
let spinningBase: Mesh;

const onSceneReady = (scene: Scene) => {
  scene.enablePhysics();

  const camera = new ArcRotateCamera(
    "camera",
    -Math.PI * 0.5,
    Math.PI * 0.25,
    12,
    Vector3.Zero(),
    scene
  );
  camera.setTarget(Vector3.Zero());
  const canvas = scene.getEngine().getRenderingCanvas();
  camera.attachControl(canvas, true);
  new HemisphericLight("light", new Vector3(0, 1, 0), scene);
  // light.intensity = 0.7;
  createSkyBox(scene);
  createGround(scene);
  const spinningWheel = createSpinningWheel(scene);
  spinnigWall = spinningWheel.spinnigWall;
  spinningBase = spinningWheel.spinningBase;
};

const onRender = (scene: Scene) => {
  if (spinningBase !== undefined) {
    const deltaTimeInMillis = scene.getEngine().getDeltaTime();

    const rpm = 2;
    spinningBase.rotation.y +=
      (rpm / 60) * Math.PI * 2 * (deltaTimeInMillis / 1000);
  }
};

export const SpinningWheel = () => (
  <div className={styles.spinningWheelcontainer}>
    <SceneComponent
      antialias
      onSceneReady={onSceneReady}
      onRender={onRender}
      id="my-canvas"
      className={styles.canvas}
    />
  </div>
);

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

let spinningWheel: Mesh;

const onSceneReady = (scene: Scene) => {
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
  createSkyBox(scene);
  createGround(scene);
  spinningWheel = createSpinningWheel(scene);
};

const onRender = (scene: Scene) => {
  if (spinningWheel !== undefined) {
    const deltaTimeInMillis = scene.getEngine().getDeltaTime();

    const rpm = 5;
    spinningWheel.rotation.y +=
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

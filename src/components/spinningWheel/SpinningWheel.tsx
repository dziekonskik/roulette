import {
  ArcRotateCamera,
  DirectionalLight,
  HemisphericLight,
  Mesh,
  Scene,
  Vector3,
} from "@babylonjs/core";
import { HavokPlugin } from "@babylonjs/core/Physics";
import { observer } from "mobx-react-lite";
import type { WheelState } from "../../store/gameStore/types";
import { useStore } from "../../store/rootStoreProvider";
import { SceneComponent } from "./SceneComponent";
import styles from "./spinningWheel.module.scss";
import { createBall } from "./utils/createBall";
import { createGround } from "./utils/createGround";
import { createSkyBox } from "./utils/createSkyBox";
import { createSpinningWheel } from "./utils/createSpinningWheel";

import HavokPhysics from "@babylonjs/havok";

async function getInitializedHavok() {
  return await HavokPhysics();
}

let spinningBase: Mesh;
let ball: Mesh;

const onSceneReady = (scene: Scene) => {
  scene.debugLayer.show();
  new HemisphericLight("light1", new Vector3(0, 1, 0), scene);
  const light = new DirectionalLight("light", new Vector3(-1, -2, -2), scene);
  light.intensity = 0.3;
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
  createSkyBox(scene);
  createGround(scene);
  ball = createBall(scene);
  ball.position.y = 0.7;
  ball.position.x = 1;
  const spinningWheel = createSpinningWheel(scene);
  spinningBase = spinningWheel.spinningBase;

  const havokInstance = getInitializedHavok();
  scene.enablePhysics(
    new Vector3(0, -9.81, 0),
    new HavokPlugin(true, havokInstance)
  );
};

const onRender = (scene: Scene, wheelState: WheelState) => {
  if (spinningBase !== undefined) {
    const deltaTimeInMillis = scene.getEngine().getDeltaTime();

    if (wheelState === "idle") {
      const rpm = 2;
      spinningBase.rotation.y +=
        (rpm / 60) * Math.PI * 2 * (deltaTimeInMillis / 1000);
    }
    if (wheelState === "spinning") {
    }
  }
};

export const SpinningWheel = observer(() => {
  const {
    gameStore: { wheelState },
  } = useStore();
  return (
    <div className={styles.spinningWheelcontainer}>
      <SceneComponent
        antialias
        onSceneReady={onSceneReady}
        onRender={(scene) => onRender(scene, wheelState)}
        id="my-canvas"
        className={styles.canvas}
      />
    </div>
  );
});

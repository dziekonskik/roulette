import {
  DirectionalLight,
  HemisphericLight,
  Mesh,
  Scene,
  Vector3,
} from "@babylonjs/core";
import {
  HavokPlugin,
  PhysicsAggregate,
  PhysicsShapeType,
} from "@babylonjs/core/Physics";
import { observer } from "mobx-react-lite";
import type { WheelState } from "../../store/gameStore/types";
import { useStore } from "../../store/rootStoreProvider";
import { SceneComponent } from "./SceneComponent";
import styles from "./spinningWheel.module.scss";
import { createGround } from "./utils/createGround";
import { createSkyBox } from "./utils/createSkyBox";

import HavokPhysics from "@babylonjs/havok";
import { createBall } from "./utils/createBall";
import { createSpinningWheelBox } from "./utils/createSpinningWheel";
import { setupCamera } from "./utils/setupCamera";
import { resultWheel } from "./utils/wheelResult/resultWheel";

let spinningBase: PhysicsAggregate;
let physicsBall: PhysicsAggregate;
let rotatingBase: Mesh;

const onSceneReady = async (scene: Scene, wheelState: WheelState) => {
  new HemisphericLight("light1", new Vector3(0, 1, 0), scene);
  const light = new DirectionalLight("light", new Vector3(-1, -2, -2), scene);
  light.intensity = 0.3;
  const camera = setupCamera(scene);
  camera.useAutoRotationBehavior = true;
  camera.setTarget(Vector3.Zero());
  scene.activeCamera = camera;
  const canvas = scene.getEngine().getRenderingCanvas();
  camera.attachControl(canvas, true);
  createSkyBox(scene);
  const ground = createGround(scene);

  const spinningWheelBox = createSpinningWheelBox(scene);
  const numbersWWheel = resultWheel(scene);
  const ball = createBall(scene);
  ball.isVisible = false;
  ball.position.y = 0.34;
  ball.position.z = 2.1;

  const havokInstance = await HavokPhysics();
  scene.enablePhysics(
    new Vector3(0, -9.81, 0),
    new HavokPlugin(true, havokInstance)
  );

  new PhysicsAggregate(ground, PhysicsShapeType.BOX, { mass: 0 }, scene);
  new PhysicsAggregate(
    spinningWheelBox,
    PhysicsShapeType.MESH,
    { mass: 1000, restitution: 0.2, friction: 0.2 },
    scene
  );

  if (wheelState === "idle") {
    rotatingBase = numbersWWheel;
  }

  if (wheelState === "spinning") {
    ball.isVisible = true;
    camera.useAutoRotationBehavior = false;
    camera.detachControl();
    spinningBase = new PhysicsAggregate(
      numbersWWheel,
      PhysicsShapeType.CYLINDER,
      { mass: 1, restitution: 0, friction: 1 },
      scene
    );
    physicsBall = new PhysicsAggregate(
      ball,
      PhysicsShapeType.SPHERE,
      { mass: 0.1, friction: 10 },
      scene
    );
  }
};

const onRender = (scene: Scene, wheelState: WheelState) => {
  const deltaTimeInMillis = scene.getEngine().getDeltaTime();

  if (rotatingBase && wheelState === "idle") {
    const rpm = 2;
    rotatingBase.rotation.y +=
      (rpm / 60) * Math.PI * 2 * (deltaTimeInMillis / 1000);
  }
  if (spinningBase?.body && wheelState === "spinning") {
    spinningBase.body.applyForce(
      new Vector3(0.6, 0, -0.6),
      new Vector3(5, 0, 5)
    );

    physicsBall.body.applyImpulse(
      new Vector3(-0.1, 0, 0.03),
      new Vector3(0, 0, 0)
    );
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
        onSceneReady={(scene) => onSceneReady(scene, wheelState)}
        onRender={(scene) => onRender(scene, wheelState)}
        id="my-canvas"
        className={styles.canvas}
      />
    </div>
  );
});

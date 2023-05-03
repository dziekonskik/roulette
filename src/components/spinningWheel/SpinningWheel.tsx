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
import { useStore } from "../../store/rootStoreProvider";
import type { WheelState } from "../../store/wheelStore/types";
import { SceneComponent } from "./SceneComponent";
import styles from "./spinningWheel.module.scss";
import { createGround } from "./utils/createGround";
import { createSkyBox } from "./utils/createSkyBox";

import HavokPhysics from "@babylonjs/havok";
import { useRef } from "react";
import { randomNumber } from "../../utils/functions";
import { createBall } from "./utils/createBall";
import { createSpinningWheelBox } from "./utils/createSpinningWheel";
import { setupCamera } from "./utils/setupCamera";
import { wheelNumbers } from "./utils/wheelConfig";
import { resultWheel } from "./utils/wheelResult/resultWheel";

let spinningBase: PhysicsAggregate;
let rotatingBase: Mesh;
let physicsBall: PhysicsAggregate;

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
  const numbersWheel = resultWheel(scene);
  const ball = createBall(scene);
  ball.isVisible = false;
  ball.position.y = 0.5;
  ball.position.z = -1;

  const havokInstance = await HavokPhysics();
  const havok = new HavokPlugin(true, havokInstance);
  scene.enablePhysics(new Vector3(0, -9.81, 0), havok);

  new PhysicsAggregate(ground, PhysicsShapeType.BOX, { mass: 0 }, scene);
  new PhysicsAggregate(
    spinningWheelBox,
    PhysicsShapeType.MESH,
    { mass: 1000, restitution: 0.2, friction: 0.2 },
    scene
  );

  if (wheelState === "idle") {
    rotatingBase = numbersWheel;
  }

  if (wheelState === "spinning") {
    camera.useAutoRotationBehavior = false;
    camera.detachControl();
    spinningBase = new PhysicsAggregate(
      numbersWheel,
      PhysicsShapeType.CYLINDER,
      { mass: 1, restitution: 0.1, friction: 1 },
      scene
    );

    const ballTimeout = window.setTimeout(() => {
      ball.isVisible = true;
      physicsBall = new PhysicsAggregate(
        ball,
        PhysicsShapeType.SPHERE,
        { mass: 0.3, friction: 4 },
        scene
      );

      physicsBall.body.applyImpulse(new Vector3(2, 0, 0), new Vector3(0, 1, 0));
      clearTimeout(ballTimeout);
    }, 3000);
  }
};

const onRender = (
  scene: Scene,
  wheelState: WheelState,
  appliedForce: React.MutableRefObject<Vector3>,
  stopTime: number
) => {
  const deltaTimeInMillis = scene.getEngine().getDeltaTime();
  const positionVector = Vector3.Zero();

  if (rotatingBase && wheelState === "idle") {
    const rpm = 2;
    rotatingBase.rotation.y +=
      (rpm / 60) * Math.PI * 2 * (deltaTimeInMillis / 1000);
  }
  if (spinningBase?.body && wheelState === "spinning") {
    spinningBase.body.applyForce(appliedForce.current, new Vector3(6, 0, 6));

    const spinningBaseTimeout = setTimeout(() => {
      if (spinningBase.material.friction && appliedForce.current.x > 0) {
        spinningBase.material.friction += 0.1;
        appliedForce.current.x -= 0.04;
        appliedForce.current.z += 0.04;
      }
    }, stopTime);

    if (appliedForce.current.x < 0 && physicsBall?.body) {
      physicsBall.body.getLinearVelocityToRef(positionVector);
      if (positionVector.hasAZeroComponent) {
        const beta = (2 * Math.PI) / wheelNumbers.length;
        const ballPosition = physicsBall.transformNode
          .getAbsolutePosition()
          .subtract(spinningBase.transformNode.getAbsolutePosition());
        const alphaM = Math.atan2(ballPosition.z, ballPosition.x);

        spinningBase.transformNode.getChildMeshes().forEach((slice, index) => {
          if (Math.floor(alphaM / beta) === index) {
            console.log(index);
          }
        });
      }
      clearTimeout(spinningBaseTimeout);
    }
  }
};

export const SpinningWheel = observer(() => {
  const appliedForce = useRef<Vector3>(new Vector3(1.2, 0, -1.2));
  const randomStopTime = randomNumber(3500, 5500);
  const {
    wheelStore: { wheelStatus },
  } = useStore();
  return (
    <div className={styles.spinningWheelcontainer}>
      <SceneComponent
        antialias
        onSceneReady={(scene) => onSceneReady(scene, wheelStatus)}
        onRender={(scene) =>
          onRender(scene, wheelStatus, appliedForce, randomStopTime)
        }
        id="my-canvas"
        className={styles.canvas}
      />
    </div>
  );
});

// if (positionVector.hasAZeroComponent) {
//   const beta = Math.PI / wheelNumbers.length;
//   const ballPosition = physicsBall.transformNode
//     .getAbsolutePosition()
//     .subtract(spinningBase.transformNode.getAbsolutePosition());
//   const alphaM = Math.atan2(ballPosition.y, ballPosition.x);

//   spinningBase.transformNode.getChildMeshes().forEach((slice, index) => {
//     const alpha = index * 2 * beta + beta;
//     if (alphaM > alpha - beta && alphaM < alpha + beta) {
//       console.log({
//         name: slice.name,
//         index,
//       });
//     }
//   });
// }

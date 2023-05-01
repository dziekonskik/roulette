import {
  DirectionalLight,
  HemisphericLight,
  Mesh,
  Scene,
  Vector3,
} from "@babylonjs/core";
import {
  HavokPlugin,
  IPhysicsCollisionEvent,
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
  const numbersWWheel = resultWheel(scene);
  const ball = createBall(scene);
  ball.isVisible = false;
  ball.position.y = 0.5;
  ball.position.z = -1;

  const havokInstance = await HavokPhysics();
  const havok = new HavokPlugin(true, havokInstance);
  scene.enablePhysics(new Vector3(0, -9.81, 0), havok);
  const collideCB = (collision: IPhysicsCollisionEvent) => {
    // console.log(
    //   scene.getMeshByUniqueId(collision.collidedAgainst.transformNode.uniqueId)
    // );

    console.log(collision.collider);
    console.log(collision.collidedAgainst);
  };

  havok.onCollisionObservable.add(collideCB);

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
    camera.useAutoRotationBehavior = false;
    camera.detachControl();
    spinningBase = new PhysicsAggregate(
      numbersWWheel,
      PhysicsShapeType.CYLINDER,
      { mass: 1, restitution: 0.1, friction: 1 },
      scene
    );
    spinningBase.body.setCollisionCallbackEnabled(true);
    // spinningBase.body.getCollisionObservable().add(collideCB);

    const ballTimeout = window.setTimeout(() => {
      ball.isVisible = true;
      physicsBall = new PhysicsAggregate(
        ball,
        PhysicsShapeType.SPHERE,
        { mass: 0.3, friction: 4 },
        scene
      );
      physicsBall.body.setCollisionCallbackEnabled(true);
      // physicsBall.body.getCollisionObservable().add(collideCB);
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
        //here the ball has stopped, but the colision callback is in the onSceneReady
        // console.log(physicsBall.transformNode.getAbsolutePosition());
      }
      clearTimeout(spinningBaseTimeout);
    }
  }
};

export const SpinningWheel = observer(() => {
  const appliedForce = useRef<Vector3>(new Vector3(1.5, 0, -1.5));
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

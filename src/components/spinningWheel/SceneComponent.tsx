import { Engine, EngineOptions, Scene, SceneOptions } from "@babylonjs/core";
import { useEffect, useRef } from "react";

interface SceneComponentProps
  extends React.CanvasHTMLAttributes<HTMLCanvasElement> {
  antialias?: boolean;
  engineOptions?: EngineOptions;
  adaptToDeviceRatio?: boolean;
  sceneOptions?: SceneOptions;
  onRender?: (scene: Scene) => void;
  onSceneReady: (scene: Scene) => void;
}

export const SceneComponent: React.FC<SceneComponentProps> = ({
  antialias = false,
  engineOptions,
  adaptToDeviceRatio = true,
  sceneOptions,
  onRender,
  onSceneReady,
  ...rest
}) => {
  const reactCanvas = useRef<HTMLCanvasElement | null>(null);

  // set up basic engine and scene
  useEffect(() => {
    const { current: canvas } = reactCanvas;

    if (!canvas) return;

    const engine = new Engine(
      canvas,
      antialias,
      engineOptions,
      adaptToDeviceRatio
    );
    const scene = new Scene(engine, sceneOptions);
    if (scene.isReady()) {
      onSceneReady(scene);
    } else {
      scene.onReadyObservable.addOnce((scene) => onSceneReady(scene));
    }

    engine.runRenderLoop(() => {
      if (typeof onRender === "function") onRender(scene);
      scene.render();
    });

    const resize = () => {
      scene.getEngine().resize();
    };

    if (typeof window !== "undefined") {
      window.addEventListener("resize", resize);
    }

    return () => {
      scene.getEngine().dispose();

      if (typeof window !== "undefined") {
        window.removeEventListener("resize", resize);
      }
    };
  }, [
    antialias,
    engineOptions,
    adaptToDeviceRatio,
    sceneOptions,
    onRender,
    onSceneReady,
  ]);

  return <canvas ref={reactCanvas} {...rest} />;
};

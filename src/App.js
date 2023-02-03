import { Canvas } from "@react-three/fiber";
import { useGLTF, Stage, PresentationControls } from "@react-three/drei";
import "semantic-ui-css/semantic.min.css";
import { HexColorPicker } from "react-colorful";
import { useState } from "react";
import { Color } from "three";

function Model(props) {
  const { scene } = useGLTF("/motor.glb");

  return <primitive object={scene} scale={0.1} {...props} />;
}
function App() {
  let [txt, setTxt] = useState("");
  let [target, setTarget] = useState(false);
  return (
    <div>
      <Canvas
        dpr={[1, 2]}
        shadows
        camera={{ fov: 45 }}
        style={{ position: "absolute" }}
      >
        <color attach="background" args={["#101010"]} />
        <PresentationControls
          speed={1.5}
          global
          zoom={0.5}
          polar={[-0.1, Math.PI / 4]}
        >
          <Stage enviroment={null}>
            <group
              onClick={(ev) => {
                //
                console.log(ev);
                if (ev.object && ev.object.material) {
                  //
                  setTarget(ev.object);
                  setTxt(ev.object.name);
                }
              }}
            >
              <Model></Model>
            </group>
          </Stage>
        </PresentationControls>
      </Canvas>
      <div style={{ position: "absolute", top: `20px`, left: `20px` }}>
        <HexColorPicker
          onChange={(ev) => {
            console.log(ev);
            if (target) {
              target.material.color = new Color(ev);
            }
          }}
        ></HexColorPicker>
        <div className="text-white" style={{ color: "white" }}>
          {txt}
        </div>
      </div>
    </div>
  );
}

export default App;

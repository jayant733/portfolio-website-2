import * as THREE from "three";
import { DRACOLoader, GLTF, GLTFLoader } from "three-stdlib";
import { setCharTimeline, setAllTimeline } from "../../utils/GsapScroll";
import { decryptFile } from "./decrypt";

const setCharacter = (
  renderer: THREE.WebGLRenderer,
  scene: THREE.Scene,
  camera: THREE.PerspectiveCamera
) => {
  const loader = new GLTFLoader();
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath("/draco/");
  loader.setDRACOLoader(dracoLoader);

  const loadCharacter = () => {
    return new Promise<GLTF | null>(async (resolve, reject) => {
      const loadFromUrl = (url: string) => {
        let character: THREE.Object3D;
        loader.load(
          url,
          async (gltf) => {
            character = gltf.scene;
            await renderer.compileAsync(character, camera, scene);
            character.traverse((child: any) => {
              if (child.isMesh) {
                const mesh = child as THREE.Mesh;
                child.castShadow = false;
                child.receiveShadow = false;
                mesh.frustumCulled = true;
                if (mesh.material && !Array.isArray(mesh.material)) {
                  (mesh.material as THREE.ShaderMaterial).precision = 'mediump';
                }
              }
            });
            resolve(gltf);
            setCharTimeline(character, camera);
            setAllTimeline();
            try {
              character!.getObjectByName("footR")!.position.y = 3.36;
              character!.getObjectByName("footL")!.position.y = 3.36;
            } catch (_) {}
            dracoLoader.dispose();
          },
          undefined,
          (error) => {
            console.error("Error loading GLTF model:", error);
            reject(error);
          }
        );
      };

      try {
        // Try loading plain GLB first (easy model swap)
        const testResponse = await fetch("/models/character.glb", { method: "HEAD" });
        if (testResponse.ok) {
          loadFromUrl("/models/character.glb");
        } else {
          throw new Error("Plain GLB not found, trying encrypted");
        }
      } catch (_) {
        // Fall back to encrypted model
        try {
          const encryptedBlob = await decryptFile(
            "/models/character.enc",
            "Character3D#@"
          );
          const blobUrl = URL.createObjectURL(new Blob([encryptedBlob]));
          loadFromUrl(blobUrl);
        } catch (err) {
          reject(err);
          console.error(err);
        }
      }
    });
  };

  return { loadCharacter };
};

export default setCharacter;

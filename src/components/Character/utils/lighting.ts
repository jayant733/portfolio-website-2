import * as THREE from "three";
import { RGBELoader } from "three-stdlib";
import { gsap } from "gsap";

const setLighting = (scene: THREE.Scene) => {
  // Directional key light - teal
  const directionalLight = new THREE.DirectionalLight(0x2dd4bf, 1.2);
  directionalLight.intensity = 0;
  directionalLight.position.set(-0.47, -0.32, -1);
  directionalLight.castShadow = true;
  directionalLight.shadow.mapSize.width = 1024;
  directionalLight.shadow.mapSize.height = 1024;
  directionalLight.shadow.camera.near = 0.5;
  directionalLight.shadow.camera.far = 50;
  scene.add(directionalLight);

  // Soft ambient light - neutral white so skin tones look clean
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);

  // Fill light from front - cool cyan
  const fillLight = new THREE.DirectionalLight(0x7ef8f0, 0);
  fillLight.position.set(0, 5, 10);
  scene.add(fillLight);

  // Point light for screen glow
  const pointLight = new THREE.PointLight(0x06b6d4, 0, 100, 3);
  pointLight.position.set(3, 12, 4);
  pointLight.castShadow = true;
  scene.add(pointLight);

  new RGBELoader()
    .setPath("/models/")
    .load("char_enviorment.hdr", function (texture) {
      texture.mapping = THREE.EquirectangularReflectionMapping;
      scene.environment = texture;
      // Keep environment at 0 - we don't want the purple HDR tint
      scene.environmentIntensity = 0;
      scene.environmentRotation.set(5.76, 85.85, 1);
    });

  function setPointLight(screenLight: any) {
    if (screenLight.material.opacity > 0.9) {
      pointLight.intensity = screenLight.material.emissiveIntensity * 20;
    } else {
      pointLight.intensity = 0;
    }
  }
  const duration = 2;
  const ease = "power2.inOut";
  function turnOnLights() {
    gsap.to(directionalLight, {
      intensity: 1.2,
      duration: duration,
      ease: ease,
    });
    gsap.to(fillLight, {
      intensity: 0.6,
      duration: duration,
      ease: ease,
    });
    gsap.to(".character-rim", {
      y: "55%",
      opacity: 1,
      delay: 0.2,
      duration: 2,
    });
  }

  return { setPointLight, turnOnLights };
};

export default setLighting;

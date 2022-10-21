import { useCallback } from "react";
import Particles from "react-particles";
import { loadFull } from "tsparticles";

const particleOptions = {
  autoPlay: true,
  fullScreen: {
    enable: true,
    zIndex: -1,
  },
  detectRetina: true,
  duration: 0,
  fpsLimit: 120,
  motion: {
    disable: false,
    reduce: {
      factor: 4,
      value: true,
    },
  },
  particles: {
    color: {
      value: "#00ff00",
      animation: {
        h: {
          count: 0,
          enable: true,
          offset: 0,
          speed: 50,
          decay: 0,
          sync: false,
        },
      },
    },
    move: {
      direction: "none",
      drift: 0,
      enable: true,
      gravity: {
        acceleration: 10,
        enable: true,
        inverse: false,
        maxSpeed: 50,
      },
      path: {
        clamp: true,
      },
      outModes: {
        default: "destroy",
        bottom: "destroy",
        left: "destroy",
        right: "destroy",
        top: "none",
      },
      random: false,
      size: false,
      speed: {
        min: 10,
        max: 20,
      },
    },
    shape: {
      options: {},
      type: "square",
    },
    size: {
      random: {
        enable: true,
        minimumValue: 2,
      },
      value: {
        min: 2,
        max: 4,
      },
      animation: {
        count: 0,
        enable: false,
        speed: 5,
        decay: 0,
        sync: false,
        destroy: "none",
        startValue: "random",
      },
    },
    roll: {
      darken: {
        enable: true,
        value: 25,
      },
      enable: true,
      enlighten: {
        enable: false,
        value: 0,
      },
      mode: "vertical",
      speed: {
        min: 15,
        max: 25,
      },
    },
    tilt: {
      random: {
        enable: false,
        minimumValue: 0,
      },
      value: {
        min: 0,
        max: 360,
      },
      animation: {
        enable: true,
        speed: 60,
        decay: 0,
        sync: false,
      },
      direction: "random",
      enable: true,
    },
    wobble: {
      distance: 30,
      enable: true,
      speed: {
        angle: {
          min: -15,
          max: 15,
        },
        move: 10,
      },
    },
  },
  pauseOnBlur: true,
  pauseOnOutsideViewport: true,
  zLayers: 100,
  emitters: {
    autoPlay: true,
    fill: true,
    life: {
      wait: false,
      count: 0,
      delay: 0.4,
      duration: 0.1,
    },
    rate: {
      quantity: 150,
      delay: 0.1,
    },
    shape: "square",
    startCount: 0,
    size: {
      mode: "percent",
      height: 0,
      width: 0,
    },
    particles: {},
    position: {},
  },
};

const Confetti = () => {
  const particlesInit = useCallback(async (engine) => {
    console.log(engine);
    await loadFull(engine);
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={particleOptions}
    />
  );
};

export default Confetti;

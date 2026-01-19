import type { Step } from "../../types/steps"

export const rawTimeline = [
  {
    subtitle: "Plot f(x) = x²",
    cameraTarget: { position: [0, 0, 10], duration: 1 },
    actions: [
      {
        type: "add",
        object: {
          id: "f1",
          type: "function",
          props: {
            f: "x*x",
            xmin: -3,
            xmax: 3,
            color: "cyan",
            lineWidth: 2,
          },
        },
      },
      {
        type: "add",
        object: {
          id: "p1",
          type: "point",
          props: {
            position: { x: 2, y: 4 },
            color: "magenta",
            size: 0.08,
          },
        },
      },
    ],
  },
  {
    subtitle: "Point follows sin(x), then morph curve to sin(x)",
    cameraTarget: { position: [2, 2, 9], duration: 1 },
    actions: [
      {
        type: "update",
        id: "p1",
        props: {
          followFunction: {
            f: "Math.sin(x)",
            startX: -3.14159265359,
            endX: 3.14159265359,
            duration: 3,
          },
        },
      },
      {
        type: "update",
        id: "f1",
        props: {
          g: "Math.sin(x)",
          animateDuration: 1.5,
        },
      },
    ],
  },
] as unknown as Step[]
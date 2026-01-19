import { Step } from "../../types/steps";

export const demoTimeline: Step[] = [
  {
    subtitle: "Graph of y = sin(x).",
    cameraTarget: { position: [10, 0, 10], duration: 1 },
    actions: [
      {
        type: "add",
        object: {
          id: "f1",
          type: "function",
          props: {
            f: (x: number) => Math.sin(x),
            xmin: -3.14159265359,
            xmax: 3.14159265359,
            color: "cyan",
            lineWidth: 2,
          },
        },
      },
    ],
  },

  {
    subtitle: "Graph of y = 0.3cos(x).",
    cameraTarget: { position: [0, 0, 10], duration: 1 },
    actions: [
      {
        type: "add",
        object: {
          id: "f2",
          type: "function",
          props: {
            f: (x: number) => 0.3 * Math.cos(x),
            xmin: -3.14159265359,
            xmax: 3.14159265359,
            color: "red",
            lineWidth: 2,
          },
        },
      },
    ],
  },

  {
    subtitle: "Sliding tangent of sin(x).",
    actions: [
      {
        type: "add",
        object: {
          id: "t1",
          type: "slidingTangent",
          props: {
            f: (x: number) => Math.sin(x),
            startX: -3.14159265359,
            endX: 3.14159265359,
            color: "white",
            lineWidth: 2,
            duration: 2,
          },
        },
      },
    ],
  },

  {
    subtitle: "Point follows sin(x).",
    actions: [
      {
        type: "add",
        object: {
          id: "p4",
          type: "point",
          props: {
            position: { x: 3.14159265359, y: 0 },
            color: "magenta",
            size: 0.2,
            followFunction: {
              f: (x: number) => Math.sin(x),
              startX: -3.14159265359,
              endX: 3.14159265359,
              duration: 2,
            },
          },
        },
      },
    ],
  },

  {
    subtitle: "Area between sin(x) and 0.3cos(x).",
    cameraTarget: { position: [20, 20, 20], duration: 1 },
    actions: [
      {
        type: "add",
        object: {
          id: "area1",
          type: "area",
          props: {
            f: (x: number) => Math.sin(x),
            g: (x: number) => 0.3 * Math.cos(x),
            xmin: -3.14159265359,
            xmax: 3.14159265359,
            color: "#22c55e",
            opacity: 0.35,
          },
        },
      },
    ],
  },

  {
    subtitle: "Update tangent to match 0.3cos(x).",
    actions: [
      {
        type: "update",
        id: "t1",
        props: {
          f: (x: number) => 0.3 * Math.cos(x),
          startX: 0,
          endX: 1.57079632679,
        },
      },
    ],
  },

  {
    subtitle: "Remove the tangent.",
    actions: [{ type: "remove", id: "t1" }],
  },

  {
    subtitle: "Morph both functions and update the shaded area.",
    actions: [
      {
        type: "update",
        id: "f1",
        props: {
          g: (x: number) => 2 * Math.sin(x),
          animateDuration: 1,
        },
      },
      {
        type: "update",
        id: "f2",
        props: {
          g: (x: number) => 1 - 0.5 * Math.cos(x),
          animateDuration: 1,
        },
      },
      {
        type: "update",
        id: "area1",
        props: {
          animateTo: {
            f: (x: number) => 2 * Math.sin(x),
            g: (x: number) => 1 - 0.5 * Math.cos(x),
          },
          animateDuration: 0.2,
        },
      },
    ],
  },

  {
    subtitle: "Add point at (0, 0).",
    actions: [
      {
        type: "add",
        object: {
          id: "p1",
          type: "point",
          props: {
            position: { x: 0, y: 0 },
            color: "green",
            size: 0.2,
          },
        },
      },
    ],
  },

  {
    subtitle: "Point follows 2sin(x).",
    actions: [
      {
        type: "update",
        id: "p1",
        props: {
          followFunction: {
            f: (x: number) => 2 * Math.sin(x),
            startX: 0,
            endX: 3.14159265359,
            duration: 1,
          },
        },
      },
    ],
  },
];
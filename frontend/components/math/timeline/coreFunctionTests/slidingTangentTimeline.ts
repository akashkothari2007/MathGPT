import { Step } from "../../types/steps";

export const slidingTangentTimeline: Step[] = [
  {
    subtitle: "Base function y = cos(x).",
    actions: [
      {
        type: "add",
        object: {
          id: "f_tan",
          type: "function",
          props: {
            f: (x: number) => Math.cos(x),
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
    subtitle: "Sliding tangent line across y = cos(x).",
    actions: [
      {
        type: "add",
        object: {
          id: "t_slide_test",
          type: "slidingTangent",
          props: {
            f: (x: number) => Math.cos(x),
            startX: -3.14159265359,
            endX: 3.14159265359,
            color: "white",
            lineWidth: 2,
            duration: 4,
          },
        },
      },
    ],
  },

  {
    subtitle: "Now restrict the tangent to [-π/2, π/2].",
    actions: [
      {
        type: "update",
        id: "t_slide_test",
        props: {
          startX: -1.57079632679,
          endX: 1.57079632679,
          duration: 3,
        },
      },
    ],
  },

  {
    subtitle: "Morph y = cos(x) into y = 2cos(x).",
    actions: [
      {
        type: "update",
        id: "f_tan",
        props: {
          g: (x: number) => 2 * Math.cos(x),
          animateDuration: 2,
        },
      },
    ],
  },

  {
    subtitle: "Sliding tangent now follows y = 2cos(x).",
    actions: [
      {
        type: "update",
        id: "t_slide_test",
        props: {
          f: (x: number) => 2 * Math.cos(x),
          startX: -1.57079632679,
          endX: 1.57079632679,
          duration: 3,
        },
      },
    ],
  },

  // the “reverse direction” sequence compressed into a few clear steps
  {
    subtitle: "Reverse the sliding direction (big sweep).",
    actions: [
      {
        type: "update",
        id: "t_slide_test",
        props: {
          startX: 1.57079632679,
          endX: -3,
          duration: 3,
        },
      },
    ],
  },
  {
    subtitle: "Reverse direction again (bounce).",
    actions: [
      {
        type: "update",
        id: "t_slide_test",
        props: {
          startX: -3,
          endX: 2.7,
          duration: 3,
        },
      },
    ],
  },
  {
    subtitle: "Reverse direction (smaller bounce).",
    actions: [
      {
        type: "update",
        id: "t_slide_test",
        props: {
          startX: 2.7,
          endX: -2.2,
          duration: 2.7,
        },
      },
    ],
  },
  {
    subtitle: "Settle toward the center.",
    actions: [
      {
        type: "update",
        id: "t_slide_test",
        props: {
          startX: -2.2,
          endX: 1.7,
          duration: 2.2,
        },
      },
    ],
  },
  {
    subtitle: "Settle closer.",
    actions: [
      {
        type: "update",
        id: "t_slide_test",
        props: {
          startX: 1.7,
          endX: -1,
          duration: 1.7,
        },
      },
    ],
  },
  {
    subtitle: "Almost done.",
    actions: [
      {
        type: "update",
        id: "t_slide_test",
        props: {
          startX: -1,
          endX: 0.5,
          duration: 1,
        },
      },
    ],
  },
  {
    subtitle: "Tiny oscillations.",
    actions: [
      {
        type: "update",
        id: "t_slide_test",
        props: {
          startX: 0.5,
          endX: -0.15,
          duration: 0.5,
        },
      },
    ],
  },
  {
    subtitle: "Settle near 0.",
    actions: [
      {
        type: "update",
        id: "t_slide_test",
        props: {
          startX: -0.15,
          endX: 0.05,
          duration: 0.15,
        },
      },
    ],
  },
  {
    subtitle: "End at x = 0.",
    actions: [
      {
        type: "update",
        id: "t_slide_test",
        props: {
          startX: 0.05,
          endX: 0,
          duration: 0.05,
        },
      },
    ],
  },

  {
    subtitle: "Remove the sliding tangent and base function.",
    actions: [
      { type: "remove", id: "t_slide_test" },
      { type: "remove", id: "f_tan" },
    ],
  },
];
import { Action } from '../types/actions'
import { SceneObject } from '../types/scene'
//fake timeline for testing
export const demoTimeline: Action[] = [
  {
    type: 'add',
    object: {
        id: 'f1',
        type: 'function',
        props: {
            f: (x: number) => Math.sin(x),
            color: 'cyan',
            lineWidth: 2,
        }
    },
    time: 4,
    subtitle: 'Here is the graph of the function y = sin(x)',
  },
  {
    type: 'add',
    object: {
        id: 'p1',
        type: 'point',
        props: {
            position: {x: Math.PI/2, y: 1},
            size: 0.1,
            color: 'orange',
        }
    },
    time: 2,
    subtitle: 'Here is the point (π/2,1)',
  },
  {
    type: 'add',
    object: {
        id: 'l1',
        type: 'label',
        props: {
            text: '(π/2,1)',
            position: {x: Math.PI/2, y: 1},
        }
    },
    time: 2,
    subtitle: 'Here is the label (π/2,1)',
  },
  {
    type: 'remove',
    id: 'l1',
    time: 0,
    subtitle: 'removing the label (π/2,1)',
  },
  {
    type: 'update',
    id: 'p1',
    props: {
      position: {x: Math.PI/2, y: 1},
      animateTo: {x: Math.PI, y: 0},
      animateDuration: 2,
    },
    time: 2,
    subtitle: 'Updating the point to (π,0)',
  },
  {
    type: 'add',
    object: {
        id: 'l2',
        type: 'label',
        props: {
            text: '(π,0)',
            position: {x: Math.PI, y: 0},
        }
    },
    time: 0,
    subtitle: 'adding the label (π,0)',
  },
  {
    type: 'update',
    id: 'f1',
    props: {
      animateTo: (x: number) => Math.sin(x) * 2,
      animateDuration: 2,
    },
    time: 4,
    subtitle: 'Updating the function to y = 2*sin(x)',
  },
  {
    type: 'update',
    id: 'f1',
    props: {
      animateTo: (x: number) => Math.sin(x) * 0.5,
      animateDuration: 2,
    },
    time: 4,
    subtitle: 'Updating the function to y = 2*sin(x)',
  },{
    type: 'update',
    id: 'f1',
    props: {
      animateTo: (x: number) => Math.cos(x) * 2,
      animateDuration: 2,
    },
    time: 4,
    subtitle: 'Updating the function to y = 2*sin(x)',
  },
  {
    type: 'add',
    object: {
        id: 'f2',
        type: 'function',
        props: {
            f: (x: number) => -1.6829 * (x - 1) + 2 * Math.cos(1),
            color: 'red',
            lineWidth: 2,
            xmin: 0,
            xmax: 2,
        }
    },
    time: 2,
    subtitle: 'tangent at x = 1',
  },
  {
    type: 'update',
    id: 'f1',
    props: {
      animateTo: (x: number) => x * x,
      animateDuration: 2,
    },
    time: 2,
    subtitle: 'Updating the function to y = x^2',
  },
  {
    type: 'update',
    id: 'f2',
    props: {
      xmin: 0.5,
      xmax: 1,
      animateTo: (x: number) => 2 * (x - 1) + 1,
      animateDuration: 2,
    },
    time: 4,
    subtitle: 'updating tangent at x = 1',
  },
  {
    type: 'wait',
    time: 2,
    subtitle: '',
  },
  {
    type: 'remove',
    id: 'l1',
    time: 2,
    subtitle: 'removing the label ',
  },
]
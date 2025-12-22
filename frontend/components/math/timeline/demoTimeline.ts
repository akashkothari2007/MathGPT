import { Action } from './actions'

export const demoTimeline: Action[] = [
  {
    type: 'plot_function',
    id: 'f1',
    equation: (x) => Math.sin(x),
    color: 'magenta',
    time: 4,
    subtitle: 'Here is the graph of the function y = sin(x)',
  },
  {
    type: 'add_point',
    id: 'p1',
    x: Math.PI/2,
    y: 1,
    color: 'cyan',
    time: 2,
    subtitle: 'Here is the point (π/2,1)',
  },
  {
    type: 'add_label',
    id: 'l1',
    text: '(π/2,1)',
    x: Math.PI/2,
    y: 1,
    color: 'white',
    time: 2,
    subtitle: 'Here is the label (π/2,1)',
  },
  {
    type: 'wait',
    time: 2,
    subtitle: ' ',
  },
]
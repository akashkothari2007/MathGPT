export type Action =
  | {
      type: 'plot_function'
      id: string
      equation: (x: number) => number
      color?: string
      time: number
      subtitle: string
    }
  | {
      type: 'add_point'
      id: string
      x: number
      y: number
      color?: string
      time: number
      subtitle: string
    }
  | {
      type: 'add_label'
      id: string
      text: string
      x: number
      y: number
      color?: string
      time: number
      subtitle: string
    }
  | {
      type: 'wait'
      time: number
      subtitle: string
    }
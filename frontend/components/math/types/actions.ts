//action types for the timeline
//has a type, id, time, subtitle and any other props for each type of action
//see scene.ts for the types of objects that can be added to the scene
import { CameraTarget } from './cameraTarget'
import { GraphObject } from './graphObject'

export type Action =
  | {
    type: 'add'
    object: GraphObject
    time: number
    subtitle: string
    target?: CameraTarget
  }
  | {
    type: 'remove'
    id: string
    time: number
    subtitle: string
    target?: CameraTarget
  }
  | {
    type: 'update'
    id: string
    props: any
    time: number
    subtitle:string
    target?: CameraTarget
  }
  | {
    type: 'wait'
    time: number
    subtitle: string
    target?: CameraTarget
  }


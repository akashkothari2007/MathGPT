//action types for the timeline
//has a type, id, time, subtitle and any other props for each type of action
//see scene.ts for the types of objects that can be added to the scene
import { GraphObject } from './graphObject'

export type Action =
  | {
    type: 'add'
    object: GraphObject

  }
  | {
    type: 'remove'
    id: string
  }
  | {
    type: 'update'
    id: string
    props: any

  }



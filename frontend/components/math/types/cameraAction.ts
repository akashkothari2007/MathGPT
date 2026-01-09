export type CameraMove = {
    position: [number, number, number]
    lookAt?: [number, number, number]
    duration?: number
} | null
import {GridHelper} from 'three'
import {useMemo} from 'react'

export default function Grid() {
    const grid = useMemo(() => new GridHelper(10, 20, '#444', '#222'), [])
    return <primitive object={grid} />
}
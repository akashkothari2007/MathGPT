import {AxesHelper} from 'three'
import {useMemo} from 'react'

export default function Axes() {

    const axes = useMemo(() => new AxesHelper(5), [])
    return <primitive object={axes} />
}
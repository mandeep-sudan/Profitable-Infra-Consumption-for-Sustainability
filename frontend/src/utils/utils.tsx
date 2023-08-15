export const stringsToAxesClass = (xKey:string,xLabel:string,yKey:string,yLabel:string) : AxesKeysAndLabels => {
    return { x: { key: xKey, label: xLabel }, y: { key: yKey, label: yLabel } }
}
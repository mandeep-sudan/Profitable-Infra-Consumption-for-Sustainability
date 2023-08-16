export const stringsToAxesClass = (xKey: string, xLabel: string, yKey: string, yLabel: string): AxesKeysAndLabels => {
    return { x: { key: xKey, label: xLabel }, y: { key: yKey, label: yLabel } }
}

export const matchFieldsForGlobalFilter: string[] = [
    "billing_account_id", "service.description", "sku.description", "project.id", "project.name", "location.location", "resource.name",
    "resource.global_name", "currency", "usage.units",
    "credits"
]

export const betweenDatesFieldsForGlobalFilter: string[] = [
    "usage_start_time",
    "usage_end_time",
    "export_time"
]

export const betweenValuesFieldsForGlobalFilter: string[] = [
    "cost",
    "usage.amount",
] 

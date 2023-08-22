export const stringsToAxesClass = (xKey: string, xLabel: string, yKey: string, yLabel: string): AxesKeysAndLabels => {
    return { x: { key: xKey, label: xLabel }, y: { key: yKey, label: yLabel } }
}

// BILLING FIELDS

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

export const sortingFieldsForGlobalFilter: string[] = [
    "billing_account_id",
    "service",
    "sku",
    "usage_start_time",
    "usage_end_time",
    "usage_duration_seconds",
    "project_id",
    "project_name",
    "location",
    "resource_name",
    "resource_global_name",
    "export_time",
    "cost",
    "currency",
    "usage_amount",
    "usage_unit",
    "credits",
    "invoice_month"
] 

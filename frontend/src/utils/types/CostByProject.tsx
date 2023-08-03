class CostByProject {
    name:string
    total_cost:number
    total_credits:number
    final_cost:number
}

class CostByService {
    name:string
    total_cost:number
    total_credits:number
    final_cost:number
}

class CostByMonth {
    month:number
    total_cost:number
    total_credits:number
    final_cost:number
}

class AllData {
    billing_account_id:string
    service: {
        id: string
        description:string
    }
    sku: {
        id: string
        description: string
    }
    usage_start_time: string
    usage_end_time: string
    usage_duration_seconds: number
    project: {
        id: string
        number: number
        name:string
        labels: string[]
        ancestry_numbers: any // TO DO: FIX THIS TYPE, was null
        ancestors: [
            {
                resource_name: string
                display_name: string
            }
        ]
    }
    labels: [
        {
            key: string
            value:string
        }
    ]
    location: {
        location: string
        country: string
        region: any  // TO DO: FIX THIS TYPE, was null
        zone: any  // TO DO: FIX THIS TYPE, was null
    }
    export_time:string
    cost: number
    usage: {
        amount: number
        unit: string
        amount_in_pricing_units: number // 9.54e-7
        pricing_unit: string
    }
}
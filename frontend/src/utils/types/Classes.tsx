class CostByProject {
    name:string
    totalCost:number
    totalCredits:number
    finalCost:number
}

class CostByService {
    name:string
    totalCost:number
    totalCredits:number
    finalCost:number
}

class CostByMonth {
    month:number
    totalCost:number
    totalCredits:number
    finalCost:number
}

class BigQueryJob {
    jobId:string
    projectId:string
    email:string
    status:string
    creationTime:number
    startTime:number
    endTime:number
}

class AllData {
    billingAccountId:string

    service:string
    sku:string
    usageStartTime:string
    usageEndTime:string
    usageDurationSeconds:string
    projectId:string
    projectName:string
    location:string
    resourceName:string
    resourceGlobalName:string
    exportTime:string
    cost:number
    currency:string
    usageAmount:string
    usageUnit:string
    credits: [{
        id: string
        fullName: string
        type: string
        name: string
        amount: number
    }]
    // TO DO: Ensure that this is the correct unit
    invoiceMonth:number   
}

// class AllData {
//     billing_account_id:string
//     service: {
//         id: string
//         description:string
//     }
//     sku: {
//         id: string
//         description: string
//     }
//     usage_start_time: string
//     usage_end_time: string
//     usage_duration_seconds: number
//     project: {
//         id: string
//         number: number
//         name:string
//         labels: string[]
//         ancestry_numbers: any // TO DO: FIX THIS TYPE, was null; string?
//         ancestors: [
//             {
//                 resource_name: string
//                 display_name: string
//             }
//         ]
//     }
//     labels: [
//         {
//             key: string
//             value:string
//         }
//     ]
//     location: {
//         location: string
//         country: string
//         region: any  // TO DO: FIX THIS TYPE, was null
//         zone: any  // TO DO: FIX THIS TYPE, was null
//     }
//     export_time:string
//     cost: number
//     usage: {
//         amount: number
//         unit: string
//         amount_in_pricing_units: number // 9.54e-7
//         pricing_unit: string
//     }
// }
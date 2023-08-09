class CostByProject {
    name:string
    totalCost:number
    totalCredits:number
    finalCost:number
}

class CostByService {
    description:string
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

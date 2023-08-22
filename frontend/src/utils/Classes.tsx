// **********************************************
// ******************** DATA ********************
// **********************************************

interface ICostBySomething {
    name:string
    totalCost:number
    totalCredits:number
    finalCost:number
}

class CostByProject implements ICostBySomething {
    name:string
    totalCost:number
    totalCredits:number
    finalCost:number
}

class CostByService implements ICostBySomething {
    name:string
    totalCost:number
    totalCredits:number
    finalCost:number
}


class CostByMonth implements ICostBySomething {
    name:string
    totalCost:number
    totalCredits:number
    finalCost:number
}

interface ICostByWeekAndSomething {
    week:string
    name:string
    totalCost:number
    totalCredits:number
    finalCost:number
}

class CostByWeekAndService implements ICostByWeekAndSomething {
    week:string
    name:string
    totalCost:number
    totalCredits:number
    finalCost:number
}


interface IInfTablePage<T,> {
    rowList:T[]
    nextPageInfo:string
    // getPageInfo: ()=>string 
    // getRowList: ()=>T[] 
}

class BigQueryJob {
    jobId:string
    projectId:string
    email:string
    status:string
    query:string
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

class BigQueryPage implements IInfTablePage<BigQueryJob> {
    rowList:BigQueryJob[]
    nextPageInfo:string
}

class AllDataPage implements IInfTablePage<AllData> {
    rowList:AllData[]
    nextPageInfo:string
}

// **********************************************
// ******************** HELPERS ********************
// **********************************************

class AxesKeysAndLabels {
    x: {key: string, label: string}
    y: {key: string, label: string}
}

// **********************************************
// ******************** Queries ********************
// **********************************************

// Billing

interface IQueryParamInfo {
    field: string
}

class BillingMatch implements IQueryParamInfo{
    field: string
    value: string
    operator: string
    not: boolean
}

class BillingBetweenDates implements IQueryParamInfo{
    field: string
    startDateTime: Date
    endDateTime: Date
    inclusive: boolean
}

class BillingBetweenValues implements IQueryParamInfo{
    field: string
    lowNumber: number
    highNumber: number
    inclusive: boolean
}

class BillingSorting implements IQueryParamInfo{
    field: string
    ascending: boolean
}

class BillingQueryParams {
    matches: BillingMatch[]
    betweenDates: BillingBetweenDates[]
    betweenValues: BillingBetweenValues[]
    sortings: BillingSorting[]
}

// BigQuery

class BigQueryQueryParams {
    allUsers:boolean
    minCreationTime:string
    maxCreationTime:string
    // private Projection projection;
    // private StateFilter stateFilter;
    parentJobId:string
}
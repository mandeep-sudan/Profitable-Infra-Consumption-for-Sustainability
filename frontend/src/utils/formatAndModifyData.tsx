import { format } from "date-fns";

// ****************************************************************
// ******************** HELPER FUNCTION(S) ************************
// ****************************************************************


const getGivenFieldFunction = (field: string) => {
    return (json: any) => {return json[field]};
}

// takes a string of the form "2023-07-30T05:00:00Z" to the form "Thu, 01 Jan 1970 00:00:00 GMT"
const dateToReadable = (inputString: string) => {
    let date = new Date(inputString)
    return format(date, "d LLL, yyy, h:mmaaa")
}
const dateToReadableMs = (inputString: string) => {
    let date = new Date(inputString)
    return format(date, "d LLL, yyy, H:mm:ss.SSSS")
}

const numToCost = (inputNum: number) => {
    return "$ " + inputNum.toFixed(2).toString();
}

const monthToReadable = (inputString: string) => {
    // console.log(inputString.substring(0,4))
    // console.log(inputString.substring(4,6))
    let date = new Date(parseInt(inputString.substring(0,4)),parseInt(inputString.substring(4,6))-1);
    return format(date, "LLL yyy")
}


export const camelCaseToReadable = (inputString:string) => {
    let words : string[] = inputString.match(/[A-Za-z][a-z]*/g) || [];

    return words.map((word) => {return word.charAt(0).toUpperCase() + word.substring(1)}).join(" ");
}

// ****************************************************************
// **************** MAPPING FIELDS TO FUNCTIONS *******************
// ****************************************************************

export const allDataModifiers : any = {
    "usageStartTime":dateToReadable,
    "usageEndTime":dateToReadable,
    "exportTime":dateToReadable,
    "cost": numToCost,
    "usage":(json: any) => {return json["amount"]+" "+json["unit"]},
    // "invoiceMonth":monthToReadable
};

const costModifiers : any = {
    "totalCost":numToCost,
    "totalCredits":numToCost,
    "finalCost":numToCost
}

export const costByMonthModifiers : any = {
    ...costModifiers,
    "month":monthToReadable,
};

export const costByServiceModifiers : any = {
    ...costModifiers,
};
export const costByProjectModifiers : any = {
    ...costModifiers,
};

export const bigQueryJobsModifiers : any = {
    "creationTime":dateToReadableMs,
    "startTime":dateToReadableMs,
    "endTime":dateToReadableMs,
};
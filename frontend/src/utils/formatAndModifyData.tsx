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

const numToCost = (inputNum: number) => {
    return "$ " + inputNum.toFixed(2).toString();
}

const monthToReadable = (inputString: string) => {
    // console.log(inputString.substring(0,4))
    // console.log(inputString.substring(4,6))
    let date = new Date(parseInt(inputString.substring(0,4)),parseInt(inputString.substring(4,6))-1);
    return format(date, "LLL yyy")
}

export const colNameToReadable = (inputString:string) => {
    let allWords : string[] = inputString.split("_");
    
    for (let i=0; i<allWords.length; i++) {
        allWords[i] = allWords[i][0].toUpperCase() + allWords[i].substring(1)
    }
    return allWords.join(" ")
}

// ****************************************************************
// **************** MAPPING FIELDS TO FUNCTIONS *******************
// ****************************************************************

export const allDataModifiers : any = {
    "service":getGivenFieldFunction("description"),
    "sku":getGivenFieldFunction("description"),
    "usage_start_time":dateToReadable,
    "usage_end_time":dateToReadable,
    "project": getGivenFieldFunction("name"),
    "location": getGivenFieldFunction("location"), // TO DO: make sure that this is the field we want
    "export_time":dateToReadable,
    "cost": numToCost,
    "usage":(json: any) => {return json["amount"]+" "+json["unit"]}
};

export const costByMonthModifiers : any = {
    "month":monthToReadable,
    "total_cost":numToCost,
    "total_credits":numToCost,
    "final_cost":numToCost
};

export const costByServiceModifiers : any = {
    "total_cost":numToCost,
    "total_credits":numToCost,
    "final_cost":numToCost
};
export const costByProjectModifiers : any = {
    "total_cost":numToCost,
    "total_credits":numToCost,
    "final_cost":numToCost
};

/* Your Code Here */

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */
 function createEmployeeRecord(testEmployee){
    let employeeObject = {}
    for(let item of testEmployee )
    {
        employeeObject["firstName"] = testEmployee[0]
        employeeObject["familyName"]  = testEmployee[1]
        employeeObject["title"] = testEmployee[2]
        employeeObject["payPerHour"] = testEmployee[3]
    }
    employeeObject["timeInEvents"] = [ ]
    employeeObject["timeOutEvents"] = [ ]
return employeeObject
}
function createEmployeeRecords(myArray){
    let arrayToBeReturned = []
    myArray.forEach(element => {
            arrayToBeReturned.push(createEmployeeRecord(element))    
    });
 return arrayToBeReturned       
}

let createTimeInEvent = function(dateStamp){
    let [date, hour] = dateStamp.split(' ')

    this.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date,
    })

    return this
}

let createTimeOutEvent = function(dateStamp){
    let [date, hour] = dateStamp.split(' ')

    this.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date,
    })

    return this
}
let hoursWorkedOnDate = function(soughtDate){
    let comingIn = this.timeInEvents.find(function(e){
        return e.date === soughtDate
    })

    let goingOut = this.timeOutEvents.find(function(e){
        return e.date === soughtDate
    })

    return (goingOut.hour - comingIn.hour) / 100
}

let wagesEarnedOnDate = function(dateSought){
    let rawWage = hoursWorkedOnDate.call(this, dateSought)
        * this.payPerHour
    return parseFloat(rawWage.toString())
}

let allWagesFor = function(){
    let validDate = this.timeInEvents.map(function(e){
        return e.date
    })

    let payable = validDate.reduce(function(memo, d){
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0)

    return payable
}

let findEmployeeByFirstName = function(srcArray, firstName) {
  return srcArray.find(function(rec){
    return rec.firstName === firstName
  })
}

let calculatePayroll = function(arrayOfEmployeeRecords){
    return arrayOfEmployeeRecords.reduce(function(memo, rec){
        return memo + allWagesFor.call(rec)
    }, 0)
}
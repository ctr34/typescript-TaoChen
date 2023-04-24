"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TollFreeVehicles;
(function (TollFreeVehicles) {
    TollFreeVehicles[TollFreeVehicles["Motorcycle"] = 0] = "Motorcycle";
    TollFreeVehicles[TollFreeVehicles["Tractor"] = 1] = "Tractor";
    TollFreeVehicles[TollFreeVehicles["Emergency"] = 2] = "Emergency";
    TollFreeVehicles[TollFreeVehicles["Diplomat"] = 3] = "Diplomat";
    TollFreeVehicles[TollFreeVehicles["Foreign"] = 4] = "Foreign";
    TollFreeVehicles[TollFreeVehicles["Military"] = 5] = "Military";
})(TollFreeVehicles || (TollFreeVehicles = {}));
function getTax(vehicle, dates) {
    var intervalStart = dates[0];
    var totalFee = 0;
    for (var i = 0; i < dates.length; i++) {
        var date = dates[i];
        var nextFee = getTollFee(date, vehicle);
        var tempFee = getTollFee(intervalStart, vehicle);
        var diffInMillies = date.getTime() - intervalStart.getTime();
        var minutes = diffInMillies / 1000 / 60;
        if (minutes <= 60) {
            if (totalFee > 0)
                totalFee -= tempFee;
            if (nextFee >= tempFee)
                tempFee = nextFee;
            totalFee += tempFee;
        }
        else {
            totalFee += nextFee;
        }
        if (totalFee > 60) {
            totalFee = 60;
            return totalFee;
        }
    }
    return totalFee;
}
function isTollFreeVehicle(vehicle) {
    if (vehicle == null)
        return false;
    var vehicleType = vehicle.getVehicleType();
    return vehicleType == TollFreeVehicles[TollFreeVehicles.Motorcycle] ||
        vehicleType == TollFreeVehicles[TollFreeVehicles.Tractor] ||
        vehicleType == TollFreeVehicles[TollFreeVehicles.Emergency] ||
        vehicleType == TollFreeVehicles[TollFreeVehicles.Diplomat] ||
        vehicleType == TollFreeVehicles[TollFreeVehicles.Foreign] ||
        vehicleType == TollFreeVehicles[TollFreeVehicles.Military];
}
function getTollFee(date, vehicle) {
    if (isTollFreeDate(date) || isTollFreeVehicle(vehicle))
        return 0;
    var hour = date.getHours();
    var minute = date.getMinutes();
    if (hour == 6 && minute >= 0 && minute <= 29)
        return 8;
    else if (hour == 6 && minute >= 30 && minute <= 59)
        return 13;
    else if (hour == 7 && minute >= 0 && minute <= 59)
        return 18;
    else if (hour == 8 && minute >= 0 && minute <= 29)
        return 13;
    else if (hour >= 8 && hour <= 14 && minute >= 30 && minute <= 59)
        return 8;
    else if (hour == 15 && minute >= 0 && minute <= 29)
        return 13;
    else if (hour == 15 && minute >= 0 || hour == 16 && minute <= 59)
        return 18;
    else if (hour == 17 && minute >= 0 && minute <= 59)
        return 13;
    else if (hour == 18 && minute >= 0 && minute <= 29)
        return 8;
    else
        return 0;
}
function isTollFreeDate(date) {
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDay() + 1;
    var dayOfMonth = date.getDate();
    if (day == 6 || day == 0)
        return true;
    if (year == 2013) {
        if ((month == 1 && dayOfMonth == 1) ||
            (month == 3 && (dayOfMonth == 28 || dayOfMonth == 29)) ||
            (month == 4 && (dayOfMonth == 1 || dayOfMonth == 30)) ||
            (month == 5 && (dayOfMonth == 1 || dayOfMonth == 8 || dayOfMonth == 9)) ||
            (month == 6 && (dayOfMonth == 5 || dayOfMonth == 6 || dayOfMonth == 21)) ||
            (month == 7) ||
            (month == 11 && dayOfMonth == 1) ||
            (month == 12 && (dayOfMonth == 24 || dayOfMonth == 25 || dayOfMonth == 26 || dayOfMonth == 31))) {
            return true;
        }
    }
    return false;
}
exports.default = getTax;

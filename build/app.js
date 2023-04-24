"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var app = (0, express_1.default)();
var port = process.env.PORT || 3001;
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.post("/getTax", function (req, res) {
    var data = req.body;
    var caclulator = undefined;
    var vehicleInstance = undefined;
    try {
        var city = data.city;
        caclulator = require("./congestionTaxCalculator_".concat(city));
    }
    catch (error) {
        res.status(500).send('The rules of input city does not exist!');
    }
    try {
        var className = require("./".concat(data.vehicle));
        vehicleInstance = new className.default;
    }
    catch (error) {
        res.status(500).send('The type of vehicle does not exist!');
    }
    //get data of time and convert it into Date type
    var timeData = data.timestamp;
    var timeList = timeData.map(function (timeData) { return new Date(timeData); });
    var tax = caclulator.getTax(vehicleInstance, timeList);
    res.status(200).json(tax);
});
app.listen(port, function () {
    console.log("Server is running at http://localhost:".concat(port));
});

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var car_1 = __importDefault(require("./car"));
var motorbike_1 = __importDefault(require("./motorbike"));
var classMap = {
    Car: car_1.default,
    Motorbike: motorbike_1.default,
};
exports.default = classMap;

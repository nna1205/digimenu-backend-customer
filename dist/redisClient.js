"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ioredis_1 = __importDefault(require("ioredis"));
const redis = new ioredis_1.default({
    port: 19991,
    host: 'redis-19991.c294.ap-northeast-1-2.ec2.redns.redis-cloud.com',
    password: '6s8Exn4VWzvTZCwKmDakCvX5blmVVAst',
});
exports.default = redis;

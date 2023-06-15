"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogWarning = exports.LogInfo = exports.LogError = exports.LogSuccess = void 0;
const LogSuccess = (message) => {
    console.log(`Success: ${message}`);
};
exports.LogSuccess = LogSuccess;
const LogError = (message) => {
    console.error(`Error: ${message}`);
};
exports.LogError = LogError;
const LogInfo = (message) => {
    console.info(`Info: ${message}`);
};
exports.LogInfo = LogInfo;
const LogWarning = (message) => {
    console.warn(`Warning: ${message}`);
};
exports.LogWarning = LogWarning;

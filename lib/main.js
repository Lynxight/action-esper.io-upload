"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core = __importStar(require("@actions/core"));
const axios_1 = __importDefault(require("axios"));
const fs_1 = require("fs");
const form_data_1 = __importDefault(require("form-data"));
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (process.env.DEBUG_ACTION === 'true') {
                core.debug('DEBUG FLAG DETECTED, SHORTCUTTING ACTION.');
                return;
            }
            const enterpriseId = core.getInput('enterpriseId');
            const apiKey = core.getInput('apiKey');
            const endpointName = core.getInput('endpointName');
            const filePath = core.getInput('filePath');
            const url = `https://${endpointName}-api.esper.cloud/api/enterprise/${enterpriseId}/application/upload`;
            core.debug(`Esper.io endpoint ${url}`);
            core.debug(`Preparing to upload @ ${filePath}`);
            const fileStream = (0, fs_1.createReadStream)(filePath);
            const formData = new form_data_1.default();
            formData.append('app_file', fileStream);
            // https://api.esper.io/tag/Application#operation/upload
            const result = yield axios_1.default.post(url, formData, {
                headers: Object.assign(Object.assign({}, formData.getHeaders()), { Authorization: `Bearer ${apiKey}` }),
            });
            core.debug(JSON.stringify(result.data, null, 2));
            core.setOutput('ApplicationId', result.data.application.id);
        }
        catch (err) {
            core.error(err);
            core.setFailed(err.message);
        }
    });
}
run();

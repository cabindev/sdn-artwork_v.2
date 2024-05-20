var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { readdir, writeFile } from 'fs/promises';
import { NextResponse } from 'next/server';
import path from 'path';
import { PrismaClient } from '@prisma/client';
var prisma = new PrismaClient();
export var GET = function (request) { return __awaiter(void 0, void 0, void 0, function () {
    var imageFiles, zipFiles;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, readdir("./public/images")];
            case 1:
                imageFiles = _a.sent();
                return [4 /*yield*/, readdir("./public/zip")];
            case 2:
                zipFiles = _a.sent();
                return [2 /*return*/, NextResponse.json({ msg: "Files retrieved successfully", files: imageFiles, zips: zipFiles })];
        }
    });
}); };
export var POST = function (request) { return __awaiter(void 0, void 0, void 0, function () {
    var formData, image, zip, byteLength, bufferData, timestamp, fileExtension, fileName, pathOfImage, imageUrl, byteLength, bufferData, timestamp, fileExtension, fileName, pathOfZip, zipUrl;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, request.formData()];
            case 1:
                formData = _a.sent();
                image = formData.get("image");
                zip = formData.get("zip");
                if (!image) return [3 /*break*/, 5];
                return [4 /*yield*/, image.arrayBuffer()];
            case 2:
                byteLength = _a.sent();
                bufferData = Buffer.from(byteLength);
                timestamp = new Date().getTime();
                fileExtension = path.extname(image.name);
                fileName = "".concat(timestamp).concat(fileExtension);
                pathOfImage = "./public/images/".concat(fileName);
                imageUrl = "/images/".concat(fileName);
                return [4 /*yield*/, writeFile(pathOfImage, bufferData)];
            case 3:
                _a.sent();
                // บันทึก URL ของไฟล์ลงในฐานข้อมูล
                return [4 /*yield*/, prisma.post.create({
                        data: {
                            title: 'title',
                            content: 'content',
                            categoryId: 1,
                            imageUrl: imageUrl,
                        },
                    })];
            case 4:
                // บันทึก URL ของไฟล์ลงในฐานข้อมูล
                _a.sent();
                _a.label = 5;
            case 5:
                if (!zip) return [3 /*break*/, 9];
                return [4 /*yield*/, zip.arrayBuffer()];
            case 6:
                byteLength = _a.sent();
                bufferData = Buffer.from(byteLength);
                timestamp = new Date().getTime();
                fileExtension = path.extname(zip.name);
                fileName = "".concat(timestamp).concat(fileExtension);
                pathOfZip = "./public/zip/".concat(fileName);
                zipUrl = "/zip/".concat(fileName);
                return [4 /*yield*/, writeFile(pathOfZip, bufferData)];
            case 7:
                _a.sent();
                // บันทึก URL ของไฟล์ลงในฐานข้อมูล
                return [4 /*yield*/, prisma.post.create({
                        data: {
                            title: 'title',
                            content: 'content',
                            categoryId: 1,
                            zipUrl: zipUrl,
                        },
                    })];
            case 8:
                // บันทึก URL ของไฟล์ลงในฐานข้อมูล
                _a.sent();
                _a.label = 9;
            case 9: return [2 /*return*/, NextResponse.json({ msg: "Files uploaded successfully" })];
        }
    });
}); };

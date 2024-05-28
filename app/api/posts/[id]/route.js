var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
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
import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';
import { revalidatePath } from 'next/cache';
var prisma = new PrismaClient();
export function GET(req_1, _a) {
    return __awaiter(this, arguments, void 0, function (req, _b) {
        var _c, _d;
        var params = _b.params;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    _d = (_c = NextResponse).json;
                    return [4 /*yield*/, prisma.post.findUnique({
                            where: { id: Number(params.id) },
                        })];
                case 1: return [2 /*return*/, _d.apply(_c, [_e.sent()])];
            }
        });
    });
}
export function PUT(req_1, _a) {
    return __awaiter(this, arguments, void 0, function (req, _b) {
        var formData, title, content, categoryId, image, zip, imageUrl, zipUrl, byteLength, bufferData, timestamp, fileExtension, fileName, pathOfImage, byteLength, bufferData, timestamp, fileExtension, fileName, pathOfZip, post, error_1;
        var params = _b.params;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0: return [4 /*yield*/, req.formData()];
                case 1:
                    formData = _c.sent();
                    title = formData.get('title');
                    content = formData.get('content');
                    categoryId = formData.get('categoryId');
                    image = formData.get('image');
                    zip = formData.get('zip');
                    if (!image) return [3 /*break*/, 4];
                    return [4 /*yield*/, image.arrayBuffer()];
                case 2:
                    byteLength = _c.sent();
                    bufferData = Buffer.from(byteLength);
                    timestamp = new Date().getTime();
                    fileExtension = path.extname(image.name);
                    fileName = "".concat(timestamp).concat(fileExtension);
                    pathOfImage = "./public/images/".concat(fileName);
                    imageUrl = "/images/".concat(fileName);
                    return [4 /*yield*/, writeFile(pathOfImage, bufferData)];
                case 3:
                    _c.sent();
                    _c.label = 4;
                case 4:
                    if (!zip) return [3 /*break*/, 7];
                    return [4 /*yield*/, zip.arrayBuffer()];
                case 5:
                    byteLength = _c.sent();
                    bufferData = Buffer.from(byteLength);
                    timestamp = new Date().getTime();
                    fileExtension = path.extname(zip.name);
                    fileName = "".concat(timestamp).concat(fileExtension);
                    pathOfZip = "./public/zip/".concat(fileName);
                    zipUrl = "/zip/".concat(fileName);
                    return [4 /*yield*/, writeFile(pathOfZip, bufferData)];
                case 6:
                    _c.sent();
                    _c.label = 7;
                case 7:
                    _c.trys.push([7, 9, , 10]);
                    return [4 /*yield*/, prisma.post.update({
                            where: { id: Number(params.id) },
                            data: __assign(__assign({ title: title, content: content, categoryId: categoryId ? parseInt(categoryId) : undefined }, (imageUrl && { imageUrl: imageUrl })), (zipUrl && { zipUrl: zipUrl })),
                        })];
                case 8:
                    post = _c.sent();
                    // Revalidate the path to ensure the updated post data is immediately visible
                    revalidatePath('/');
                    return [2 /*return*/, NextResponse.json(post)];
                case 9:
                    error_1 = _c.sent();
                    return [2 /*return*/, new Response(error_1, {
                            status: 500,
                        })];
                case 10: return [2 /*return*/];
            }
        });
    });
}
export function DELETE(req_1, _a) {
    return __awaiter(this, arguments, void 0, function (req, _b) {
        var deletedPost, error_2;
        var params = _b.params;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, prisma.post.delete({
                            where: { id: Number(params.id) },
                        })];
                case 1:
                    deletedPost = _c.sent();
                    // Revalidate the path to ensure the post is removed from the UI
                    revalidatePath('/');
                    return [2 /*return*/, NextResponse.json(deletedPost)];
                case 2:
                    error_2 = _c.sent();
                    return [2 /*return*/, new Response(error_2, {
                            status: 500,
                        })];
                case 3: return [2 /*return*/];
            }
        });
    });
}

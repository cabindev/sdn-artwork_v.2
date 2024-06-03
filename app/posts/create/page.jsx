'use client';
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
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import imageCompression from 'browser-image-compression';
var Create = function () {
    var _a = useState(''), title = _a[0], setTitle = _a[1];
    var _b = useState(''), content = _b[0], setContent = _b[1];
    var _c = useState(''), categoryId = _c[0], setCategoryId = _c[1];
    var _d = useState([]), categories = _d[0], setCategories = _d[1];
    var _e = useState(null), image = _e[0], setImage = _e[1];
    var _f = useState(null), imagePreview = _f[0], setImagePreview = _f[1];
    var _g = useState(null), zip = _g[0], setZipFile = _g[1];
    var _h = useState(null), zipPreview = _h[0], setZipPreview = _h[1];
    var router = useRouter();
    var fetchCategories = function () { return __awaiter(void 0, void 0, void 0, function () {
        var response, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, axios.get('/api/categories')];
                case 1:
                    response = _a.sent();
                    setCategories(response.data);
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    console.error('Failed to fetch categories', error_1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    useEffect(function () {
        fetchCategories();
    }, []);
    var handleImageChange = function (e) { return __awaiter(void 0, void 0, void 0, function () {
        var fileInput, file, fileName_1, allowedExtensions, isValidExtension, options, compressedFile, reader_1, error_2;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    fileInput = e.target;
                    file = ((_a = fileInput.files) === null || _a === void 0 ? void 0 : _a[0]) || null;
                    if (!file) return [3 /*break*/, 5];
                    fileName_1 = file.name.toLowerCase();
                    allowedExtensions = ['.jpg', '.jpeg', '.webp', '.svg', '.png'];
                    isValidExtension = allowedExtensions.some(function (ext) { return fileName_1.endsWith(ext); });
                    if (!isValidExtension) {
                        alert("Only files with extensions .jpg, .jpeg, .webp, .svg, .png are allowed");
                        // Clear the selected file
                        fileInput.value = '';
                        return [2 /*return*/];
                    }
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    options = {
                        maxSizeMB: 0.5, // 500 KB
                        maxWidthOrHeight: 1024,
                        useWebWorker: true,
                    };
                    return [4 /*yield*/, imageCompression(file, options)];
                case 2:
                    compressedFile = _b.sent();
                    reader_1 = new FileReader();
                    reader_1.onloadend = function () {
                        setImagePreview(reader_1.result);
                    };
                    reader_1.readAsDataURL(compressedFile);
                    setImage(compressedFile);
                    return [3 /*break*/, 4];
                case 3:
                    error_2 = _b.sent();
                    console.error('Error compressing image', error_2);
                    return [3 /*break*/, 4];
                case 4: return [3 /*break*/, 6];
                case 5:
                    setImage(null);
                    setImagePreview(null);
                    _b.label = 6;
                case 6: return [2 /*return*/];
            }
        });
    }); };
    var handleZipChange = function (e) {
        var _a;
        var file = ((_a = e.target.files) === null || _a === void 0 ? void 0 : _a[0]) || null;
        if (file) {
            if (!file.name.endsWith('.zip')) {
                alert("Only ZIP files are allowed");
                return;
            }
            setZipFile(file);
            setZipPreview(file.name);
        }
        else {
            setZipFile(null);
            setZipPreview(null);
        }
    };
    var handleSubmit = function (e) { return __awaiter(void 0, void 0, void 0, function () {
        var formData, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    e.preventDefault();
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    formData = new FormData();
                    formData.append('title', title);
                    formData.append('content', content);
                    formData.append('categoryId', categoryId);
                    if (image)
                        formData.append('image', image);
                    if (zip)
                        formData.append('zip', zip);
                    return [4 /*yield*/, axios.post('/api/posts', formData, {
                            headers: {
                                'Content-Type': 'multipart/form-data',
                            },
                        })];
                case 2:
                    _a.sent();
                    router.push('./');
                    return [3 /*break*/, 4];
                case 3:
                    error_3 = _a.sent();
                    console.error(error_3);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    return (<div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-6">Create a New Post</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input type="text" name="title" id="title" required value={title} onChange={function (e) { return setTitle(e.target.value); }} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"/>
        </div>
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">
            Category
          </label>
          <select id="category" value={categoryId} onChange={function (e) { return setCategoryId(e.target.value); }} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
            <option value="">Select a category</option>
            {categories.map(function (category) { return (<option key={category.id} value={category.id}>
                {category.name}
              </option>); })}
          </select>
        </div>
        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700">
            Descriptions
          </label>
          <textarea name="content" id="content" required rows={4} value={content} onChange={function (e) { return setContent(e.target.value); }} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"></textarea>
        </div>
        <div>
          <label htmlFor="image" className="block text-sm font-medium text-gray-700">
            Image
          </label>
          <input type="file" name="image" id="image" onChange={handleImageChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" required/>
          {imagePreview && (<div className="mt-4">
              <Image src={imagePreview} alt="Image Preview" width={200} height={200} className="rounded-md"/>
            </div>)}
        </div>
        <div>
          <label htmlFor="zip" className="block text-sm font-medium text-gray-700">
            ZIP
          </label>
          <input type="file" name="zip" id="zip" onChange={handleZipChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" required/>
          {zipPreview && (<div className="mt-4">
              <p>Selected ZIP: {zipPreview}</p>
            </div>)}
        </div>
        <div>
          <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Submit
          </button>
        </div>
      </form>
    </div>);
};
export default Create;

"use client";
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
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
export default function ListPost() {
    var _this = this;
    var _a = useState([]), posts = _a[0], setPosts = _a[1];
    var _b = useState([]), categories = _b[0], setCategories = _b[1];
    var _c = useState(''), search = _c[0], setSearch = _c[1];
    var _d = useState(''), category = _d[0], setCategory = _d[1];
    var _e = useState('desc'), sort = _e[0], setSort = _e[1];
    useEffect(function () {
        fetchCategories();
        fetchPosts();
    }, [category, search, sort]);
    var fetchPosts = function () { return __awaiter(_this, void 0, void 0, function () {
        var query, res, data, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    query = new URLSearchParams({ category: category, search: search, sort: sort }).toString();
                    return [4 /*yield*/, axios.get("/api/posts?".concat(query))];
                case 1:
                    res = _a.sent();
                    data = res.data;
                    if (data && Array.isArray(data.posts)) {
                        setPosts(data.posts);
                    }
                    else {
                        console.error('Invalid posts data:', data);
                        setPosts([]); // ตั้งค่า posts เป็น array ว่างในกรณีที่ข้อมูลไม่ถูกต้อง
                    }
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    console.error('Failed to fetch posts', error_1);
                    setPosts([]); // ตั้งค่า posts เป็น array ว่างในกรณีที่เกิดข้อผิดพลาด
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    var fetchCategories = function () { return __awaiter(_this, void 0, void 0, function () {
        var res, data, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, axios.get('/api/categories')];
                case 1:
                    res = _a.sent();
                    data = res.data;
                    if (data && Array.isArray(data)) {
                        setCategories(data);
                    }
                    else {
                        console.error('Invalid categories data:', data);
                    }
                    return [3 /*break*/, 3];
                case 2:
                    error_2 = _a.sent();
                    console.error('Failed to fetch categories', error_2);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    var handleApplyFilters = function () {
        fetchPosts();
    };
    var deletePost = function (id) { return __awaiter(_this, void 0, void 0, function () {
        var error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, axios.delete("/api/posts/".concat(id))];
                case 1:
                    _a.sent();
                    fetchPosts();
                    return [3 /*break*/, 3];
                case 2:
                    error_3 = _a.sent();
                    console.error('Failed to delete the post', error_3);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    return (<div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-6">Blog Posts</h1>
  
      <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
        <div className="flex flex-wrap gap-4 w-full sm:w-auto">
          <input type="text" placeholder="Search by title..." value={search} onChange={function (e) { return setSearch(e.target.value); }} className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full sm:w-auto"/>
          <select value={category} onChange={function (e) { return setCategory(e.target.value); }} className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full sm:w-auto">
            <option value="">Select Category</option>
            {categories.map(function (cat) { return (<option key={cat.id} value={cat.name}>
                {cat.name}
              </option>); })}
          </select>
          <select value={sort} onChange={function (e) { return setSort(e.target.value); }} className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full sm:w-auto">
            <option value="desc">Latest</option>
            <option value="asc">Oldest</option>
          </select>
          <button onClick={handleApplyFilters} className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors w-full sm:w-auto">
            Apply
          </button>
        </div>
      </div>
  
      <div className="shadow overflow-x-auto border-b border-gray-200 sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Title
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Image
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ZIP
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {posts.map(function (post) {
            var _a;
            return (<tr key={post.id}>
                <td className="px-6 py-4 whitespace-normal">
                  <div className="text-sm font-medium text-gray-900">
                    {post.title}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-normal">
                  <div className="text-sm font-medium text-gray-900">
                    {((_a = post.category) === null || _a === void 0 ? void 0 : _a.name) || 'No Category'}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-normal">
                  {post.imageUrl && (<div className="avatar">
                      <div className="w-8 rounded">
                        <img src={post.imageUrl} alt={"image-".concat(post.id)} className="object-cover"/>
                      </div>
                    </div>)}
                </td>
                <td className="px-6 py-4 whitespace-normal">
                  {post.zipUrl && (<a href={post.zipUrl} download className="text-indigo-600 hover:text-indigo-900">
                      Download ZIP
                    </a>)}
                </td>
                <td className="px-6 py-4 whitespace-normal text-sm font-medium">
                  <Link className="text-indigo-600 hover:text-indigo-900 mr-4" href={"/posts/edit/".concat(post.id)}>
                    Edit
                  </Link>
                  <button onClick={function () { return deletePost(post.id); }} className="text-red-600 hover:text-red-900">
                    Delete
                  </button>
                </td>
              </tr>);
        })}
          </tbody>
        </table>
      </div>
  
      <Link className="mt-4 inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" href="/posts/create">
        Create a New Post
      </Link>
    </div>);
}

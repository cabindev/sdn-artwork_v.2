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
import { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import Head from 'next/head';
import { FacebookShareButton, FacebookIcon } from 'react-share';
var Product = function () {
    var _a, _b, _c, _d, _e;
    var _f = useState([]), posts = _f[0], setPosts = _f[1];
    var _g = useState([]), categories = _g[0], setCategories = _g[1];
    var _h = useState(''), search = _h[0], setSearch = _h[1];
    var _j = useState(''), selectedCategory = _j[0], setSelectedCategory = _j[1];
    var _k = useState(1), currentPage = _k[0], setCurrentPage = _k[1];
    var _l = useState(1), totalPages = _l[0], setTotalPages = _l[1];
    var _m = useState(true), loading = _m[0], setLoading = _m[1];
    var _o = useState(null), selectedPost = _o[0], setSelectedPost = _o[1];
    var siteUrl = 'https://app-info.healthypublicspaces.com';
    useEffect(function () {
        var fetchData = function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        setLoading(true);
                        return [4 /*yield*/, fetchCategories()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, fetchPosts()];
                    case 2:
                        _a.sent();
                        setLoading(false);
                        return [2 /*return*/];
                }
            });
        }); };
        fetchData();
    }, [selectedCategory, search, currentPage]);
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
    var fetchPosts = function () { return __awaiter(void 0, void 0, void 0, function () {
        var query, res, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    query = new URLSearchParams({
                        category: selectedCategory,
                        search: search,
                        page: currentPage.toString(),
                        limit: '10',
                    }).toString();
                    return [4 /*yield*/, axios.get("/api/posts?".concat(query))];
                case 1:
                    res = _a.sent();
                    setPosts(res.data.posts);
                    setTotalPages(res.data.totalPages);
                    return [3 /*break*/, 3];
                case 2:
                    error_2 = _a.sent();
                    console.error('Failed to fetch posts', error_2);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    var handlePageChange = function (newPage) {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };
    var handleShare = function (post) {
        var shareUrl = "https://www.facebook.com/sharer/sharer.php?u=".concat(siteUrl, "/posts/").concat(post.id);
        window.open(shareUrl, '_blank');
    };
    var handleDownload = function (zipUrl, postId) {
        window.open(zipUrl, '_blank');
    };
    var handlePostClick = function (post) {
        setSelectedPost(post);
    };
    useEffect(function () {
        var _a, _b, _c, _d, _e;
        if (selectedPost) {
            document.title = selectedPost.title;
            (_a = document
                .querySelector('meta[name="description"]')) === null || _a === void 0 ? void 0 : _a.setAttribute('content', selectedPost.title);
            (_b = document
                .querySelector('meta[property="og:title"]')) === null || _b === void 0 ? void 0 : _b.setAttribute('content', selectedPost.title);
            (_c = document
                .querySelector('meta[property="og:description"]')) === null || _c === void 0 ? void 0 : _c.setAttribute('content', selectedPost.title);
            (_d = document
                .querySelector('meta[property="og:image"]')) === null || _d === void 0 ? void 0 : _d.setAttribute('content', "".concat(siteUrl).concat(selectedPost.imageUrl));
            (_e = document
                .querySelector('meta[property="og:url"]')) === null || _e === void 0 ? void 0 : _e.setAttribute('content', "".concat(siteUrl, "/posts/").concat(selectedPost.id));
        }
    }, [selectedPost]);
    if (loading) {
        return <div>Loading...</div>;
    }
    return (<div>
      <Head>
        <meta name="description" content={(_a = posts[0]) === null || _a === void 0 ? void 0 : _a.title}/>
        <meta property="og:title" content={(_b = posts[0]) === null || _b === void 0 ? void 0 : _b.title}/>
        <meta property="og:description" content={(_c = posts[0]) === null || _c === void 0 ? void 0 : _c.title}/>
        <meta property="og:image" content={"".concat(siteUrl).concat((_d = posts[0]) === null || _d === void 0 ? void 0 : _d.imageUrl)}/>
        <meta property="og:url" content={"".concat(siteUrl, "/posts/").concat((_e = posts[0]) === null || _e === void 0 ? void 0 : _e.id)}/>
        <meta property="og:type" content="article"/>
      </Head>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <input type="text" placeholder="Search images..." value={search} onChange={function (e) { return setSearch(e.target.value); }} className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"/>
        </div>

        <div className="flex space-x-4 overflow-x-auto mb-6">
          {categories.map(function (category) { return (<button key={category.id} onClick={function () { return setSelectedCategory(category.name); }} className={"px-2 py-1 text-sm rounded-md ".concat(selectedCategory === category.name
                ? "bg-indigo-600 text-white"
                : "bg-gray-200")}>
              {category.name}
            </button>); })}
        </div>

        <div className="masonry-grid">
          {posts.map(function (post) { return (<div key={post.id} className="masonry-item relative" onClick={function () { return handlePostClick(post); }}>
              <Image src={"".concat(siteUrl).concat(post.imageUrl)} width={500} height={500} alt={post.title} className="object-cover w-full h-full rounded-md"/>
              <FacebookShareButton url={"".concat(siteUrl, "/posts/").concat(post.id)} title={post.title} hashtag="#สุขภาพดี" className="absolute top-2 right-2">
                <FacebookIcon size={32} round/>
              </FacebookShareButton>
              <button onClick={function () { return handleDownload(post.zipUrl, post.id); }} className="absolute bottom-2 right-2 bg-green-500 text-white rounded-md px-2 py-1 text-sm">
                ดาวน์โหลดฟรี
              </button>
            </div>); })}
        </div>

        <div className="flex justify-center mt-8">
          <button onClick={function () { return handlePageChange(currentPage - 1); }} disabled={currentPage === 1} className="px-4 py-2 mx-2 rounded-md bg-gray-200 disabled:opacity-50">
            Previous
          </button>
          <span className="px-4 py-2">
            Page {currentPage} of {totalPages}
          </span>
          <button onClick={function () { return handlePageChange(currentPage + 1); }} disabled={currentPage === totalPages} className="px-4 py-2 mx-2 rounded-md bg-gray-200 disabled:opacity-50">
            Next
          </button>
        </div>
      </div>
    </div>);
};
export default Product;

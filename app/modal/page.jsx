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
import { FacebookShareButton, FacebookIcon } from 'react-share';
import Image from 'next/image';
import Head from 'next/head';
var PopupModal = function () {
    var _a = useState([]), posts = _a[0], setPosts = _a[1];
    var _b = useState([]), categories = _b[0], setCategories = _b[1];
    var _c = useState(''), search = _c[0], setSearch = _c[1];
    var _d = useState(''), selectedCategory = _d[0], setSelectedCategory = _d[1];
    var _e = useState(null), selectedPost = _e[0], setSelectedPost = _e[1];
    var _f = useState(false), modalIsOpen = _f[0], setModalIsOpen = _f[1];
    var _g = useState(1), currentPage = _g[0], setCurrentPage = _g[1];
    var _h = useState(1), totalPages = _h[0], setTotalPages = _h[1];
    var _j = useState(''), copySuccess = _j[0], setCopySuccess = _j[1];
    var siteUrl = 'https://app-info.healthypublicspaces.com';
    useEffect(function () {
        fetchCategories();
        fetchPosts();
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
    var openModal = function (post) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setSelectedPost(post);
                    setModalIsOpen(true);
                    return [4 /*yield*/, axios.patch('/api/posts', { id: post.id, type: 'view' })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); };
    var closeModal = function () {
        setModalIsOpen(false);
        setSelectedPost(null);
    };
    var nextPost = function (e) {
        e.stopPropagation();
        if (selectedPost) {
            var currentIndex = posts.findIndex(function (post) { return post.id === selectedPost.id; });
            var nextIndex = (currentIndex + 1) % posts.length;
            setSelectedPost(posts[nextIndex]);
        }
    };
    var prevPost = function (e) {
        e.stopPropagation();
        if (selectedPost) {
            var currentIndex = posts.findIndex(function (post) { return post.id === selectedPost.id; });
            var prevIndex = (currentIndex - 1 + posts.length) % posts.length;
            setSelectedPost(posts[prevIndex]);
        }
    };
    var handlePageChange = function (newPage) {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };
    var handleDownload = function (zipUrl, postId) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, axios.patch('/api/posts', { id: postId, type: 'download' })];
                case 1:
                    _a.sent();
                    window.location.href = zipUrl;
                    return [2 /*return*/];
            }
        });
    }); };
    var handleCopy = function () { return __awaiter(void 0, void 0, void 0, function () {
        var err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, navigator.clipboard.writeText("".concat(siteUrl, "/posts/").concat(selectedPost === null || selectedPost === void 0 ? void 0 : selectedPost.id))];
                case 1:
                    _a.sent();
                    setCopySuccess('Link copied!');
                    setTimeout(function () {
                        setCopySuccess('');
                    }, 2000);
                    return [3 /*break*/, 3];
                case 2:
                    err_1 = _a.sent();
                    setCopySuccess('Failed to copy link');
                    setTimeout(function () {
                        setCopySuccess('');
                    }, 2000);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    return (<div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <input type="text" placeholder="Search images..." value={search} onChange={function (e) { return setSearch(e.target.value); }} className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"/>
      </div>

      <div className="flex space-x-4 overflow-x-auto mb-6">
        {categories.map(function (category) { return (<button key={category.id} onClick={function () { return setSelectedCategory(category.name); }} className={"px-4 py-2 rounded-md ".concat(selectedCategory === category.name
                ? "bg-indigo-600 text-white"
                : "bg-gray-200")}>
            {category.name}
          </button>); })}
      </div>

      <div className="masonry-grid">
        {posts.map(function (post) { return (<div key={post.id} className="masonry-item relative" onClick={function () { return openModal(post); }}>
            <Image src={post.imageUrl} width={500} height={500} alt={post.title} className="object-cover w-full h-full rounded-md"/>
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

      {modalIsOpen && selectedPost && (<>
          <Head>
            <title>{selectedPost.title}</title>
            <meta property="og:title" content={selectedPost.title}/>
            <meta property="og:description" content="Description of your post"/>
            <meta property="og:image" content={selectedPost.imageUrl}/>
            <meta property="og:url" content={"".concat(siteUrl, "/posts/").concat(selectedPost.id)}/>
            <meta property="og:type" content="article"/>
          </Head>

          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50" onClick={closeModal}>
            <button onClick={prevPost} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-4xl z-50" style={{ padding: "1rem" }}>
              &#8249;
            </button>
            <div className="relative bg-white/90 p-4 rounded-lg w-full max-w-5xl mx-auto flex flex-col items-center" onClick={function (e) { return e.stopPropagation(); }}>
              <button onClick={closeModal} className="absolute top-0 right-0 mt-2 mr-2 text-gray-500 text-4xl" style={{ padding: "1rem" }}>
                &times;
              </button>
              <div className="flex justify-between items-center mb-4 w-full">
                <h2 className="text-2xl font-semibold text-center w-full">
                  {selectedPost.title}
                </h2>
              </div>
              <div className="aspect-w-1 aspect-h-1 mb-4 flex items-center justify-center w-full">
                <Image src={selectedPost.imageUrl} alt={selectedPost.title} width={500} height={500} className="object-contain w-full h-full max-h-96"/>
              </div>
              <div className="text-right w-full flex justify-between items-center">
                <span className="text-gray-700">
                  Views: {selectedPost.views}
                </span>
                <span className="text-gray-700">
                  Downloads: {selectedPost.downloads}
                </span>
                <a href="#" onClick={function () {
                return handleDownload(selectedPost.zipUrl, selectedPost.id);
            }} className="px-4 py-2 bg-indigo-600 text-white rounded-md">
                  Download free
                </a>
              </div>
              <div className="flex space-x-2 mt-4">
                <FacebookShareButton url={"".concat(siteUrl, "/posts/").concat(selectedPost.id)} title={selectedPost.title}>
                  <FacebookIcon size={32} round/>
                </FacebookShareButton>

                <button onClick={handleCopy} className="px-4 py-2 bg-blue-600 text-white rounded-md">
                  Copy Link
                </button>
              </div>
              {copySuccess && (<div className="mt-2 text-green-600">{copySuccess}</div>)}
            </div>
            <button onClick={nextPost} className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-4xl z-50" style={{ padding: "1rem" }}>
              &#8250;
            </button>
          </div>
        </>)}
    </div>);
};
export default PopupModal;

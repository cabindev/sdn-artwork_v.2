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
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Head from 'next/head';
import { FacebookShareButton, TwitterShareButton, FacebookIcon, TwitterIcon } from 'next-share';
var PostDetail = function (_a) {
    var _b;
    var params = _a.params;
    var _c = useState(null), post = _c[0], setPost = _c[1];
    var id = params.id;
    var siteUrl = 'https://app-info.healthypublicspaces.com';
    useEffect(function () {
        var fetchPost = function () { return __awaiter(void 0, void 0, void 0, function () {
            var res, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios.get("/api/posts/".concat(id))];
                    case 1:
                        res = _a.sent();
                        setPost(res.data);
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        console.error('Failed to fetch post', error_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        if (id) {
            fetchPost();
        }
    }, [id]);
    if (!post) {
        return <div>Loading...</div>;
    }
    return (<div className="max-w-4xl mx-auto px-4 py-8">
      <Head>
        <title>{post.title}</title>
        <meta property="og:title" content={post.title}/>
        <meta property="og:description" content={"Check out this post about ".concat(post.title)}/>
        <meta property="og:image" content={post.imageUrl}/>
        <meta property="og:url" content={"".concat(siteUrl, "/posts/").concat(post.id)}/>
        <meta property="og:type" content="article"/>
        <meta name="twitter:card" content="summary_large_image"/>
        <meta name="twitter:title" content={post.title}/>
        <meta name="twitter:description" content={"Check out this post about ".concat(post.title)}/>
        <meta name="twitter:image" content={post.imageUrl}/>
      </Head>
      <h1 className="text-2xl font-semibold mb-6">{post.title}</h1>
      <div className="mb-4">
        {post.imageUrl && (<img src={post.imageUrl} alt="Post Image" className="w-full h-auto rounded-md"/>)}
      </div>
      <div className="mb-4">
        <span className="block text-sm font-medium text-gray-700">Category:</span>
        <span className="block text-lg">{((_b = post.category) === null || _b === void 0 ? void 0 : _b.name) || 'No Category'}</span>
      </div>
      <div className="flex space-x-2 mt-4">
        <FacebookShareButton url={"".concat(siteUrl, "/posts/").concat(post.id)} quote={post.title}>
          <FacebookIcon size={32} round/>
        </FacebookShareButton>
        <TwitterShareButton url={"".concat(siteUrl, "/posts/").concat(post.id)} title={post.title}>
          <TwitterIcon size={32} round/>
        </TwitterShareButton>
      </div>
    </div>);
};
export default PostDetail;

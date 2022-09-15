/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/server/api.ts":
/*!***************************!*\
  !*** ./src/server/api.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const express_1 = __webpack_require__(/*! express */ "express");
const router = (0, express_1.Router)();
router.get("/book/:id", (req, res) => {
    const id = req.params.id;
    res.send(`id: ${id}`);
});
exports["default"] = router;


/***/ }),

/***/ "./src/server/app.ts":
/*!***************************!*\
  !*** ./src/server/app.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
const express_1 = tslib_1.__importStar(__webpack_require__(/*! express */ "express"));
const path_1 = __webpack_require__(/*! path */ "path");
const router = (0, express_1.Router)();
const browserPath = (0, path_1.resolve)("./browser");
const getPage = (name) => {
    const targetPath = (0, path_1.join)(browserPath, `${name}.html`);
    return targetPath;
};
router.use("/assets", express_1.default.static((0, path_1.join)(browserPath, "assets")));
router.get("/", (_, res) => {
    const targetPath = getPage("home");
    res.sendFile(targetPath);
});
router.get("/book", (_, res) => {
    const targetPath = getPage("book");
    res.sendFile(targetPath);
});
exports["default"] = router;


/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("express");

/***/ }),

/***/ "tslib":
/*!************************!*\
  !*** external "tslib" ***!
  \************************/
/***/ ((module) => {

module.exports = require("tslib");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("path");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;
/*!*****************************!*\
  !*** ./src/server/index.ts ***!
  \*****************************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
const express_1 = tslib_1.__importDefault(__webpack_require__(/*! express */ "express"));
const app_1 = tslib_1.__importDefault(__webpack_require__(/*! ./app */ "./src/server/app.ts"));
const api_1 = tslib_1.__importDefault(__webpack_require__(/*! ./api */ "./src/server/api.ts"));
const port = 3000;
const server = (0, express_1.default)();
server.use("/", app_1.default);
server.use("/api", api_1.default);
server.listen(port, () => {
    console.log(`http://localhost:${port}`);
});

})();

module.exports = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=index.js.map
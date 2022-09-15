"use strict";
(() => {
var exports = {};
exports.id = 298;
exports.ids = [298];
exports.modules = {

/***/ 9297:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "petApi": () => (/* binding */ petApi)
});

;// CONCATENATED MODULE: external "axios"
const external_axios_namespaceObject = require("axios");
var external_axios_default = /*#__PURE__*/__webpack_require__.n(external_axios_namespaceObject);
;// CONCATENATED MODULE: ./pages/api/pet.api.js

var axios = external_axios_default().create({
    withCredentials: true,
    // baseURL: 'http://127.0.0.1:3030/api/pet',
    baseURL:  true ? "/api/pet" : 0
});
const getPets = ()=>axios.get("/").then((res)=>res.data);
const getPet = (petId)=>axios.get(`/${petId}`).then((res)=>res.data);
const updatePet = (pet)=>axios.put(`/${pet._id}`, pet).then((res)=>res.data);
const addPet = (pet)=>axios.post("/", pet).then((res)=>res.data);
const removePet = (petId)=>{
    return axios.delete(`/${petId}`).then((res)=>res.data);
};
const petApi = {
    getPets,
    getPet,
    updatePet,
    addPet,
    removePet
};


/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__(9297));
module.exports = __webpack_exports__;

})();
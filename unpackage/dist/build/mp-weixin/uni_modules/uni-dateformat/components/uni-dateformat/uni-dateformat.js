(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["uni_modules/uni-dateformat/components/uni-dateformat/uni-dateformat"],{3488:function(e,t,r){"use strict";r.r(t);var n=r("eca5"),a=r.n(n);for(var u in n)["default"].indexOf(u)<0&&function(e){r.d(t,e,(function(){return n[e]}))}(u);t["default"]=a.a},"5d0e":function(e,t,r){"use strict";r.d(t,"b",(function(){return n})),r.d(t,"c",(function(){return a})),r.d(t,"a",(function(){}));var n=function(){var e=this.$createElement;this._self._c},a=[]},e37e:function(e,t,r){"use strict";r.r(t);var n=r("5d0e"),a=r("3488");for(var u in a)["default"].indexOf(u)<0&&function(e){r.d(t,e,(function(){return a[e]}))}(u);var f=r("f0c5"),i=Object(f["a"])(a["default"],n["b"],n["c"],!1,null,null,null,!1,n["a"],void 0);t["default"]=i.exports},eca5:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=r("17b4"),a={name:"uniDateformat",props:{date:{type:[Object,String,Number],default:function(){return"-"}},locale:{type:String,default:"zh"},threshold:{type:Array,default:function(){return[0,0]}},format:{type:String,default:"yyyy/MM/dd hh:mm:ss"},refreshRate:{type:[Number,String],default:0}},data:function(){return{refreshMark:0}},computed:{dateShow:function(){return this.refreshMark,(0,n.friendlyDate)(this.date,{locale:this.locale,threshold:this.threshold,format:this.format})}},watch:{refreshRate:{handler:function(){this.setAutoRefresh()},immediate:!0}},methods:{refresh:function(){this.refreshMark++},setAutoRefresh:function(){var e=this;clearInterval(this.refreshInterval),this.refreshRate&&(this.refreshInterval=setInterval((function(){e.refresh()}),parseInt(this.refreshRate)))}}};t.default=a}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'uni_modules/uni-dateformat/components/uni-dateformat/uni-dateformat-create-component',
    {
        'uni_modules/uni-dateformat/components/uni-dateformat/uni-dateformat-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("e37e"))
        })
    },
    [['uni_modules/uni-dateformat/components/uni-dateformat/uni-dateformat-create-component']]
]);

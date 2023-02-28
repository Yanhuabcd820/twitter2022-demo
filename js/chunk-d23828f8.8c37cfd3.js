(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-d23828f8"],{"099a":function(e,t,a){"use strict";a("1127")},1127:function(e,t,a){},"879c":function(e,t,a){"use strict";a.r(t);var r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"container"},[a("form",{on:{submit:function(t){return t.stopPropagation(),t.preventDefault(),e.handleSubmit.apply(null,arguments)}}},[e._m(0),e._m(1),a("div",{staticClass:"form-label-group"},[a("label",{attrs:{for:"account"}},[e._v("帳號")]),a("input",{directives:[{name:"model",rawName:"v-model",value:e.user.account,expression:"user.account"}],attrs:{id:"account",name:"account",type:"text",placeholder:"請輸入帳號",required:"",autofocus:""},domProps:{value:e.user.account},on:{input:function(t){t.target.composing||e.$set(e.user,"account",t.target.value)}}}),a("div",{staticClass:"input-bottomline"})]),a("div",{staticClass:"form-label-group"},[a("label",{attrs:{for:"name"}},[e._v("名稱")]),a("input",{directives:[{name:"model",rawName:"v-model",value:e.user.name,expression:"user.name"}],attrs:{id:"name",name:"name",type:"text",placeholder:"請輸入使用者名稱",required:"",autofocus:""},domProps:{value:e.user.name},on:{input:function(t){t.target.composing||e.$set(e.user,"name",t.target.value)}}}),a("div",{staticClass:"input-bottomline"})]),a("div",{staticClass:"form-label-group"},[a("label",{attrs:{for:"email"}},[e._v("Email")]),a("input",{directives:[{name:"model",rawName:"v-model",value:e.user.email,expression:"user.email"}],attrs:{id:"email",name:"email",type:"email",placeholder:"請輸入Email",required:"",autofocus:""},domProps:{value:e.user.email},on:{input:function(t){t.target.composing||e.$set(e.user,"email",t.target.value)}}}),a("div",{staticClass:"input-bottomline"})]),a("div",{staticClass:"form-label-group"},[a("label",{attrs:{for:"password"}},[e._v("密碼")]),a("input",{directives:[{name:"model",rawName:"v-model",value:e.user.password,expression:"user.password"}],attrs:{id:"password",name:"password",type:"password",placeholder:"請設定密碼",required:"",autofocus:""},domProps:{value:e.user.password},on:{input:function(t){t.target.composing||e.$set(e.user,"password",t.target.value)}}}),a("div",{staticClass:"input-bottomline"})]),a("div",{staticClass:"form-label-group"},[a("label",{attrs:{for:"checkPassword"}},[e._v("密碼確認")]),a("input",{directives:[{name:"model",rawName:"v-model",value:e.user.checkPassword,expression:"user.checkPassword"}],attrs:{id:"checkPassword",name:"checkPassword",type:"password",placeholder:"請再次輸入密碼",required:"",autofocus:""},domProps:{value:e.user.checkPassword},on:{input:function(t){t.target.composing||e.$set(e.user,"checkPassword",t.target.value)}}}),a("div",{staticClass:"input-bottomline"})]),e._m(2),a("nav",[a("router-link",{attrs:{to:"/login"}},[e._v("取消")])],1)])])},s=[function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"logo"},[r("img",{attrs:{src:a("e5ce"),alt:""}})])},function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"title"},[a("h3",[e._v("建立你的稱號")])])},function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("button",{staticClass:"confirm-btn",attrs:{type:"submit"}},[a("p",[e._v("註冊")])])}],n=a("1da1"),o=(a("96cf"),a("b0c0"),a("7696")),i=a("2fa3"),u={data:function(){return{user:{account:"",name:"",email:"",password:"",checkPassword:""},isProcessing:!1}},methods:{handleSubmit:function(){var e=this;return Object(n["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(t.prev=0,"root"!==e.user.account){t.next=5;break}return console.log("you are admin"),i["a"].fire({icon:"warning",title:"管理者帳號"}),t.abrupt("return");case 5:if(!(e.user.name.length>50)){t.next=8;break}return i["a"].fire({icon:"warning",title:"名字需於50字內"}),t.abrupt("return");case 8:if(e.user.password===e.user.checkPassword){t.next=11;break}return i["a"].fire({icon:"warning",title:"兩次輸入的密碼必須相同"}),t.abrupt("return");case 11:return e.isProcessing=!0,t.next=14,o["a"].signUp({account:e.user.account,password:e.user.password,checkPassword:e.user.checkPassword,name:e.user.name,email:e.user.email});case 14:i["a"].fire({icon:"success",title:"註冊成功"}),e.$router.push("/login"),t.next=28;break;case 18:if(t.prev=18,t.t0=t["catch"](0),e.isProcessing=!1,"Error: Account has already been taken."!==t.t0.response.data.message){t.next=24;break}return i["a"].fire({icon:"error",title:"帳號已有人用過"}),t.abrupt("return");case 24:if("Error: Email has already been taken."!==t.t0.response.data.message){t.next=27;break}return i["a"].fire({icon:"error",title:"Email已有人用過"}),t.abrupt("return");case 27:i["a"].fire({icon:"error",title:"註冊失敗"});case 28:case"end":return t.stop()}}),t,null,[[0,18]])})))()}}},c=u,l=(a("b472"),a("099a"),a("2877")),m=Object(l["a"])(c,r,s,!1,null,"077edc6e",null);t["default"]=m.exports},b472:function(e,t,a){"use strict";a("fae8")},fae8:function(e,t,a){}}]);
//# sourceMappingURL=chunk-d23828f8.8c37cfd3.js.map
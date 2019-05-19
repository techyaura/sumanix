(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-1f174fa6"],{"246a":function(t,e,s){"use strict";s.r(e);var i=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[s("div",{staticClass:"col-md-9"},[s("AppAskQuestion")],1)])},n=[],a=s("e4f9"),o=s("1b62"),u={name:"AskQuestion",components:{AppAskQuestion:a["a"]},mixins:[o["a"]],created:function(){document.title=this.title("Ask a Question")}},c=u,r=s("2877"),l=Object(r["a"])(c,i,n,!1,null,null,null);e["default"]=l.exports},"53f2":function(t,e,s){},"8cae":function(t,e,s){"use strict";var i=s("53f2"),n=s.n(i);n.a},e4f9:function(t,e,s){"use strict";var i=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"page-content ask-question t-askquestion"},[t._m(0),s("p"),s("div",{staticClass:"form-style form-style-3",attrs:{id:"question-submit"}},[s("form",{on:{submit:function(e){return e.preventDefault(),t.handleSubmit(e)}}},[t.err?s("Notifiation",{attrs:{err:t.err}}):t._e(),s("div",{staticClass:"form-inputs clearfix"},[s("div",{staticClass:"auto"},[s("div",{staticClass:"autocomplete-custom"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.question.name,expression:"question.name"}],ref:"myInput",staticClass:"question-full-width no-background",attrs:{type:"text",id:"myInput",autocomplete:"off",placeholder:"Ask Question",maxlength:"150"},domProps:{value:t.question.name},on:{keyup:t.suggestions,input:function(e){e.target.composing||t.$set(t.question,"name",e.target.value)}}})]),s("br"),t._m(1)]),s("br")]),s("div",{attrs:{id:"form-textarea"}},[s("p",[s("vue-editor",{attrs:{editorToolbar:t.customToolbar},model:{value:t.content,callback:function(e){t.content=e},expression:"content"}}),s("span",{staticClass:"form-description label-description"},[t._v("Type the description thoroughly in detail (Optional) .")])],1)]),s("p",[s("vue-tags-input",{staticClass:"tags-input",attrs:{tags:t.tags,"autocomplete-items":t.autocompleteItems,"add-only-from-autocomplete":!0},on:{"tags-changed":t.update},model:{value:t.tag,callback:function(e){t.tag=e},expression:"tag"}}),t._m(2)],1),t.isUpdate?t._e():s("p",{staticClass:"form-submit"},[s("input",{staticClass:"button color small submit",attrs:{disabled:t.isSubmit,type:"submit",id:"publish-question"},domProps:{value:t.isSubmit?"Publishing ...":"Publish Your Question"}})]),t.isUpdate?s("p",{staticClass:"form-submit"},[s("input",{staticClass:"button color small submit",attrs:{disabled:t.isSubmit,type:"submit",id:"publish-question"},domProps:{value:t.isSubmit?"Updating ...":"Update Your Article"}})]):t._e()],1)])])},n=[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"boxedtitle page-title"},[s("h2",[t._v("Write an Article")])])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("span",{staticClass:"form-description label-description"},[s("span",{staticClass:"label-required"},[t._v("*")]),t._v("\n            choose an appropriate title for the question to answer it even easier .\n          ")])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("span",{staticClass:"form-description label-description"},[s("span",{staticClass:"label-required"},[t._v("*")]),t._v("Please choose suitable Keywords Ex :\n          "),s("span",{staticClass:"color"},[t._v("angular , react, docker")]),t._v(" .\n        ")])}],a=(s("7f7f"),s("c7a0")),o=s.n(a),u=s("b3e9"),c=s("fd88"),r=s("1b62"),l=s("0f7d"),m={name:"AppAskQuestion",components:{VueTagsInput:o.a,VueEditor:u["VueEditor"],Notifiation:l["a"]},mixins:[r["d"],r["c"]],props:["questionData"],data:function(){return{err:"",isUpdate:!!this.questionData,isSubmit:!1,content:"",customToolbar:[["bold","italic","underline"],[{header:1},{header:2}],[{list:"ordered"},{list:"bullet"}],[{script:"sub"},{script:"super"}],[{indent:"-1"},{indent:"+1"}],["image","code-block"]],suggestionsQuestions:[],tag:"",tags:[],autocompleteItems:[],debounce:null,question:{name:"",description:"",isAnonymous:!1}}},watch:{tag:"initItems"},methods:{scrollToTop:function(){window.scrollTo(0,0)},update:function(t){this.autocompleteItems=[],this.tags=t},initItems:function(){var t=this;if(!(this.tag.length<2)){var e="".concat(this.$BASE_URL,"api/v1/tag?q=").concat(this.tag);clearTimeout(this.debounce),this.debounce=setTimeout(function(){t.$http.get(e).then(function(e){t.autocompleteItems=e.data.data.map(function(t){return{text:t.tag,_id:t._id}})})},600)}},suggestions:function(t){var e=this;if(t.target.value.length||this.closeAllLists(),!(t.target.value.length<2)){var s=t.target.value,i="".concat(this.$BASE_URL,"api/v1/question/suggestions?q=").concat(s);this.questionData&&(i="".concat(this.$BASE_URL,"api/v1/question/suggestions?q=").concat(s,"&qId=").concat(this.questionData._id)),clearTimeout(this.debounce),this.debounce=setTimeout(function(){e.$http.get(i).then(function(t){e.suggestionsQuestions=t.data.data.map(function(t){return{name:t.name,slug:t.slug}}),e.autocomplete(e.suggestionsQuestions)})},600)}},handleSubmit:function(){var t=this,e=this.tags.map(function(t){return{name:t.text,_id:t._id}}),s={tags:e,name:this.question.name,description:this.content,isAnonymous:this.question.isAnonymous};this.err="",this.isSubmit=!0,this.questionData?this.$http.put("".concat(this.$BASE_URL,"api/v1/question/").concat(this.questionData._id),s,{errorHandle:!1}).then(function(e){var s=e.data.message;t.isSubmit=!1,t.reRenderSidebar(),t.$router.push("/@".concat(t.session.user.username,"/question")),c["a"].success(s)}).catch(function(e){t.isSubmit=!1,t.err=e,t.scrollToTop()}):this.$http.post("".concat(this.$BASE_URL,"api/v1/question"),s,{errorHandle:!1}).then(function(e){var s=e.data.message;t.isSubmit=!1,t.reRenderSidebar(),t.$router.push("/"),c["a"].success(s)}).catch(function(e){t.isSubmit=!1,t.err=e,t.scrollToTop()})},autocomplete:function(t){this.closeAllLists();var e=this.$refs.myInput,s=document.createElement("DIV");s.setAttribute("id","".concat(e.id,"autocomplete-custom-list")),s.setAttribute("class","autocomplete-custom-items"),e.parentNode.appendChild(s);for(var i=0;i<t.length;i+=1){var n=t[i],a=n.name,o=n.slug,u=document.createElement("DIV");u.innerHTML='<a href="/question/'.concat(o,'">').concat(a,"</a>"),s.appendChild(u)}},closeAllLists:function(){for(var t=document.getElementsByClassName("autocomplete-custom-items"),e=0;e<t.length;e+=1)t[e].parentNode.removeChild(t[e])}},created:function(){this.question.name=this.questionData?this.questionData.name:"",this.content=this.questionData?this.questionData.description:"",this.question.isAnonymous=this.questionData?this.questionData.isAnonymous:this.question.isAnonymous,this.questionData&&this.questionData.tags&&this.questionData.tags.length&&(this.tags=this.questionData.tags.map(function(t){return{text:t.name,_id:t._id}}))}},d=m,p=(s("8cae"),s("2877")),h=Object(p["a"])(d,i,n,!1,null,null,null);e["a"]=h.exports}}]);
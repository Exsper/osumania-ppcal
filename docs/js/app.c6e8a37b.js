(function(){var t={8531:function(t){const e=[0,1,3e4,13e4,34e4,7e5,125e4,203e4,308e4,444e4,615e4,825e4,1078e4,1378e4,1729e4,2135e4,26e6,3128e4,3723e4,4389e4,513e5,595e5,6853e4,7843e4,8924e4,101e6,11375e4,12753e4,14238e4,15834e4,17545e4,19375e4,21328e4,23408e4,25619e4,27965e4,3045e5,33078e4,35853e4,38779e4,4186e5,451e6,48503e4,52073e4,55814e4,5973e5,63825e4,68103e4,72568e4,77224e4,82075e4,87125e4,92378e4,97838e4,103509e4,109395e4,1155e6,121828e4,128383e4,135169e4,1421900001,1494500002,1569530004,1647030007,1727040013,1809600023,1894750042,1982530076,2072980137,2166140247,2262050446,2360750803,2462281446,2566682602,2673994685,2784258433,2897515179,3013807323,3133179183,3255678529,3381359352,3510286835,3642546303,3778259346,3917612823,4060911082,4208669948,4361785906,4521840632,4691649138,4876246449,5084663609,5333124496,5650800093,6090166168,6745647103,7787174785,9520594613,12496396305,17705429349,26931190827,126931190826,226931190825,326931190824,426931190823,526931190822,626931190821,726931190820,826931190819,926931190818,0xef19de6c21,1126931190816,1226931190815,1326931190814,1426931190813,1526931190812,1626931190811,1726931190810,1826931190809,1926931190808,2026931190807,2126931190806,2226931190805,2326931190804,2426931190803,2526931190802,2626931190801,2726931190800,2826931190799,2926931190798,3026931190797,3126931190796,3226931190795,3326931190794,3426931190793,3526931190792,3626931190791,3726931190790,3826931190789,3926931190788,4026931190787,4126931190786,4226931190785,4326931190784,4426931190783,4526931190782,4626931190781,4726931190780,4826931190779,4926931190778,5026931190777];function a(t){var e=parseInt(t).toString(),a=e.length;if(a<=3)return e;var n=a%3;return n>0?e.slice(0,n)+","+e.slice(n,a).match(/\d{3}/g).join(","):e.slice(n,a).match(/\d{3}/g).join(",")}function n(t){let e=0;return e=t<100?5e3/3*(4*Math.pow(t,3)-3*Math.pow(t,2)-t)+1.25*Math.pow(1.8,t-60):26931190827+99999999999*(t-100),parseInt(e)}function l(t){for(let a=1;a<e.length-1;a++)if(t<e[a])return{level:a-1,nextLevelExp:e[a]};for(let a=e.length-1;a<1e4;a++){let e=n(a);if(t<e)return{level:a-1,nextLevelExp:e}}throw"这是你编造的总分，对不对？"}function o(t,e,o){let s=l(t),i=s.level,r=o?n(o):s.nextLevelExp,c=o?"第 "+o+" 级":"下一级",u=r-t;if(u<=0)throw"您当前的等级（ "+i+" ）已经达到目标等级了！";let p=Math.ceil(u/e);return"您当前的等级为 "+i+" 级，距"+c+"还需要 "+a(u)+" 点经验。\n按每PC得分 "+a(e)+" 计算，您大约还需要打 "+a(p)+" 次。"}t.exports=o},1021:function(t){class e{constructor(t){this.sr=t.sr,this.objCount=t.objCount,this.acc=t.acc||-1,this.numGeki=t.numGeki||-1,this.isEZ=t.isEZ,this.isNF=t.isNF,this.cacc=this.acc2customAccuracy(),this.difficultyValue=this.computeDifficultyValue(),this.totalValue=this.computeTotalValue()}computeDifficultyValue(){let t=Math.pow(Math.max(this.sr-.15,.05),2.2)*Math.max(0,5*this.cacc-4)*(1+.1*Math.min(1,this.objCount/1500));return t}acc2customAccuracy(){if(this.objCount<=0)return 0;let t=this.acc*this.objCount*300,e=t+20*this.numGeki;return e/320/this.objCount}computeTotalValue(){let t=8;return this.isNF&&(t*=.75),this.isEZ&&(t*=.5),this.difficultyValue*t}}class a{constructor(t){this.data=t,this.ssmode=1==t.acc}getX(){let t=50,e=[],a=(1-this.data.acc)/t,n=parseInt((this.data.objCount-this.data.numGeki)/t),l=this.data.acc,o=this.data.numGeki;if(a<=0){if(this.ssmode=!0,n<=0)return[[l,o],[1,this.data.objCount]];for(let a=0;a<t;a++)e.push([l,o]),o+=n;return e.push([1,this.data.objCount]),e}for(let s=0;s<t;s++)e.push([l,o]),l+=a;return e.push([1,o]),e}getTrace(){let t=this.getX(),a=[],n=[];return this.ssmode?(t.map((t=>{let l=this.data;l.acc=t[0],l.numGeki=t[1],a.push(t[1]),n.push(new e(l,!1,!0).totalValue)})),{x:a,y:n,name:this.name,showlegend:!1,type:"scatter"}):(t.map((t=>{let l=this.data;l.acc=t[0],l.numGeki=t[1],a.push(parseFloat(100*t[0])),n.push(new e(l,!1,!0).totalValue)})),{x:a,y:n,name:this.name,showlegend:!1,type:"scatter"})}getLayout(){if(this.ssmode){let t={title:{text:"pp曲线"},xaxis:{title:{text:"彩300数"},exponentformat:"none",showgrid:!0,gridwidth:2},yaxis:{title:{text:"pp"},exponentformat:"none",showgrid:!0,gridwidth:2}};return t}{let t={title:{text:"pp曲线"},xaxis:{title:{text:"Acc(%)"},exponentformat:"none",showgrid:!0,gridwidth:2},yaxis:{title:{text:"pp"},exponentformat:"none",showgrid:!0,gridwidth:2}};return t}}}t.exports.m=e,t.exports.O=a},9910:function(t,e,a){const n=a(6265)["default"];class l{constructor(t){this.approved=t.approved,this.artist=t.artist,this.artistU=t.artistU||t.artist,this.title=t.title,this.titleU=t.titleU||t.title,this.sid=t.sid,this.creator=t.creator,this.thumb="https://b.ppy.sh/thumb/"+this.sid+"l.jpg",this.play_count=t.play_count}toTableData(){let t="";switch(this.approved){case 0:t="pending";break;case 1:t="ranked";break;case 2:t="approved";break;case 3:t="qualified";break;case 4:t="loved";break;case-1:t="WIP";break;case-2:t="graveyard";break;default:t="unknown";break}return{sid:this.sid,thumb:this.thumb,status:t,title:this.artistU+" - "+this.titleU,creator:this.creator}}}class o{constructor(t){this.bid=t.bid,this.version=t.version,this.mode=t.mode,this.star=t.star,this.keys=t.CS,this.od=t.OD,this.objCount=t.circles+t.sliders}toTableData(){return{bid:this.bid,version:this.version,od:this.od,sr:this.star,objCount:this.objCount,star:"★"+this.star,keys:this.keys.toFixed(0)+"K"}}}class s{static async search(t){const e="https://api.sayobot.cn/v2/beatmapinfo?T=1&K="+t,a=await n.get(e);if(!a.data.data)throw"获取谱面详情失败";let l;if(a.data.data.bid_data.map((e=>{e.bid===t&&(l=e)})),!l)throw"查不到该谱面信息";if(3!==l.mode)throw"该谱面不是mania专谱";return{od:l.OD,sr:l.star,objCount:l.circles+l.sliders}}static async searchBeatmapSetList(t){const e="https://api.sayobot.cn/beatmaplist?2=4&5=8&3="+t,a=await n.get(e);if(!a.data)throw"获取谱面列表失败";if(0!==a.data.status)throw"找不到相关谱面集";let o=a.data.data.map((t=>new l(t)));return o.sort(((t,e)=>e.play_count-t.play_count))}static async searchBeatmapList(t){const e="https://api.sayobot.cn/v2/beatmapinfo?T=0&K="+t,a=await n.get(e);if(!a.data)throw"获取谱面信息失败";if(0!==a.data.status)throw"找不到相关谱面";let l=a.data.data.bid_data.map((t=>new o(t)));if(l=l.filter((t=>3===t.mode)),l.length<=0)throw"找不到相关谱面";return l.sort(((t,e)=>t.star-e.star))}}t.exports=s},4012:function(t,e,a){"use strict";var n=a(9242),l=(a(4567),a(8199),a(4583),a(9740)),o=a(2525),s=a(3396),i=a(7139);const r=t=>((0,s.dD)("data-v-3fd9a7c3"),t=t(),(0,s.Cn)(),t),c=(0,s.Uk)("我想升级"),u=(0,s.Uk)("关于"),p=r((()=>(0,s._)("div",{class:"menuright"},[(0,s._)("a",{class:"github",href:"https://github.com/Exsper/osumania-ppcal",title:"GitHub",target:"_blank",rel:"noreferrer noopener"},[(0,s._)("svg",{viewBox:"0 0 24 24",width:"24px",height:"24px"},[(0,s._)("path",{fill:"currentColor",d:"M12 2C6.475 2 2 6.475 2 12a9.994 9.994 0 0 0 6.838 9.488c.5.087.687-.213.687-.476c0-.237-.013-1.024-.013-1.862c-2.512.463-3.162-.612-3.362-1.175c-.113-.288-.6-1.175-1.025-1.413c-.35-.187-.85-.65-.013-.662c.788-.013 1.35.725 1.538 1.025c.9 1.512 2.338 1.087 2.912.825c.088-.65.35-1.087.638-1.337c-2.225-.25-4.55-1.113-4.55-4.938c0-1.088.387-1.987 1.025-2.688c-.1-.25-.45-1.275.1-2.65c0 0 .837-.262 2.75 1.026a9.28 9.28 0 0 1 2.5-.338c.85 0 1.7.112 2.5.337c1.912-1.3 2.75-1.024 2.75-1.024c.55 1.375.2 2.4.1 2.65c.637.7 1.025 1.587 1.025 2.687c0 3.838-2.337 4.688-4.562 4.938c.362.312.675.912.675 1.85c0 1.337-.013 2.412-.013 2.75c0 .262.188.574.688.474A10.016 10.016 0 0 0 22 12c0-5.525-4.475-10-10-10z"})])])],-1)));function d(t,e,a,n,r,d){const h=o.E_,m=o.Q8,_=(0,s.up)("router-view"),b=l.b2;return(0,s.wg)(),(0,s.iD)(s.HY,null,[(0,s.Wm)(m,{"default-active":r.activeIndex,class:"el-menu-demo",mode:"horizontal",router:!0},{default:(0,s.w5)((()=>[(0,s.Wm)(h,{index:"/"},{default:(0,s.w5)((()=>[(0,s.Uk)((0,i.zw)(t.$t("message.page_mania_pp_cal")),1)])),_:1}),(0,s.Wm)(h,{index:"/sayo"},{default:(0,s.w5)((()=>[(0,s.Uk)((0,i.zw)(t.$t("message.page_mania_pp_cal_sayo")),1)])),_:1}),(0,s.Wm)(h,{index:"/level"},{default:(0,s.w5)((()=>[c])),_:1}),(0,s.Wm)(h,{index:"/about"},{default:(0,s.w5)((()=>[u])),_:1})])),_:1},8,["default-active"]),p,(0,s.Wm)(b,{class:"app-content"},{default:(0,s.w5)((()=>[(0,s.Wm)(_)])),_:1})],64)}var h=a(4870);const m=(0,h.iH)("/");var _={data(){return{activeIndex:m,lang:"zh",langText:"English (incompleted)"}},name:"App",methods:{changeLaguages(){this.lang="zh"===this.$i18n.locale?"en":"zh",this.$i18n.locale=this.lang,this.langText="zh"===this.lang?"English (incompleted)":"简体中文"}}},b=a(89);const f=(0,b.Z)(_,[["render",d],["__scopeId","data-v-3fd9a7c3"]]);var w=f,y=a(678),g=(a(6885),a(6809),a(8839),a(8908),a(6939)),v=a(5264),k=a(7610),C=a(8894);const x=t=>((0,s.dD)("data-v-3b7c9551"),t=t(),(0,s.Cn)(),t),j=x((()=>(0,s._)("br",null,null,-1))),W=x((()=>(0,s._)("br",null,null,-1))),P=x((()=>(0,s._)("span",null,"Mods：",-1))),V=(0,s.Uk)("EZ"),S=(0,s.Uk)("NF"),D=x((()=>(0,s._)("span",null,"Acc: ",-1))),T=x((()=>(0,s._)("span",null,"% ",-1))),I=x((()=>(0,s._)("br",null,null,-1))),U=x((()=>(0,s._)("span",null,"彩300数量：",-1))),M=x((()=>(0,s._)("br",null,null,-1))),E=x((()=>(0,s._)("br",null,null,-1))),z=x((()=>(0,s._)("br",null,null,-1))),G=["hidden"],F=["hidden"];function O(t,e,a,n,l,o){const r=C.d6,c=k.Dv,u=v.mi,p=g.dq;return(0,s.wg)(),(0,s.iD)("div",null,[(0,s._)("span",null,(0,i.zw)(t.$t("message.option_stars_with_mods"))+" ★",1),(0,s.Wm)(r,{"controls-position":"right",class:"mx-4",modelValue:l.sr,"onUpdate:modelValue":e[0]||(e[0]=t=>l.sr=t),min:0,precision:2,step:.1,onInput:o.cal},null,8,["modelValue","step","onInput"]),j,(0,s._)("span",null,(0,i.zw)(t.$t("message.option_objCount")),1),(0,s.Wm)(r,{class:"mx-4",min:0,step:200,modelValue:l.objCount,"onUpdate:modelValue":e[1]||(e[1]=t=>l.objCount=t),onInput:o.cal},null,8,["modelValue","onInput"]),W,(0,s.Wm)(p,{gutter:20,align:"middle"},{default:(0,s.w5)((()=>[(0,s.Wm)(c,{span:3},{default:(0,s.w5)((()=>[P])),_:1}),(0,s.Wm)(c,{span:2},{default:(0,s.w5)((()=>[(0,s.Wm)(u,{type:"primary",plain:"",class:(0,i.C_)(l.isEZ?"checkedmod":""),onClick:o.changeEZ},{default:(0,s.w5)((()=>[V])),_:1},8,["class","onClick"])])),_:1}),(0,s.Wm)(c,{span:2},{default:(0,s.w5)((()=>[(0,s.Wm)(u,{type:"primary",plain:"",class:(0,i.C_)(l.isNF?"checkedmod":""),onClick:o.changeNF},{default:(0,s.w5)((()=>[S])),_:1},8,["class","onClick"])])),_:1})])),_:1}),D,(0,s.Wm)(r,{"controls-position":"right",class:"mx-4",modelValue:l.acc,"onUpdate:modelValue":e[2]||(e[2]=t=>l.acc=t),min:0,max:100,precision:2,step:1,onInput:o.cal},null,8,["modelValue","onInput"]),T,(0,s._)("span",null," （ 换算Acc: "+(0,i.zw)(l.cacc)+" ）",1),I,U,(0,s.Wm)(r,{class:"mx-4",min:0,step:200,modelValue:l.numGeki,"onUpdate:modelValue":e[3]||(e[3]=t=>l.numGeki=t),onInput:o.cal},null,8,["modelValue","onInput"]),M,E,(0,s._)("span",null,"PP："+(0,i.zw)(l.pp),1),z,(0,s._)("span",{hidden:l.plotlyReady},"折线图模块加载中....",8,G),(0,s._)("div",{id:"graph",hidden:!1===l.plotlyReady},null,8,F)])}var Z=a(1021),B={name:"HomeView",setup(){if(!window.Plotly){let t=document.createElement("script");t.setAttribute("src","https://cdn.staticfile.org/plotly.js/1.58.5/plotly.min.js"),document.getElementsByTagName("head")[0].appendChild(t)}},data(){return{sr:5,objCount:1e3,isEZ:!1,isNF:!1,pp:this.$i18n.messages[this.$i18n.locale].message.info_enter_data,acc:96,cacc:"0",numGeki:0,plotlyReady:!0}},methods:{cal(){if(this.objCount<=0)return void(this.pp="请输入正确的参数");this.numGeki>this.objCount&&(this.numGeki=this.objCount,this.acc=100);let t={sr:this.sr,objCount:this.objCount,isEZ:this.isEZ,isNF:this.isNF,acc:this.acc/100,numGeki:this.numGeki},e=new Z.m(t);if(this.cacc=(100*e.cacc).toFixed(2)+"%",this.pp=e.totalValue.toFixed(2),window.Plotly){this.plotlyReady=!0;let e=new Z.O(t);window.Plotly.newPlot("graph",[e.getTrace()],e.getLayout(),{scrollZoom:!0,responsive:!0})}else this.plotlyReady=!1},changeEZ(){this.isEZ=!this.isEZ,this.cal()},changeNF(){this.isNF=!this.isNF,this.cal()}}};const $=(0,b.Z)(B,[["render",O],["__scopeId","data-v-3b7c9551"]]);var L=$;const N={class:"about"},A=(0,s._)("p",null,"更新日期：2022-10-5",-1),R=(0,s._)("p",null,[(0,s.Uk)(" 使用当时最新公布的"),(0,s._)("a",{href:"https://github.com/ppy/osu-performance/blob/master/src/performance/mania/ManiaScore.cpp",target:"_blank"},"pp算法")],-1),K=(0,s._)("br",null,null,-1),q=(0,s._)("p",null,"该网页由 Exsper 创建",-1),H=(0,s._)("p",null,[(0,s.Uk)(" 有任何问题或建议可以"),(0,s._)("a",{href:"https://github.com/Exsper/osumania-ppcal/issues",target:"_blank"},"提交issue")],-1),X=[A,R,K,q,H];function Y(t,e){return(0,s.wg)(),(0,s.iD)("div",N,X)}const Q={},J=(0,b.Z)(Q,[["render",Y]]);var tt=J,et=(a(7176),a(9007),a(3713));const at=t=>((0,s.dD)("data-v-6f47bf34"),t=t(),(0,s.Cn)(),t),nt={class:"searchpanel"},lt=at((()=>(0,s._)("span",null,"请输入关键词：",-1))),ot=(0,s.Uk)("搜索"),st=(0,s.Uk)("关闭"),it=at((()=>(0,s._)("br",null,null,-1))),rt=["src"],ct=(0,s.Uk)("选择"),ut=(0,s.Uk)("选择");function pt(t,e,a,l,o,r){const c=v.mi,u=et.$Y,p=et.eI;return(0,s.wg)(),(0,s.iD)("div",nt,[lt,(0,s.wy)((0,s._)("input",{"onUpdate:modelValue":e[0]||(e[0]=t=>o.keyword=t)},null,512),[[n.nr,o.keyword]]),(0,s.Wm)(c,{type:"primary",onClick:r.setBeatmapSetTableData},{default:(0,s.w5)((()=>[ot])),_:1},8,["onClick"]),(0,s.Wm)(c,{type:"primary",onClick:r.close},{default:(0,s.w5)((()=>[st])),_:1},8,["onClick"]),it,(0,s._)("span",null,(0,i.zw)(o.warnText),1),(0,s.Wm)(p,{data:o.beatmapSetTableData,stripe:"",style:{width:"100%"},hidden:o.selectBidMode,size:"small"},{default:(0,s.w5)((()=>[(0,s.Wm)(u,{prop:"sid",label:"sid",width:"70"}),(0,s.Wm)(u,{width:"50"},{default:(0,s.w5)((t=>[(0,s._)("img",{src:t.row.thumb,width:"50",height:"37"},null,8,rt)])),_:1}),(0,s.Wm)(u,{prop:"status",label:"Status",width:"80"}),(0,s.Wm)(u,{prop:"title",label:"Title"}),(0,s.Wm)(u,{prop:"creator",label:"Creator",width:"80"}),(0,s.Wm)(u,{fixed:"right",width:"50"},{default:(0,s.w5)((t=>[(0,s.Wm)(c,{type:"text",size:"small",onClick:(0,n.iM)((e=>r.selectSet(t.row.sid)),["prevent"])},{default:(0,s.w5)((()=>[ct])),_:2},1032,["onClick"])])),_:1})])),_:1},8,["data","hidden"]),(0,s.Wm)(p,{data:o.beatmapTableData,stripe:"",style:{width:"100%"},hidden:!o.selectBidMode,size:"small"},{default:(0,s.w5)((()=>[(0,s.Wm)(u,{prop:"bid",label:"bid",width:"100"}),(0,s.Wm)(u,{prop:"version",label:"Difficulty"}),(0,s.Wm)(u,{prop:"keys",label:"Keys",width:"60"}),(0,s.Wm)(u,{prop:"star",label:"Stars",width:"80"}),(0,s.Wm)(u,{fixed:"right",width:"50"},{default:(0,s.w5)((t=>[(0,s.Wm)(c,{type:"text",size:"small",onClick:(0,n.iM)((e=>r.selectBid(t.row.bid)),["prevent"])},{default:(0,s.w5)((()=>[ut])),_:2},1032,["onClick"])])),_:1})])),_:1},8,["data","hidden"])])}var dt=a(9910),ht=a.n(dt),mt={name:"SearchPanel",data(){return{keyword:"",warnText:"",beatmapSetTableData:[],beatmapTableData:[],selectBidMode:!1}},methods:{async setBeatmapSetTableData(){try{this.selectBidMode=!1,this.beatmapSetTableData=[];let t=await ht().searchBeatmapSetList(this.keyword);t.map((t=>{this.beatmapSetTableData.push(t.toTableData())})),this.warnText=""}catch(t){this.warnText=t}},async selectSet(t){try{this.beatmapTableData=[];let e=await ht().searchBeatmapList(t);e.map((t=>{this.beatmapTableData.push(t.toTableData())})),this.warnText="",this.selectBidMode=!0}catch(e){this.warnText=e}},selectBid(t){let e=this.beatmapTableData.find((e=>e.bid===t));this.$emit("selectBid",e)},close(){this.$emit("removeSearchPanel")}}};const _t=(0,b.Z)(mt,[["render",pt],["__scopeId","data-v-6f47bf34"]]);var bt=_t;const ft=t=>((0,s.dD)("data-v-d85d4b06"),t=t(),(0,s.Cn)(),t),wt=ft((()=>(0,s._)("br",null,null,-1))),yt=ft((()=>(0,s._)("span",null,"bid：",-1))),gt=(0,s.Uk)("我不知道bid"),vt=ft((()=>(0,s._)("br",null,null,-1))),kt=ft((()=>(0,s._)("br",null,null,-1))),Ct=ft((()=>(0,s._)("br",null,null,-1))),xt=ft((()=>(0,s._)("span",null,"Acc: ",-1))),jt=ft((()=>(0,s._)("span",null,"% ",-1))),Wt=ft((()=>(0,s._)("br",null,null,-1))),Pt=ft((()=>(0,s._)("span",null,"彩300数量：",-1))),Vt=ft((()=>(0,s._)("br",null,null,-1))),St=ft((()=>(0,s._)("br",null,null,-1))),Dt=["hidden"],Tt=["hidden"];function It(t,e,a,n,l,o){const r=C.d6,c=v.mi,u=bt;return(0,s.wg)(),(0,s.iD)("div",null,[(0,s._)("span",null,(0,i.zw)(t.$t("message.option_sayo_only_mania_no_mod")),1),wt,yt,(0,s.Wm)(r,{controls:!1,class:"mx-4",modelValue:l.bid,"onUpdate:modelValue":e[0]||(e[0]=t=>l.bid=t),onInput:o.cal},null,8,["modelValue","onInput"]),(0,s.Wm)(c,{type:"primary",onClick:o.getData},{default:(0,s.w5)((()=>[(0,s.Uk)((0,i.zw)(t.$t("message.button_get_data_from_sayo")),1)])),_:1},8,["onClick"]),(0,s.Wm)(c,{type:"primary",onClick:o.setSearchPanel},{default:(0,s.w5)((()=>[gt])),_:1},8,["onClick"]),vt,l.showSearchPanel?((0,s.wg)(),(0,s.j4)(u,{key:0,onSelectBid:o.selectBid,onRemoveSearchPanel:o.removeSearchPanel},null,8,["onSelectBid","onRemoveSearchPanel"])):(0,s.kq)("",!0),(0,s._)("span",null,(0,i.zw)(t.$t("message.option_stars"))+" ★"+(0,i.zw)(l.sr),1),kt,(0,s._)("span",null,(0,i.zw)(t.$t("message.option_objCount"))+" "+(0,i.zw)(l.objCount),1),Ct,xt,(0,s.Wm)(r,{"controls-position":"right",class:"mx-4",modelValue:l.acc,"onUpdate:modelValue":e[1]||(e[1]=t=>l.acc=t),min:0,max:100,precision:2,step:1,onInput:o.cal},null,8,["modelValue","onInput"]),jt,(0,s._)("span",null," （ 换算Acc: "+(0,i.zw)(l.cacc)+" ）",1),Wt,Pt,(0,s.Wm)(r,{class:"mx-4",min:0,step:200,modelValue:l.numGeki,"onUpdate:modelValue":e[2]||(e[2]=t=>l.numGeki=t),onInput:o.cal},null,8,["modelValue","onInput"]),Vt,(0,s._)("span",null,"PP："+(0,i.zw)(l.pp),1),St,(0,s._)("span",{hidden:l.plotlyReady},"折线图模块加载中....",8,Dt),(0,s._)("div",{id:"graph",hidden:!1===l.plotlyReady},null,8,Tt)])}var Ut={components:{SearchPanel:bt},name:"SayobotFastView",setup(){if(!window.Plotly){let t=document.createElement("script");t.setAttribute("src","https://cdn.staticfile.org/plotly.js/1.58.5/plotly.min.js"),document.getElementsByTagName("head")[0].appendChild(t)}},data(){return{showSearchPanel:!1,bid:1234567,sr:8,objCount:2e3,acc:96,cacc:"0",numGeki:0,pp:this.$i18n.messages[this.$i18n.locale].message.info_enter_data,plotlyReady:!0}},methods:{cal(){this.numGeki>this.objCount&&(this.numGeki=this.objCount,this.acc=100);let t={sr:this.sr,objCount:this.objCount,isEZ:this.isEZ,isNF:this.isNF,acc:this.acc/100,numGeki:this.numGeki},e=new Z.m(t);if(this.cacc=(100*e.cacc).toFixed(2)+"%",this.pp=e.totalValue.toFixed(2),window.Plotly){this.plotlyReady=!0;let e=new Z.O(t);window.Plotly.newPlot("graph",[e.getTrace()],e.getLayout(),{scrollZoom:!0,responsive:!0})}else this.plotlyReady=!1},async getData(){try{let t=await ht().search(this.bid);this.sr=t.sr,this.objCount=t.objCount,this.cal()}catch(t){this.pp=t}},setSearchPanel(){this.showSearchPanel=!0},selectBid(t){this.bid=t.bid,this.sr=t.sr,this.objCount=t.objCount,this.removeSearchPanel(),this.cal()},removeSearchPanel(){this.showSearchPanel=!1}}};const Mt=(0,b.Z)(Ut,[["render",It],["__scopeId","data-v-d85d4b06"]]);var Et=Mt;const zt=t=>((0,s.dD)("data-v-5f5f8641"),t=t(),(0,s.Cn)(),t),Gt=zt((()=>(0,s._)("span",null,"总分：",-1))),Ft=zt((()=>(0,s._)("br",null,null,-1))),Ot=zt((()=>(0,s._)("br",null,null,-1))),Zt=zt((()=>(0,s._)("span",null,"每个成绩大概得分：",-1))),Bt=zt((()=>(0,s._)("br",null,null,-1))),$t=zt((()=>(0,s._)("span",null,"或者由PC数计算，PC数：",-1))),Lt=zt((()=>(0,s._)("br",null,null,-1))),Nt=zt((()=>(0,s._)("br",null,null,-1))),At=zt((()=>(0,s._)("span",null,"对比等级（填0则默认下一级）",-1))),Rt=zt((()=>(0,s._)("br",null,null,-1))),Kt=zt((()=>(0,s._)("br",null,null,-1))),qt=(0,s.Uk)("计算"),Ht=zt((()=>(0,s._)("br",null,null,-1))),Xt=zt((()=>(0,s._)("br",null,null,-1)));function Yt(t,e,a,n,l,o){const r=C.d6,c=v.mi;return(0,s.wg)(),(0,s.iD)("div",null,[Gt,(0,s.Wm)(r,{class:"mx-4",min:0,step:1,modelValue:l.totalScore,"onUpdate:modelValue":e[0]||(e[0]=t=>l.totalScore=t),controls:!1,onInput:o.changePC},null,8,["modelValue","onInput"]),Ft,Ot,Zt,(0,s.Wm)(r,{class:"mx-4",min:0,max:1e6,step:5e4,modelValue:l.scorePerPC,"onUpdate:modelValue":e[1]||(e[1]=t=>l.scorePerPC=t)},null,8,["modelValue"]),Bt,$t,(0,s.Wm)(r,{class:"mx-4",min:0,step:1,modelValue:l.pc,"onUpdate:modelValue":e[2]||(e[2]=t=>l.pc=t),onInput:o.changePC},null,8,["modelValue","onInput"]),Lt,Nt,At,(0,s.Wm)(r,{class:"mx-4",min:0,step:1,modelValue:l.compareLevel,"onUpdate:modelValue":e[3]||(e[3]=t=>l.compareLevel=t)},null,8,["modelValue"]),Rt,Kt,(0,s.Wm)(c,{type:"primary",onClick:o.cal},{default:(0,s.w5)((()=>[qt])),_:1},8,["onClick"]),Ht,Xt,(0,s._)("span",null,(0,i.zw)(l.result),1)])}var Qt=a(8531),Jt=a.n(Qt),te={name:"LevelRequire",data(){return{totalScore:0,scorePerPC:1e6,pc:0,compareLevel:0,result:""}},methods:{changePC(){this.pc>0&&(this.scorePerPC=parseInt(this.totalScore/this.pc))},cal(){try{let t=Jt()(this.totalScore,this.scorePerPC,this.compareLevel);this.result=t}catch(t){this.result=t}}}};const ee=(0,b.Z)(te,[["render",Yt],["__scopeId","data-v-5f5f8641"]]);var ae=ee;const ne=[{path:"/",name:"home",component:L},{path:"/sayo",name:"sayo",component:Et},{path:"/level",name:"level",component:ae},{path:"/about",name:"about",component:tt}],le=(0,y.p7)({history:(0,y.r5)(),routes:ne});var oe=le,se=a(6623),ie=(0,se.MT)({state:{},getters:{},mutations:{},actions:{},modules:{}}),re=a(3490),ce={page_mania_pp_cal:"Mania PP Calculation",page_mania_pp_cal_sayo:"Get Mapdata From Sayo",page_about:"About",option_mapIsConvert:"Converted",option_mapKeys:"Default Keys:",option_playKeys:"Play Keys:",option_stars:"Stars:",option_stars_with_mods:"Stars(With Mod):",option_od_without_mods:"OD(Without Mod):",option_od_with_mods:"With Mod:",option_od:"OD:",option_objCount:"Objects:",option_score:"Score:",option_maxScore:"Max Score:",option_sayo_only_mania_no_mod:"Mania Map Without Any Mod Only!",button_get_data_from_sayo:"Get Map Data",info_enter_data:"Calculate When Entering Data"},ue={page_mania_pp_cal:"mania pp计算",page_mania_pp_cal_sayo:"小夜帮填",page_about:"关于",option_mapIsConvert:"转谱",option_mapKeys:"谱面默认键数：",option_playKeys:"游玩键数：",option_stars:"谱面星数：",option_stars_with_mods:"谱面星数（Mod加成后）：",option_od_without_mods:"谱面OD（Mod加成前）：",option_od_with_mods:"加成后：",option_od:"谱面OD：",option_objCount:"谱面物件数：",option_score:"得分：",option_maxScore:"满分：",option_sayo_only_mania_no_mod:"仅只支持mania专谱的无mod成绩！",button_get_data_from_sayo:"从小夜获取数据",info_enter_data:"输入数据立即计算"};const pe=(0,re.o)({locale:"zh",messages:{en:{message:ce},zh:{message:ue}}});(0,n.ri)(w).use(ie).use(oe).use(pe).mount("#app")}},e={};function a(n){var l=e[n];if(void 0!==l)return l.exports;var o=e[n]={exports:{}};return t[n](o,o.exports,a),o.exports}a.m=t,function(){var t=[];a.O=function(e,n,l,o){if(!n){var s=1/0;for(u=0;u<t.length;u++){n=t[u][0],l=t[u][1],o=t[u][2];for(var i=!0,r=0;r<n.length;r++)(!1&o||s>=o)&&Object.keys(a.O).every((function(t){return a.O[t](n[r])}))?n.splice(r--,1):(i=!1,o<s&&(s=o));if(i){t.splice(u--,1);var c=l();void 0!==c&&(e=c)}}return e}o=o||0;for(var u=t.length;u>0&&t[u-1][2]>o;u--)t[u]=t[u-1];t[u]=[n,l,o]}}(),function(){a.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return a.d(e,{a:e}),e}}(),function(){a.d=function(t,e){for(var n in e)a.o(e,n)&&!a.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,get:e[n]})}}(),function(){a.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"===typeof window)return window}}()}(),function(){a.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)}}(),function(){var t={143:0};a.O.j=function(e){return 0===t[e]};var e=function(e,n){var l,o,s=n[0],i=n[1],r=n[2],c=0;if(s.some((function(e){return 0!==t[e]}))){for(l in i)a.o(i,l)&&(a.m[l]=i[l]);if(r)var u=r(a)}for(e&&e(n);c<s.length;c++)o=s[c],a.o(t,o)&&t[o]&&t[o][0](),t[o]=0;return a.O(u)},n=self["webpackChunkosumania_ppcal"]=self["webpackChunkosumania_ppcal"]||[];n.forEach(e.bind(null,0)),n.push=e.bind(null,n.push.bind(n))}();var n=a.O(void 0,[998],(function(){return a(4012)}));n=a.O(n)})();
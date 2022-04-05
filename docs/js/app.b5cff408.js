(function(){var t={1021:function(t){class e{constructor(t){this.isConvert=t.isConvert,this.mapKeys=t.mapKeys,this.playKeys=t.playKeys,this.sr=t.sr,this.od=t.od,this.objCount=t.objCount,this.isHR=t.isHR,this.isEZ=t.isEZ,this.isDT=t.isDT,this.isHT=t.isHT,this.isNF=t.isNF,this.score=t.score,this.maxScore=1e6,this._score=this.getComputeScore(),this.difficultyValue=this.computeDifficultyValue(),this.accuracyValue=this.computeAccuracyValue(),this.totalValue=this.computeTotalValue()}computeDifficultyValue(){let t=1,e=Math.pow(5*Math.max(1,this.sr/.2)-4,2.2)/135;t*=e;let a=1+.1*Math.min(1,this.objCount/1500);t*=a;let s=0,i=this._score;return s=i<=5e5?0:i<=6e5?(i-5e5)/1e5*.3:i<=7e5?.3+(i-6e5)/1e5*.25:i<=8e5?.55+(i-7e5)/1e5*.2:i<=9e5?.75+(i-8e5)/1e5*.15:.9+(i-9e5)/1e5*.1,t*=s,t}getComputeScore(){let t=this.getScoreMultiplier();return this.maxScore=parseInt(this.maxScore*t),this.score/t}getScoreMultiplier(){let t=1;if(this.isConvert){let e=this.playKeys-this.mapKeys;e>0?t*=.9:e<0&&(t*=.9+.04*e)}return t*Math.pow(.5,this.isEZ+this.isHT+this.isNF)}computeAccuracyValue(){return Math.max(0,.2-.006667*(this.getHitWindow300()-34))*this.difficultyValue*Math.pow(Math.max(0,this._score-96e4)/4e4,1.1)}getHitWindow300(){const t=t=>(this.isHR?t/=1.4:this.isEZ&&(t*=1.4),t);if(!this.isConvert){let e=Math.min(10,Math.max(0,10-this.od));return t(34+3*e)}return this.od>=5?t(34):t(47)}computeTotalValue(){let t=.8;return this.isNF&&(t*=.9),this.isEZ&&(t*=.5),Math.pow(Math.pow(this.difficultyValue,1.1)+Math.pow(this.accuracyValue,1.1),1/1.1)*t}}class a{constructor(t,e){this.data=t,this.maxScore=e}getX(){let t=50,e=[],a=parseInt((this.maxScore-this.data.score)/t);if(a<=0)return[this.data.score,this.maxScore];let s=this.data.score;for(let i=0;i<t;i++)e.push(s),s+=a;return e.push(this.maxScore),[...new Set(e)]}getTrace(){let t=this.getX(),a=t.map((t=>{let a=this.data;return a.score=t,new e(a).totalValue}));return{x:t,y:a,name:this.name,showlegend:!1,type:"scatter"}}getLayout(){let t={title:{text:"pp曲线"},xaxis:{title:{text:"得分"},exponentformat:"none",showgrid:!0,gridwidth:2},yaxis:{title:{text:"pp"},exponentformat:"none",showgrid:!0,gridwidth:2}};return t}}t.exports.m=e,t.exports.O=a},9910:function(t,e,a){const s=a(6265)["default"];class i{constructor(t){this.approved=t.approved,this.artist=t.artist,this.artistU=t.artistU||t.artist,this.title=t.title,this.titleU=t.titleU||t.title,this.sid=t.sid,this.creator=t.creator,this.thumb="https://b.ppy.sh/thumb/"+this.sid+"l.jpg",this.play_count=t.play_count}toTableData(){let t="";switch(this.approved){case 0:t="pending";break;case 1:t="ranked";break;case 2:t="approved";break;case 3:t="qualified";break;case 4:t="loved";break;case-1:t="WIP";break;case-2:t="graveyard";break;default:t="unknown";break}return{sid:this.sid,thumb:this.thumb,status:t,title:this.artistU+" - "+this.titleU,creator:this.creator}}}class o{constructor(t){this.bid=t.bid,this.version=t.version,this.mode=t.mode,this.star=t.star,this.keys=t.CS,this.od=t.OD,this.objCount=t.circles+t.sliders}toTableData(){return{bid:this.bid,version:this.version,od:this.od,sr:this.star,objCount:this.objCount,star:"★"+this.star,keys:this.keys.toFixed(0)+"K"}}}class n{static async search(t){const e="https://api.sayobot.cn/v2/beatmapinfo?T=1&K="+t,a=await s.get(e);if(!a.data.data)throw"获取谱面详情失败";let i;if(a.data.data.bid_data.map((e=>{e.bid===t&&(i=e)})),!i)throw"查不到该谱面信息";if(3!==i.mode)throw"该谱面不是mania专谱";return{od:i.OD,sr:i.star,objCount:i.circles+i.sliders}}static async searchBeatmapSetList(t){const e="https://api.sayobot.cn/beatmaplist?2=4&5=8&3="+t,a=await s.get(e);if(!a.data)throw"获取谱面列表失败";if(0!==a.data.status)throw"找不到相关谱面集";let o=a.data.data.map((t=>new i(t)));return o.sort(((t,e)=>e.play_count-t.play_count))}static async searchBeatmapList(t){const e="https://api.sayobot.cn/v2/beatmapinfo?T=0&K="+t,a=await s.get(e);if(!a.data)throw"获取谱面信息失败";if(0!==a.data.status)throw"找不到相关谱面";let i=a.data.data.bid_data.map((t=>new o(t)));if(i=i.filter((t=>3===t.mode)),i.length<=0)throw"找不到相关谱面";return i.sort(((t,e)=>t.star-e.star))}}t.exports=n},5250:function(t,e,a){"use strict";var s=a(9242),i=(a(4567),a(6809),a(8199),a(4583),a(9740)),o=a(5264),n=a(2525),l=a(3396),r=a(7139);const d=t=>((0,l.dD)("data-v-b46d44b4"),t=t(),(0,l.Cn)(),t),h={class:"menuright"},c=d((()=>(0,l._)("a",{class:"github",href:"https://github.com/Exsper/osumania-ppcal",title:"GitHub",target:"_blank",rel:"noreferrer noopener"},[(0,l._)("svg",{viewBox:"0 0 24 24",width:"24px",height:"24px"},[(0,l._)("path",{fill:"currentColor",d:"M12 2C6.475 2 2 6.475 2 12a9.994 9.994 0 0 0 6.838 9.488c.5.087.687-.213.687-.476c0-.237-.013-1.024-.013-1.862c-2.512.463-3.162-.612-3.362-1.175c-.113-.288-.6-1.175-1.025-1.413c-.35-.187-.85-.65-.013-.662c.788-.013 1.35.725 1.538 1.025c.9 1.512 2.338 1.087 2.912.825c.088-.65.35-1.087.638-1.337c-2.225-.25-4.55-1.113-4.55-4.938c0-1.088.387-1.987 1.025-2.688c-.1-.25-.45-1.275.1-2.65c0 0 .837-.262 2.75 1.026a9.28 9.28 0 0 1 2.5-.338c.85 0 1.7.112 2.5.337c1.912-1.3 2.75-1.024 2.75-1.024c.55 1.375.2 2.4.1 2.65c.637.7 1.025 1.587 1.025 2.687c0 3.838-2.337 4.688-4.562 4.938c.362.312.675.912.675 1.85c0 1.337-.013 2.412-.013 2.75c0 .262.188.574.688.474A10.016 10.016 0 0 0 22 12c0-5.525-4.475-10-10-10z"})])],-1)));function p(t,e,a,s,d,p){const u=n.E_,m=n.Q8,_=o.mi,y=(0,l.up)("router-view"),w=i.b2;return(0,l.wg)(),(0,l.iD)(l.HY,null,[(0,l.Wm)(m,{"default-active":d.activeIndex,class:"el-menu-demo",mode:"horizontal",router:!0},{default:(0,l.w5)((()=>[(0,l.Wm)(u,{index:"/"},{default:(0,l.w5)((()=>[(0,l.Uk)((0,r.zw)(t.$t("message.page_mania_pp_cal")),1)])),_:1}),(0,l.Wm)(u,{index:"/sayo"},{default:(0,l.w5)((()=>[(0,l.Uk)((0,r.zw)(t.$t("message.page_mania_pp_cal_sayo")),1)])),_:1})])),_:1},8,["default-active"]),(0,l._)("div",h,[(0,l.Wm)(_,{class:"langbtn",onClick:p.changeLaguages},{default:(0,l.w5)((()=>[(0,l.Uk)((0,r.zw)(d.langText),1)])),_:1},8,["onClick"]),c]),(0,l.Wm)(w,{class:"app-content"},{default:(0,l.w5)((()=>[(0,l.Wm)(y)])),_:1})],64)}var u=a(4870);const m=(0,u.iH)("/");var _={data(){return{activeIndex:m,lang:"zh",langText:"English"}},name:"App",methods:{changeLaguages(){this.lang="zh"===this.$i18n.locale?"en":"zh",this.$i18n.locale=this.lang,this.langText="zh"===this.lang?"English":"简体中文"}}},y=a(89);const w=(0,y.Z)(_,[["render",p],["__scopeId","data-v-b46d44b4"]]);var b=w,f=a(678),g=(a(6885),a(8839),a(8908),a(88),a(6939)),v=a(7610),C=a(8894),x=a(6588);const k=t=>((0,l.dD)("data-v-878486a4"),t=t(),(0,l.Cn)(),t),D={class:"home"},T=["hidden"],S=["hidden"],W=["hidden"],M=["hidden"],O=k((()=>(0,l._)("br",null,null,-1))),V=k((()=>(0,l._)("br",null,null,-1))),z=["hidden"],H=["hidden"],j=k((()=>(0,l._)("br",null,null,-1))),K=k((()=>(0,l._)("br",null,null,-1))),P=k((()=>(0,l._)("span",null,"Mods：",-1))),U=(0,l.Uk)("EZ"),E=(0,l.Uk)("NF"),R=(0,l.Uk)("HT"),I=(0,l.Uk)("HR"),Z=(0,l.Uk)("DT"),$=k((()=>(0,l._)("br",null,null,-1))),F=k((()=>(0,l._)("br",null,null,-1))),B=k((()=>(0,l._)("br",null,null,-1))),N=k((()=>(0,l._)("br",null,null,-1))),L=["hidden"],A=["hidden"];function q(t,e,a,i,n,d){const h=x.Xb,c=C.d6,p=v.Dv,u=o.mi,m=g.dq;return(0,l.wg)(),(0,l.iD)("div",D,[(0,l.Wm)(h,{modelValue:n.isConvert,"onUpdate:modelValue":e[0]||(e[0]=t=>n.isConvert=t),onChange:d.cal,size:"large",border:""},{default:(0,l.w5)((()=>[(0,l.Uk)((0,r.zw)(t.$t("message.option_mapIsConvert")),1)])),_:1},8,["modelValue","onChange"]),(0,l._)("span",{hidden:!1===n.isConvert},(0,r.zw)(t.$t("message.option_mapKeys")),9,T),(0,l.wy)((0,l._)("input",{class:"short","onUpdate:modelValue":e[1]||(e[1]=t=>n.mapKeys=t),onInput:e[2]||(e[2]=(...t)=>d.changeMapKeys&&d.changeMapKeys(...t)),hidden:!1===n.isConvert},null,40,S),[[s.nr,n.mapKeys,void 0,{number:!0}]]),(0,l._)("span",{hidden:!1===n.isConvert},(0,r.zw)(t.$t("message.option_playKeys")),9,W),(0,l.wy)((0,l._)("input",{class:"short","onUpdate:modelValue":e[3]||(e[3]=t=>n.playKeys=t),onInput:e[4]||(e[4]=(...t)=>d.cal&&d.cal(...t)),hidden:!1===n.isConvert},null,40,M),[[s.nr,n.playKeys,void 0,{number:!0}]]),O,(0,l._)("span",null,(0,r.zw)(t.$t("message.option_stars_with_mods"))+" ★",1),(0,l.Wm)(c,{"controls-position":"right",class:"mx-4",modelValue:n.sr,"onUpdate:modelValue":e[5]||(e[5]=t=>n.sr=t),precision:2,step:.1,onInput:d.cal},null,8,["modelValue","step","onInput"]),V,(0,l._)("span",null,(0,r.zw)(t.$t("message.option_od_without_mods"))+" OD",1),(0,l.wy)((0,l._)("input",{class:"short","onUpdate:modelValue":e[6]||(e[6]=t=>n.od=t),onInput:e[7]||(e[7]=(...t)=>d.OD2ModOD&&d.OD2ModOD(...t))},null,544),[[s.nr,n.od,void 0,{number:!0}]]),(0,l._)("span",{hidden:!(!0===n.isHR||!0===n.isEZ)},(0,r.zw)(t.$t("message.option_od_with_mods"))+" OD",9,z),(0,l.wy)((0,l._)("input",{class:"short",hidden:!(!0===n.isHR||!0===n.isEZ),"onUpdate:modelValue":e[8]||(e[8]=t=>n.od_mod=t),onInput:e[9]||(e[9]=(...t)=>d.ModOD2OD&&d.ModOD2OD(...t))},null,40,H),[[s.nr,n.od_mod,void 0,{number:!0}]]),j,(0,l._)("span",null,(0,r.zw)(t.$t("message.option_objCount")),1),(0,l.Wm)(c,{class:"mx-4",min:0,step:200,modelValue:n.objCount,"onUpdate:modelValue":e[10]||(e[10]=t=>n.objCount=t),onInput:d.cal},null,8,["modelValue","onInput"]),K,(0,l.Wm)(m,{gutter:20},{default:(0,l.w5)((()=>[(0,l.Wm)(p,{span:3},{default:(0,l.w5)((()=>[P])),_:1}),(0,l.Wm)(p,{span:2},{default:(0,l.w5)((()=>[(0,l.Wm)(u,{type:"primary",plain:"",class:(0,r.C_)(n.isEZ?"checkedmod":""),onClick:d.changeEZ},{default:(0,l.w5)((()=>[U])),_:1},8,["class","onClick"])])),_:1}),(0,l.Wm)(p,{span:2},{default:(0,l.w5)((()=>[(0,l.Wm)(u,{type:"primary",plain:"",class:(0,r.C_)(n.isNF?"checkedmod":""),onClick:d.changeNF},{default:(0,l.w5)((()=>[E])),_:1},8,["class","onClick"])])),_:1}),(0,l.Wm)(p,{span:2},{default:(0,l.w5)((()=>[(0,l.Wm)(u,{type:"primary",plain:"",class:(0,r.C_)(n.isHT?"checkedmod":""),onClick:d.changeHT},{default:(0,l.w5)((()=>[R])),_:1},8,["class","onClick"])])),_:1})])),_:1}),(0,l.Wm)(m,{gutter:20},{default:(0,l.w5)((()=>[(0,l.Wm)(p,{span:2,offset:3},{default:(0,l.w5)((()=>[(0,l.Wm)(u,{type:"primary",plain:"",class:(0,r.C_)(n.isHR?"checkedmod":""),onClick:d.changeHR},{default:(0,l.w5)((()=>[I])),_:1},8,["class","onClick"])])),_:1}),(0,l.Wm)(p,{span:2,offset:2},{default:(0,l.w5)((()=>[(0,l.Wm)(u,{type:"primary",plain:"",class:(0,r.C_)(n.isDT?"checkedmod":""),onClick:d.changeDT},{default:(0,l.w5)((()=>[Z])),_:1},8,["class","onClick"])])),_:1})])),_:1}),$,(0,l._)("span",null,(0,r.zw)(t.$t("message.option_score")),1),(0,l.Wm)(c,{class:"mx-4",min:0,max:1e6,step:1e5,modelValue:n.score,"onUpdate:modelValue":e[11]||(e[11]=t=>n.score=t),onInput:d.cal},null,8,["modelValue","onInput"]),(0,l._)("span",null,(0,r.zw)(t.$t("message.option_maxScore"))+(0,r.zw)(n.maxScore),1),F,B,(0,l._)("span",null,"PP："+(0,r.zw)(n.pp),1),N,(0,l._)("span",{hidden:n.plotlyReady},"折线图模块加载中....",8,L),(0,l._)("div",{id:"graph",hidden:!1===n.plotlyReady},null,8,A)])}var G=a(1021),X={name:"HomeView",setup(){if(!window.Plotly){let t=document.createElement("script");t.setAttribute("src","https://cdn.staticfile.org/plotly.js/1.58.5/plotly.min.js"),document.getElementsByTagName("head")[0].appendChild(t)}},data(){return{isConvert:!1,mapKeys:4,playKeys:4,sr:5,od:8,od_mod:8,objCount:1e3,isHR:!1,isEZ:!1,isDT:!1,isHT:!1,isNF:!1,score:1e6,pp:this.$i18n.messages[this.$i18n.locale].message.info_enter_data,maxScore:1e6,plotlyReady:!0}},methods:{OD2ModOD(){this.isEZ?this.od_mod=this.od/2:this.isHR?this.od_mod=Math.min(1.4*this.od,10).toFixed(2):this.od_mod=this.od,this.cal()},ModOD2OD(){this.isEZ?this.od=2*this.od_mod:this.isHR?this.od_mod>=10?this.od="???":this.od=(this.od_mod/1.4).toFixed(2):this.od=this.od_mod,this.cal()},changeMapKeys(){this.playKeys=this.mapKeys,this.cal()},cal(){if("???"===this.od)this.pp="???";else{let t={isConvert:this.isConvert,mapKeys:this.mapKeys,playKeys:this.playKeys,sr:this.sr,od:this.od,objCount:this.objCount,isHR:this.isHR,isEZ:this.isEZ,isDT:this.isDT,isHT:this.isHT,isNF:this.isNF,score:this.score},e=new G.m(t);if(this.pp=e.totalValue.toFixed(2),this.maxScore=e.maxScore,this.score>this.maxScore)return this.score=this.maxScore,void this.cal();if(this.score===this.maxScore/2)return this.score=this.maxScore,void this.cal();if(window.Plotly){this.plotlyReady=!0;let e=new G.O(t,this.maxScore);window.Plotly.newPlot("graph",[e.getTrace()],e.getLayout(),{scrollZoom:!0,responsive:!0})}else this.plotlyReady=!1}},changeHR(){this.isHR=!this.isHR,this.isEZ=!1,this.OD2ModOD()},changeEZ(){this.isEZ=!this.isEZ,this.isHR=!1,this.OD2ModOD()},changeDT(){this.isDT=!this.isDT,this.isHT=!1,this.cal()},changeHT(){this.isHT=!this.isHT,this.isDT=!1,this.cal()},changeNF(){this.isNF=!this.isNF,this.cal()}}};const Y=(0,y.Z)(X,[["render",q],["__scopeId","data-v-878486a4"]]);var Q=Y,J=(a(7176),a(9007),a(769));const tt=t=>((0,l.dD)("data-v-6f47bf34"),t=t(),(0,l.Cn)(),t),et={class:"searchpanel"},at=tt((()=>(0,l._)("span",null,"请输入关键词：",-1))),st=(0,l.Uk)("搜索"),it=(0,l.Uk)("关闭"),ot=tt((()=>(0,l._)("br",null,null,-1))),nt=["src"],lt=(0,l.Uk)("选择"),rt=(0,l.Uk)("选择");function dt(t,e,a,i,n,d){const h=o.mi,c=J.$Y,p=J.eI;return(0,l.wg)(),(0,l.iD)("div",et,[at,(0,l.wy)((0,l._)("input",{"onUpdate:modelValue":e[0]||(e[0]=t=>n.keyword=t)},null,512),[[s.nr,n.keyword]]),(0,l.Wm)(h,{type:"primary",onClick:d.setBeatmapSetTableData},{default:(0,l.w5)((()=>[st])),_:1},8,["onClick"]),(0,l.Wm)(h,{type:"primary",onClick:d.close},{default:(0,l.w5)((()=>[it])),_:1},8,["onClick"]),ot,(0,l._)("span",null,(0,r.zw)(n.warnText),1),(0,l.Wm)(p,{data:n.beatmapSetTableData,stripe:"",style:{width:"100%"},hidden:n.selectBidMode,size:"small"},{default:(0,l.w5)((()=>[(0,l.Wm)(c,{prop:"sid",label:"sid",width:"70"}),(0,l.Wm)(c,{width:"50"},{default:(0,l.w5)((t=>[(0,l._)("img",{src:t.row.thumb,width:"50",height:"37"},null,8,nt)])),_:1}),(0,l.Wm)(c,{prop:"status",label:"Status",width:"80"}),(0,l.Wm)(c,{prop:"title",label:"Title"}),(0,l.Wm)(c,{prop:"creator",label:"Creator",width:"80"}),(0,l.Wm)(c,{fixed:"right",width:"50"},{default:(0,l.w5)((t=>[(0,l.Wm)(h,{type:"text",size:"small",onClick:(0,s.iM)((e=>d.selectSet(t.row.sid)),["prevent"])},{default:(0,l.w5)((()=>[lt])),_:2},1032,["onClick"])])),_:1})])),_:1},8,["data","hidden"]),(0,l.Wm)(p,{data:n.beatmapTableData,stripe:"",style:{width:"100%"},hidden:!n.selectBidMode,size:"small"},{default:(0,l.w5)((()=>[(0,l.Wm)(c,{prop:"bid",label:"bid",width:"100"}),(0,l.Wm)(c,{prop:"version",label:"Difficulty"}),(0,l.Wm)(c,{prop:"keys",label:"Keys",width:"60"}),(0,l.Wm)(c,{prop:"star",label:"Stars",width:"80"}),(0,l.Wm)(c,{fixed:"right",width:"50"},{default:(0,l.w5)((t=>[(0,l.Wm)(h,{type:"text",size:"small",onClick:(0,s.iM)((e=>d.selectBid(t.row.bid)),["prevent"])},{default:(0,l.w5)((()=>[rt])),_:2},1032,["onClick"])])),_:1})])),_:1},8,["data","hidden"])])}var ht=a(9910),ct=a.n(ht),pt={name:"SearchPanel",data(){return{keyword:"",warnText:"",beatmapSetTableData:[],beatmapTableData:[],selectBidMode:!1}},methods:{async setBeatmapSetTableData(){try{this.selectBidMode=!1,this.beatmapSetTableData=[];let t=await ct().searchBeatmapSetList(this.keyword);t.map((t=>{this.beatmapSetTableData.push(t.toTableData())})),this.warnText=""}catch(t){this.warnText=t}},async selectSet(t){try{this.beatmapTableData=[];let e=await ct().searchBeatmapList(t);e.map((t=>{this.beatmapTableData.push(t.toTableData())})),this.warnText="",this.selectBidMode=!0}catch(e){this.warnText=e}},selectBid(t){let e=this.beatmapTableData.find((e=>e.bid===t));this.$emit("selectBid",e)},close(){this.$emit("removeSearchPanel")}}};const ut=(0,y.Z)(pt,[["render",dt],["__scopeId","data-v-6f47bf34"]]);var mt=ut;const _t=t=>((0,l.dD)("data-v-2eb8dbb4"),t=t(),(0,l.Cn)(),t),yt={class:"home"},wt=_t((()=>(0,l._)("br",null,null,-1))),bt=_t((()=>(0,l._)("span",null,"bid：",-1))),ft=(0,l.Uk)("我不知道bid"),gt=_t((()=>(0,l._)("br",null,null,-1))),vt=_t((()=>(0,l._)("br",null,null,-1))),Ct=_t((()=>(0,l._)("br",null,null,-1))),xt=_t((()=>(0,l._)("br",null,null,-1))),kt=_t((()=>(0,l._)("br",null,null,-1))),Dt=_t((()=>(0,l._)("br",null,null,-1))),Tt=["hidden"],St=["hidden"];function Wt(t,e,a,s,i,n){const d=C.d6,h=o.mi,c=mt;return(0,l.wg)(),(0,l.iD)("div",yt,[(0,l._)("span",null,(0,r.zw)(t.$t("message.option_sayo_only_mania_no_mod")),1),wt,bt,(0,l.Wm)(d,{controls:!1,class:"mx-4",modelValue:i.bid,"onUpdate:modelValue":e[0]||(e[0]=t=>i.bid=t),onInput:n.cal},null,8,["modelValue","onInput"]),(0,l.Wm)(h,{type:"primary",onClick:n.getData},{default:(0,l.w5)((()=>[(0,l.Uk)((0,r.zw)(t.$t("message.button_get_data_from_sayo")),1)])),_:1},8,["onClick"]),(0,l.Wm)(h,{type:"primary",onClick:n.setSearchPanel},{default:(0,l.w5)((()=>[ft])),_:1},8,["onClick"]),gt,i.showSearchPanel?((0,l.wg)(),(0,l.j4)(c,{key:0,onSelectBid:n.selectBid,onRemoveSearchPanel:n.removeSearchPanel},null,8,["onSelectBid","onRemoveSearchPanel"])):(0,l.kq)("",!0),(0,l._)("span",null,(0,r.zw)(t.$t("message.option_stars"))+" ★"+(0,r.zw)(i.sr),1),vt,(0,l._)("span",null,(0,r.zw)(t.$t("message.option_od"))+" "+(0,r.zw)(i.od),1),Ct,(0,l._)("span",null,(0,r.zw)(t.$t("message.option_objCount"))+" "+(0,r.zw)(i.objCount),1),xt,(0,l._)("span",null,(0,r.zw)(t.$t("message.option_score")),1),(0,l.Wm)(d,{class:"mx-4",min:0,max:1e6,step:1e5,modelValue:i.score,"onUpdate:modelValue":e[1]||(e[1]=t=>i.score=t),onInput:n.cal},null,8,["modelValue","onInput"]),kt,(0,l._)("span",null,"PP："+(0,r.zw)(i.pp),1),Dt,(0,l._)("span",{hidden:i.plotlyReady},"折线图模块加载中....",8,Tt),(0,l._)("div",{id:"graph",hidden:!1===i.plotlyReady},null,8,St)])}var Mt={components:{SearchPanel:mt},name:"SayobotFastView",setup(){if(!window.Plotly){let t=document.createElement("script");t.setAttribute("src","https://cdn.staticfile.org/plotly.js/1.58.5/plotly.min.js"),document.getElementsByTagName("head")[0].appendChild(t)}},data(){return{showSearchPanel:!1,bid:1234567,sr:8,od:8,objCount:2e3,score:1e6,pp:this.$i18n.messages[this.$i18n.locale].message.info_enter_data,plotlyReady:!0}},methods:{cal(){let t={isConvert:!1,sr:this.sr,od:this.od,objCount:this.objCount,isHR:!1,isEZ:!1,isDT:!1,isHT:!1,isNF:!1,score:this.score},e=new G.m(t);if(this.pp=e.totalValue.toFixed(2),window.Plotly){this.plotlyReady=!0;let a=new G.O(t,e.maxScore);window.Plotly.newPlot("graph",[a.getTrace()],a.getLayout(),{scrollZoom:!0,responsive:!0})}else this.plotlyReady=!1},async getData(){try{let t=await ct().search(this.bid);this.sr=t.sr,this.od=t.od,this.objCount=t.objCount,this.cal()}catch(t){this.pp=t}},setSearchPanel(){this.showSearchPanel=!0},selectBid(t){this.bid=t.bid,this.sr=t.sr,this.od=t.od,this.objCount=t.objCount,this.removeSearchPanel(),this.cal()},removeSearchPanel(){this.showSearchPanel=!1}}};const Ot=(0,y.Z)(Mt,[["render",Wt],["__scopeId","data-v-2eb8dbb4"]]);var Vt=Ot;const zt=[{path:"/",name:"home",component:Q},{path:"/sayo",name:"sayo",component:Vt}],Ht=(0,f.p7)({history:(0,f.r5)(),routes:zt});var jt=Ht,Kt=a(6623),Pt=(0,Kt.MT)({state:{},getters:{},mutations:{},actions:{},modules:{}}),Ut=a(3490),Et={page_mania_pp_cal:"Mania PP Calculation",page_mania_pp_cal_sayo:"Get Mapdata From Sayo",page_about:"About",option_mapIsConvert:"Converted",option_mapKeys:"Default Keys:",option_playKeys:"Play Keys:",option_stars:"Stars:",option_stars_with_mods:"Stars(With Mod):",option_od_without_mods:"OD(Without Mod):",option_od_with_mods:"With Mod:",option_od:"OD:",option_objCount:"Objects:",option_score:"Score:",option_maxScore:"Max Score:",option_sayo_only_mania_no_mod:"Mania Map Without Any Mod Only!",button_get_data_from_sayo:"Get Map Data",info_enter_data:"Calculate When Entering Data"},Rt={page_mania_pp_cal:"mania pp计算",page_mania_pp_cal_sayo:"小夜帮填",page_about:"关于",option_mapIsConvert:"转谱",option_mapKeys:"谱面默认键数：",option_playKeys:"游玩键数：",option_stars:"谱面星数：",option_stars_with_mods:"谱面星数（Mod加成后）：",option_od_without_mods:"谱面OD（Mod加成前）：",option_od_with_mods:"加成后：",option_od:"谱面OD：",option_objCount:"谱面物件数：",option_score:"得分：",option_maxScore:"满分：",option_sayo_only_mania_no_mod:"仅只支持mania专谱的无mod成绩！",button_get_data_from_sayo:"从小夜获取数据",info_enter_data:"输入数据立即计算"};const It=(0,Ut.o)({locale:"zh",messages:{en:{message:Et},zh:{message:Rt}}});(0,s.ri)(b).use(Pt).use(jt).use(It).mount("#app")}},e={};function a(s){var i=e[s];if(void 0!==i)return i.exports;var o=e[s]={exports:{}};return t[s](o,o.exports,a),o.exports}a.m=t,function(){var t=[];a.O=function(e,s,i,o){if(!s){var n=1/0;for(h=0;h<t.length;h++){s=t[h][0],i=t[h][1],o=t[h][2];for(var l=!0,r=0;r<s.length;r++)(!1&o||n>=o)&&Object.keys(a.O).every((function(t){return a.O[t](s[r])}))?s.splice(r--,1):(l=!1,o<n&&(n=o));if(l){t.splice(h--,1);var d=i();void 0!==d&&(e=d)}}return e}o=o||0;for(var h=t.length;h>0&&t[h-1][2]>o;h--)t[h]=t[h-1];t[h]=[s,i,o]}}(),function(){a.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return a.d(e,{a:e}),e}}(),function(){a.d=function(t,e){for(var s in e)a.o(e,s)&&!a.o(t,s)&&Object.defineProperty(t,s,{enumerable:!0,get:e[s]})}}(),function(){a.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"===typeof window)return window}}()}(),function(){a.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)}}(),function(){var t={143:0};a.O.j=function(e){return 0===t[e]};var e=function(e,s){var i,o,n=s[0],l=s[1],r=s[2],d=0;if(n.some((function(e){return 0!==t[e]}))){for(i in l)a.o(l,i)&&(a.m[i]=l[i]);if(r)var h=r(a)}for(e&&e(s);d<n.length;d++)o=n[d],a.o(t,o)&&t[o]&&t[o][0](),t[o]=0;return a.O(h)},s=self["webpackChunkosumania_ppcal"]=self["webpackChunkosumania_ppcal"]||[];s.forEach(e.bind(null,0)),s.push=e.bind(null,s.push.bind(s))}();var s=a.O(void 0,[998],(function(){return a(5250)}));s=a.O(s)})();
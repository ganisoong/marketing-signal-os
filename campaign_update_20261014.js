/* Meta Campaigns daily export received 2026-10-14 20:44 KST. Historical overlap 10/7–10/13 verified. */
(function(){
const D=window.SIGNAL_OS_DATA;
if(!D||D.data_end!=="2026-10-13")return;
const checked=[["2026-10-07",11.95,2668,24,11],["2026-10-08",42.80,9256,132,72],["2026-10-09",44.95,10940,158,85],["2026-10-10",65.34,16726,232,96],["2026-10-11",86.91,22519,360,154],["2026-10-12",66.85,17450,237,97],["2026-10-13",80.16,18237,285,128]];
if(!checked.every(([date,sp,im,cl,lp])=>{const x=D.days.find(r=>r.date===date);return x&&Math.abs(x.spend-sp)<.011&&x.impressions===im&&x.clicks===cl&&x.lpv===lp;})){
 console.error("Signal OS: overlapping campaign dates did not reconcile; update skipped.");
 return;
}
const entries=[
[2,"120252790032910529","active","actions:link_click",8.13,1040,21,14,21],
[3,"120252790030140529","active","actions:link_click",8.59,1480,20,11,20],
[4,null,"active","actions:link_click",8.07,2001,39,30,39],
[5,null,"active","actions:link_click",7.70,2087,62,39,62],
[6,"120252745926050529","active","profile_visit_view",13.97,2720,28,0,32],
[7,"120252725830220529","active","profile_visit_view",13.35,2457,24,0,24],
[8,"120252725827270529","inactive","actions:link_click",0,0,0,0,0],
[9,"120252687461960529","inactive","actions:link_click",0,0,0,0,0],
[10,"120252682521260529","inactive","actions:link_click",0,0,0,0,0],
[11,"120252682511880529","inactive","actions:link_click",0,0,0,0,0]
];
const field=i=>Number(entries.reduce((n,r)=>n+r[i],0).toFixed(2));
if(field(4)!==59.81||field(5)!==11785||field(6)!==194||field(7)!==94){console.error("Signal OS daily import failed");return;}
const newTotals={
"120252790032910529":[14.45,1878,32,17,32],
"120252790030140529":[11.97,2340,28,15,28],
"120252745926050529":[61.31,16036,154,0,174],
"120252725830220529":[73.01,16739,214,0,213],
"120252725827270529":[44.28,11386,146,81,146],
"120252687461960529":[38.51,9298,106,58,106],
"120252682521260529":[72.08,19424,292,175,292],
"120252682511880529":[41.87,6333,119,70,119]
};
for(const [id,values] of Object.entries(newTotals)){
 const c=D.campaigns.find(x=>x.id===id),r=entries.find(x=>x[1]===id);
 if(!c||!r){console.error("Campaign mapping missing",id);return;}
 const [sp,im,cl,lp,res]=values;
 Object.assign(c,{spend:sp,impressions:im,clicks:cl,lpv:lp,result:res,
 type:r[3],ctr:cl/im,cpc:sp/cl,cpm:sp/im*1000,lpvrate:lp&&r[3]==="actions:link_click"?lp/cl:null,
 delivery:r[2],delivery_as_of:"2026-10-14",data_through:"2026-10-14"});
}
const dup=entries.filter(x=>x[1]==null),agg=i=>Number(dup.reduce((n,x)=>n+x[i],0).toFixed(2));
const old=D.campaigns.find(x=>x.id==="UNASSIGNED_20261013");
if(!old){console.error("Prior duplicate bucket missing");return;}
D.campaigns.push({id:"UNASSIGNED_20261014",label:"머릿속이 하얘진다면 · 10/14 두 광고 합계",name:old.name.replace("10/13","10/14"),spend:agg(4),impressions:agg(5),clicks:agg(6),lpv:agg(7),result:agg(8),type:"actions:link_click",
 start:"2026-10-14",first:"2026-10-14",data_through:"2026-10-14",ctr:agg(6)/agg(5),cpc:agg(4)/agg(6),cpm:1000*agg(4)/agg(5),lpvrate:agg(7)/agg(6),
 delivery:"active",delivery_as_of:"2026-10-14",identity_note:"캠페인 ID가 없어 같은 제목 광고 2개 합산. 원본 CSV 행 4, 5. A/B 구분 불가"});
D.latestCampaignSnapshot=entries.map(r=>({source_row:r[0],date:"2026-10-14",campaign_id:r[1],delivery:r[2],result_type:r[3],spend:r[4],impressions:r[5],link_clicks:r[6],landing_page_views:r[7],results:r[8],campaign_label:r[1]?D.campaigns.find(c=>c.id===r[1])?.label:"동일 제목 광고 2개 중 하나 · ID 미제공",identity_method:r[1]?"고유 캠페인명 임시 연결":"동일 제목이어서 캠페인 ID 분리 불가"}));
D.daily.push(...entries.filter(r=>r[1]).map(r=>({date:"2026-10-14",id:r[1],spend:r[4],impressions:r[5],clicks:r[6],lpv:r[7],result:r[8],type:r[3],delivery:r[2],source_row:r[0]})),
 {date:"2026-10-14",id:"UNASSIGNED_20261014",spend:agg(4),impressions:agg(5),clicks:agg(6),lpv:agg(7),result:agg(8),type:"actions:link_click",delivery:"active",campaign_count:2,source_rows:[4,5]});
D.unallocated.push({name:old.name.replace("10/13","10/14"),ids:["120252750718860529","120252750732410529"],spend:agg(4),impressions:agg(5),clicks:agg(6),lpv:agg(7),date:"2026-10-14",note:"Meta export omitted campaign ID. Two identically named campaigns; not assigned to either A/B."});
D.days.push({date:"2026-10-14",spend:59.81,impressions:11785,clicks:194,lpv:94,active:6,ctr:194/11785,cpc:59.81/194,result_link:142,result_profile:56});
Object.assign(D.summary,{spend:458.77,impressions:109581,clicks:1622,lpv:737,active_count:6,ctr:1622/109581,cpc:458.77/1622,cpm:458.77/109581*1000});
D.data_end="2026-10-14";D.last_upload="2026-10-14 20:44 KST (수신 기준, 당일 집계)";
D.lastDay={date:"2026-10-14",spend:59.81,impressions:11785,clicks:194,lpv:94,ctr:194/11785,cpc:59.81/194,active:6};
D.demographics_history_through="2026-10-13";
D.latestCampaignDelivery={as_of:"2026-10-14",active:6,inactive:4,source:"979718671826640-Campaigns-Oct-7-2026-Oct-14-2026.csv",id_quality:"CSV lacks Campaign ID; unique names provisionally joined, duplicate title unassigned"};
D.sourcefiles.push({title:D.latestCampaignDelivery.source,rows:80,kind:"Campaigns/day",period:"2026-10-07 to 2026-10-14",overlap:"10/7–10/13 verified; 10/14 only added",campaign_id_present:false});
D.uploads.push({at:"2026-10-14 20:44 KST (수신)",title:"캠페인 일별 성과 80행",period:"10/07—10/14",detail:"기존 70행 중복 제외, 10/14 신규 10행만 반영: $59.81/11,785 노출/194 링크 클릭/94 랜딩. active 6, inactive 4.",new:"생기부 광고 2개 41클릭·25 랜딩, 하얘진다면 두 광고 합계 101클릭·69 랜딩. Campaign ID 없음.",status:"10/14 당일 중간 집계"});
})();
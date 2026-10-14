'use strict';
const DB=window.SIGNAL_OS_DATA;
if (!DB || !DB.summary) throw new Error('마케팅 데이터가 로드되지 않았습니다.');
const el=(id)=>document.getElementById(id);
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const number=(v,d=0)=>v==null?'—':Number(v).toLocaleString('en-US',{minimumFractionDigits:d,maximumFractionDigits:d});
const money=(v,d=2)=>v==null?'—':'$'+number(v,d);
const pct=(v,d=2)=>v==null?'—':number(v*100,d)+'%';
const probFmt=(p)=>p>=.999?'≥99.9%':pct(p,1);
const get=(id)=>DB.campaigns.find(x=>x.id===id);
let activePage='operations', trend='cpc', dataTab='campaigns',tableRows=[];
function navigate(page){activePage=page;document.querySelectorAll('.page').forEach(x=>x.classList.toggle('active',x.id===page));document.querySelectorAll('[data-page]').forEach(x=>x.classList.toggle('active',x.classList.contains('nav-btn')&&x.dataset.page===page));window.scrollTo({top:0,behavior:'auto'}); if(page==='archive')renderTable();if(page==='lab')renderCompare();if(page==='overview')renderTrend();}
document.querySelectorAll('[data-page]').forEach(b=>b.addEventListener('click',()=>navigate(b.dataset.page)));
function renderMetrics(){const m=[['광고비',money(DB.summary.spend,2),'SPEND',`${DB.range[0].slice(5).replace('-','/')}–${DB.range[1].slice(5).replace('-','/')} 집계 · 겹치는 기간 제거`],['링크 클릭',number(DB.summary.clicks),'LINK CLICKS','웹사이트 링크 클릭 집계'],['링크 CTR',pct(DB.summary.ctr,2),'ENGAGEMENT','노출 대비 링크 클릭 비율'],['링크 CPC',money(DB.summary.cpc,3),'COST','링크 클릭 1회당 평균 비용']];
 el('metrics').innerHTML=m.map(x=>`<div class="metric"><div class="metric-top"><span>${esc(x[0])}</span><span class="metric-kicker">${x[2]}</span></div><div class="metric-value">${esc(x[1])}</div><div class="metric-foot">${esc(x[3])}</div></div>`).join('');el('miniCpm').textContent=money(DB.summary.cpm,2);el('miniLpv').textContent=number(DB.summary.lpv)+'회 · 해당 목표에서 제공된 지표';}
const PROBCARDS=[
 {type:'소재별 클릭률',key:'B_ctr_gt_A',head:'같은 주제 광고 B가 A보다 더 잘 클릭된 것으로 보일까?',subject:'「면접장에서 머릿속이 하얘진다면?」 광고 2개 · 10월 12일까지 개별 캠페인 비교',verdict:'클릭률은 B 우위. 하지만 최종 광고 승자는 미정.',summary:'B의 링크 CTR은 2.09%, A는 1.71%입니다. 반면 클릭당 비용은 A $0.206 / B $0.208로 거의 같고, A의 랜딩 조회 비용이 더 낮습니다.',evidence:[{title:'광고 A · 캠페인 끝 718860',detail:'노출 8,322 · 클릭 142 · CTR 1.71% · CPC $0.206',id:'120252750718860529'},{title:'광고 B · 캠페인 끝 732410',detail:'노출 5,935 · 클릭 124 · CTR 2.09% · CPC $0.208',id:'120252750732410529'}],caution:'10/13 광고 실적은 동일 제목의 두 광고를 구분하지 못했습니다. 위 비교는 10/12까지만 적용됩니다. 타겟·배치·시기 차이가 있을 수 있습니다.',action:'다음 실험: 타겟·게재 위치를 통제하고 썸네일 또는 첫 문구만 바꿔 CTR과 랜딩 조회 비용을 함께 비교하세요.',source:'Meta 캠페인별 10/12 누적 CSV · 캠페인 ID 718860 / 732410'},
 {type:'클릭 후 랜딩 도달',key:'A_lpv_rate_gt_B',head:'같은 주제 광고 A는 클릭 이후 랜딩페이지까지 더 잘 도달했을까?',subject:'「면접장에서 머릿속이 하얘진다면?」 광고 2개 · 10월 12일까지',verdict:'A의 랜딩 도달 비율은 더 높을 가능성. 추가 표본 필요.',summary:'링크를 클릭한 사람 중 랜딩페이지 조회로 이어진 비율은 A 60.6%, B 53.2%입니다. 다만 랜딩 지표는 페이지 속도나 추적 설정에도 영향을 받습니다.',evidence:[{title:'광고 A · 캠페인 끝 718860',detail:'클릭 142 → 랜딩 조회 86 · 전환 비율 60.6% · 랜딩당 $0.340',id:'120252750718860529'},{title:'광고 B · 캠페인 끝 732410',detail:'클릭 124 → 랜딩 조회 66 · 전환 비율 53.2% · 랜딩당 $0.390',id:'120252750732410529'}],caution:'랜딩 도달 비율은 실제 구매·팔로우 전환율이 아닙니다. 클릭과 랜딩 추적은 독립 시행이 아닐 수 있습니다.',action:'다음 실험: 두 광고의 실제 연결 URL·랜딩 속도·CTA·추적 조건을 확인하세요.',source:'Meta Ads 링크 클릭·Landing Page Views · 10/12까지'},
 {type:'전체 광고의 연령별 반응',key:'age_25_34_ctr_gt_18_24',head:'25~34세에서 클릭률이 더 높았다는 말은 어느 게시물의 결과일까?',subject:'특정 게시물 하나가 아니라 여러 캠페인의 연령별 노출·클릭을 합산한 비교',verdict:'관측된 CTR은 25~34세가 높음. 최적 타겟이라는 뜻은 아님.',summary:'25~34세: 32,473회 노출에 527클릭(1.62%). 18~24세: 41,115회 노출에 461클릭(1.12%). 아래를 누르면 실제 기여 게시물별 클릭 수가 펼쳐집니다.',cohorts:[{label:'25~34세',type:'age',value:'25-34'},{label:'18~24세',type:'age',value:'18-24'}],caution:'캠페인별 예산·소재·설정이 섞여 있어 연령 때문이라고 확정할 수 없습니다. 같은 제목의 광고 2개는 분류 CSV에 캠페인 ID가 없어 합산되어 있습니다.',action:'다음 실험: 실제 문의·상담 전환을 확보한 뒤, 동일한 소재·예산 조건에서 연령별 반응을 비교하세요.',source:'Meta Age × Gender Breakdown CSV · 9/13~10/13 · 캠페인 여러 개 합산'},
 {type:'날짜별 CTR 변화',key:'Oct13_ctr_gt_Oct12',head:'10월 13일 클릭률이 12일보다 높았던 이유는?',subject:'같은 게시물 A/B가 아닌 서로 다른 날짜의 광고 전체 비교',verdict:'CTR은 상승했지만 어떤 소재가 원인인지는 확정 불가.',summary:'10/12: 17,450회 노출에 237클릭(1.36%). 10/13: 18,237회 노출에 285클릭(1.56%). 두 날은 집행 중인 광고 구성이 다릅니다.',dates:['2026-10-12','2026-10-13'],caution:'다른 날짜에는 다른 광고가 집행됐을 수 있습니다. 클릭당 비용은 $0.282 → $0.281로 거의 변하지 않았습니다.',action:'다음 실험: 일별 캠페인별 지출 비중과 신규 소재 효과를 분리해 확인하세요.',source:'Meta 날짜별 캠페인 · 10/12와 10/13'},
 {type:'전체 광고의 성별 반응',key:'female_ctr_gt_male',head:'여성이 남성보다 더 클릭했다는 근거가 되는 게시물은?',subject:'특정 게시물 하나가 아니라 여러 광고에서 실제 노출된 성별 그룹 비교',verdict:'여성 노출 그룹에서 CTR이 높음. 여성만 타겟하라는 뜻은 아님.',summary:'여성: 50,542회 노출에 854클릭(1.69%). 남성: 46,529회 노출에 560클릭(1.20%). 어떤 게시물이 클릭을 만들었는지는 아래에 표시합니다.',cohorts:[{label:'여성',type:'gender',value:'female'},{label:'남성',type:'gender',value:'male'}],caution:'광고가 남녀에게 동등한 조건으로 무작위 노출된 실험이 아닙니다. 유료 전환·매출 자료도 없습니다.',action:'다음 실험: 성별 최종 전환 자료를 확보하고 같은 소재·게재 위치로 비교하세요.',source:'Meta Age × Gender Breakdown CSV · 9/13~10/13'}
];
function evidencePostButton(id,label){
 return '<button type="button" class="evidence-post-link" data-evidence-post="'+esc(id)+'">'+esc(label||'이 광고 상세 보기')+' ↗</button>';
}
function evidenceSourceLink(c){
 const parts=(c.evidence||[]).map(v=>'<li><div><strong>'+esc(v.title)+'</strong><p>'+esc(v.detail)+'</p></div>'+evidencePostButton(v.id,'성과·설정·썸네일 보기')+'</li>');
 return '<ul class="prob-evidence-list">'+parts.join('')+'</ul>';
}
function contributorNames(names){
 const norm=v=>String(v||'').replace(/\s+/g,' ').trim();
 const matches=DB.campaigns.filter(x=>norm(x.name)===norm(names));
 return matches.length===1?matches[0].id:null;
}
function contributorRows(type,value){
 const map=new Map();
 for(const a of DB.ageRaw||[]){
  if(a[type]!==value)continue;
  const k=String(a.name||'');
  let cur=map.get(k);
  if(!cur){cur={name:k,clicks:0,impressions:0};map.set(k,cur);}
  cur.clicks+=Number(a.clicks||0);cur.impressions+=Number(a.impressions||0);
 }
 return [...map.values()].sort((a,b)=>b.clicks-a.clicks);
}
function cohortEvidence(c){
 return '<div class="prob-cohort-grid">'+c.cohorts.map(g=>{
  const rows=contributorRows(g.type,g.value),totalClicks=rows.reduce((sum,r)=>sum+r.clicks,0),totalImps=rows.reduce((sum,r)=>sum+r.impressions,0);
  const top=rows.slice(0,5).map((r,i)=>{
   const id=contributorNames(r.name),title=r.name.replace(/^Instagram 게시물:\s*/,'').replace(/\s+/g,' ').trim();
   return '<li><div><strong>'+esc(title)+'</strong><p>클릭 '+number(r.clicks)+' · 노출 '+number(r.impressions)+' · CTR '+pct(r.impressions?r.clicks/r.impressions:null,2)+(id?'':' · 동일 제목 광고 합산 또는 ID 확인 필요')+'</p></div>'+(id?evidencePostButton(id,'게시물 보기'):'')+'</li>';
  }).join('');
  return '<section class="cohort-block"><h4>'+esc(g.label)+' · '+number(totalClicks)+'클릭 / '+number(totalImps)+'노출</h4><ol class="prob-evidence-list">'+top+'</ol><p class="prob-disclaimer">많이 클릭된 순서이며, 해당 연령에서 어떤 썸네일이 더 잘 작동하는지 검증한 순위는 아닙니다.</p></section>';
 }).join('')+'</div>';
}
function dailyEvidence(c){
 return '<div class="prob-cohort-grid">'+c.dates.map(date=>{
  const map=new Map();
  for(const r of DB.ageRaw||[]){if(r.date!==date)continue;const k=r.name;const q=map.get(k)||{name:k,clicks:0,impressions:0};q.clicks+=r.clicks||0;q.impressions+=r.impressions||0;map.set(k,q);}
  const top=[...map.values()].sort((a,b)=>b.clicks-a.clicks).slice(0,4);
  return '<section class="cohort-block"><h4>'+esc(date)+' · 클릭 기여 게시물</h4><ol class="prob-evidence-list">'+top.map(r=>'<li><div><strong>'+esc(r.name.replace(/^Instagram 게시물:\s*/,'').replace(/\s+/g,' '))+'</strong><p>'+number(r.clicks)+'클릭 / '+number(r.impressions)+'노출</p></div></li>').join('')+'</ol></section>';
 }).join('')+'</div>';
}
function probabilityCard(c,compact=false){
 const p=DB.prob[c.key];
 const summary='<p class="prob-explain">'+esc(c.summary)+'</p>';
 const source='<p class="prob-source">자료: '+esc(c.source)+'</p>';
 const deeper=c.evidence?evidenceSourceLink(c):c.cohorts?cohortEvidence(c):c.dates?dailyEvidence(c):'';
 return '<article class="prob-card proof-card"><div class="prob-top"><span class="prob-type">'+esc(c.type)+'</span><span class="badge">모형 기반 · 미래 성공률 아님</span></div>'+
  '<h3>'+esc(c.head)+'</h3><p class="proof-scope">'+esc(c.subject)+'</p>'+
  '<div class="prob-verdict"><span>현재 판단</span><strong>'+esc(c.verdict)+'</strong></div>'+summary+
  '<div class="proof-probability"><span>관측 자료에 단순 확률 모형을 적용한 결과</span><strong>'+probFmt(p)+'</strong><small>상대 지표의 우위 확률 · 광고 승률 아님</small></div>'+
  '<div class="bar-track"><div class="bar-fill" style="width:'+Math.min(100,p*100)+'%"></div></div>'+
  '<details class="prob-proof" '+(!compact?'open':'')+'><summary>어떤 광고·수치가 근거인지 보기 <span aria-hidden="true">⌄</span></summary><div class="proof-inner">'+deeper+source+'</div></details>'+
  (!compact?'<div class="proof-action"><b>그래서 다음엔?</b><p>'+esc(c.action)+'</p></div><p class="prob-disclaimer">주의: '+esc(c.caution)+'</p>':'')+
  '</article>';
}
function renderProb(){
 el('probCards').innerHTML=PROBCARDS.map(x=>probabilityCard(x)).join('');
 el('overviewProb').innerHTML=PROBCARDS.slice(0,2).map(x=>probabilityCard(x,true)).join('');
 for(const b of document.querySelectorAll('[data-evidence-post]')){
   b.addEventListener('click',()=>{navigate('posts');openPost(b.dataset.evidencePost);});
 }
}
function niceMax(max){let step=Math.pow(10,Math.floor(Math.log10(max||1)));let n=Math.ceil(max/step);if(n<=2)return 2*step;if(n<=5)return 5*step;return 10*step;}
function renderTrend(){const items=DB.days.filter(x=>x.spend>0), labels=items.map(x=>x.date.slice(5).replace('-','/')), field=trend;
 const formatY=x=>field==='ctr'?pct(x,1):field==='cpc'?money(x,2):money(x,0);
 const vals=items.map(d=>d[field]||0), max=niceMax(Math.max(...vals)*1.12), width=910,height=240,ml=72,mr=25,mt=15,mb=34, ch=height-mt-mb,cw=width-ml-mr;
 const point=(i,v)=>[ml+i*cw/(vals.length-1),mt+ch*(1-v/max)];
 let ticks='';for(let j=0;j<=4;j++){let n=max*j/4,y=mt+ch-ch*j/4;ticks+=`<line x1="${ml}" y1="${y}" x2="${width-mr}" y2="${y}" stroke="#eaf0ed"/><text x="${ml-11}" y="${y+4}" fill="#82938c" font-size="10" text-anchor="end">${formatY(n)}</text>`}
 let points=vals.map((v,i)=>point(i,v));let path=points.map(([x,y],i)=>(i===0?'M':'L')+x.toFixed(1)+','+y.toFixed(1)).join(' ');
 let area=path+` L${points[points.length-1][0]},${mt+ch} L${points[0][0]},${mt+ch} Z`;
 let bottom=labels.map((l,i)=>`<text x="${points[i][0]}" y="${height-8}" fill="#708780" text-anchor="middle" font-size="11">${l}</text>`).join('');
 let circles=points.map(([x,y],i)=>`<circle cx="${x}" cy="${y}" r="5" stroke="#fff" stroke-width="2.3" fill="#176d65"><title>${labels[i]} · ${formatY(vals[i])}</title></circle>`).join('');
 let valueLabels=points.map(([x,y],i)=>`<text x="${x}" y="${y-15}" fill="#0b6761" font-size="11" font-weight="750" text-anchor="middle">${formatY(vals[i])}</text>`).join('');
 el('trendChart').innerHTML=`<svg role="img" aria-label="${field}의 집행일별 추이" viewBox="0 0 ${width} ${height}" preserveAspectRatio="none"><defs><linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#58a78d" stop-opacity=".19"/><stop offset="100%" stop-color="#58a78d" stop-opacity="0"/></linearGradient></defs>${ticks}<path d="${area}" fill="url(#chartFill)"/><path d="${path}" fill="none" stroke="#146f65" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>${circles}${valueLabels}${bottom}</svg>`;
 el('trendTitle').textContent=field==='ctr'?'링크 CTR 추이':field==='spend'?'일별 광고비 추이':'링크 CPC 추이';
 document.querySelectorAll('[data-trend]').forEach(b=>b.classList.toggle('active',b.dataset.trend===field));}
document.querySelectorAll('[data-trend]').forEach(b=>b.addEventListener('click',()=>{trend=b.dataset.trend;renderTrend()}));
const COMPARISONS={
 blank:{ids:['120252750718860529','120252750732410529'],sub:'같은 주제 · 두 캠페인 모두 10/10 시작, 링크 클릭 결과 기록. 각 광고의 실제 타겟/게재 위치 설정은 아직 확인되지 않았습니다.',conclusion:'B는 클릭률 우위, A는 클릭→랜딩 조회율과 랜딩 조회당 비용에서 관찰상 우위입니다. CTR만 보고 승자를 정하면 중요한 단계를 놓칠 수 있습니다.'},
 memory:{ids:['120252682521260529','120252682511880529'],sub:'비슷한 메시지군 · 두 캠페인 모두 10/07 시작. CTR만으로 판단하면 CPM 차이를 놓칩니다.',conclusion:'예상질문 암기 광고의 CTR은 높지만, 지원동기 암기 광고는 CPM이 낮아 링크 CPC가 약 30% 더 저렴합니다. 이는 오디언스/시점/소재 차이 때문일 수 있습니다.'},
 entrance:{ids:['120252725827270529','120252725830220529'],sub:'비슷한 메시지 · 첫 번째는 링크 클릭, 두 번째는 인스타그램 프로필 방문을 결과로 집계합니다.',conclusion:'두 광고의 “Results”와 “Cost per result”는 서로 다른 행동을 뜻하므로 직접 비교해 승자를 정할 수 없습니다. 공통 지표인 링크 CPC는 보조 지표로만 확인하세요.'}
};
function renderCompare(){const key=el('comparisonGroup').value,c=COMPARISONS[key],p=c.ids.map(get);el('comparisonSub').textContent=c.sub;
 const cols=['클릭당 비용 (CPC)','클릭률 (CTR)','노출 단가 (CPM)','링크 클릭','랜딩 조회','랜딩 조회당 비용','결과 목표'];
 const fmtCell=(k,a)=>{if(k===0)return money(a.cpc,3);if(k===1)return pct(a.ctr,2);if(k===2)return money(a.cpm,2);if(k===3)return number(a.clicks);if(k===4)return a.type==='actions:link_click'?number(a.lpv):'미제공';if(k===5)return a.type==='actions:link_click'&&a.lpv?money(a.spend/a.lpv,3):'비교 불가';return a.type==='profile_visit_view'?'프로필 방문':'링크 클릭'};
 let html=`<div class="key-row"><span class="key-pill">A · ${esc(p[0].label)}</span><span class="key-pill">B · ${esc(p[1].label)}</span></div><table class="compare-table"><thead><tr><th style="width:40%">비교 지표</th><th style="width:30%">A 캠페인</th><th style="width:30%">B 캠페인</th></tr></thead><tbody>`;
 cols.forEach((label,i)=>{const better=i===0||i===2||i===5?'lower':i===1||i===3||i===4?'higher':null;let a=fmtCell(i,p[0]),b=fmtCell(i,p[1]);let lead=-1;
 if(better){let va=i===0?p[0].cpc:i===1?p[0].ctr:i===2?p[0].cpm:i===3?p[0].clicks:i===4?p[0].lpv:p[0].lpv?p[0].spend/p[0].lpv:null;
 let vb=i===0?p[1].cpc:i===1?p[1].ctr:i===2?p[1].cpm:i===3?p[1].clicks:i===4?p[1].lpv:p[1].lpv?p[1].spend/p[1].lpv:null;
 if(va!=null&&vb!=null)lead=better==='lower'?(va<vb?0:1):(va>vb?0:1)}
 html+=`<tr><td class="metric-label">${esc(label)}</td><td class="${lead===0?'winner':''}">${esc(a)}</td><td class="${lead===1?'winner':''}">${esc(b)}</td></tr>`});html+='</tbody></table>';el('comparison').innerHTML=html;el('comparisonConclusion').textContent=c.conclusion;}
el('comparisonGroup').addEventListener('change',renderCompare);
function renderExperiments(){el('experimentList').innerHTML=DB.experiments.map(x=>`<article class="experiment"><div class="exp-top"><span class="num-pill">${esc(x.id)}</span><span class="exp-kind">${esc(x.tag)}</span><span class="exp-status">${esc(x.status)}</span></div><h3>${esc(x.title)}</h3><p class="sub">${esc(x.hypothesis)}</p><div class="experiment-grid"><div class="exp-block"><h4>어떻게 검증할까?</h4><p>${esc(x.design)}</p></div><div class="exp-block"><h4>판단 지표</h4><p>${x.metrics.map(m=>'· '+esc(m)).join('<br/>')}</p></div><div class="exp-block"><h4>다음 점검 시점</h4><p>${esc(x.trigger)}</p></div></div><div class="exp-btm">⚠ ${esc(x.risk)}</div></article>`).join('');}
const FIELDS={
 campaigns:{label:'캠페인 (10개 + ID 미분리 1행)',note:'기간 합계. 캠페인별 도달 합산은 하지 않았습니다. 10/13 신규 집행 2개 포함. 동일 이름 2개 캠페인의 당일 합계는 ID 미분리 그룹으로 별도 표시합니다.',cols:[['label','캠페인'],['id','캠페인 ID'],['start','시작일'],['spend','지출'],['impressions','노출'],['clicks','링크 클릭'],['ctr','링크 CTR'],['cpc','링크 CPC'],['lpv','LPV'],['type','결과 유형']]},
 daily:{label:'일별 실적 (307)',note:'기존 ID별 300행 + 10/13 이름별 7행(동명 2개 통합 1행). 10/13에는 Campaign ID 없어서 일부 매칭 유보.',cols:[['date','날짜'],['id','캠페인 ID'],['spend','지출'],['impressions','노출'],['clicks','링크 클릭'],['reach','도달 (일별)'],['lpv','LPV'],['result','결과 수'],['type','결과 유형']]},
 age:{label:'연령/성별 (580)',note:'최신 파일 580행으로 교체(10/07~13). Results는 캠페인 합계와 다를 수 있어 제외, 캠페인 ID 없음.',cols:[['date','날짜'],['name','캠페인명'],['age','노출 연령'],['gender','성별'],['spend','지출'],['impressions','노출'],['clicks','링크 클릭'],['lpv','LPV']]},
 adsets:{label:'광고 세트 (300)',note:'광고 세트 ID는 원본에 없으며 캠페인 ID로 연결합니다. Meta에서 광고세트별 상세 타겟 설정은 제공되지 않았습니다.',cols:[['date','날짜'],['campaign_id','캠페인 ID'],['name','광고 세트'],['starts','광고 세트 시작'],['budget','예산 위치'],['spent','지출'],['impressions','노출'],['clicks','링크 클릭'],['lpv','LPV']]},
 adsetsNew:{label:'광고세트 연령·성별 (580)',note:'새 CSV의 580행, Campaign ID와 광고 세트 ID가 없습니다. 원본 분류 그대로 보관(전체 합계에 이중 반영 금지).',cols:[['date','날짜'],['name','광고 세트'],['age','연령'],['gender','성별'],['spend','광고비'],['impressions','노출'],['clicks','클릭'],['lpv','LPV'],['starts','시작일']]},
 adsNew:{label:'광고 연령·성별 (580)',note:'새 CSV의 580행으로 광고 ID는 없습니다. 광고 품질 순위는 값이 있는 경우에만 표시합니다.',cols:[['date','날짜'],['name','광고명'],['age','연령'],['gender','성별'],['spend','광고비'],['impressions','노출'],['clicks','클릭'],['lpv','LPV'],['quality','품질 순위']]},
 ads:{label:'광고 (10)',note:'광고 ID 미제공. 지출·노출·클릭 값이 유일하게 일치한 광고만 캠페인 ID를 임시 연결했습니다.',cols:[['name','광고 이름'],['campaign_id_inferred','임시 캠페인 ID'],['spent','지출'],['impressions','노출'],['clicks','링크 클릭'],['lpv','LPV'],['quality','품질 순위'],['engagement_rank','참여율 순위'],['conversion_rank','전환율 순위']]},
 demographic:{label:'연령 집계',note:'실제 노출된 그룹별 집계이며 설정한 타겟을 의미하지 않습니다.',cols:[['key','분류'],['spend','지출'],['impressions','노출'],['clicks','링크 클릭'],['ctr','CTR'],['cpc','CPC'],['lpv','LPV']]}
};
const getRows=tab=>({campaigns:DB.campaigns,daily:DB.daily,age:DB.ageRaw,adsets:DB.adsets,adsetsNew:DB.latestAdsetBreakdown,adsNew:DB.latestAdBreakdown,ads:DB.ads,demographic:DB.demographics}[tab]||[]);
const fmtRecord=(val,key)=>val==null?'—': ['spend','spent','cpc','cpm'].includes(key)?money(val,key==='cpc'?3:2):['ctr','lpvrate'].includes(key)?pct(val):typeof val==='number'?number(val,Number.isInteger(val)?0:2):String(val);
function renderDataTabs(){el('dataTabs').innerHTML=Object.entries(FIELDS).map(([k,v])=>`<button class="${k===dataTab?'active':''}" data-tab="${k}">${esc(v.label)}</button>`).join('');document.querySelectorAll('[data-tab]').forEach(b=>b.addEventListener('click',()=>{dataTab=b.dataset.tab;el('tableSearch').value='';renderDataTabs();renderTable()}));}
function renderTable(){const t=FIELDS[dataTab],needle=el('tableSearch').value.trim().toLowerCase(),all=getRows(dataTab);
 tableRows=needle?all.filter(r=>JSON.stringify(r).toLowerCase().includes(needle)):all;
 el('rowCount').textContent=`${number(tableRows.length)} / ${number(all.length)}행 표시`;
 el('tableHead').innerHTML='<tr>'+t.cols.map(c=>'<th>'+esc(c[1])+'</th>').join('')+'</tr>';
 const show=tableRows.slice(0,220);el('tableBody').innerHTML=show.map(r=>'<tr>'+t.cols.map(([key])=>`<td title="${esc(String(r[key]??''))}">${esc(fmtRecord(r[key],key))}</td>`).join('')+'</tr>').join('') || `<tr><td colspan="${t.cols.length}" class="empty">검색 결과가 없습니다.</td></tr>`;
 el('tableNote').textContent=t.note+(tableRows.length>220?` 화면에는 앞의 220행만 표시합니다. CSV 내보내기에는 검색된 ${number(tableRows.length)}행이 모두 포함됩니다.`:'');}
el('tableSearch').addEventListener('input',renderTable);
function csvEscape(v){const s=String(v??'');return '"'+s.replace(/"/g,'""')+'"'}
function fileDownload(contents,filename,mime){const blob=new Blob([contents],{type:mime}),link=document.createElement('a');link.href=URL.createObjectURL(blob);link.download=filename;document.body.appendChild(link);link.click();link.remove();setTimeout(()=>URL.revokeObjectURL(link.href),1000)}
el('exportData').addEventListener('click',()=>fileDownload(JSON.stringify(DB,null,2),`signal_os_backup_${DB.data_end}.json`,'application/json'));
el('exportCSV').addEventListener('click',()=>{const cols=FIELDS[dataTab].cols;const lines=[cols.map(x=>csvEscape(x[1])).join(',')].concat(tableRows.map(r=>cols.map(([key])=>csvEscape(fmtRecord(r[key],key))).join(',')));fileDownload('\uFEFF'+lines.join('\r\n'),`signal_os_${dataTab}_${DB.data_end}.csv`,'text/csv;charset=utf-8')});
function renderArchive(){el('uploadHistory').innerHTML=DB.uploads.slice().reverse().map(u=>`<div class="brief-entry"><div class="flex" style="justify-content:space-between"><time>${esc(u.at)}</time><span class="badge ${u.status==='ID 미매칭'?'warn':''}">${esc(u.status)}</span></div><h4>${esc(u.title)}</h4><p>${esc(u.detail)}</p><div class="tiny" style="margin-top:8px;color:var(--teal)">${esc(u.new)}</div><div class="tiny" style="margin-top:9px">조회 기간: ${esc(u.period)}</div></div>`).join('');
 el('caveats').innerHTML='<strong>주의사항</strong><br/>'+DB.caveats.map((x,i)=>`${i+1}. ${esc(x)}`).join('<br/>');el('sourcesList').innerHTML='<b>원본 파일별 기록:</b> '+DB.sourcefiles.map(x=>esc(x.title)+' ('+number(x.rows)+'행)').join(' · ');el('footDate').textContent=' / 데이터 최신 '+DB.last_upload;}
renderMetrics();renderProb();renderTrend();renderCompare();renderExperiments();renderDataTabs();renderTable();renderArchive();

(function(){
  const fmtK=s=>String(s||'').replaceAll('-', '.');
  const start=DB.range?.[0], end=DB.range?.[1];
  const rangeNode=document.querySelector('.side-date');
  if(rangeNode && start && end) rangeNode.textContent=`${fmtK(start)} — ${fmtK(end)}`;
  const dateNode=document.querySelector('.side-help');
  if(dateNode) dateNode.innerHTML=`Meta 광고 관리자 데이터 스냅샷<br>마지막 분석: ${esc(DB.last_upload||DB.created)}<br>집계 통화 USD`;
  const topNode=document.querySelector('.top-meta');
  if(topNode) topNode.textContent=`DATA v${DB.version} · ${DB.data_end}까지 · 마지막 자료 ${DB.last_upload||'—'}`;
  const status=document.getElementById('onlineStatus');
  if(status)status.textContent=`최신 데이터 불러옴 · ${DB.data_end}까지`;
})();



// DECISION-FIRST HERO. Compute from source records, never mix profile-visit objective clicks with LPV denominator.
function normalizeCampaignName(value){return String(value||'').replace(/\s+/g,' ').trim();}
function linksEligible(name){
 const matches=DB.campaigns.filter(x=>!String(x.id).startsWith('UNASSIGNED')&&normalizeCampaignName(x.name)===normalizeCampaignName(name));
 return matches.length>0 && matches.every(x=>x.type==='actions:link_click');
}
function landingGroup(ages,onlyName){
 const set=new Set(ages), acc={allSpend:0,allImpressions:0,allClicks:0,linkSpend:0,linkImpressions:0,linkClicks:0,lpv:0};
 for(const r of DB.ageRaw||[]){
  if(!set.has(r.age))continue;
  if(onlyName&&normalizeCampaignName(r.name)!==normalizeCampaignName(onlyName))continue;
  acc.allSpend+=Number(r.spend)||0;acc.allImpressions+=Number(r.impressions)||0;acc.allClicks+=Number(r.clicks)||0;
  if(linksEligible(r.name)){
   acc.linkSpend+=Number(r.spend)||0;acc.linkImpressions+=Number(r.impressions)||0;
   acc.linkClicks+=Number(r.clicks)||0;acc.lpv+=Number(r.lpv)||0;
  }
 }
 acc.ctr=acc.allImpressions?acc.allClicks/acc.allImpressions:null;
 acc.rate=acc.linkClicks?acc.lpv/acc.linkClicks:null;
 acc.lpvCost=acc.lpv?acc.linkSpend/acc.lpv:null;
 return acc;
}
function comparisonLine(head,young,older){
 return '<div class="visit-compare-row">'+
  '<div class="visit-compare-name">'+esc(head)+'</div>'+
  '<div class="visit-compare-cell"><strong>'+pct(young.rate,1)+'</strong><span>'+number(young.lpv)+'회 / '+number(young.linkClicks)+'클릭</span></div>'+
  '<div class="visit-compare-cell"><strong>'+pct(older.rate,1)+'</strong><span>'+number(older.lpv)+'회 / '+number(older.linkClicks)+'클릭</span></div></div>';
}
function decisionExemplar(id,positive){
 const campaign=get(id);
 if(!campaign)return '';
 const young=landingGroup(['18-24','25-34'],campaign.name),older=landingGroup(['35-44','45-54'],campaign.name);
 const youngWins=young.rate>older.rate;
 const olderWins=older.rate>young.rate;
 return '<article class="visit-example">'+
 '<div class="visit-example-meta"><span class="signal-flag '+(positive?'good':'neutral')+'">'+(positive?'가설을 지지하는 사례':'반대 사례도 있음')+'</span>'+
 '<button class="action evidence-post-link" data-decision-post="'+esc(id)+'">게시물·설정 보기 ↗</button></div>'+
 '<h4>'+esc(campaign.label)+'</h4>'+
 '<div class="visit-example-columns"><div><span>18~34세 랜딩 도달 비율</span><strong>'+pct(young.rate,1)+'</strong><small>'+number(young.lpv)+'회 / '+number(young.linkClicks)+'클릭 · 랜딩당 '+money(young.lpvCost,3)+'</small></div>'+
 '<div><span>35~54세 랜딩 도달 비율</span><strong>'+pct(older.rate,1)+'</strong><small>'+number(older.lpv)+'회 / '+number(older.linkClicks)+'클릭 · 랜딩당 '+money(older.lpvCost,3)+'</small></div></div>'+
 '<p>'+(olderWins?'이 소재에서는 35~54세의 클릭 후 랜딩 도달 비율이 더 높았습니다.':youngWins?'이 소재에서는 오히려 18~34세의 랜딩 도달 비율이 더 높습니다.':'두 그룹의 랜딩 도달 비율이 같습니다.')+' 타겟 설정이 같았다는 증거는 없습니다.</p>'+
 '</article>';
}
function renderDecisionDesk(){
 const holder=el('decisionDesk');if(!holder)return;
 const younger=landingGroup(['18-24','25-34']),older=landingGroup(['35-44','45-54']);
 const percentPoint=(older.rate-younger.rate)*100;
 holder.innerHTML='<div class="decision-desk-head"><div><span class="eyebrow">실제 랜딩페이지 행동에서 찾은 핵심 인사이트</span><h2>35~54세는 노출이 적어도<br/>클릭 후 랜딩 도달 비율이 더 높았습니다.</h2><p>광고를 본 사람의 <b>실제 연령대</b>로 분류한 관측 결과입니다. 광고에 <b>설정한 타겟 연령</b>이 무엇인지는 아직 확인되지 않았습니다.</p></div><span class="decision-period">Meta CSV · '+esc(DB.range?.[0]||'')+' ~ '+esc(DB.data_end||'')+'</span></div>'+
 '<div class="decision-kpi-grid">'+
 '<div class="decision-kpi"><span>18~34세 · 클릭 → 랜딩</span><strong>'+pct(younger.rate,1)+'</strong><small>랜딩 '+number(younger.lpv)+'회 / 링크 목적 광고 클릭 '+number(younger.linkClicks)+'회</small></div>'+
 '<div class="decision-kpi accent"><span>35~54세 · 클릭 → 랜딩</span><strong>'+pct(older.rate,1)+'</strong><small>랜딩 '+number(older.lpv)+'회 / 링크 목적 광고 클릭 '+number(older.linkClicks)+'회</small></div>'+
 '<div class="decision-kpi"><span>35~54세의 비율 차이</span><strong>+'+number(percentPoint,1)+'%p</strong><small>방문율은 높지만 실제 수익까지 좋은 건 아직 모릅니다</small></div>'+
 '<div class="decision-kpi"><span>랜딩페이지 조회당 비용</span><strong>'+money(younger.lpvCost,3)+' <em>vs</em> '+money(older.lpvCost,3)+'</strong><small>18~34세 vs 35~54세 · 비용은 젊은 층이 소폭 유리</small></div></div>'+
 '<div class="decision-bottomline"><b>그래서 지금 할 일</b><span>35~54세 타겟을 무조건 확대하지 말고, <b>게시물별 성과를 분리</b>해 실제 설정과 상담·팔로우 전환을 확인하세요. 콘텐츠에 따라 반대 결과도 나옵니다.</span></div>'+
 '<div class="decision-examples-head"><h3>어떤 게시물이 이런 차이를 만들었나?</h3><p>같은 연령 그룹이라도 모든 광고가 같은 결과를 보인 것은 아닙니다.</p></div>'+
 '<div class="visit-example-grid">'+
 decisionExemplar('120252682521260529',true)+
 decisionExemplar('120252682511880529',false)+'</div>'+
 '<div class="decision-quality">해석 기준: 클릭 → 랜딩 도달 비율 = <b>랜딩페이지 조회 / 링크 클릭형 캠페인에서 발생한 링크 클릭</b>. 프로필 방문 목적 캠페인은 랜딩 지표가 없으므로 분모에서도 제외했습니다. 서로 다른 연령은 예산 배분과 소재 구성이 달라서 인과적 비교가 아닙니다.</div>'+
 '<button class="action dark decision-explore" data-page="posts">게시물별로 더 비교하기 ↗</button>';
 holder.querySelectorAll('[data-decision-post]').forEach(b=>b.addEventListener('click',()=>{navigate('posts');openPost(b.dataset.decisionPost);}));
 holder.querySelectorAll('[data-page]').forEach(b=>b.addEventListener('click',()=>navigate(b.dataset.page)));
}


/* Concise insight board: clickable conclusions + traceable evidence. */
function insightDefinitions(){
 const Y=landingGroup(['18-24','25-34']),O=landingGroup(['35-44','45-54']);
 const support=get('120252682521260529'),reverse=get('120252682511880529');
 const sy=landingGroup(['18-24','25-34'],support.name),so=landingGroup(['35-44','45-54'],support.name);
 const ry=landingGroup(['18-24','25-34'],reverse.name),ro=landingGroup(['35-44','45-54'],reverse.name);
 const A=get('120252750718860529'),B=get('120252750732410529');
 const new1=get('120252790032910529'),new2=get('120252790030140529');
 const metric=(title,value,detail)=>({title,value,detail});
 return [
 {id:'age',label:'좋은 신호',tone:'good',title:'35~54세는 클릭 후 랜딩 도달 비율이 더 높음',value:pct(O.rate,1)+' vs '+pct(Y.rate,1),short:'35~54세 vs 18~34세 · 그러나 방문당 비용은 젊은 층이 소폭 유리',fact:'실제 노출된 연령별 데이터에서 35~54세가 방문 도달 비율은 높지만, 조회당 비용이 더 낮은 것은 아닙니다.',metrics:[metric('18~34세',pct(Y.rate,1),number(Y.lpv)+'회 / '+number(Y.linkClicks)+'클릭'),metric('35~54세',pct(O.rate,1),number(O.lpv)+'회 / '+number(O.linkClicks)+'클릭'),metric('18~34세 방문당 비용',money(Y.lpvCost,3),'링크 클릭형 광고만'),metric('35~54세 방문당 비용',money(O.lpvCost,3),'링크 클릭형 광고만')],posts:['120252682521260529','120252682511880529'],next:'타겟 연령을 바로 높이지 말고 실제 문의·구매 전환을 측정하고 동일 조건으로 비교합니다.'},
 {id:'contrast',label:'주제별 차이',tone:'mixed',title:'같은 연령도 콘텐츠 주제에 따라 반응이 반대',value:pct(so.rate,1)+' / '+pct(ry.rate,1),short:'지원동기 35~54세 / 예상질문 18~34세',fact:'지원동기 소재에서는 35~54세가, 예상질문 소재에서는 18~34세가 클릭 후 랜딩 도달 비율이 높았습니다.',metrics:[metric('지원동기 · 18~34세',pct(sy.rate,1),number(sy.lpv)+'회 / '+number(sy.linkClicks)+'클릭'),metric('지원동기 · 35~54세',pct(so.rate,1),number(so.lpv)+'회 / '+number(so.linkClicks)+'클릭'),metric('예상질문 · 18~34세',pct(ry.rate,1),number(ry.lpv)+'회 / '+number(ry.linkClicks)+'클릭'),metric('예상질문 · 35~54세',pct(ro.rate,1),number(ro.lpv)+'회 / '+number(ro.linkClicks)+'클릭')],posts:[support.id,reverse.id],next:'소재 주제와 타겟을 한 번에 바꾸지 않고 변수 하나씩 실험합니다.'},
 {id:'cost',label:'주의할 점',tone:'mixed',title:'방문 비율이 높아도 랜딩 1회 비용이 낮은 것은 아님',value:money(Y.lpvCost,3)+' vs '+money(O.lpvCost,3),short:'18~34세 vs 35~54세 · 실제 방문 조회당 비용',fact:'젊은 연령대가 랜딩 조회당 비용은 조금 낮았습니다. 즉, 방문율과 방문 단가는 서로 다른 판단 지표입니다.',metrics:[metric('18~34세 링크 목적 광고비',money(Y.linkSpend,2),number(Y.lpv)+'회 랜딩'),metric('35~54세 링크 목적 광고비',money(O.linkSpend,2),number(O.lpv)+'회 랜딩')],posts:[support.id,reverse.id],next:'랜딩 비용 외에도 실제 상담·팔로우 1건당 비용을 확보합니다.'},
 {id:'ab',label:'엇갈린 성과',tone:'mixed',title:'같은 주제 광고 B는 CTR, A는 랜딩 비용 우세',value:pct(B.ctr,2)+' vs '+pct(A.ctr,2),short:'B의 CTR vs A의 CTR · 개별 캠페인 10/12 기준',fact:'B의 클릭률은 높지만 A가 랜딩페이지 조회를 더 저렴하게 확보했습니다. CTR만으로 광고 승자를 정할 수 없습니다.',metrics:[metric('A · 링크 클릭률',pct(A.ctr,2),number(A.clicks)+'회 / 노출 '+number(A.impressions)),metric('B · 링크 클릭률',pct(B.ctr,2),number(B.clicks)+'회 / 노출 '+number(B.impressions)),metric('A · 랜딩 1회 비용',money(A.spend/A.lpv,3),number(A.lpv)+'회'),metric('B · 랜딩 1회 비용',money(B.spend/B.lpv,3),number(B.lpv)+'회')],posts:[A.id,B.id],next:'설정한 타겟, 게재 위치, 랜딩 URL을 먼저 확인하고 같은 조건으로 A/B 테스트합니다.'},
 {id:'new',label:'더 지켜보기',tone:'watch',title:'10/13 시작한 생기부 소재 2개는 표본이 부족',value:number(new1.clicks+new2.clicks)+'클릭',short:'두 캠페인 합계 · 첫날 데이터만 존재',fact:'첫날의 노출과 클릭만으로 유지·중단을 판단하기는 이릅니다.',metrics:[metric('생기부 3년 소재',number(new1.clicks)+'클릭',money(new1.spend,2)+' 집행'),metric('생기부 면접 준비 소재',number(new2.clicks)+'클릭',money(new2.spend,2)+' 집행')],posts:[new1.id,new2.id],next:'2~3일 이상 추세와 클릭→랜딩 지표를 더 확인합니다.'}
 ];
}
function showInsight(id){
 const it=insightDefinitions().find(x=>x.id===id);if(!it)return;
 const metrics=it.metrics.map(m=>'<div class="insight-proof-stat"><span>'+esc(m.title)+'</span><b>'+esc(m.value)+'</b><small>'+esc(m.detail)+'</small></div>').join('');
 const posts=it.posts.map(pid=>{
 const p=get(pid),meta=POST_META[pid]||{},thumb=thumbFor(pid),cover=thumb?'<img src="'+esc(thumb)+'" alt="참고 썸네일">':'<span>이미지 확인 필요</span>';
 return '<button class="insight-source-post" data-source-post="'+esc(pid)+'">'+cover+'<span><b>'+esc(meta.label||p?.label||pid)+'</b><small>'+esc(pid)+' · 이미지와 광고 ID 연결은 일부 미검증</small></span>↗</button>';
 }).join('');
 el('postDetail').innerHTML='<div class="insight-detail-head"><span class="verdict-tag '+(it.tone==='good'?'good':it.tone==='watch'?'watch':'unverified')+'">'+esc(it.label)+'</span><h2>'+esc(it.title)+'</h2><p>'+esc(it.fact)+'</p></div>'+
 '<h3 class="drawer-section">판단 근거 · 실제 수치</h3><div class="insight-proof-stats">'+metrics+'</div>'+
 '<h3 class="drawer-section">근거가 된 게시물 (선택하면 상세 열림)</h3><div class="insight-source-list">'+posts+'</div>'+
 '<h3 class="drawer-section">게시물별 광고 설정</h3><p class="insight-disclaimer">연령별 수치는 실제 광고가 노출된 사람의 연령입니다. 설정한 타겟 연령·지역·관심사·게재 위치는 현재 Meta CSV로 확인되지 않습니다. 위의 게시물 상세에서 확인된 캠페인 ID, 예산, 시작일과 결과 목표를 볼 수 있습니다.</p>'+
 '<h3 class="drawer-section">그래서 다음엔?</h3><div class="drawer-next">'+esc(it.next)+'</div>'+
 '<p class="drawer-caption">근거: Meta 광고 CSV (9/13~10/13). 랜딩 도달 비율은 랜딩페이지 조회 / 링크 클릭형 캠페인의 링크 클릭입니다. 광고 목표가 다른 캠페인을 섞지 않았으며 실제 수익·인과관계를 뜻하지 않습니다.</p>';
 el('postOverlay').classList.add('open');el('postOverlay').setAttribute('aria-hidden','false');document.body.style.overflow='hidden';el('closePost').focus();
 el('postDetail').querySelectorAll('[data-source-post]').forEach(b=>b.addEventListener('click',()=>{navigate('posts');openPost(b.dataset.sourcePost)}));
}
function renderInsightBoard(){
 const holder=el('insightBoard');if(!holder)return;
 const items=insightDefinitions();
 holder.innerHTML='<div class="insight-recap"><span>분석 종료 '+esc(DB.data_end)+'</span><span>누적 광고비 <b>'+money(DB.summary.spend,2)+'</b></span><span>랜딩 조회 <b>'+number(DB.summary.lpv)+'</b></span></div>'+
 '<div class="insight-section-title"><div><h2>현재까지 검증할 가치가 있는 인사이트</h2><p>결론 먼저. 자세한 광고 근거와 설정은 블록을 누르세요.</p></div><span>광고 효과를 자동으로 조정하지 않습니다</span></div>'+
 '<div class="insight-board-grid">'+items.map(x=>'<button type="button" class="insight-tile '+x.tone+'" data-open-insight="'+x.id+'"><span class="insight-type">'+esc(x.label)+'</span><strong>'+esc(x.title)+'</strong><span class="insight-figure">'+esc(x.value)+'</span><small>'+esc(x.short)+'</small><span class="insight-open">근거 게시물 · 광고 설정 · 다음 행동 보기 ↗</span></button>').join('')+'</div>'+
 '<div class="insight-actionbar"><div><strong>다음에 검증할 것</strong><p>설정된 타겟 확인 → 주제별 연령 실험 → 랜딩 이후 문의·팔로우 측정</p></div><button type="button" class="action dark" data-go-posts>게시물별 현황 →</button></div>'+
 '<p class="insight-qualifier">실제 노출 연령과 설정한 타겟 연령은 다릅니다. 링크 클릭·랜딩 조회로 상담이나 매출 성과를 단정하지 않습니다.</p>';
 holder.querySelectorAll('[data-open-insight]').forEach(b=>b.addEventListener('click',()=>showInsight(b.dataset.openInsight)));
 holder.querySelector('[data-go-posts]').addEventListener('click',()=>navigate('posts'));
}

// POST LIBRARY: thumbnail references are supplied from the user's own grid screenshot.
const POST_META=window.SIGNAL_OS_POST_CATALOG||{};
const POST_THUMBS=window.SIGNAL_OS_THUMBS||{};
const POST_KEYS=[...DB.campaigns.map(x=>x.id),'ORGANIC-9000'];
const POST_TAGS={good:'좋은 신호',improve:'개선 검토',watch:'더 지켜보기',unverified:'비교 제한',organic:'유기 콘텐츠'};
let postFilter='all';
function statusFor(id){return POST_META[id]?.status||'watch';}
function thumbFor(id){const m=POST_META[id],key=m?.thumb;return key?POST_THUMBS[key]||'':null;}
function postCover(id){const url=thumbFor(id),im=POST_META[id]||{};const trust=im.imageConfidence;
 const note=trust==='exact'?'제공된 썸네일':trust==='subject'?'주제 일치 · 광고 ID 매칭 미검증':trust==='candidate'?'그리드 참고 이미지 · 정확한 광고 일치 미검증':'이미지 없음 · 제공 필요';
 return `<div class="post-card-image">${url?`<img alt="${esc(im.label||'게시물 썸네일')}" src="${url}" loading="lazy"/>`:`<div class="post-no-image"><span class="ph-icon">▧</span><span>썸네일 매칭 대기</span></div>`}<div class="image-mark">${esc(note)}</div></div>`;
}

let postSort='recommended';
function cardHTML(id){
 const d=get(id),m=POST_META[id]||{},tag=statusFor(id),name=m.label||d?.label||id;
 const cost=d?.lpv&&d?.type==='actions:link_click'?d.spend/d.lpv:null;
 let main='관찰 데이터 대기',secondary='광고 성과 미수집';
 if(d?.id==='UNASSIGNED_20261013'){main='10/13 동일 제목 2개 합산';secondary=number(d.clicks)+'클릭 · ID별 분리 불가';}
 else if(d?.type==='actions:link_click'){
 main=cost==null?'랜딩 성과 확인 필요':'랜딩 방문당 '+money(cost,3);
 secondary=number(d.lpv)+'회 랜딩 / '+number(d.clicks)+'클릭 · 도달 비율 '+pct(d.clicks?d.lpv/d.clicks:null,1);
 } else if(d?.type==='profile_visit_view'){main='프로필 방문 목적';secondary='링크 클릭 '+number(d.clicks)+'회 · 실제 팔로우 데이터 미확인';}
 else if(d){main='더 관찰할 신규 광고';secondary='클릭 '+number(d.clicks)+'회 · 지출 '+money(d.spend,2);}
 else{main='유기 콘텐츠';secondary='광고 성과와 별도 관리';}
 const foot=d?'광고비 '+money(d.spend,2)+' · 링크 CPC '+money(d.cpc,3):'조회·댓글·공유 추적 필요';
 return '<button class="post-card" type="button" data-open-post="'+esc(id)+'" aria-label="'+esc(name)+' 상세 보기">'+postCover(id)+
 '<div class="post-card-body"><span class="verdict-tag '+tag+'">'+esc(POST_TAGS[tag])+'</span><h3>'+esc(name)+'</h3>'+
 '<div class="post-decision-highlight">'+esc(main)+'</div><p class="post-decision-sub">'+esc(secondary)+'</p>'+
 '<p class="post-decision-note">'+esc(m.oneLine||'추가 결과 확인 필요')+'</p>'+
 '<div class="post-decision-foot">'+esc(foot)+'</div><span class="post-decision-open">근거 · 연령 · 설정 보기 ↗</span></div></button>';
}
function postCost(d){return d?.type==='actions:link_click'&&d.lpv>0?d.spend/d.lpv:Infinity;}
function renderPosts(){
 const q=(document.getElementById('postSearch')?.value||'').trim().toLowerCase();
 const items=POST_KEYS.filter(id=>postFilter==='all'||statusFor(id)===postFilter).filter(id=>{
 const m=POST_META[id]||{},d=get(id);
 return !q||(m.label||'').toLowerCase().includes(q)||(d?.name||'').toLowerCase().includes(q);
 });
 items.sort((a,b)=>{
 const x=get(a),y=get(b);
 if(postSort==='cost')return postCost(x)-postCost(y);
 if(postSort==='clicks')return (y?.clicks||0)-(x?.clicks||0);
 if(postSort==='spend')return (y?.spend||0)-(x?.spend||0);
 const weight=id=>({good:0,improve:1,watch:2,unverified:3,organic:4}[statusFor(id)]??5);
 return weight(a)-weight(b)||postCost(x)-postCost(y);
 });
 el('postGrid').innerHTML=items.map(cardHTML).join('')||'<div class="empty">조건에 맞는 게시물이 없습니다.</div>';
 el('postsCount').textContent=number(items.length)+'개 항목 · 랜딩 비용은 링크 목적 광고에서만 비교합니다.';
 document.querySelectorAll('[data-post-filter]').forEach(b=>b.classList.toggle('active',b.dataset.postFilter===postFilter));
 el('postGrid').querySelectorAll('[data-open-post]').forEach(b=>b.addEventListener('click',()=>openPost(b.dataset.openPost)));
 const summary=el('postQuickSummary');
 if(summary){
 const groups=[['좋은 신호','good'],['개선 검토','improve'],['추가 관찰','watch'],['비교 제한','unverified']];
 summary.innerHTML=groups.map(([name,key])=>{
 const count=POST_KEYS.filter(id=>statusFor(id)===key).length;
 return '<button type="button" class="post-summary-cell" data-summary-filter="'+key+'">'+esc(name)+'<strong>'+count+'개</strong></button>';
 }).join('')+'<p class="post-summary-foot">판정은 현재 광고 클릭·랜딩 근거에 따른 검토 우선순위이며, 최종 구매·팔로우 효과를 뜻하지 않습니다.</p>';
 summary.querySelectorAll('[data-summary-filter]').forEach(b=>b.addEventListener('click',()=>{postFilter=b.dataset.summaryFilter;renderPosts()}));
 }
}
function featuredPosts(){el('overviewPosts').innerHTML=['120252682521260529','120252750718860529','120252682511880529','120252790032910529'].map(cardHTML).join('');
 el('overviewPosts').querySelectorAll('[data-open-post]').forEach(b=>b.addEventListener('click',()=>openPost(b.dataset.openPost)));
}
function demographicFor(c){if(!c||c.id==='UNASSIGNED_20261013')return null;
 const raw=DB.ageRaw.filter(r=>r.name===c.name),map=new Map();for(const r of raw){const k=r.age;const o=map.get(k)||{age:k,impressions:0,clicks:0,spend:0};o.impressions+=r.impressions||0;o.clicks+=r.clicks||0;o.spend+=r.spend||0;map.set(k,o)}
 if(!raw.length)return null;
 const total=Array.from(map.values()).reduce((a,r)=>a+r.impressions,0),sumSpend=raw.reduce((a,r)=>a+(r.spend||0),0);
 return {rows:[...map.values()].filter(r=>r.impressions>0).sort((a,b)=>b.impressions-a.impressions),total,spend:sumSpend,ambiguous:DB.campaigns.filter(x=>x.id!=='UNASSIGNED_20261013'&&x.name===c.name).length>1};
}
function rankFor(c){return DB.ads.find(a=>a.campaign_id_inferred===c?.id)}
function adsetFor(c){return DB.adsets.find(a=>a.campaign_id===c?.id)}
function ageTable(d){if(!d)return '<p class="drawer-caption">확인 가능한 연령별 광고 분류 데이터가 없습니다.</p>';
 const top=d.rows.slice(0,6);const max=d.total||1;return `<div>${top.map(r=>`<div class="age-row"><b>${esc(r.age)}세</b><div class="age-progress"><i style="width:${(r.impressions/max*100).toFixed(1)}%"></i></div><div class="age-value">${pct(r.impressions/max,1)}</div></div>`).join('')}</div><p class="drawer-caption">${d.ambiguous?'⚠ 같은 캠페인명 2개가 합쳐진 연령 분포입니다. A/B 각각의 설정이나 노출 분포로 해석하지 마세요.':'해당 이름 캠페인의 연령별 실제 노출 분포입니다.'} 타겟으로 설정한 연령과 다르며, 실제 구매·문의 효율을 뜻하지 않습니다.</p>`}
function row(label,value){return `<dt>${esc(label)}</dt><dd>${esc(value)}</dd>`}
function openPost(id){const m=POST_META[id]||{},d=get(id),organic=!d,status=statusFor(id),age=demographicFor(d),set=adsetFor(d),ad=rankFor(d);
 let image=thumbFor(id),name=m.label||d?.label||'게시물',interpret=m.oneLine||'추가 자료 확인 필요';const period=d?.id==='UNASSIGNED_20261013'?'10/13 합산·ID 분리 불가':d?.id?.startsWith('120252750')?'10/12까지 개별 ID 실적(10/13 합산 제외)':`수집 기간 내 집계 (최대 ${DB.data_end})`;
 const goals=!d?'유기 콘텐츠':d.type==='actions:link_click'?'링크 클릭':d.type==='profile_visit_view'?'프로필 방문':'결과 유형 재확인';
 const stats=d?[
 ['광고비',money(d.spend)],['링크 클릭',number(d.clicks)],['클릭당 비용',money(d.cpc,3)],['클릭률',pct(d.ctr,2)],['노출',number(d.impressions)],['랜딩 조회',d.type==='profile_visit_view'?'목표 외 미제공':number(d.lpv)]
 ]:[['유료 광고비','$0'],['조회/공유','자료 대기'],['활용 방향','일반 릴스']];
 const adnote=ad?`광고 품질: ${ad.quality||'—'} / 참여율: ${ad.engagement_rank||'—'} / 전환율: ${ad.conversion_rank||'—'} (10/12까지 보고된 값)`:'광고 순위 자료 미확인 또는 새 집행에 해당 없음';
 const source=m.imageConfidence==='candidate'?'이 이미지는 사용자 그리드에서 같은 주제로 보이는 참고 이미지입니다. 해당 캠페인의 정확한 광고 이미지라고 확인된 것은 아닙니다.':m.imageConfidence==='subject'?'이미지의 주제는 일치하지만 광고 ID별 매칭은 아직 확인되지 않았습니다.':m.imageConfidence==='missing'?'해당 광고의 썸네일은 제공된 그리드에서 정확히 찾지 못해 표시하지 않았습니다.':'';
 const settingRows=organic? [row('유형','유기 콘텐츠 · 광고 아님'),row('예산','0달러 (광고 미집행 가정이 아닌 현재 운영 제안)'),row('광고 성과','아직 미수집')]:[
 row('캠페인 ID',d.id.startsWith('UNASSIGNED')?'10/13 두 캠페인 합산':d.id),
 row('세트 시작일',set?.starts||d.start||'확인 필요'),row('예산 위치',set?.budget||'과거 파일 미확인'),row('일예산','$13 (과거 업로드 파일 기준, 추후 변경 여부 미확인)'),
 row('보고 기여 설정','7일 클릭 / 1일 조회 (기존 파일 기준)'),row('목표 기준',goals),
 row('설정한 타겟 연령','확인되지 않음'),row('설정한 지역 / 상세 관심사','확인되지 않음'),row('게재 위치 / 최적화','확인되지 않음'),row('광고 품질 평가',adnote)
 ];
 el('postDetail').innerHTML=`<div class="post-detail-head">${image?`<img src="${image}" alt="${esc(name)} 그리드 이미지"/>`:'<div class="drawer-image-fallback">광고와 연결된 이미지<br>확인 필요</div>'}<div><span class="verdict-tag ${status}">${POST_TAGS[status]}</span><h2>${esc(name)}</h2><div class="post-subline">${esc(period)}<br>${d?.id==='UNASSIGNED_20261013'?'10/13 동일 제목 캠페인 두 개의 합산':`기준 목표: ${esc(goals)}`}</div></div></div><div class="drawer-verdict ${status}"><span class="eyebrow">그래서, 현재의 판단은?</span><strong>${POST_TAGS[status]}</strong><p>${esc(interpret)}</p></div><h3 class="drawer-section">실제 성과</h3><div class="post-stat-grid">${stats.map(([k,v])=>`<div class="post-stat"><span>${esc(k)}</span><strong>${esc(v)}</strong></div>`).join('')}</div><h3 class="drawer-section">광고 설정 · 확인된 것만</h3><dl class="drawer-info">${settingRows.join('')}</dl><h3 class="drawer-section">광고가 실제로 노출된 연령</h3>${organic?'<p class="drawer-caption">일반 릴스 인사이트가 들어오면 연령별 노출 데이터를 추가할 수 있습니다.</p>':ageTable(age)}<h3 class="drawer-section">다음에 해볼 실험</h3><div class="drawer-next">${esc(m.experiment||'동일 조건의 광고 설정과 성과 확인 후 추가 실험 설계')}</div>${source?`<div class="drawer-data-limit">${esc(source)}</div>`:''}<p class="drawer-caption">분석은 관찰된 광고 실적 기반입니다. 광고의 인과적 개선이나 미래 성공을 보장하지 않으며, CTR/CPC만으로 실제 매출 효과를 판단하지 않습니다.</p>`;
 const overlay=el('postOverlay');overlay.classList.add('open');overlay.setAttribute('aria-hidden','false');document.body.style.overflow='hidden';el('closePost').focus();
}
function closePost(){el('postOverlay').classList.remove('open');el('postOverlay').setAttribute('aria-hidden','true');document.body.style.overflow='';}
el('closePost').addEventListener('click',closePost);
el('postOverlay').querySelector('[data-close-post]').addEventListener('click',closePost);
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&el('postOverlay').classList.contains('open'))closePost()});
Array.from(document.querySelectorAll('[data-post-filter]')).forEach(b=>b.addEventListener('click',()=>{postFilter=b.dataset.postFilter;renderPosts()}));
Array.from(document.querySelectorAll('[data-filter-post]')).forEach(b=>b.addEventListener('click',()=>{postFilter=b.dataset.filterPost;navigate('posts');renderPosts()}));
Array.from(document.querySelectorAll('.triage-item[data-open-post]')).forEach(b=>b.addEventListener('click',()=>openPost(b.dataset.openPost)));
if(el('postSearch'))el('postSearch').addEventListener('input',renderPosts);
if(el('postSort'))el('postSort').addEventListener('change',e=>{postSort=e.target.value;renderPosts();});

// Keep provider-reported recommendation separate from assistant evaluation.
function renderMetaRecommendations(){
 const all=window.SIGNAL_OS_RECOMMENDATIONS||[],status=window.SIGNAL_OS_META_RECOMMENDATIONS_STATUS||{};
 const items=all.filter(r=>!r.archived),history=all.filter(r=>r.archived);
 const cards=el('recommendationCards'),summary=el('recommendationSummary');
 if(!cards||!summary)return;
 const priorities={
  'meta-20261014-website':['1 · 기반 구축','전환 추적 먼저'],
  'meta-20261014-reels-916':['2 · 테스트 후보','소재 확인 후'],
  'meta-20261014-creative':['3 · 미리보기','메시지 훼손 확인'],
  'meta-20261014-adv-placements':['4 · 실험 가능','목표별 테스트'],
  'meta-20261014-fragmentation-six':['5 · 잠정 보류','세트 병합 주의']
 };
 const order=Object.keys(priorities);
 const sorted=items.slice().sort((a,b)=>order.indexOf(a.id)-order.indexOf(b.id));
 summary.innerHTML='<div><strong>'+number(items.length)+'건</strong><span>Meta가 현재 표시한 추천 묶음 · 대상 캠페인/광고 ID는 아직 미매칭</span></div>'+
 '<div><strong>'+number(status.opportunity_score)+'점</strong><span>Opportunity Score (100점 만점) · 적용 시 최대 +'+number(status.potential_points)+'점 안내</span></div>'+
 '<p class="rec-summary-note">Meta의 예상 개선율과 점수는 확정 성과가 아닙니다. 항목별 절감률을 합산하거나 점수 상승을 실제 매출 증가로 해석하지 않습니다.</p>';
 function card(r){
  const meta=r.meta||{},review=r.review||{},pri=priorities[r.id]||['이전 기록','효력 재확인 필요'];
  const estimate=meta.percentEstimate!=null?'<strong>'+number(meta.percentEstimate,1)+'% 개선 가능성</strong><span>Meta 예상 · '+esc(meta.unit||'결과당 비용')+'</span>':'<span>예상 효율 수치 미제공</span>';
  const numbers=meta.currentCost!=null&&meta.estimatedCost!=null?
    '<div class="rec-preview"><span>현재 <b>'+money(meta.currentCost,2)+'</b></span><span>Meta 예상 <b>'+money(meta.estimatedCost,2)+'</b></span></div>':'';
  const details=[
   ['Meta 원문',meta.headline],
   ['Meta 제안',meta.recommendation],
   ['Meta 근거/부가 설명',meta.detail],
   ['대상 범위',r.scope],
   ['개별 광고/세트',r.target],
   ['제가 우려하는 부분',review.risk],
   ['다음 행동',review.next],
   ['보내주신 자료',r.evidence?.source]
  ];
  return '<article class="rec-card"><div class="rec-card-head"><span class="rec-card-type">'+esc(pri[0])+' · '+esc(r.category||'')+'</span><span class="rec-card-status">'+esc(r.status||'')+'</span></div>'+
  '<h3>'+esc(r.title)+'</h3><p>'+esc(r.scope)+'</p>'+
  '<div class="rec-expected">'+estimate+'<small>'+esc(meta.score||'')+'</small></div>'+numbers+
  '<div class="rec-card-decision"><strong>Signal OS 검토: '+esc(pri[1])+'</strong><p>'+esc(review.verdict||'검토 필요')+' — '+esc(review.why||'')+'</p></div>'+
  '<details><summary>Meta 원문 · 광고 대상 · 검토 근거 펼치기</summary><dl>'+
  details.map(([key,val])=>'<dt>'+esc(key)+'</dt><dd>'+esc(val||'미확인')+'</dd>').join('')+'</dl></details></article>';
 }
 
 const perf=status.performance_snapshot;
 const performanceBox=perf&&perf.link_clicks?'<section class="rec-captured-performance"><h3>참고 · Meta 성과 요약 화면</h3><div class="rec-captured-metrics">'+
 '<span>링크 클릭 <b>'+number(perf.link_clicks)+'회</b></span>'+
 '<span>지출 <b>'+money(perf.spend,2)+'</b></span>'+
 '<span>링크 CPC <b>'+money(perf.link_cpc,2)+'</b></span>'+
 '<span>유사 세트의 중간값 <b>'+money(perf.benchmark_link_cpc,2)+'</b></span></div>'+
 '<p>이 화면의 광고/세트 식별자와 정확한 집계 기간을 확인하지 못했으므로, 기존 캠페인 누적 수치에 <b>합산하지 않았습니다.</b> 유사 세트 대비 비용 차이도 고객 전환 성과의 우열을 뜻하지 않습니다.</p></section>':'';

 cards.innerHTML=performanceBox+(sorted.map(card).join('')||'<p class="empty">현재 등록된 Meta 추천이 없습니다.</p>');
 if(history.length){
  const archive=document.createElement('details');
  archive.className='rec-history';
  archive.innerHTML='<summary>이전 팝업 추천 '+number(history.length)+'건 (현재 유효 여부 미확인)</summary>'+
  '<div class="rec-grid">'+history.map(card).join('')+'</div>';
  cards.appendChild(archive);
 }
 const holder=el('insightBoard');
 if(holder&&!holder.querySelector('[data-open-recommendations]')){
  const section=document.createElement('div');
  section.className='rec-summary rec-home-strip';
  section.innerHTML='<div><strong>Meta 추천 '+number(items.length)+'건 · Opportunity Score '+number(status.opportunity_score)+'점</strong>'+
  '<span style="display:block">추천 점수보다 현재 성과·실험 목적이 우선. 자동 적용하지 않고 검토합니다.</span></div>'+
  '<button type="button" class="action" data-open-recommendations>Meta 추천 검토 ↗</button>';
  holder.appendChild(section);
  section.querySelector('button').addEventListener('click',()=>navigate('recommendations'));
 }
}


/* OPERATIONS AGENT / authoritative plan and audit. All ad changes require user approval. */
function opsData(){return window.SIGNAL_OS_OPERATIONS||null;}
function opsCampaignButtons(ids){
 return (ids||[]).map(id=>{
  const campaign=get(id);
  if(!campaign)return '<p class="drawer-caption">캠페인 ID '+esc(id)+'는 현재 데이터와 매칭되지 않았습니다.</p>';
  return '<button type="button" class="ops-related-item" data-ops-campaign="'+esc(id)+'">'+esc(campaign.label||campaign.name)+' · '+esc(id)+' ↗</button>';
 }).join('');
}
function openOpsDetail(kind,id){
 const os=opsData();if(!os)return;
 let item,main=[],title='';
 if(kind==='priority'){
  item=os.priorities.find(x=>x.id===id);if(!item)return;title=item.title;
  main=[['현재 판단',item.decision],['판단 근거',item.why],['다음 데이터 요청/실행',item.next],['검토 마감',item.due],['진행 상태',item.status]];
 }else if(kind==='schedule'){
  item=os.cadence.find(x=>x.date===id);if(!item)return;title=item.title;
  main=[['데이터를 확인할 날짜',item.date+' · '+item.frequency],['필요한 자료',item.request],['기대하는 분석 결과',item.outcome]];
 }else if(kind==='experiment'){
  item=os.experiments.find(x=>x.id===id);if(!item)return;title=item.title;
  main=[['가설',item.hypothesis],['실험/추적 방법',item.setup],['검증할 KPI',item.metrics.join(' · ')],['판단 조건',item.rule],['다음 점검',item.next_review],['점검 후',item.after],['현재 상태',item.status]];
 } else return;
 const rowHTML=main.map(([heading,value])=>'<div><b>'+esc(heading)+'</b><p>'+esc(value||'추가 확인 필요')+'</p></div>').join('');
 const poster=opsCampaignButtons(item.campaign_ids||[]);
 el('postDetail').innerHTML='<span class="eyebrow">MARKETING OPERATIONS / 진행 기록</span><h2 style="line-height:1.4;margin-top:13px">'+esc(title)+'</h2><p class="ops-drawer-intro">이 계획은 수집한 광고 성과와 현재까지 알려진 상황으로 작성됐습니다. 실제 광고 ON/OFF, 예산, 소재 설정은 자동으로 바꾸지 않습니다.</p>'+
 '<div class="ops-drawer-list">'+rowHTML+'</div>'+
 (poster?'<h3 class="drawer-section">관련 캠페인 · 실제 성과 보기</h3><div class="ops-related-list">'+poster+'</div>':'')+
 '<h3 class="drawer-section">판단 전에 확인</h3><div class="ops-notice">광고 일시중지·재개·예산 변경은 확인된 최신 캠페인 ID·기간·목표·전환 실적을 확인하고, 사용자의 승인 후에만 진행합니다. 데이터가 부족하면 추천을 보류합니다.</div>';
 const overlay=el('postOverlay');overlay.classList.add('open');overlay.setAttribute('aria-hidden','false');document.body.style.overflow='hidden';el('closePost').focus();
 overlay.querySelectorAll('[data-ops-campaign]').forEach(b=>b.addEventListener('click',()=>{navigate('posts');openPost(b.dataset.opsCampaign)}));
}
function renderOperations(){
 const os=opsData();
 const holder=el('opsSnapshot');
 if(!holder)return;
 if(!os){holder.innerHTML='<p>운영 계획 데이터를 불러오지 못했습니다. 새로고침해 주세요.</p>';return;}
 const now=new Date().toLocaleDateString('sv-SE',{timeZone:'Asia/Seoul'});
 const stale=now>os.updated_at;
 holder.innerHTML='<div class="ops-snapshot-main"><strong>광고 운영 판단 기준: '+esc(os.updated_at)+' · 확정 성과: '+esc(os.report_as_of)+'까지</strong><p>'+esc(os.current_delivery_note)+'</p>'+
 (stale?'<p style="font-weight:850;color:#a3662c">마지막 판단일 이후 데이터가 갱신되지 않았습니다. 지금 상태를 확인하려면 최신 파일을 보내주세요.</p>':'')+
 '</div><div class="ops-fresh">'+(stale?'추가 업로드 필요':'오늘 운영 초안')+'</div>';
 const decisionCards=[
  {label:'지금 바로 OFF할 광고',value:'확정 0건',desc:'현재 ID별 집행 상태와 최신 전환이 부족합니다. 중단 확정 대신 재검토합니다.',tone:'amber',id:'P1'},
  {label:'지금 바로 재개할 광고',value:'확정 0건',desc:'이미 꺼진 광고가 어떤 목표·성과 때문인지 확인하고 재개 여부를 제안합니다.',tone:'blue',id:'P3'},
  {label:'지금 우선 추적할 광고',value:'생기부 소재 2건',desc:'10/13 신규 광고 2종. 성급한 중단 대신 3일차 데이터를 점검할 계획입니다.',tone:'green',id:'P2'}
 ];
 el('opsDecisionCards').innerHTML=decisionCards.map(v=>'<button type="button" class="ops-decision-card '+v.tone+'" data-ops-detail="priority" data-ops-id="'+v.id+'"><small>'+esc(v.label)+'</small><strong>'+esc(v.value)+'</strong><p>'+esc(v.desc)+'</p><span style="margin-top:auto;font-size:10px;font-weight:800;color:#267454">판단 근거 보기 ↗</span></button>').join('');
 el('opsPriorities').innerHTML=os.priorities.map(it=>'<button type="button" class="ops-priority-item" data-ops-detail="priority" data-ops-id="'+esc(it.id)+'"><div><span class="ops-priority-tag">'+esc(it.level)+' · '+esc(it.type)+'</span><span style="font-size:10px;color:#7b8e82">'+esc(it.status)+'</span><strong>'+esc(it.title)+'</strong><p>'+esc(it.why)+'</p></div><time>'+esc(it.due.slice(5).replace('-','/'))+'<br>확인</time><span class="ops-priority-arrow">↗</span></button>').join('');
 el('opsSchedule').innerHTML=os.cadence.map(it=>'<button type="button" class="ops-schedule-item" data-ops-detail="schedule" data-ops-id="'+esc(it.date)+'"><small>'+esc(it.window)+' · '+esc(it.frequency)+'</small><time>'+esc(it.date.slice(5).replace('-','/'))+'</time><strong>'+esc(it.title)+'</strong><span>'+esc(it.outcome)+'</span></button>').join('');
 el('opsExperiments').innerHTML=os.experiments.map(it=>'<button type="button" class="ops-experiment-item" data-ops-detail="experiment" data-ops-id="'+esc(it.id)+'"><span class="ops-experiment-label">'+esc(it.id)+' · '+esc(it.kind)+'</span><strong>'+esc(it.title)+'</strong><p>'+esc(it.hypothesis)+'</p><footer><span>'+esc(it.status)+'</span><span>다음 '+esc(it.next_review.slice(5).replace('-','/'))+' ↗</span></footer></button>').join('');
 el('opsHistory').innerHTML=os.decisions.slice().reverse().map(it=>'<article class="ops-history"><time>'+esc(it.at)+' · '+esc(it.kind)+'</time><strong>'+esc(it.headline)+'</strong><p><b>다음:</b> '+esc(it.action)+'</p><p><b>현재 처리:</b> '+esc(it.result)+'</p></article>').join('');
 el('opsUploadGuide').innerHTML='<div class="ops-upload-guide"><h3>매일 어떤 자료를 보내면 되나요?</h3>'+
 '<p><b>① Meta 광고 관리자:</b> '+esc(os.upload_spec.preferred)+'</p>'+
 '<p><b>② 캡처로 보낼 때:</b> '+esc(os.upload_spec.screenshot)+'</p>'+
 '<p><b>③ 짧게 알려줄 사항:</b> '+esc(os.upload_spec.manual)+'</p>'+
 '<p><b>제가 갱신할 내용:</b> '+esc(os.upload_spec.scorecard)+'</p>'+
 '<p style="font-size:10px;margin-top:9px">이 웹사이트는 Meta에 실시간 연결되지 않습니다. 자료를 보내주시면 제가 분석하고 GitHub의 운영 일정·판단 기록을 갱신합니다. 표시된 리뷰 일정이 자동 알림을 보내는 것은 아닙니다.</p></div>';
 document.querySelectorAll('[data-ops-detail]').forEach(b=>b.addEventListener('click',()=>openOpsDetail(b.dataset.opsDetail,b.dataset.opsId)));
}

featuredPosts();renderPosts();renderDecisionDesk();renderInsightBoard();renderMetaRecommendations();renderOperations();

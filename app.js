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
let activePage='overview', trend='cpc', dataTab='campaigns',tableRows=[];
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
function cardHTML(id){const d=get(id),m=POST_META[id]||{},tag=statusFor(id),name=m.label||d?.label||id;
 const bottom=d?`<span>링크 CPC <b>${money(d.cpc,3)}</b></span><span>클릭 <b>${number(d.clicks)}</b></span>`:`<span>광고비 <b>$0 · 유기 운영 후보</b></span>`;
 return `<button class="post-card" data-open-post="${esc(id)}" aria-label="${esc(name)} 상세 보기">${postCover(id)}<div class="post-card-body"><span class="verdict-tag ${tag}">${POST_TAGS[tag]}</span><h3>${esc(name)}</h3><div class="post-numbers">${bottom}</div></div></button>`;
}
function renderPosts(){const q=(document.getElementById('postSearch')?.value||'').trim().toLowerCase(), items=POST_KEYS.filter(id=>postFilter==='all'||statusFor(id)===postFilter).filter(id=>{
 const m=POST_META[id]||{},d=get(id);return !q||(m.label||'').toLowerCase().includes(q)||(d?.name||'').toLowerCase().includes(q);
 });el('postGrid').innerHTML=items.map(cardHTML).join('')||'<div class="empty">조건에 맞는 게시물이 없습니다.</div>';el('postsCount').textContent=`총 ${items.length}개 게시물 · 각 카드의 판단은 현재까지의 실적에 한정됩니다.`;
 document.querySelectorAll('[data-post-filter]').forEach(b=>b.classList.toggle('active',b.dataset.postFilter===postFilter));
 document.querySelectorAll('[data-open-post]').forEach(b=>{if(b.closest('#postGrid'))b.addEventListener('click',()=>openPost(b.dataset.openPost))});
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
featuredPosts();renderPosts();

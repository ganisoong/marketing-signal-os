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
 {type:'소재 간 CTR',head:'“하얘진다면” B의 클릭률이 A보다 높을 가능성',key:'B_ctr_gt_A',support:'10/12까지 기준 · B 2.09% (124/5,935) · A 1.71% (142/8,322)',detail:'클릭 유도 반응에서는 B가 높을 가능성이 있으나, CPC는 A $0.206 / B $0.208로 거의 동일합니다.'},
 {type:'클릭 → 랜딩',head:'같은 주제 A가 B보다 랜딩 도달 비율이 높을 가능성',key:'A_lpv_rate_gt_B',support:'10/12까지 기준 · A 60.6% (86/142) · B 53.2% (66/124)',detail:'후속 랜딩까지 본다면 A가 유리할 수 있습니다. 단, 표본과 트래킹 방식 한계를 확인해야 합니다.'},
 {type:'연령별 CTR',head:'25~34세의 클릭률이 18~24세보다 높을 가능성',key:'age_25_34_ctr_gt_18_24',support:'25~34세 1.62% (527/32,473) · 18~24세 1.12% (461/41,115)',detail:'관찰된 노출 효율 비교입니다. 대상 연령 설정 차이나 최종 전환의 우수성을 뜻하지 않습니다.'},
 {type:'일별 CTR · 관찰',head:'10/13 링크 CTR이 10/12보다 높을 모형상 가능성',key:'Oct13_ctr_gt_Oct12',support:'10/13 1.56% (285/18,237) · 10/12 1.36% (237/17,450)',detail:'두 날짜는 광고별 집행 비중이 달라진 서로 다른 노출 집단입니다. 원인을 확정하거나 재현 확률로 해석하면 안 됩니다.'},
 {type:'성별 CTR',head:'여성 노출 그룹의 클릭률이 남성보다 높을 가능성',key:'female_ctr_gt_male',support:'여성 1.69% (854/50,542) · 남성 1.20% (560/46,529)',detail:'노출 성별에 따른 반응 차이입니다. 같은 조건의 무작위 성별 실험이 아니므로 인과관계는 알 수 없습니다.'}
];
function probabilityCard(c,compact=false){const p=DB.prob[c.key];return `<article class="prob-card"><div class="prob-top"><span class="prob-type">${esc(c.type)}</span><span class="badge">모형 추정</span></div><h3>${esc(c.head)}</h3><div class="prob-number"><strong>${probFmt(p)}</strong><span>사후 우위 확률</span></div><div class="bar-track"><div class="bar-fill" style="width:${Math.min(100,p*100)}%"></div></div><div class="prob-data">${esc(c.support)}</div>${compact?'':`<div class="prob-desc">${esc(c.detail)}</div>`}</article>`;}
function renderProb(){el('probCards').innerHTML=PROBCARDS.map(x=>probabilityCard(x)).join('');el('overviewProb').innerHTML=PROBCARDS.slice(0,2).map(x=>probabilityCard(x,true)).join('');}
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

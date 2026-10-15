window.SIGNAL_OS_OPERATIONS={
  "schema_version": 1,
  "updated_at": "2026-10-15",
  "report_as_of": "2026-10-14 (당일 집계; 종료 전)",
  "last_confirmed_campaign_ids_as_of": "2026-10-12 for duplicate-name pair; single-name current status provisionally mapped",
  "current_delivery_note": "10/15 최신 사용자 Instagram 홍보 캡처: '3년 동안 쌓아온 생기부' 활성(3,650조회·34웹방문·$28.42), 가운데 광고 일시중단(3,824조회·27웹방문·$21.28), '면접장에서 머릿속이 하얘진다면' 게재되지 않음 · 광고 검토(약1.3만조회·173웹방문·$54.85). 이전 Meta Fragmentation Apply now는 1 Ad set Complete/생기부 Fix errors, 전체 적용 실패. 광고 검토 원인은 미확인, Meta CSV 집계와 혼합 금지.",
  "profile": "인스타그램 @alphaedu_ipsi · Meta Ads 광고 데이터 수동 제출 기반",
  "policy": {
    "auto_pause": false,
    "auto_resume": false,
    "auto_apply_meta": false,
    "requirements": "광고 중단·재개·증액은 최신 캠페인 ID별 상태/비용/목표/후속 전환을 확인하고 사용자 승인 후 제안",
    "data_freshness": "10/14 Day breakdown imported; 10/15 재수집 때 당일 지표 재확인 필요. ID 미포함으로 설정/타겟별 ON/OFF 자동 조정 금지."
  },
  "priorities": [
    {
      "id": "P-APPEAL-W1",
      "level": "우선",
      "type": "소구점 A/B",
      "campaign_ids": [],
      "status": "문안 제작 계획 · 아직 게시 전",
      "title": "이번 주 콘텐츠 A/B: 불안·공감형 vs 해결·효능형 생기부 릴스 제작",
      "why": "기존 실전 불안/공감형 소재의 랜딩 효율이 좋았지만, 해결/효능형이 저장·공유·후속 행동에 더 유리할 가능성도 있음.",
      "next": "10/16 A/B 후킹·스크립트 확정 → 10/19~20 일반 릴스 게시 제안(확정 전) → 각 게시물 24h/72h/7d 동일 창 성과 비교. 추가 유료 광고 예산 없음.",
      "due": "2026-10-16",
      "decision": "현재 계획 2가지 소구점을 명시; 게시일 확정과 업로드는 사용자 수행/승인 필요"
    },
    {
      "id": "P-META-W1",
      "level": "높음",
      "type": "Meta 최적화 실행·검증",
      "campaign_ids": [
        "120252790032910529",
        "120252790030140529"
      ],
      "status": "유사 광고세트 통합 적용 실패 · 부분 게시 확인 필요",
      "title": "이번 주: Meta 추천 적용 가능한 항목을 단계적으로 검토하고 전후 성과 비교",
      "why": "User wishes to try all practicable Meta recommendations. Current account-wide budget cap KRW 20,000/day means budget increase is incompatible, and ad set merge may compromise appeal/targ experiment.",
      "next": "인스타 앱의 생기부 홍보 광고 확인 및 Meta 변경 이력 점검. 통합 재시도·다른 추천 추가 적용은 보류.",
      "due": "2026-10-22",
      "decision": "추천 적용 실패, 하얘진다면 세트 Complete / 생기부 세트 Fix errors. 완료된 전체 통합으로 간주하지 않음."
    },
    {
      "id": "P0",
      "level": "긴급",
      "type": "예산 통제",
      "campaign_ids": [],
      "status": "사용자 운영안 확정 · Meta 실제 변경 미확인",
      "title": "최신 생기부 릴스 2개만 남기고 기존 활성 4개 일시중지 확인",
      "why": "사용자는 10/13에 시작한 생기부 릴스 2개만 계속 집행하기로 선택. 기준 일일 전체 광고비 2만 원. 최신 캡처에는 아직 6개 활성으로 보이므로 변경 완료 여부를 확인해야 함.",
      "next": "Instagram 광고 관리의 위에서 3~6번째(하얘진다면 동명 2개, 공개된 면접 기출, 면접실 입장 프로필) 일시중지. 위에서 1~2번째 생기부 릴스는 남김. 광고 세트별 일예산을 각각 약 $5~6 수준으로 계획하고 총예산/종료일을 확인. 적용 후 캡처로 2개 활성 여부를 검증.",
      "due": "2026-10-14",
      "decision": "두 생기부 릴스 유지 / 다른 기존 활성 4개 일시중지 계획. 실제 실행 여부 미확인"
    },
    {
      "id": "P1",
      "level": "우선",
      "type": "유지 후보",
      "campaign_ids": [
        "120252750718860529",
        "120252750732410529"
      ],
      "status": "사용자 계획: 광고 2개 일시중지",
      "title": "‘하얘진다면’ 두 광고는 예산을 위해 일시중지",
      "why": "10/14 CSV 두 광고의 당일 LPV 조회당 비용 $0.229(동일 제목 합산). 이어진 21:49 Instagram 광고 관리 화면의 누적 실적은 3번째 $49.29/156 LPV=$0.316, 4번째 $52.00/165 LPV=$0.315로 사실상 비슷해 우열 확정 불가. 각 캠페인 ID 연결 필요.",
      "next": "두 광고를 중지하고 비용·랜딩 수치 기록. 10/16 생기부 결과와 비교 후 다음 테스트 후보로 보관.",
      "due": "2026-10-14",
      "decision": "예산 확보를 위한 일시중지 계획 · 효율이 나빠서 OFF하는 것은 아님"
    },
    {
      "id": "P2",
      "level": "높음",
      "type": "모니터링",
      "campaign_ids": [
        "120252790032910529",
        "120252790030140529"
      ],
      "status": "사용자 선택: 유일한 운영 후보 2개 · 실제 상태 미확인",
      "title": "생기부 릴스 2개만 남겨 10/16까지 추적",
      "why": "10/13 두 광고 합계 $9.70·19클릭·LPV 7 → 10/14 $16.72·41클릭·LPV 25. 10/14 랜딩당 비용 $0.669로 개선했지만 ‘하얘진다면’ 두 광고 합산 $0.229보다 비쌉니다.",
      "next": "실제 각 광고 예산과 활성 여부를 확인. 합계 하루 $10~12 정도의 계획값으로 제한할지 검토하고 10/16에 10/13~10/15 데이터를 합산해 LPV당 비용·CTR·클릭 후 방문을 비교.",
      "due": "2026-10-16",
      "decision": "두 소재 동시 관찰 계획 · 실제 종료/예산 변경 여부 확인 필요"
    },
    {
      "id": "P3",
      "level": "높음",
      "type": "비용 점검",
      "campaign_ids": [
        "120252725830220529",
        "120252745926050529"
      ],
      "status": "일시중지 계획",
      "title": "프로필 방문 목적 광고 2개는 예산 확보를 위해 일시중지",
      "why": "10/14 면접실 입장 프로필 방문 $13.35/24회=$0.556, 기출 공개 프로필 방문 $13.97/32회=$0.437. 같은 결과 유형에서는 전자가 약 27% 비쌉니다.",
      "next": "활성 광고 5~6번째 프로필 방문 광고 중지 확인. 이후 재개 시 실제 팔로우 전환을 확보할 때까지 보관.",
      "due": "2026-10-16",
      "decision": "프로필 광고 2개 모두 일시중지 계획"
    },
    {
      "id": "P4",
      "level": "높음",
      "type": "재개 후보",
      "campaign_ids": [
        "120252682521260529"
      ],
      "status": "예산 부담 때문에 중단 · 실제 성과 문제 여부 미확인",
      "title": "현재 비활성인 ‘지원동기 암기’ 광고를 재개 실험 후보로 검토",
      "why": "사용자 설명: '돈이 너무 많이 드는 것 같아서' 중단한 것으로 보임. 기존 10/07~10/13 수치는 지출 $72.08, 랜딩 조회 175회, 랜딩당 약 $0.412. 성과가 나빠서 중단했다고 해석하지 않음.",
      "next": "먼저 한 주/한 달 광고비 총 한도를 정한 뒤, 기존 캠페인의 중단 사유를 예산 관리로 기록. 사용자가 승인하는 경우에만 제한된 기간·예산으로 재개 실험을 고려.",
      "due": "2026-10-16",
      "decision": "예산 한도 설정 전 재개 보류; 성과 부진 판정 아님"
    },
    {
      "id": "P5",
      "level": "중간",
      "type": "실험 설계",
      "campaign_ids": [
        "120252682521260529",
        "120252682511880529"
      ],
      "status": "다음 주 기획",
      "title": "소재×연령 반응 가설 검증 계획",
      "why": "이전 자료에서 지원동기 소재는 35~54세, 예상질문 소재는 18~34세의 클릭 후 랜딩 비율이 유리. 단 이 연령은 실제 노출 기준이지 설정한 타겟이 아닙니다.",
      "next": "목표·지역·예산·게재 위치를 통일하고 연령만 조정하는 실험을 설계. 먼저 Meta Ads와 Instagram 광고 설정을 확보.",
      "due": "2026-10-19",
      "decision": "신규 광고 설정 변경 전 가설 명문화"
    },
    {
      "id": "P6",
      "level": "중간",
      "type": "유기 콘텐츠",
      "campaign_ids": [],
      "status": "게시 시점 협의",
      "title": "‘9000원으로 면접장 분위기 고르기’ 릴스는 광고 없이 반응 테스트",
      "why": "공감 유머형 콘텐츠는 유료 클릭보다 댓글·공유·비팔로워 도달에 맞는 목적을 가짐. 실제 게시 여부와 성과는 아직 미확인.",
      "next": "게시 여부와 날짜를 알려주면 24시간·72시간·7일 체크 일정에 반영. 광고 전환 목표와 분리해 추적.",
      "due": "2026-10-19",
      "decision": "유료 집행 권고 없음"
    }
  ],
  "cadence": [
    {
      "date": "2026-10-15",
      "window": "이번 주 Meta 실험",
      "title": "변경 전 누적 기준선 확보",
      "frequency": "일간",
      "request": "제출한 Meta 두 광고 누적 캡처와 10/14까지 CSV를 기록. 실제 광고 ON/OFF·예산 변경 시각과 나머지 4개 중지 여부 확인",
      "outcome": "두 광고 누적 LPV당 비용 $0.921 / $0.777을 기준선으로 보관(집행 기간 차이 주의)",
      "experiment_id": "META-REELS-FORMAT-WEEK1"
    },
    {
      "date": "2026-10-16",
      "window": "이번 주 Meta 실험",
      "title": "Meta Preview · 실제 적용 대상 확인",
      "frequency": "일간",
      "request": "Advantage+ creative enhancement > Preview에서 광고 2개 이름/ID, AI가 변경할 문구 예시 캡처",
      "outcome": "이 기능이 두 생기부 릴스에 적용 가능한지, 어느 한 광고에 먼저 사용할지 결정",
      "experiment_id": "META-REELS-FORMAT-WEEK1"
    },
    {
      "date": "2026-10-17",
      "window": "이번 주 Meta 실험",
      "title": "문구 품질·예산 검토",
      "frequency": "일간",
      "request": "적용 전 최종 날짜별 광고 성과 + 광고별 실제 일예산, 종료일 및 문구 왜곡 여부",
      "outcome": "승인 가능한 실험 내용과 실험 전 데이터 확정",
      "experiment_id": "META-REELS-FORMAT-WEEK1"
    },
    {
      "date": "2026-10-18",
      "window": "이번 주 Meta 실험",
      "title": "문구 개선을 한 광고에만 적용 (조건부)",
      "frequency": "일간",
      "request": "미리보기 적합성과 사용자 승인이 확보되면 광고 1개만 적용 후 변경 시각·화면 기록",
      "outcome": "한 가지 변경만 기록(대상 불명/부적절하면 이번 주 미적용)",
      "experiment_id": "META-REELS-FORMAT-WEEK1"
    },
    {
      "date": "2026-10-19",
      "window": "이번 주 Meta 실험",
      "title": "적용 후 최초 확인",
      "frequency": "일간",
      "request": "적용한 광고/그대로 둔 광고의 날짜별 광고비·클릭·랜딩 조회 및 상태",
      "outcome": "기준선 대비 개선/악화의 방향 확인",
      "experiment_id": "META-REELS-FORMAT-WEEK1"
    },
    {
      "date": "2026-10-21",
      "window": "이번 주 Meta 실험",
      "title": "적용 후 3~4일 누적 비교",
      "frequency": "일간",
      "request": "10/18~10/21 두 광고의 날짜별 광고비·클릭·LPV, 다른 변경 이력",
      "outcome": "변경 후 LPV당 비용·CTR·방문율 비교, 데이터 충분성 판단",
      "experiment_id": "META-REELS-FORMAT-WEEK1"
    },
    {
      "date": "2026-10-22",
      "window": "이번 주 Meta 실험",
      "title": "결론 및 두 번째 광고 적용 여부 결정",
      "frequency": "일간",
      "request": "변경 전/후 동일 집계 기준 CSV + 결과값 + 적용 시각",
      "outcome": "유지/원복/추가 관찰 결정. 두 번째 릴스 문구 개선 적용 여부 별도 검토",
      "experiment_id": "META-REELS-FORMAT-WEEK1"
    },
    {
      "date": "2026-10-23",
      "window": "콘텐츠 A/B",
      "title": "B 게시 72시간 반응",
      "frequency": "콘텐츠",
      "request": "A와 B 각각 게시 후 72h까지 조회수·공유/저장/댓글과 시청 유지 데이터",
      "outcome": "두 소구점의 72시간 성과를 같은 창으로 비교"
    },
    {
      "date": "2026-10-26",
      "window": "콘텐츠 A/B",
      "title": "불안·공감형 A 7일 실적",
      "frequency": "콘텐츠",
      "request": "A 게시 7일 기준 Instagram 인사이트",
      "outcome": "A 유기 게시 성과 확정 전 체크"
    },
    {
      "date": "2026-10-27",
      "window": "콘텐츠 A/B",
      "title": "해결·효능형 B 7일 결과 / 최종 소구점 비교",
      "frequency": "콘텐츠",
      "request": "B 게시 7일 및 A 게시 7일 동일 창 인사이트",
      "outcome": "저장·공유·댓글·시청 유지·팔로우의 메시지별 성과 비교"
    },
    {
      "date": "2026-10-31",
      "window": "월말",
      "title": "10월 마케팅 월간 리뷰",
      "frequency": "월간",
      "request": "10월 전체 지출/캠페인 상태 변경·랜딩·문의·매출·신규 팔로워와 유기 콘텐츠별 성과",
      "outcome": "광고별 실제 비즈니스 목표 기여와 가설 검증 요약, 11월 예산/콘텐츠 제안"
    }
  ],
  "experiments": [
    {
      "id": "EXP-OPS-01",
      "title": "생기부 2종 초기 반응 추적",
      "status": "이번 주 Meta 추천 복수 검토 · 10/22 전후 비교",
      "kind": "현재 광고 추적",
      "cohort": "기존 광고 2개",
      "campaign_ids": [
        "120252790032910529",
        "120252790030140529"
      ],
      "started": "2026-10-13",
      "next_review": "2026-10-22",
      "hypothesis": "생기부 광고 2개에서 집행 초기 랜딩 비용이 떨어지지만 실제 최종 전환을 알 수 없다.",
      "setup": "10/13 시작 생기부 릴스 2개만 운영하는 실험. 다른 활성 4개는 예산 확보를 위해 일시중지할 계획. 두 릴스 실제 일예산과 변경 시각을 확인해 분석 기간에 기록.",
      "metrics": [
        "광고비",
        "링크 CPC",
        "링크 클릭→랜딩 도달 비율",
        "랜딩 조회당 비용"
      ],
      "rule": "하루 두 광고 전체 2만원 가이드. 첫 3일 방문비용 기준선 기록. 추천 적용 전후에 예산·타겟·목표·링크는 바꾸지 않고 수정 시각 기록.",
      "after": "기능별 실제 적용 시각과 예산/설정 변경 기록을 바탕으로 10/22 평가. 추천이 동시에 변경되면 전체 변경 묶음의 결과로만 해석."
    },
    {
      "id": "EXP-OPS-02",
      "title": "동일 주제 하얘진다면 A/B 검증",
      "status": "10/14 추가 수치 확보 · ID 분리 대기",
      "kind": "기존 광고의 비교 설계",
      "cohort": "A 718860 vs B 732410",
      "campaign_ids": [
        "120252750718860529",
        "120252750732410529"
      ],
      "started": "2026-10-10",
      "next_review": "2026-10-15",
      "hypothesis": "두 광고 합산 10/14 방문당 비용 $0.229로 효율적이나 어느 캠페인이 기여했는지 알 수 없다.",
      "setup": "10/13 및 10/14 파일 모두 Campaign ID 없음. 다음 내보내기에서 Campaign ID 열 추가하여 같은 이름 두 캠페인 성과를 구분.",
      "metrics": [
        "링크 CTR",
        "링크 CPC",
        "랜딩 조회당 비용",
        "최종 전환"
      ],
      "rule": "제목으로 임의 매칭 금지. 10/14 광고비 $8.07와 $7.70의 순서를 A/B ID로 추정하지 않음.",
      "after": "10/19 동일 조건의 통제 실험 여부 결정."
    },
    {
      "id": "EXP-OPS-03",
      "title": "연령별 광고 효율 재현 실험",
      "status": "미시작 · 설계만",
      "kind": "다음 신규 실험",
      "cohort": "18~34세 vs 35~54세 (가설)",
      "campaign_ids": [
        "120252682521260529"
      ],
      "started": null,
      "next_review": "2026-10-19",
      "hypothesis": "동일 소재에서도 35~54세에서 클릭→랜딩 도달 비율이 높을 수 있다.",
      "setup": "같은 크리에이티브·링크·목표·예산·기간을 최대한 유지하면서 연령만 분리. 자동 타겟 확장 설정에 주의.",
      "metrics": [
        "링크 클릭→랜딩 도달 비율",
        "랜딩 조회당 비용",
        "문의/팔로우 전환"
      ],
      "rule": "예산 및 중단 임계값은 목표 전환 수집과 합의 후 설정. 결과가 나오기 전 증액/감액하지 않음.",
      "after": "3일 초기 점검, 7일 재평가 (실제 시작일 확정 후 날짜 기입)."
    },
    {
      "id": "EXP-OPS-04",
      "title": "‘9000원으로 면접장 분위기 고르기’ 유기 릴스",
      "status": "게시일 협의 전 · 실험 기획",
      "kind": "콘텐츠 게시 계획",
      "cohort": "유료 광고 없이 1개 릴스",
      "campaign_ids": [],
      "started": null,
      "next_review": "2026-10-19",
      "hypothesis": "선택 게임형 공감 콘텐츠는 기존 정보성 콘텐츠보다 댓글·공유 반응이 좋을 수 있습니다.",
      "setup": "릴스 1개만 일반 게시, 모바일 가독성을 위해 여러 컷으로 구성. '어떤 조합 선택?' CTA를 추가하고 업로드 시각을 기록합니다.",
      "metrics": [
        "조회수",
        "공유율",
        "댓글률",
        "비팔로워 도달",
        "프로필 방문"
      ],
      "rule": "광고비 없이 게시하고, 24시간·72시간·7일에 동일 기준으로 추적. 이전 정보성 게시물과 비교할 때 주제·시점 차이를 고려.",
      "after": "게시일 확정 시 24h·72h·7d 점검 일정으로 전환. 광고 집행은 별도 판단."
    },
    {
      "id": "EXP-OPS-05",
      "title": "비활성 지원동기 광고 재개 여부 3일 테스트",
      "status": "계획만 · 중단 원인 확인 필요",
      "kind": "재개 후보 검증",
      "cohort": "지원동기 암기 경계",
      "campaign_ids": [
        "120252682521260529"
      ],
      "started": null,
      "next_review": "2026-10-17",
      "hypothesis": "과거 LPV당 비용 $0.412 수준이 현재에도 재현될 수 있다.",
      "setup": "광고를 중단했던 이유와 타겟을 확인하고, 사용자가 승인한 경우에만 소액 재개. 명확한 시작일 기록 후 동일 광고 목적/기간으로 비교.",
      "metrics": [
        "LPV당 비용",
        "클릭→LPV 비율",
        "문의 및 팔로우"
      ],
      "rule": "과거와 다른 시기·타겟은 통제된 실험 아님. 3일 최소 측정 후 7일 리뷰. 승인 없이 재개하지 않음.",
      "after": "실험 시작 시 +3일/+7일 리뷰 일정 업데이트"
    }
  ],
  "decisions": [
    {
      "at": "2026-10-14",
      "date_range": "2026-09-13~2026-10-13",
      "kind": "초기 운영 계획",
      "headline": "최신 상태 미확인으로 오늘 즉시 중단/재개할 광고는 확정하지 않음",
      "action": "10/14 자료 확보 → 신규 2종 3일 추적 → A/B 설정 확인",
      "reason": "10/13까지 검증된 집계는 존재하지만 광고별 최신 ON/OFF, 인사이트 외 최종 전환, 타겟 설정은 불충분.",
      "result": "승인 대기 · 실제 광고 상태는 변경하지 않음"
    },
    {
      "at": "2026-10-14 20:44 KST",
      "date_range": "2026-10-07~2026-10-14",
      "kind": "일별 운영 브리핑 (당일 잠정 집계)",
      "headline": "ACTIVE 6 / INACTIVE 4; 하얘진다면 2건 유지 관찰, 생기부 2건 10/16 재평가, 프로필 광고 비용 검토",
      "action": "10/15 Campaign ID 포함 CSV로 현재 성과 재확인 → 10/16 3일차 광고 판단 → 지원동기 광고 재개 후보 승인 여부 확인",
      "reason": "10/14 지출 $59.81/노출11,785/링크194/LPV94. 동명 A/B 10/14 LPV69/$15.77≈$0.229, 신규 생기부 LPV25/$16.72≈$0.669, 프로필 방문 24회/$13.35=$0.556 vs 32회/$13.97=$0.437. 캠페인 ID 열 없음.",
      "result": "Signal OS 분석에 반영. 실제 Meta 광고 상태는 변경하지 않음."
    },
    {
      "at": "2026-10-14 (사용자 설명)",
      "date_range": "기존 지원동기 광고 중단",
      "kind": "운영 결정 사유 업데이트",
      "headline": "지원동기 광고는 비용 부담 우려로 일시중지. 성과 부진으로 확정하지 않음",
      "action": "주간/월간 최대 광고비 확정 후 전체 동시 집행 수와 테스트 기간을 정하고 재개 여부 검토",
      "reason": "사용자 설명: '돈이 너무 많이 드나 싶어서'. 성과 하락 때문에 중단했다는 근거는 없음.",
      "result": "광고 상태 변경 없음 · 예산 상한 사용자 결정 대기"
    },
    {
      "at": "2026-10-14",
      "date_range": "광고 운영 예산 가이드",
      "kind": "사용자 예산 결정",
      "headline": "광고 계정 전체 하루 20,000원 이내로 운영 계획 수립",
      "action": "동시 집행 수 원칙적으로 1개부터, 3일 소액 관찰 → 7일 리뷰. 메타 실제 ON/OFF·예산 및 종료일 확인 후 사용자 승인 필요",
      "reason": "예산 부담으로 과거 광고를 중단했다고 설명했고 총 일일 지출을 제한하기로 함. 환율 기준 20,000원 약 USD 14.96, 계정은 USD 청구.",
      "result": "운영 규칙과 우선순위만 웹앱에 기록. 실제 광고 설정 변경 없음."
    },
    {
      "at": "2026-10-14 21:49 KST",
      "kind": "Instagram 광고 관리 화면 확인 / 예산 축소 제안",
      "date_range": "사용자 제공 누적 10개 광고 현황",
      "headline": "누적 $458.87, 활성 6건/일시중지 4건: 하루 2만원 기준으로 동시 6개 집행은 지나침",
      "action": "제안: 활성 광고 중 생기부 2개 및 프로필형 2개 중단 검토, 동일 썸네일 '하얘진다면' 둘 중 ID 확인 후 한 개 더 중단; 지출이 더 걱정되면 먼저 활성 전체를 일시중지하고 1개만 예산 정해 재개. 결과 추적은 정지 전/후 구분.",
      "reason": "누적 LPV당 비용: 하얘진다면 3·4번째 각각 $0.316, $0.315; 생기부 1·2번째 $0.854, $0.800. 프로필 방문형은 목표가 달라 별도 평가; 현재 총 예산이 핵심 제약. 누적 $458.87는 기존 $458.77 CSV와 10센트 차이가 있고 아직 상담·매출 추적 없음.",
      "result": "추천만 기록 / 사용자가 실제 광고를 중단·재개했다는 확인 없음 / Meta 계정 변경 없음."
    },
    {
      "at": "2026-10-14 (수신 시각 미기록)",
      "date_range": "최근 생기부 릴스 2개 중심 운영",
      "kind": "사용자 집행 선택",
      "headline": "새 릴스 ‘3년 쌓아온 생기부’ 및 ‘생기부 면접 준비’ 2개만 유지하기로 결정",
      "action": "그 외 활성 4개 광고(하얘진다면 2개·프로필 목적 2개) 일시중지 여부 확인; 두 생기부 광고 각각 하루 $5~6 정도의 계획 예산으로 합계 목표를 맞추고 10/16 성과 평가",
      "reason": "신규 릴스를 며칠 더 추적하고 싶다는 사용자 선택; 하루 전체 광고비 목표 2만원. 광고 효율이 높은 하얘진다면 소재도 이번엔 예산·실험 우선순위로 잠시 쉼.",
      "result": "유지할 두 게시물 선택 완료. 중지 4개와 두 광고 예산 변경은 Meta에서 실제 수행됐는지 아직 확인되지 않음."
    },
    {
      "at": "2026-10-15 10:22 KST",
      "kind": "향후 7일 Meta 추천 검증 설계",
      "date_range": "2026-10-15~2026-10-22",
      "headline": "Meta 'Reels format 9:16 + audio' 추천을 신규 생기부 릴스 대상 적격 확인 후 1개에만 적용하는 시험 계획",
      "action": "10/15~17 기준선 수집, 10/18 적격성·승인 조건 충족 시 한 광고만 변경, 10/19~21 추적, 10/22 랜딩 비용 비교. 다른 추천 병행 적용 금지.",
      "reason": "사용자 요청: Meta Ads 추천 실제 적용 전후 효율을 추적하고 싶음. 계정 전체 하루 2만 원 및 최근 릴스 2개 운영 선택 유지. 이전 Meta 캡처에서는 적용 대상의 캠페인 ID 미확인.",
      "result": "실험 일정만 작성, 실제 Meta 추천 적용되지 않음. 광고 상태·예산 변경 사실도 아직 재확인하지 못함."
    },
    {
      "at": "2026-10-15 오전 KST (화면 촬영 시각 미확인)",
      "date_range": "2026-10-13~10/15 오전, 변경 전 스냅샷",
      "kind": "Meta 추천 실험 전 측정값 기록",
      "headline": "생기부 릴스 2개: LPV 27회씩, 누적 지출 $24.88/$20.98. Meta 3% text improvement는 아직 미적용",
      "action": "Meta Advantage+ Creative의 Preview를 열어 적격 광고 2개/변경 문구 확인. 첫 번째에는 한 광고만 적용 후 10/22 비교, 두 번째는 순차 테스트.",
      "reason": "Meta 추천은 문구 개선에 3% 예상 효과, 예산 증가·광고 세트 병합·최적화 목표 변경을 동시에 하면 성과 원인 추적 불가. CSV는 10/14 날짜별 캠페인 연령×성별 667행이며 신규 스냅샷 수치와 혼합·합산하지 않음.",
      "result": "기준선과 실험 순서만 OS에 기록. 사용자가 실제 'Apply now'를 눌렀다는 확인 없음."
    },
    {
      "at": "2026-10-15 11:27 KST",
      "date_range": "2026-10-15~2026-10-26",
      "kind": "이번 주 프로젝트 범위 확정",
      "headline": "Meta 추천 적용 전후 비교와 생기부 소구점 A/B(불안·공감 vs 해결·효능)를 이번 주 최우선 프로젝트 2개로 등록",
      "action": "Meta 추천은 적격성/예산/타겟/법적 조건 확인 후 단계별 적용 로그. 소구점 A/B 릴스는 일반 게시로 초안 작성·업로드 일정 제안, 24h/72h/7d 비교. 10/22 Meta 1차 평가, 10/27 콘텐츠 양쪽 7일 평가.",
      "reason": "사용자 명시적인 이번 주 목표. 하루 전체 광고비 KRW20,000. 동시에 광고 설정·크리에이티브·타겟을 바꾸면 인과효과 분리 불가.",
      "result": "Signal OS 운영 계획 기록만 완료; 실제 Meta 추천 적용/새 게시물 업로드/광고 일시중지는 아직 확인되지 않음."
    },
    {
      "at": "2026-10-15",
      "kind": "프로젝트 진행 페이지 생성",
      "date_range": "2026-10-15 이후",
      "headline": "Meta 추천 적용 전후 성과 검증 프로젝트 등록",
      "action": "대화에서 확인되는 적용 내용·날짜·비교 결과를 이 프로젝트 로그에 누적. 적용 전은 10/15 기준선, 후속 점검은 10/22.",
      "reason": "사용자 요청: 왼쪽 02 프로젝트 진행 페이지에서 현재 진행과 변경 내역을 지속적으로 확인",
      "result": "계획과 기준선 기록 완료. Meta 실제 추천 적용 여부 미확인"
    },
    {
      "at": "2026-10-15",
      "kind": "프로젝트 기준선 확보 · 실집행 광고 정정",
      "date_range": "2026-09-15~2026-10-14",
      "headline": "현재 활성 광고 2개(생기부·하얘진다면)의 Meta Ads 날짜별 CSV 확인",
      "action": "Ad ID를 추가 확보하고, Meta 추천 실제 적용 대상/기능/적용 시각을 기록한 다음 변경 후 성과 비교. 추천 자동 적용 없음.",
      "reason": "Ads CSV 60행, 2개 Ad name, 일자별 결과 확인. 누적 USD $19.57/LPV22, USD $50.11/LPV158. 현재 10/15 캡처는 별도 이후 스냅샷으로 분리.",
      "result": "프로젝트 변경 전 기준선 등록 완료. 광고 집행 상태와 비용 설정은 수정하지 않음."
    },
    {
      "at": "2026-10-15 (시각 미표시)",
      "kind": "Meta 추천 직접 실행 · 게시 준비 중",
      "headline": "Fragmentation (유사 광고 세트 통합) Apply now 클릭",
      "action": "Meta 게시 확인 결과와 두 광고/광고세트의 정확한 식별자 수집. 다른 최적화는 별도로 관리.",
      "reason": "사용자 화면의 '10% lower cost per link click potential' 추천을 실행. Meta는 'Fragmentation will be applied to 2 ads'라고 안내.",
      "result": "Meta 게시 준비 중, 완료 여부 미확인. 예상 CPC $0.21→$0.19는 사후 실측 아님."
    },
    {
      "at": "2026-10-15 (화면 촬영 시각 미확인)",
      "kind": "광고 검토 상태 후속 확인",
      "headline": "유사 광고세트 통합 실패 이후 하얘진다면 광고는 심사 상태",
      "action": "인스타 앱 광고 검토 화면과 Meta Ads Manager 수정 이력 확인. 승인/거절 전 신규 수정 및 재적용 자제.",
      "reason": "인스타 홍보 화면에서 하얘진다면 게재되지 않음/광고 검토, 생기부 활성.",
      "result": "변경 원인은 미확정. 10/15 누적 스냅샷을 다른 기간 CSV와 혼합하지 않음."
    }
  ],
  "upload_spec": {
    "preferred": "Meta Ads Manager CSV: 캠페인 ID + 날짜별 분류(Day), 광고 세트/광고 ID, 상태(Delivery), 지출, 링크 클릭, 노출, 랜딩 조회, 결과 유형",
    "screenshot": "광고 관리자 날짜 범위·상단 지표 및 광고 이름/캠페인 ID가 모두 보이게 캡처",
    "manual": "그날 광고 ON/OFF 사유, 예산·타겟·소재 변경(전/후), 새 게시물 게시 여부, 문의/팔로우·구매 증가, 적용한 Meta 추천",
    "dedupe": "계정 × 캠페인 ID × 날짜 × 성과 지표로 저장; 같은 기간 재업로드는 변경 감지 후 갱신, 단순 합산 금지",
    "scorecard": "오늘 요약 → 유지/수정/일시중지/재개 제안과 근거 → 실행 여부 확인 → 다음 측정 날짜 → 주간·월간 인사이트"
  },
  "budget_policy": {
    "status": "사용자 선택: 최근 생기부 릴스 2개 유지, 그 외 기존 활성 광고 4개 일시중지 계획. 실제 반영 여부 미확인",
    "currency": "KRW",
    "daily_total_budget_krw": 20000,
    "weekly_reference_budget_krw": 140000,
    "month_30_day_reference_budget_krw": 600000,
    "account_currency": "USD",
    "fx_reference": {
      "as_of": "2026-10-14",
      "source": "실시간 환율 참고 조회",
      "daily_krw_equivalent_usd": 14.9609,
      "krw_per_usd": 1336.817972180818,
      "disclaimer": "정산 환율·수수료·Meta 일별 변동지출에 따라 실제 차이 발생"
    },
    "intent": "전체 광고 계정의 하루 지출 가이드로 적용(개별 캠페인당 2만 원이 아님).",
    "provisional_active_ads": 2,
    "planning_daily_usd_range": [
      10,
      12
    ],
    "plan_daily_krw_range_at_fx": [
      13368,
      16042
    ],
    "keep_buffer_krw": "기준 환율로 두 광고 합계 약 13,400~16,000원/일의 계획값. 환율·일별 지출 변동에 대비한 여유 약 4,000~6,600원. 평균 일예산은 절대 상한이 아님.",
    "three_day_plan": "사용자가 선택한 10/13 시작 생기부 릴스 2개를 각각 하루 $5~6 정도의 계획 예산으로 10/16 평가까지 추적. 현재 Meta 예산·가능한 기간 총예산/종료일을 반드시 확인. 실제 ON/OFF 변경 완료 여부 미확인.",
    "seven_day_rule": "7일 이후 성과 비교 및 연장 여부 재승인. 무기한 게재하지 않음",
    "priority": "사용자는 최신 생기부 릴스 2개 유지, 나머지 4개 일시중지 의향을 표현. 실제 Meta 집행 상태와 각 광고 세트 예산을 확인한 뒤에만 ON/OFF 완료로 기록.",
    "enforcement": "Signal OS는 지출을 자동 차단하거나 광고를 중지하지 않음. Meta 일일 예산은 평균이며 일별 지출이 변할 수 있음. 엄격한 최대 지출은 가능한 총예산·종료일 등 Meta 자체 통제 설정 확인",
    "spend_control": "Meta Ads Manager의 Campaigns/Ad sets 실제 예산 확인. 전환/프로필 목적이 다르면 가급적 동시에 여러 광고를 돌리지 않음",
    "change_approval_required": true,
    "plan": [
      {
        "stage": "즉시",
        "days": "10/14",
        "active_campaigns": 2,
        "goal": "사용자 선택대로 최신 릴스 2개 유지, 다른 기존 활성 4개 일시중지 확인",
        "candidate": "3년 쌓아온 생기부 / 생기부 면접 준비",
        "status": "사용자 계획 확인 · Meta 변경 여부는 미확인"
      },
      {
        "stage": "초기 리뷰",
        "days": "10/16",
        "active_campaigns": 2,
        "goal": "10/13~10/15 집행 날짜별 랜딩 조회당 비용과 클릭 후 방문 비율 비교",
        "candidate": "생기부 릴스 2개",
        "status": "자료 추가 수집 대기"
      },
      {
        "stage": "7일 평가",
        "days": "10/20",
        "active_campaigns": 2,
        "goal": "최대 일일 총예산 내에서 연장·1개 중단·새 소재 전환 의사결정",
        "candidate": "그때까지의 실제 성과를 기준으로 선택",
        "status": "다음 주 결정"
      }
    ],
    "user_set_on": "2026-10-14",
    "source": "사용자: '일단은 하루에 2만원'",
    "latest_visual_snapshot": {
      "captured": "2026-10-14 21:49 KST",
      "source": "사용자 제공 Instagram 광고 관리 캡처",
      "cumulative_total_usd": 458.87,
      "active": 6,
      "paused": 4,
      "screenshot_items": [
        {
          "position": 1,
          "description": "생기부 · 3년 쌓아온 생기부 (썸네일 추정)",
          "goal": "landing_page_visit",
          "results": 17,
          "spend_usd": 14.51,
          "unit_cost_usd": 0.8535294117647059,
          "active": true,
          "recommendation": "pause_candidate"
        },
        {
          "position": 2,
          "description": "생기부 · 면접 준비 (썸네일 추정)",
          "goal": "landing_page_visit",
          "results": 15,
          "spend_usd": 12,
          "unit_cost_usd": 0.8,
          "active": true,
          "recommendation": "pause_candidate"
        },
        {
          "position": 3,
          "description": "하얘진다면 · 같은 썸네일 1",
          "goal": "landing_page_visit",
          "results": 156,
          "spend_usd": 49.29,
          "unit_cost_usd": 0.31596153846153846,
          "active": true,
          "recommendation": "choose_one_of_pair"
        },
        {
          "position": 4,
          "description": "하얘진다면 · 같은 썸네일 2",
          "goal": "landing_page_visit",
          "results": 165,
          "spend_usd": 52,
          "unit_cost_usd": 0.3151515151515151,
          "active": true,
          "recommendation": "choose_one_of_pair"
        },
        {
          "position": 5,
          "description": "공개된 면접 기출 (썸네일 추정)",
          "goal": "profile_visit",
          "results": 154,
          "spend_usd": 61.31,
          "unit_cost_usd": 0.39811688311688315,
          "active": true,
          "recommendation": "pause_candidate"
        },
        {
          "position": 6,
          "description": "면접실 입장 (썸네일 추정)",
          "goal": "profile_visit",
          "results": 214,
          "spend_usd": 73.02,
          "unit_cost_usd": 0.341214953271028,
          "active": true,
          "recommendation": "pause_candidate"
        },
        {
          "position": 7,
          "description": "면접실 입장 · 클릭",
          "goal": "landing_page_visit",
          "results": 81,
          "spend_usd": 44.28,
          "active": false,
          "recommendation": "stay_paused"
        },
        {
          "position": 8,
          "description": "면접이 코앞인데",
          "goal": "landing_page_visit",
          "results": 58,
          "spend_usd": 38.51,
          "active": false,
          "recommendation": "stay_paused"
        },
        {
          "position": 9,
          "description": "지원동기 암기",
          "goal": "landing_page_visit",
          "results": 175,
          "spend_usd": 72.08,
          "active": false,
          "recommendation": "stay_paused"
        },
        {
          "position": 10,
          "description": "예상질문 암기",
          "goal": "landing_page_visit",
          "results": 70,
          "spend_usd": 41.87,
          "active": false,
          "recommendation": "stay_paused"
        }
      ],
      "budget_conflict": "당일 목표 20,000 KRW ≈ $14.96(참고 환율)인데 10/14 CSV 부분집계 지출 $59.81 ≈ 79,919 KRW. 기존 데이터의 전체 누적에 더하지 않음",
      "note": "이 스냅샷 지출은 누적값이고 10/14 하루치가 아님. 광고 수정/일시중지 실무는 사용자 Meta에서 직접 결정·수행하며 Signal OS가 자동 제어하지 않음."
    },
    "daily_operating_recommendation": "사용자 선택: 최신 생기부 릴스 2개만 남기고 기존 활성 4개(하얘진다면 2개, 프로필 방문 2개)를 일시중지. 두 릴스 각각 하루 $5~6 계획, 총 $10~12(약 1.3~1.6만원 참고 환율). 설정된 일예산은 지출 상한이 아니며 실제 예산 및 종료일 확인 필요. 수행 여부는 사용자 추가 확인 필요.",
    "per_ad_planning_daily_usd_range": [
      5,
      6
    ],
    "user_selected_on": "2026-10-14 21:49 이후 (정확한 시각 미기록)",
    "user_selection_status": "의향 확인: 두 개 남길게; 기타 4개 일시중지의 실제 실행 화면은 아직 없음"
  },
  "last_screenshot_as_of": "2026-10-14 21:49 KST",
  "weekly_focus": {
    "id": "META-REELS-FORMAT-WEEK1",
    "title": "이번 주 프로젝트 1 · Meta 추천 적용 전후 성과 분석",
    "label": "이번 주 단일 추천 검증",
    "period_start": "2026-10-15",
    "period_end": "2026-10-21",
    "decision_date": "2026-10-22",
    "status": "변경 전 Ads CSV 확인 완료 / 현재 활성 2개 ID 보완 필요 / Meta 추천 미적용",
    "recommendation_id": "meta-20261015-text-creative",
    "recommendation_title": "Advantage+ creative enhancement: text improvements for 2 eligible ads",
    "why_selected": "사용자 요청에 따라 적용 가능한 Meta 추천의 전후 성과를 비교합니다. 동시 적용 시 각 권고의 개별 효과는 분리 불가하며, 하루 전체 광고비 2만원 가이드를 지킵니다.",
    "keep_ads": [
      {
        "id": "120252790032910529",
        "name": "3년 쌓아온 생기부",
        "eligibility": "Meta 추천 적용 대상 확인 필요"
      },
      {
        "id": null,
        "name": "면접장에서 머릿속이 하얘진다면?",
        "eligibility": "정확한 Ad ID 확인 필요"
      }
    ],
    "required_preconditions": [
      "최근 생기부 릴스 두 광고만 활성인지 실제 Meta 상태 재확인; 이전에 활성 6개 화면은 더 오래된 기록",
      "Meta Advantage+ creative enhancement의 Preview에서 Ads 2가 '3년 쌓아온 생기부', '생기부 면접 준비'인지 광고명/ID 확인",
      "기존 문구와 Meta 수정 예시를 비교해 입시 정보의 사실·의미가 바뀌지 않는지 확인",
      "하루 전체 광고 예산 2만 원 가이드 및 광고별 실제 예산/종료일 확인",
      "다른 변수(타겟, 입찰, 캠페인 목표, 게재 위치, 랜딩 URL)를 동시에 바꾸지 않음",
      "적용할 광고 한 개만 선택·시각 기록. 다른 광고는 그대로 두고 관찰. 두 소재가 달라 엄격한 A/B 통제군은 아님",
      "Meta 광고 변경은 실제 사용자 승인 후 수동으로 진행"
    ],
    "intervention": {
      "scope": "생기부 릴스 2개 중 Preview에서 적격 확인된 1개만 Advantage+ Creative 'text improvements' 활성화 검토",
      "date_planned": "2026-10-18",
      "applied": false,
      "applied_at": null,
      "campaign_id": null,
      "control_campaign_id": null,
      "exact_change": null,
      "cancelled_if": "생기부 릴스 2개가 추천 적용 대상이 아니거나 문구 의미가 왜곡되거나 예산·타겟·목표 변경이 동반될 경우 적용 보류",
      "both_ads_requested": "사용자는 두 개 광고 모두 실험하고 싶다고 밝혔으나, 한 번에 둘 다 변경하지 않고 첫 광고 결과 확인 후 두 번째에 순차 적용을 검토"
    },
    "daily_budget": {
      "cap_krw": 20000,
      "account_wide": true,
      "planning_per_ad_usd": "대략 $5~6/일씩, 두 개 합계 $10~12/일을 고려하되 Meta 현재 설정·지출 관리 옵션 확인 후 사용자 승인",
      "note": "일예산은 일별 절대 지출 상한이 아님. 가능한 경우 기간 총예산·종료일·계정 지출 한도를 추가 검토"
    },
    "phases": [
      {
        "date": "2026-10-15",
        "name": "적용 전 기준선 확보",
        "request": "현재 두 릴스의 광고비·랜딩 수·목표·설정·실제 상태를 저장",
        "deliverable": "현재 두 릴스의 광고비·랜딩 수·목표·설정·실제 상태를 저장"
      },
      {
        "date": "2026-10-16",
        "name": "추천별 대상 및 Preview 확인",
        "request": "추천 6종을 적용 가능/보류로 분류하고 문구·배치·목표 변경 범위를 확인",
        "deliverable": "추천 6종을 적용 가능/보류로 분류하고 문구·배치·목표 변경 범위를 확인"
      },
      {
        "date": "2026-10-17",
        "name": "예산·변경 범위 결정",
        "request": "하루 2만원 가이드 유지, 적용할 기능·대상 광고 ID·변경 시각 기록 계획 승인",
        "deliverable": "하루 2만원 가이드 유지, 적용할 기능·대상 광고 ID·변경 시각 기록 계획 승인"
      },
      {
        "date": "2026-10-18",
        "name": "적격 기능 적용 시작 (조건부)",
        "request": "Meta에서 실제 적용은 사용자가 직접 실행, 항목별 변경 시각을 별도 기록",
        "deliverable": "Meta에서 실제 적용은 사용자가 직접 실행, 항목별 변경 시각을 별도 기록"
      },
      {
        "date": "2026-10-19",
        "name": "적용 후 1차 확인",
        "request": "일별 CSV로 변경 이후 반응·비용 추적",
        "deliverable": "일별 CSV로 변경 이후 반응·비용 추적"
      },
      {
        "date": "2026-10-21",
        "name": "적용 후 추세 비교",
        "request": "동일 기간·동일 목표의 변경 전후 지표 점검",
        "deliverable": "동일 기간·동일 목표의 변경 전후 지표 점검"
      },
      {
        "date": "2026-10-22",
        "name": "1차 결과 정리",
        "request": "변경 묶음의 유의미한 방향성 판단, 추가 관찰/원복/재시험 권고",
        "deliverable": "변경 묶음의 유의미한 방향성 판단, 추가 관찰/원복/재시험 권고"
      }
    ],
    "success": {
      "primary_metric": "LPV당 비용 = 광고비 / 랜딩페이지 조회",
      "secondary_metrics": [
        "링크 CTR",
        "링크 클릭→랜딩 도달 비율",
        "CPC",
        "랜딩페이지 조회 수",
        "누적 광고비",
        "문의/팔로우/실제 전환(있을 때)"
      ],
      "target": "문구 개선을 적용한 한 광고에서 LPV당 비용·방문 품질이 함께 개선되는지 방향을 확인, 별도 날짜별 비용과 결과를 비교",
      "inference": "서로 다른 두 소재는 무작위 통제군이 아니며 변경 전후 비교에는 시간·학습·소재 차이가 섞인다. 통계적 인과 효과로 확정하지 않음",
      "meta_forecast": "Meta의 3% 비용 개선은 계정 화면의 예상값이며, 현재 두 생기부 릴스에 실제로 같은 개선이 발생한다는 보장 없음"
    },
    "daily_log": [],
    "result": "변경 전 일별 성과를 Ads 60행에서 확보. 변경 후 실적 미수집. 적용 시각을 기록한 뒤 10/22 비교 예정.",
    "next_week_candidate": "문구 개선 시험 결과 확인 후 두 번째 생기부 광고에 순차 확대하거나 랜딩페이지 조회 최적화(+23% 예상)를 단일 후속 실험으로 분리",
    "baseline": {
      "screenshot": {
        "date": "2026-10-15",
        "source": "사용자 Instagram 광고관리 현황 화면",
        "ads": [
          {
            "name": "3년 쌓아온 생기부",
            "date": "2026-10-15 (시간 미확인)",
            "impressions_displayed": 3213,
            "landing_page_views": 27,
            "spend_usd": 25.45,
            "cost_per_lpv_usd": 0.9425925925925925
          },
          {
            "name": "면접장에서 머릿속이 하얘진다면?",
            "date": "2026-10-15 (시간 미확인)",
            "impressions_displayed": 12000,
            "impressions_is_rounded": true,
            "landing_page_views": 159,
            "spend_usd": 50.83,
            "cost_per_lpv_usd": 0.319685534591195
          }
        ]
      },
      "csv": {
        "source": "979718671826640-Ads-Sep-15-2026-Oct-14-2026.csv",
        "period": "2026-09-15~2026-10-14",
        "rows": 60,
        "granularity": "date × ad name",
        "campaign_id_present": false,
        "ads": [
          {
            "name": "3년 쌓아온 생기부",
            "ad_name": "Instagram 게시물: 📚 3년 동안 쌓아온 생기부, 면접에서는 어떻게 말해야...",
            "campaign_id": "120252790032910529",
            "campaign_id_verified": false,
            "ad_id": null,
            "spend_usd": 19.57,
            "impressions": 2462,
            "link_clicks": 43,
            "landing_page_views": 22,
            "ctr": 0.017465475223395612,
            "cpc_usd": 0.4551162790697674,
            "lpv_cost_usd": 0.8895454545454545,
            "period_start": "2026-10-13",
            "period_end": "2026-10-14",
            "status_in_export": "active"
          },
          {
            "name": "면접장에서 머릿속이 하얘진다면?",
            "ad_name": "Instagram 게시물: 면접장에서 머릿속이 하얘진다면? 😵‍💫 예상 질문 100개를...",
            "campaign_id": null,
            "campaign_id_verified": false,
            "ad_id": null,
            "spend_usd": 50.11,
            "impressions": 11937,
            "link_clicks": 257,
            "landing_page_views": 158,
            "ctr": 0.021529697578956185,
            "cpc_usd": 0.1949805447470817,
            "lpv_cost_usd": 0.3171518987341772,
            "period_start": "2026-10-10",
            "period_end": "2026-10-14",
            "status_in_export": "active",
            "identity_note": "동일 제목의 캠페인이 과거 2개 존재했으므로 Ad ID 없이 특정 A/B 캠페인과 대응 불가"
          }
        ]
      },
      "interpretation": "캡처는 CSV 기간 이후 반영된 누적값일 수 있으나 시점 정확히 미확인. 같은 누적값을 서로 더하지 않음. 스냅샷 비교에는 Meta의 지연 집계·재귀속 가능성이 있으므로 동일 설정의 날짜별 재수집 필요."
    }
  },
  "weekly_projects": {
    "version": 1,
    "user_requested_at": "2026-10-15 11:27 KST",
    "heading": "이번 주 핵심 프로젝트 · 2개",
    "summary": "Meta 추천 적용 전후(10/22 1차)와 불안·공감형 vs 해결·효능형 콘텐츠 비교(10/27 7일 리뷰)",
    "budget": {
      "account_daily_cap_krw": 20000,
      "account_currency": "USD",
      "current_ads": "생기부 릴스 2개 유지 선택 · 설정 및 다른 광고 OFF 실제 상태는 재확인 필요",
      "max_note": "모든 광고 합산 하루 2만원 운영 가이드. Meta 일일 예산은 절대 상한이 아니므로 지출 통제 설정 확인 필요."
    },
    "projects": [
      {
        "id": "META-REC-ALL",
        "number": "01",
        "category": "META RECOMMENDATIONS",
        "title": "Meta 추천 적용 전후 성과 검증",
        "short": "적용 가능한 기능을 검토하고 실제 사용 전·후 성과 비교",
        "status": "통합 추천 실패 기록 · 하얘진다면 광고 검토 중(현재 게재되지 않음)",
        "status_type": "tracking",
        "window": "10/15–10/22",
        "deadline": "2026-10-22",
        "checkpoint": "2026-10-18",
        "goal": "개선 기능들을 적용한 전체 변경 묶음이 같은 광고 목표의 LPV당 비용과 후속 행동을 개선하는지 확인",
        "applied": false,
        "changes_logged": 0,
        "comparison": "이번 실험은 Meta의 유사 광고세트 통합 요청에 대한 사전·사후 관찰입니다. 전후 동일 광고 ID와 지표·보고 기간을 매칭하여 링크 CPC, 방문당 비용 등 비교하고, 광고 세트 구조·예산·타겟 변화로 인한 교란을 명시합니다. 통제군 없는 원인 확정은 금지.",
        "metrics": [
          "랜딩페이지 조회당 비용 (USD/LPV)",
          "링크 클릭 후 랜딩 도달율 (LPV/링크 클릭)",
          "링크 CTR",
          "총 광고비와 결과 수",
          "상담·구매 전환 (확보 가능할 때)"
        ],
        "baseline": {
          "as_of": "2026-10-14 · Meta Ads 탭 Day breakdown CSV",
          "source_file": "979718671826640-Ads-Sep-15-2026-Oct-14-2026.csv",
          "source_rows": 60,
          "date_range": [
            "2026-09-15",
            "2026-10-14"
          ],
          "verification": "Ads 탭에서 두 광고 이름만 필터링됨. 날짜별 수치는 확인. Ad ID·Campaign ID·Ad set ID 열 없음.",
          "verified_campaign_ids": false,
          "notes": "이 CSV는 10/14까지이며 두 광고 집행일 전체 합계입니다. 10/15 캡처의 지출/랜딩은 이후 누적 관측치이므로 더하거나 동일 기간으로 해석하지 않습니다. 같은 제목의 다른 캠페인과 ID로 구분하지 못함.",
          "posts": [
            {
              "name": "3년 쌓아온 생기부",
              "ad_name": "Instagram 게시물: 📚 3년 동안 쌓아온 생기부, 면접에서는 어떻게 말해야...",
              "campaign_id": "120252790032910529",
              "campaign_id_verified": false,
              "ad_id": null,
              "spend_usd": 19.57,
              "impressions": 2462,
              "link_clicks": 43,
              "landing_page_views": 22,
              "ctr": 0.017465475223395612,
              "cpc_usd": 0.4551162790697674,
              "lpv_cost_usd": 0.8895454545454545,
              "period_start": "2026-10-13",
              "period_end": "2026-10-14",
              "status_in_export": "active"
            },
            {
              "name": "면접장에서 머릿속이 하얘진다면?",
              "ad_name": "Instagram 게시물: 면접장에서 머릿속이 하얘진다면? 😵‍💫 예상 질문 100개를...",
              "campaign_id": null,
              "campaign_id_verified": false,
              "ad_id": null,
              "spend_usd": 50.11,
              "impressions": 11937,
              "link_clicks": 257,
              "landing_page_views": 158,
              "ctr": 0.021529697578956185,
              "cpc_usd": 0.1949805447470817,
              "lpv_cost_usd": 0.3171518987341772,
              "period_start": "2026-10-10",
              "period_end": "2026-10-14",
              "status_in_export": "active",
              "identity_note": "동일 제목의 캠페인이 과거 2개 존재했으므로 Ad ID 없이 특정 A/B 캠페인과 대응 불가"
            }
          ],
          "daily": [
            {
              "date": "2026-10-10",
              "name": "면접장에서 머릿속이 하얘진다면?",
              "spend_usd": 1.22,
              "impressions": 235,
              "link_clicks": 4,
              "landing_page_views": 2
            },
            {
              "date": "2026-10-11",
              "name": "면접장에서 머릿속이 하얘진다면?",
              "spend_usd": 14.9,
              "impressions": 3415,
              "link_clicks": 77,
              "landing_page_views": 38
            },
            {
              "date": "2026-10-12",
              "name": "면접장에서 머릿속이 하얘진다면?",
              "spend_usd": 9.65,
              "impressions": 2285,
              "link_clicks": 43,
              "landing_page_views": 26
            },
            {
              "date": "2026-10-13",
              "name": "면접장에서 머릿속이 하얘진다면?",
              "spend_usd": 15.45,
              "impressions": 3804,
              "link_clicks": 92,
              "landing_page_views": 60
            },
            {
              "date": "2026-10-13",
              "name": "3년 쌓아온 생기부",
              "spend_usd": 6.32,
              "impressions": 838,
              "link_clicks": 11,
              "landing_page_views": 3
            },
            {
              "date": "2026-10-14",
              "name": "면접장에서 머릿속이 하얘진다면?",
              "spend_usd": 8.89,
              "impressions": 2198,
              "link_clicks": 41,
              "landing_page_views": 32
            },
            {
              "date": "2026-10-14",
              "name": "3년 쌓아온 생기부",
              "spend_usd": 13.25,
              "impressions": 1624,
              "link_clicks": 32,
              "landing_page_views": 19
            }
          ],
          "latest_screenshot": [
            {
              "name": "3년 쌓아온 생기부",
              "date": "2026-10-15 (시간 미확인)",
              "impressions_displayed": 3213,
              "landing_page_views": 27,
              "spend_usd": 25.45,
              "cost_per_lpv_usd": 0.9425925925925925
            },
            {
              "name": "면접장에서 머릿속이 하얘진다면?",
              "date": "2026-10-15 (시간 미확인)",
              "impressions_displayed": 12000,
              "impressions_is_rounded": true,
              "landing_page_views": 159,
              "spend_usd": 50.83,
              "cost_per_lpv_usd": 0.319685534591195
            }
          ],
          "roas_available": false,
          "ui_pre_apply": {
            "as_of": "2026-10-15 (캡처 시각 미표시)",
            "unit": "Instagram 광고 요약 UI - Meta CSV LPV와 다른 지표",
            "items": [
              {
                "name": "3년 동안 쌓아온 생기부",
                "delivery": "active",
                "views": 3603,
                "website_visits": 33,
                "spend_usd": 28.02,
                "website_visit_cost_usd": 0.8490909090909091
              },
              {
                "name": "면접장에서 머릿속이 하얘진다면",
                "delivery": "active",
                "views_display": "1.3만(반올림)",
                "website_visits": 170,
                "spend_usd": 54.64,
                "website_visit_cost_usd": 0.32141176470588234
              },
              {
                "name": "중간 광고 (이름 불명)",
                "delivery": "paused",
                "views": 3823,
                "website_visits": 27,
                "spend_usd": 21.27,
                "website_visit_cost_usd": 0.7877777777777778
              }
            ],
            "restriction": "활성 2개를 이름-순서로 확인하되, Meta 통합을 받는 '2 ads'는 ID로 검증 안 됨. 이 UI의 '웹사이트 방문'과 이전 CSV LPV는 별도 지표; 합산 금지."
          }
        },
        "recommendations": [
          {
            "id": "meta-20261015-text-creative",
            "name": "Advantage+ 문구 개선",
            "meta_projection": "결과당 비용 약 3% 감소 가능",
            "decision": "1순위 테스트",
            "status": "Preview와 대상 광고 확인 대기",
            "action": "광고별 Preview 확인 → 문구 정확성 검토 → 승인 시 적용 시각 기록",
            "feasible": "조건부 가능"
          },
          {
            "id": "meta-20261015-lpv-goal",
            "name": "랜딩페이지 조회 목표 최적화",
            "meta_projection": "LPV당 비용 23% 감소 가능",
            "decision": "우선 검토",
            "status": "해당 광고 세트·현재 목표 확인 대기",
            "action": "현재 결과 최적화 목표와 랜딩 URL 확인 후 별도 변경 시각 기록",
            "feasible": "목표/대상 확인 후"
          },
          {
            "id": "meta-20261015-placements",
            "name": "Advantage+ 게재 위치",
            "meta_projection": "결과당 비용 11.7% 감소 가능",
            "decision": "조건부 테스트",
            "status": "광고 세트/배치 Preview 확인 대기",
            "action": "릴스 텍스트/동영상이 잘리거나 왜곡되지 않는지 Preview 확인 후 검토",
            "feasible": "대상 확인 후"
          },
          {
            "id": "meta-20261015-website",
            "name": "웹사이트 전환 추적 연결",
            "meta_projection": "전환당 비용 25% 감소 가능",
            "decision": "준비 과제",
            "status": "웹사이트와 전환 이벤트 확인 필요",
            "action": "웹사이트 소유권·전환 이벤트·개인정보 및 Pixel/CAPI 측정 조건 확인",
            "feasible": "연동 가능성 확인 후"
          },
          {
            "id": "meta-20261015-budget",
            "name": "일예산 증액",
            "meta_projection": "더 많은 결과 가능(효율 개선 보장 아님)",
            "decision": "보류",
            "status": "하루 전체 2만원 가이드와 충돌",
            "action": "이번 주 증액 금지. 실제 광고 2개 예산이 한도를 넘지 않는지 확인",
            "feasible": "현재 예산 정책과 불일치"
          },
          {
            "id": "meta-20261015-fragmentation",
            "name": "유사 광고 세트 병합",
            "meta_projection": "학습 분산 완화 가능·타 광고주 유입 증가 관측",
            "decision": "적용 실패 확인",
            "status": "10/15 Recommendation wasn't applied. 한 세트 Complete, 생기부 Fix errors, Ad 1개 게시 실패",
            "action": "Instagram 앱 홍보 관리에서 수정 가능 범위 확인. 이미 Complete로 표시된 세트의 실제 변경 이력도 확인.",
            "feasible": "Meta 광고 관리자 편집 제한"
          }
        ],
        "phases": [
          {
            "date": "2026-10-15",
            "title": "적용 전 기준선 확보",
            "note": "현재 두 릴스의 광고비·랜딩 수·목표·설정·실제 상태를 저장"
          },
          {
            "date": "2026-10-16",
            "title": "추천별 대상 및 Preview 확인",
            "note": "추천 6종을 적용 가능/보류로 분류하고 문구·배치·목표 변경 범위를 확인"
          },
          {
            "date": "2026-10-17",
            "title": "예산·변경 범위 결정",
            "note": "하루 2만원 가이드 유지, 적용할 기능·대상 광고 ID·변경 시각 기록 계획 승인"
          },
          {
            "date": "2026-10-18",
            "title": "적격 기능 적용 시작 (조건부)",
            "note": "Meta에서 실제 적용은 사용자가 직접 실행, 항목별 변경 시각을 별도 기록"
          },
          {
            "date": "2026-10-19",
            "title": "적용 후 1차 확인",
            "note": "일별 CSV로 변경 이후 반응·비용 추적"
          },
          {
            "date": "2026-10-21",
            "title": "적용 후 추세 비교",
            "note": "동일 기간·동일 목표의 변경 전후 지표 점검"
          },
          {
            "date": "2026-10-22",
            "title": "1차 결과 정리",
            "note": "변경 묶음의 유의미한 방향성 판단, 추가 관찰/원복/재시험 권고"
          },
          {
            "date": "2026-10-15",
            "title": "사용자가 광고 세트 통합 Apply now 클릭",
            "note": "Meta 하단 게시 준비 중 확인. 게시 완료가 아니라 변경 요청만 증빙됨. 대상 ID/성공 여부 추가 확인 필요."
          }
        ],
        "caution": "'광고세트 통합' 추천을 사용자가 10/15 직접 클릭했습니다. 화면에는 게시 준비 중으로 표시돼 완료로 확정할 수 없습니다. 다른 추천인 Text improvements나 예산 증액은 실제 적용 확인되지 않았습니다. 통합이 성공하면 광고 구조/타겟이 바뀌어 전후 비교의 인과적 해석에 제약이 생길 수 있습니다.",
        "result": "Meta 통합 추천 전체 적용 실패. 10/15 후속 스냅샷에서 '하얘진다면' 광고는 게재되지 않음/광고 검토; '생기부'는 활성. 재심사 사유와 부분 게시된 세트 변경 내역 미확인.",
        "last_checked": "2026-10-15",
        "project_name": "Meta Recommendation Impact Test",
        "started_at": "2026-10-15",
        "started_time_note": "2026-10-15 사용자 프로젝트 등록 시점; 추천 실제 적용 날짜는 별도 기록",
        "last_updated": "2026-10-15",
        "phase_current": "02 / 오류 이후 광고 심사 상태 확인 및 운영 영향 추적",
        "progress_stage": 2,
        "progress_stage_total": 4,
        "actual_completion_date": null,
        "next_action": {
          "due": "2026-10-15",
          "headline": "'하얘진다면' 광고 검토 상세 및 Meta 변경 내역 확인",
          "deliverables": [
            "광고 검토 상세 문구·실제 상태(검토/승인/거절)",
            "Meta 광고 관리자 Activity history에서 10/15 광고세트 변경 항목 확인",
            "리뷰 완료 이후 같은 지표로 다시 캡처"
          ],
          "status": "광고 검토 상태 확인 필요 · Meta 추천 재시도 보류"
        },
        "progress_log": [
          {
            "at": "2026-10-15",
            "kind": "시작",
            "status": "프로젝트 등록",
            "headline": "Meta 추천 적용 전후 성과 검증 프로젝트 시작",
            "detail": "하루 2만원 예산 안에서 적용 가능한 추천들을 검토. 예산 증액·의도적인 실험 구조를 무너뜨릴 광고 세트 통합은 보류."
          },
          {
            "at": "2026-10-15",
            "kind": "변경 전 데이터",
            "status": "확보",
            "headline": "생기부 릴스 2개 누적 지출·랜딩 수 저장",
            "detail": "3년 쌓아온 생기부 $24.88 / LPV 27 / 조회당 $0.921. 생기부 면접 준비 $20.98 / LPV 27 / 조회당 $0.777. 캡처 시각 불명; 같은 기간 CSV와 합산 금지."
          },
          {
            "at": "2026-10-15",
            "kind": "진행 원칙",
            "status": "적용 대기",
            "headline": "추천을 적용한 항목과 시각을 기록해 변경 전후 비교",
            "detail": "여러 추천을 동시에 적용하면 각 기능별 효과는 구분할 수 없으므로 전체 변경 묶음의 전후 성과로만 해석. 실제 Meta 적용은 확인 전."
          },
          {
            "at": "2026-10-15",
            "kind": "변경 전 Ads 일별 CSV",
            "status": "확보·확인",
            "headline": "실제 활성 광고 두 개를 기준선으로 갱신",
            "detail": "업로드 파일 60행, Sep15–Oct14, 광고 2개. 생기부: $19.57/43링크클릭/22LPV($0.890/LPV); 하얘진다면: $50.11/257링크클릭/158LPV($0.317/LPV). 이름별 일자 기록 저장. Ad ID 및 Campaign ID가 없으므로 광고 ID 확정 불가. Meta 추천 미적용."
          },
          {
            "at": "2026-10-15",
            "kind": "최신 활성 상태",
            "status": "확인·수정",
            "headline": "대상 광고를 생기부 + 하얘진다면로 정정",
            "detail": "사용자 최근 광고 관리 캡처에서 활성 광고는 '3년 쌓아온 생기부'와 '면접장에서 머릿속이 하얘진다면?'. '생기부 면접 준비'는 일시중지 표시. 프로젝트 기준선의 잘못된 두 번째 광고 연결을 정정."
          },
          {
            "at": "2026-10-15 17:12 KST",
            "kind": "실험 대상 사용자 확인",
            "status": "적용 전",
            "headline": "Meta 추천 Apply now 대상으로 '3년 쌓아온 생기부' 릴스 확인",
            "detail": "사용자가 실제 추천을 적용해볼 대상으로 3년 쌓아온 생기부 릴스를 지정. 추천 타입과 Ads 1개/2개 적용 범위는 현재 캡처로는 확정하지 못함. 사용자가 Apply now를 눌렀는지는 미확인. 10/15 캡처 누적 $25.45, LPV 27, LPV당 $0.943을 변경 전 스냅샷으로 기록."
          },
          {
            "at": "2026-10-15 · 정확한 시각 미확인",
            "kind": "Meta 추천 적용 요청",
            "status": "게시 준비 중 · 완료 미확인",
            "headline": "Apply now 클릭: 유사 광고 세트 통합(Fragmentation)",
            "detail": "사용자 직접 클릭. Meta는 'Preparing to publish changes'와 'Fragmentation will be applied to 2 ads' 표시. 2개 광고의 정확한 Ad ID는 아직 미확인. 문구 개선(Text improvements)을 적용한 것이 아님."
          },
          {
            "at": "2026-10-15",
            "kind": "실패 원인 확인",
            "status": "Meta 추천 적용 실패",
            "headline": "통합 작업 중 생기부 광고 편집 제한으로 오류 발생",
            "detail": "광고 세트 하나는 Complete지만 생기부 세트는 Fix errors, 광고 하나도 게시되지 않음. 성공한 변경이 무엇인지는 미확인. 실행 직전 스냅샷 보존."
          },
          {
            "at": "2026-10-15 (시각 미표시)",
            "kind": "실행 영향 추적",
            "status": "광고 검토 · 게재되지 않음",
            "headline": "하얘진다면 광고 검토 시작 가능성 확인",
            "detail": "사용자 인스타 광고 관리 UI에서 해당 광고가 '게재되지 않음 / 광고 검토'로 표시. 생기부 광고는 계속 Active. Meta 세트 통합 시도와 인과관계는 아직 검증하지 못함."
          }
        ],
        "change_log": [
          {
            "at": "2026-10-15 · 클릭 시각 미표시",
            "title": "Meta 추천 'Fragmentation' Apply now 클릭 → 게시 준비 중",
            "headline": "광고 세트 2개 통합 추천 실행 요청 · 두 광고에 적용 준비 중",
            "kind": "사용자 직접 Meta 설정 변경 요청",
            "status": "preparing_to_publish · 성공 미확인",
            "detail": "Meta Opportunity score에서 'Combine 2 similar ad sets impacted by fragmentation' Apply now 클릭. 하단 팝업: 'Preparing to publish changes' / 'Fragmentation will be applied to 2 ads'. Meta 예측 링크 CPC $0.21→$0.19 (-10%). 실제 적용 완료, 대상 광고/세트 ID·적용 시각, 성과 변화는 미확인.",
            "evidence": "10/15 Meta Ads Manager 사용자 캡처",
            "baseline_note": "10/15 변경 전 UI: 생기부 조회 3603·웹 방문33·$28.02 / 하얘진다면 약 1.3만 조회·웹 방문170·$54.64. 독립 Meta 보고 기간의 CSV $19.57·$50.11과 단순 합산 금지.",
            "next": "게시 완료/실패 확인 → 실제 변경 대상 2개 광고세트 ID 식별 → 24h·72h·7d 비교"
          },
          {
            "at": "2026-10-15 · Meta 오류 확인",
            "kind": "적용 실패",
            "status": "실패 · 일부 게시 항목은 재확인 필요",
            "headline": "Fragmentation 추천 완전 적용 실패 — 인스타 앱 편집 제한",
            "detail": "'Some items not published'와 'Recommendation wasn't applied'. Ad sets 1 of 2: '면접장에서 머릿속이 하얘진다면' Complete, '3년 동안 쌓아온 생기부' Fix errors. Ad 0 of 1. 원인: 'Boosted Post Editing Is Only Allowed in Instagram App'.",
            "next": "재시도하지 않고 Instagram 앱 광고 관리 및 Meta 변경 이력 확인"
          },
          {
            "at": "2026-10-15 · 최신 상태 캡처",
            "headline": "'면접장에서 머릿속이 하얘진다면' 광고 검토 · 게재되지 않음",
            "status": "광고 검토 / 재승인 미확인",
            "detail": "이전 Meta 오류 확인 후 사용자 Instagram 홍보 관리 화면: '3년 동안 쌓아온 생기부' Active(3,650뷰/34웹사이트 방문/$28.42), 가운데 Paused(3,824/27/$21.28), '면접장에서 머릿속이 하얘진다면' Not delivering + Ad review(약1.3만/173/$54.85). 직전 해당 광고세트 Complete 표시와 실제 광고 심사/게재 상태는 별개. 연관 가능성은 있으나 원인 확정 불가.",
            "next": "심사 상세·Meta 변경 이력 확인, 불필요한 재적용/예산 변경 보류"
          }
        ],
        "after_data": null,
        "evaluation_rules": [
          "추천 적용 전후 동일 목표·ID·동등한 측정 기간을 비교",
          "어떤 기능을 어느 광고에 언제 적용했는지 기록",
          "여러 추천을 함께 적용하면 각 추천의 개별 효과로 단정하지 않음",
          "ROAS는 실제 매출 및 전환 데이터가 없으면 추정하지 않음",
          "모든 광고 합산 하루 2만 원 가이드 유지, 예산 증액은 보류"
        ],
        "test_subject_confirmation": {
          "received_at": "2026-10-15 17:12 KST",
          "name": "3년 동안 쌓아온 생기부, 면접에서는 어떻게 말해야...",
          "associated_campaign_id": "120252790032910529",
          "campaign_id_source": "기존 CSV 이름 매핑(별도의 광고 Ad ID는 미수집)",
          "confirmed_by_user": true,
          "apply_now_clicked": true,
          "meta_recommendation_type": "Fragmentation: 유사 광고 세트 2개 통합 권고 클릭. 실제 대상의 생기부 포함 여부는 ID로 확인 필요.",
          "scope_warning": "광고 1개만 변경되는지 Preview/적용 범위를 확인. Ads 2로 보이면 두 광고 동시 변경 여부 확인.",
          "baseline_snapshot": {
            "as_of": "2026-10-15 화면 누적",
            "spend_usd": 25.45,
            "landing_page_views": 27,
            "cost_per_lpv_usd": 0.9425925925925925
          },
          "next": "게시 완료 또는 실패 알림 확인 → 실제 Meta 광고세트/광고 ID 2개 확보"
        },
        "apply_failure": {
          "received_date": "2026-10-15",
          "action": "Fragmentation recommendation Apply now",
          "alert": "Some items not published / Recommendation wasn't applied",
          "adsets": "1 of 2 Complete",
          "ads": "0 of 1",
          "complete_adset": "면접장에서 머릿속이 하얘진다면",
          "failed_adset": "3년 동안 쌓아온 생기부",
          "error": "Boosted Post Editing Is Only Allowed in Instagram App",
          "interpretation": "전체 추천 적용 실패, 일부 항목은 게시됐을 가능성. 실제 최종 광고세트 구조 확인 필요."
        },
        "after_error_delivery": {
          "as_of": "2026-10-15 사용자 캡처 (시각 미표시)",
          "rows": [
            {
              "name": "3년 쌓아온 생기부",
              "status": "active",
              "views": 3650,
              "website_visits": 34,
              "spend_usd": 28.42
            },
            {
              "name": "가운데 광고 · 신원 미확인",
              "status": "paused",
              "views": 3824,
              "website_visits": 27,
              "spend_usd": 21.28
            },
            {
              "name": "면접장에서 머릿속이 하얘진다면",
              "status": "not delivering; ad review",
              "views_rounded": "1.3만",
              "website_visits": 173,
              "spend_usd": 54.85
            }
          ],
          "caution": "Meta 이전 광고세트 Complete = 광고 심사 승인/활성 아님. 변경 후 검토로 진입한 원인, 실제 적용된 설정은 확인되지 않음. 집계 지연 가능."
        }
      },
      {
        "id": "APPEAL-AB",
        "number": "02",
        "category": "CONTENT APPEAL A/B",
        "title": "불안·공감형 vs 해결·효능형",
        "short": "같은 생기부 면접 주제, 다른 심리적 소구점 비교",
        "status": "별도 프로젝트 · 문안 기획 중 / 실제 게시 전",
        "status_type": "planned",
        "window": "10/16–10/27",
        "deadline": "2026-10-27",
        "checkpoint": "2026-10-23",
        "goal": "수험생에게 실전 불안 공감과 구체적 해결 효능 중 어느 메시지가 더 반응을 이끄는지 검증",
        "channel": "인스타그램 일반 게시 우선 · 유료 집행 전환은 별도 승인",
        "variables": {
          "fixed": [
            "동일 주제(생기부 면접)",
            "동일한 영상 길이/구성 가능 범위",
            "CTA 유형, 해시태그 범위, 표지 디자인 형식 최대한 일치",
            "24h/72h/7d 동일 측정 창"
          ],
          "changed": [
            "첫 문장과 핵심 소구점(불안·공감 vs 해결·효능)"
          ]
        },
        "variants": [
          {
            "key": "A",
            "type": "불안·공감형",
            "title": "3년 동안 쌓은 생기부, 면접장에서 설명하지 못한다면?",
            "hook": "준비는 오래 했는데 막상 질문을 받으면 머리가 하얘지는 순간",
            "hypothesis": "공감과 불안 자극이 초반 관심·조회·댓글을 높일 수 있음",
            "status": "업로드 전",
            "post_id": null
          },
          {
            "key": "B",
            "type": "해결·효능형",
            "title": "3년의 생기부를 설득력 있는 면접 답변으로 바꾸는 방법",
            "hook": "경험 하나 → 배운 점 → 지원 전공 연결로 말해보기",
            "hypothesis": "실행 가능한 구체성이 저장·공유·후속 관심을 높일 수 있음",
            "status": "업로드 전",
            "post_id": null
          }
        ],
        "phases": [
          {
            "date": "2026-10-16",
            "title": "A/B 메시지·스크립트 확정",
            "note": "유사한 제작 조건의 불안형과 해결형 후킹 문구를 확정"
          },
          {
            "date": "2026-10-17",
            "title": "릴스 제작 및 검수",
            "note": "같은 주제, 길이, CTA, 표지의 가독성과 정보 정확성 검토"
          },
          {
            "date": "2026-10-19",
            "title": "불안·공감형 A 게시 제안",
            "note": "업로드는 사용자가 진행·확정, 게시 시각 기록"
          },
          {
            "date": "2026-10-20",
            "title": "해결·효능형 B 게시 제안 + A 24시간",
            "note": "B를 비슷한 시각 게시, A의 첫 24h 지표 기록"
          },
          {
            "date": "2026-10-21",
            "title": "B 24시간 점검",
            "note": "조회수·저장·공유·프로필 방문·댓글 동시간 창 수집"
          },
          {
            "date": "2026-10-22",
            "title": "A 72시간 점검",
            "note": "A 게시 72h 성과 기록 및 매력 포인트 질적 반응 확인"
          },
          {
            "date": "2026-10-23",
            "title": "B 72시간 점검",
            "note": "B 게시 72h 결과를 A 동일 창과 비교"
          },
          {
            "date": "2026-10-26",
            "title": "A 게시 7일 기록",
            "note": "A 7일 누적 조회수·공유율·저장율·상담 등 후속 지표 기록"
          },
          {
            "date": "2026-10-27",
            "title": "B 게시 7일 · 소구점 결론",
            "note": "B 7일 누적과 A 같은 창 비교, 다음 소재의 메시지 방향 결정"
          }
        ],
        "metrics": [
          "24시간 조회수/도달",
          "평균 시청시간 또는 유지율(있다면)",
          "공유율",
          "저장율",
          "댓글률",
          "프로필 방문·팔로우 (있다면)"
        ],
        "rules": "각 릴스의 실제 게시 시각부터 24시간·72시간·7일 동일 창으로 비교합니다. 10/19·10/20은 아직 확정되지 않은 제안 일정입니다. 서로 다른 날짜의 게시이므로 인과적 A/B 테스트로 확정하지 않습니다.",
        "budget": "이번 실험은 우선 유기 게시로 운영해 광고비를 추가하지 않습니다. 두 게시물 유료 A/B는 Meta 추천 시험 종료 후 같은 예산으로 별도 진행 가능.",
        "dependencies": "업로드 날짜와 소재는 사용자 확정 전 계획 단계. 자동 업로드/자동 집행 없음.",
        "result": "아직 게시물이 제작·게시됐다는 확인 없음",
        "last_checked": "2026-10-15",
        "registration_date": "2026-10-15"
      }
    ],
    "focus_end_note": "Meta 추천 적용 전후 비교 결과와 소구점 A/B 결과는 서로 다른 실험으로 관리하고, 광고 지출까지 한 표에 섞어 인과적 결론을 내리지 않습니다."
  }
};

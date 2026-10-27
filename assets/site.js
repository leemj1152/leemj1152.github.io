(() => {
  'use strict';
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('#site-nav');
  function closeMenu() { if (!toggle || !nav) return; toggle.setAttribute('aria-expanded', 'false'); nav.classList.remove('is-open'); }
  toggle?.addEventListener('click', () => { const open = toggle.getAttribute('aria-expanded') !== 'true'; toggle.setAttribute('aria-expanded', String(open)); nav?.classList.toggle('is-open', open); });
  nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', event => { if (event.key === 'Escape' && toggle?.getAttribute('aria-expanded') === 'true') { closeMenu(); toggle.focus(); } });
  const stages = [
    ['입력 문제와 추론 문제를 구분했습니다.', 'RTSP 영상의 실제 수신 상태와 스트림 장애·복구 이력을 확인했습니다. 등록된 채널 수와 정상 수신 채널 수를 나눠 기록하고, 다채널 부하 시험의 입력 조건을 점검했습니다.'],
    ['현장 데이터로 모델을 보완했습니다.', 'YOLO·EfficientNet 계열 모델의 현장 데이터 보강과 재학습을 진행했습니다. 사람 유사 물체의 오탐과 원거리·가림 장면의 사람 누락을 함께 살피고, 모델 변환과 추론 경로를 점검했습니다.'],
    ['분류 결과에 앞서 시계열 입력부터 확인했습니다.', '스켈레톤 기반 ST-GCN과 RGB 기반 MoViNet 등의 모델을 비교·유지보수했습니다. 사람 연결과 시퀀스 입력을 점검하고, 입력 자체가 구성되지 않은 경우와 분류 점수가 낮은 경우를 구분했습니다.'],
    ['같은 입력에서 달라진 판정을 추적했습니다.', 'VideoChat과 Qwen의 입력 전처리·영상 샘플링·응답 파싱을 비교했습니다. 사람 확인과 행동 판정을 나눠 살피고, 감소한 오탐과 새로 발생한 미탐을 함께 분석했습니다.'],
    ['추론 이후의 저장과 운영 흐름까지 연결했습니다.', '이벤트 발행과 미디어 저장, DB 연계 경로를 점검했습니다. 검출 FPS와 VLM 응답 지연, 이벤트 저장 완료 여부를 나눠 계측하고 운영 진단·복구 절차를 정리했습니다.']
  ];
  const tabs = Array.from(document.querySelectorAll('[data-stage]'));
  function selectStage(index, focus = false) {
    tabs.forEach((tab, i) => { tab.setAttribute('aria-selected', String(i === index)); tab.tabIndex = i === index ? 0 : -1; });
    document.querySelector('#stage-title').textContent = stages[index][0]; document.querySelector('#stage-text').textContent = stages[index][1]; document.querySelector('#stage-panel').setAttribute('aria-labelledby', tabs[index].id);
    if (focus) { tabs[index].focus(); tabs[index].scrollIntoView({ block: 'nearest', inline: 'nearest' }); }
  }
  tabs.forEach((tab, index) => { tab.addEventListener('click', () => selectStage(index)); tab.addEventListener('keydown', event => { let next; if (event.key === 'ArrowRight') next = (index + 1) % tabs.length; if (event.key === 'ArrowLeft') next = (index - 1 + tabs.length) % tabs.length; if (event.key === 'Home') next = 0; if (event.key === 'End') next = tabs.length - 1; if (next !== undefined) { event.preventDefault(); selectStage(next, true); } }); });
})();

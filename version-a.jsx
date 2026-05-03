/* global React, ReactDOM */
// 版本 A：繪本翻頁式
// 像翻一本繪本，每跨頁一段故事 + 插畫。雙頁佈局，左右翻頁有書脊陰影。

const { useState, useEffect, useRef } = React;

const PAGES_A = [
  {
    kind: 'cover',
  },
  {
    kind: 'spread',
    leftKind: 'text',
    leftTitle: '關於這個故事',
    leftEn: 'About the story',
    leftBody: [
      '從小抱到大的熊，',
      '不僅每晚抱著睡覺，',
      '每天的喜怒哀樂都對他傾訴，',
      '承包我所有情緒。',
    ],
    rightKind: 'image',
    image: 'assets/scene-hug.png',
    rightCaption: '抱他就算不能解決煩惱，\n但能讓我得到難以言喻的安慰。',
  },
  {
    kind: 'spread',
    leftKind: 'image',
    image: 'assets/scene-cry.png',
    leftCaption: '當孩子哭泣，\n眼淚滴落在它的身上時，\n它也一點一滴地接住了。',
    rightKind: 'text',
    rightTitle: '情緒容器',
    rightEn: 'An emotional vessel',
    rightBody: [
      '熊熊不再只是玩偶，',
      '而是我的情緒載體、',
      '感情容器。',
      '',
      '它知道，自己或許只是個布偶，',
      '但對孩子而言，',
      '它承載了太多不願說出口的情緒。',
    ],
  },
  {
    kind: 'spread',
    leftKind: 'text',
    leftTitle: '循環動畫',
    leftEn: 'Loop animation · 15–20s',
    leftBody: [
      '小孩哭泣 → 眼淚落下',
      '熊熊接住 → 化為光芒',
      '光回到小孩身上',
      '新的情緒出現 → 再次循環',
      '',
      '情緒不是消失，',
      '而是被接住、被轉化，',
      '再回到自己身上，',
      '成為力量。',
    ],
    rightKind: 'image',
    image: 'assets/scene-bear-down.png',
    rightCaption: '熊熊作為情緒容器\n與情感轉化者',
  },
  {
    kind: 'spread',
    leftKind: 'image',
    image: 'assets/scene-back.png',
    leftCaption: '我喜歡「人」，\n而「人」也喜歡我。',
    rightKind: 'text',
    rightTitle: '聯絡',
    rightEn: 'Contact',
    rightBody: [
      '吳映璇  Wu Ying-Hsuan',
      '圖傳四乙｜A111040102',
      '指導老師：李芹羽',
    ],
    rightContact: 'dodowdi1108@gmail.com',
  },
];

function VersionA({ bg }) {
  const [page, setPage] = useState(0);
  const [flipping, setFlipping] = useState(null); // 'next' | 'prev' | null
  const total = PAGES_A.length;

  const goNext = () => {
    if (page >= total - 1 || flipping) return;
    setFlipping('next');
    setTimeout(() => { setPage(p => p + 1); setFlipping(null); }, 520);
  };
  const goPrev = () => {
    if (page <= 0 || flipping) return;
    setFlipping('prev');
    setTimeout(() => { setPage(p => p - 1); setFlipping(null); }, 520);
  };

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight') goNext();
      if (e.key === 'ArrowLeft') goPrev();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  const current = PAGES_A[page];

  return (
    <div className="va-root" style={{ background: bg }}>
      <div className="va-shell">
        <BookSpread page={current} flipping={flipping} idx={page} />
        <div className="va-controls">
          <button className="va-btn" onClick={goPrev} disabled={page === 0} aria-label="上一頁">‹</button>
          <div className="va-dots">
            {PAGES_A.map((_, i) => (
              <span key={i} className={'va-dot' + (i === page ? ' on' : '')} onClick={() => !flipping && setPage(i)} />
            ))}
          </div>
          <button className="va-btn" onClick={goNext} disabled={page === total - 1} aria-label="下一頁">›</button>
        </div>
        <div className="va-meta">
          <span>熊熊需要抱一下</span>
          <span className="va-page-num">{String(page + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}</span>
          <span>A Bear Needs a Hug</span>
        </div>
      </div>
    </div>
  );
}

function BookSpread({ page, flipping, idx }) {
  if (page.kind === 'cover') {
    return (
      <div className={'va-book va-cover' + (flipping ? ' flip-' + flipping : '')}>
        <div className="va-page va-page-left va-cover-left">
          <div className="va-cover-stamp">
            <div className="va-cover-tag">畢業製作 · 動畫短片 2026</div>
            <div className="va-cover-tag-en">Graduation Project · Animation</div>
          </div>
          <div className="va-cover-author">
            <div className="va-cover-by">作者</div>
            <div className="va-cover-name">吳映璇</div>
            <div className="va-cover-name-en">Wu Ying-Hsuan</div>
            <div className="va-cover-advisor">指導老師　李芹羽</div>
          </div>
        </div>
        <div className="va-page va-page-right va-cover-right">
          <img src="assets/title-logo.png" alt="熊熊需要抱一下" className="va-cover-title" />
          <img src="assets/scene-hug.png" alt="" className="va-cover-hug" />
          <div className="va-cover-en">A&nbsp;Bear&nbsp;Needs&nbsp;a&nbsp;Hug</div>
        </div>
      </div>
    );
  }
  return (
    <div className={'va-book' + (flipping ? ' flip-' + flipping : '')}>
      <SpreadSide side="left" data={page} sideKind={page.leftKind} />
      <SpreadSide side="right" data={page} sideKind={page.rightKind} />
    </div>
  );
}

function SpreadSide({ side, data, sideKind }) {
  const cls = `va-page va-page-${side}`;
  if (sideKind === 'image') {
    const cap = side === 'left' ? data.leftCaption : data.rightCaption;
    return (
      <div className={cls + ' va-page-image'}>
        <img src={data.image} alt="" className="va-illust" />
        {cap && <div className="va-caption">{cap.split('\n').map((l, i) => <div key={i}>{l}</div>)}</div>}
      </div>
    );
  }
  // text side
  const title = side === 'left' ? data.leftTitle : data.rightTitle;
  const en = side === 'left' ? data.leftEn : data.rightEn;
  const body = side === 'left' ? data.leftBody : data.rightBody;
  const contact = side === 'left' ? data.leftContact : data.rightContact;
  return (
    <div className={cls + ' va-page-text'}>
      <div className="va-page-num-deco">{side === 'left' ? '左頁' : '右頁'}</div>
      {title && <h2 className="va-h2">{title}</h2>}
      {en && <div className="va-h2-en">{en}</div>}
      <div className="va-body">
        {body && body.map((l, i) => <p key={i}>{l || '\u00A0'}</p>)}
      </div>
      {contact && (
        <a className="va-contact-link" href={'mailto:' + contact}>{contact}</a>
      )}
    </div>
  );
}

window.VersionA = VersionA;

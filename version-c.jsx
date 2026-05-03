/* global React */
// 版本 C：互動角色舞台 — 第一頁標準字置中放大、散落的小女孩可點擊晃動

const { useState, useEffect, useRef } = React;

// 散落的女孩表情（皆使用情緒頭像；w 為視窗寬度百分比）
const SCATTERED = [
  { src: 'assets/head-1.png', x: 10,  y: 18,  w: 16, rot: -8 },
  { src: 'assets/head-5.png', x: 88,  y: 16,  w: 17, rot: 7  },
  { src: 'assets/head-3.png', x: 8,   y: 72,  w: 16, rot: 5  },
  { src: 'assets/head-2.png', x: 90,  y: 66,  w: 15, rot: 9  },
  { src: 'assets/head-4.png', x: 32,  y: 88,  w: 14, rot: -6 },
  { src: 'assets/head-1.png', x: 78,  y: 90,  w: 14, rot: 8  },
  { src: 'assets/head-5.png', x: 50,  y: 6,   w: 12, rot: -4 },
];

function ScatteredItem({ src, x, y, w, rot, scrollY }) {
  const [wobble, setWobble] = useState(false);
  const onClick = () => {
    if (wobble) return;
    setWobble(true);
    setTimeout(() => setWobble(false), 720);
  };
  // gentle parallax based on y
  const parallax = scrollY * (0.05 + (y / 100) * 0.06);
  return (
    <button
      type="button"
      className={'vc-scatter' + (wobble ? ' vc-wobble' : '')}
      onClick={onClick}
      style={{
        left: `${x}%`,
        top: `${y}%`,
        width: `${w}vw`,
        transform: `translate(-50%, calc(-50% + var(--py))) rotate(${rot}deg)`,
        ['--py']: `${-parallax}px`,
        ['--wobble-rot']: `${rot}deg`,
      }}
      aria-label="點我晃一下"
    >
      <img src={src} alt="" draggable="false" />
    </button>
  );
}

function VersionC({ bg }) {
  const [scrollY, setScrollY] = useState(0);
  const [hugBounce, setHugBounce] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onScroll = () => setScrollY(el.scrollTop);
    el.addEventListener('scroll', onScroll);
    return () => el.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="vc-root" style={{ background: bg }} ref={scrollRef}>
      {/* Hero — 第一頁 2360×1640 */}
      <section className="vc-stage">
        <div className="vc-bg-clouds">
          <div className="vc-cloud" style={{ transform: `translate(${scrollY * -0.2}px, ${scrollY * 0.05}px)` }}>•</div>
          <div className="vc-cloud vc-cloud-2" style={{ transform: `translate(${scrollY * -0.4}px, ${scrollY * 0.08}px)` }}>•</div>
          <div className="vc-cloud vc-cloud-3" style={{ transform: `translate(${scrollY * 0.1}px, ${scrollY * 0.04}px)` }}>•</div>
        </div>

        {/* 散落的女孩 / 角色 — 在 logo 後面 */}
        <div className="vc-scatter-layer" style={{ opacity: Math.max(0, 1 - scrollY / 700) }}>
          {SCATTERED.map((it, i) => (
            <ScatteredItem key={i} {...it} scrollY={scrollY} />
          ))}
        </div>

        {/* 中央標準字 logo — 置中放大 */}
        <div className="vc-titlewrap" style={{ transform: `translate(-50%, calc(-50% + ${scrollY * -0.2}px))`, opacity: Math.max(0, 1 - scrollY / 700) }}>
          <img src="assets/title-logo-trim.png" alt="熊熊需要抱一下" className="vc-title-logo" />
          <div className="vc-title-en">A Bear Needs a Hug</div>
          <div className="vc-title-sub">畢業製作 · 動畫短片 · 吳映璇 2026</div>
        </div>

        <div className="vc-hint" style={{ opacity: Math.max(0, 1 - scrollY / 700) }}>
          <span>· 點點看畫面上的女孩 ·</span>
          <span className="vc-hint-en">click any character · they'll wiggle</span>
        </div>

        <div className="vc-scroll-cue" style={{ opacity: Math.max(0, 1 - scrollY / 200) }}>
          <span>scroll</span>
          <span className="vc-cue-arrow">↓</span>
        </div>
      </section>

      <div className="vc-bear-bg">
      {/* Concept */}
      <section className="vc-section vc-concept">
        <div className="vc-num">01</div>
        <div className="vc-section-label">創作理念　Concept</div>
        <h2 className="vc-h2">他不只是玩偶<br/>他是<span className="vc-em">情緒容器</span></h2>
        <div className="vc-concept-grid">
          <div className="vc-concept-text">
            <p>從小抱到大的熊，<br/>不僅每晚抱著睡覺，<br/>每天的喜怒哀樂都對他傾訴，<br/>承包我所有情緒。</p>
            <p>抱他就算不能解決煩惱，<br/>但能讓我得到難以言喻的安慰。</p>
            <p>他的存在不再只是玩偶，<br/>而是我的情緒載體、感情容器。</p>
          </div>
          <img
            src="assets/scene-hug.png"
            alt=""
            className={'vc-concept-img' + (hugBounce ? ' vc-bounce' : '')}
            onClick={() => {
              if (hugBounce) return;
              setHugBounce(true);
              setTimeout(() => setHugBounce(false), 800);
            }}
            style={{
              transform: `translateY(var(--py))`,
              ['--py']: `${(scrollY - 1200) * -0.06}px`,
            }}
          />
        </div>
        <div className="vc-pillars">
          <div className="vc-pillar">
            <div className="vc-pillar-no">1</div>
            <div className="vc-pillar-title">陪伴與安全感</div>
            <div className="vc-pillar-en">Companionship</div>
            <p>觀眾能投射聯想自己的「情緒容器」。</p>
          </div>
          <div className="vc-pillar">
            <div className="vc-pillar-no">2</div>
            <div className="vc-pillar-title">情感隱喻</div>
            <div className="vc-pillar-en">Metaphor</div>
            <p>熊熊不僅是玩偶，也是心靈寄託。</p>
          </div>
          <div className="vc-pillar">
            <div className="vc-pillar-no">3</div>
            <div className="vc-pillar-title">童趣與幽默</div>
            <div className="vc-pillar-en">Warmth & humour</div>
            <p>溫暖、輕鬆的表現方式增加觀眾共鳴。</p>
          </div>
        </div>
      </section>

      {/* Loop */}
      <section className="vc-section vc-loop">
        <div className="vc-num">02</div>
        <div className="vc-section-label">循環動畫　Loop Animation</div>
        <h2 className="vc-h2">情緒不是消失<br/>而是被<span className="vc-em">接住</span>、被<span className="vc-em">轉化</span></h2>
        <div className="vc-loop-info">手繪定格動畫 · 15–20 秒 · 循環播放</div>
        <div className="vc-loop-flow">
          <FlowStep no="01" tw="小孩哭泣" en="Tears fall" />
          <FlowArrow />
          <FlowStep no="02" tw="熊熊接住" en="Bear catches" highlight />
          <FlowArrow />
          <FlowStep no="03" tw="化為光芒" en="Becomes light" highlight />
          <FlowArrow />
          <FlowStep no="04" tw="光回到小孩" en="Light returns" />
          <FlowArrow loop />
        </div>
        <div className="vc-loop-quote">
          「再回到自己身上，<br/>成為力量。」
        </div>
      </section>

      {/* Contact */}
      <section className="vc-section vc-contact">
        <img src="assets/scene-back.png" alt="" className="vc-contact-illust" />
        <div className="vc-contact-card">
          <div className="vc-num">03</div>
          <div className="vc-section-label">聯絡　Contact</div>
          <h2 className="vc-h2 vc-h2-end">我喜歡「人」<br/>而「人」也喜歡我</h2>
          <div className="vc-contact-info">
            <div className="vc-contact-row"><span className="vc-key">作者</span><span className="vc-val">吳映璇　Wu Ying-Xuan</span></div>
            <div className="vc-contact-row"><span className="vc-key">系所</span><span className="vc-val">圖傳四乙　A111040102</span></div>
            <div className="vc-contact-row"><span className="vc-key">指導老師</span><span className="vc-val">李芹羽</span></div>
            <div className="vc-contact-row"><span className="vc-key">FACEBOOK</span><span className="vc-val"><a href="https://www.facebook.com/photo/?fbid=4311108142457359&set=a.1494785164089685" target="_blank" rel="noopener">吳映璇</a></span></div>
            <div className="vc-contact-row"><span className="vc-key">INSTAGRAM</span><span className="vc-val"><a href="https://www.instagram.com/abui0110_/" target="_blank" rel="noopener">abui0110_</a></span></div>
            <div className="vc-contact-row"><span className="vc-key">GMAIL</span><span className="vc-val"><a href="mailto:dodowdi1108@gmail.com">dodowdi1108@gmail.com</a></span></div>
          </div>
        </div>
      </section>
      </div>

      <footer className="vc-footer">
        <span>© 2026 吳映璇　熊熊需要抱一下</span>
        <span>A Bear Needs a Hug · Graduation Project</span>
      </footer>
    </div>
  );
}

function FlowStep({ no, tw, en, highlight }) {
  return (
    <div className={'vc-flow-step' + (highlight ? ' hl' : '')}>
      <div className="vc-flow-no">{no}</div>
      <div className="vc-flow-tw">{tw}</div>
      <div className="vc-flow-en">{en}</div>
    </div>
  );
}
function FlowArrow({ loop }) {
  return <div className={'vc-flow-arrow' + (loop ? ' loop' : '')}>{loop ? '↺' : '→'}</div>;
}

window.VersionC = VersionC;

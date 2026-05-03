/* global React */
// 版本 B：詩意直書留白
// 中文直書 (writing-mode: vertical-rl)，大量留白，滾動視差。靜謐如詩。

const { useEffect, useRef, useState } = React;

function VersionB({ bg }) {
  const scrollRef = useRef(null);
  const [scrollX, setScrollX] = useState(0);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    // Convert vertical wheel to horizontal scroll for vertical-text feel
    const onWheel = (e) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault();
        el.scrollLeft += e.deltaY * 1.2;
      }
    };
    el.addEventListener('wheel', onWheel, { passive: false });
    const onScroll = () => setScrollX(el.scrollLeft);
    el.addEventListener('scroll', onScroll);
    return () => {
      el.removeEventListener('wheel', onWheel);
      el.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <div className="vb-root" style={{ background: bg }}>
      <div className="vb-fixed-header">
        <div className="vb-meta-en">A Bear Needs a Hug · 2026</div>
        <div className="vb-meta-author">吳映璇　Wu&nbsp;Ying-Hsuan</div>
      </div>

      <div className="vb-scroller" ref={scrollRef}>
        <section className="vb-pane vb-cover">
          <img src="assets/title-logo.png" alt="熊熊需要抱一下" className="vb-title-logo" />
          <div className="vb-cover-side">
            <div className="vb-vertical vb-vertical-lg">
              一隻熊<br />和一個人<br />的故事
            </div>
            <div className="vb-scroll-hint">
              <span>橫向捲動</span>
              <span className="vb-arrow">→</span>
            </div>
          </div>
          <img src="assets/scene-hug.png" alt="" className="vb-cover-illust"
               style={{ transform: `translateX(${-scrollX * 0.15}px)` }} />
        </section>

        <section className="vb-pane vb-pane-concept">
          <div className="vb-concept-text">
            <div className="vb-section-num">壹</div>
            <div className="vb-section-en">Concept</div>
            <div className="vb-vertical vb-vertical-md">
              從小抱到大的熊<br />
              不僅每晚抱著睡覺<br />
              每天的喜怒哀樂<br />
              都對他傾訴<br />
              <span className="vb-em">承包我所有情緒</span>
            </div>
          </div>
          <img src="assets/scene-cry.png" alt="" className="vb-illust-1"
               style={{ transform: `translateY(${(scrollX - 800) * -0.04}px)` }} />
          <div className="vb-vertical vb-vertical-sm vb-quote">
            「沒關係，<br />我在這裡。」
          </div>
        </section>

        <section className="vb-pane vb-pane-vessel">
          <div className="vb-big-quote vb-vertical">
            <span>情緒</span>
            <span>容器</span>
          </div>
          <div className="vb-vessel-body vb-vertical vb-vertical-md">
            他的存在不再只是玩偶<br />
            而是我的情緒載體<br />
            感情容器
          </div>
          <img src="assets/bear-poses.png" alt="" className="vb-poses"
               style={{ transform: `translateX(${(scrollX - 1700) * 0.2}px)` }} />
        </section>

        <section className="vb-pane vb-pane-loop">
          <div className="vb-loop-title">
            <div className="vb-section-num">貳</div>
            <div className="vb-section-en">Loop&nbsp;Animation</div>
            <div className="vb-vertical vb-vertical-md">
              手繪定格動畫<br />
              15&nbsp;–&nbsp;20&nbsp;秒&nbsp;循環
            </div>
          </div>
          <ol className="vb-loop-steps">
            <li><span className="vb-step-no">01</span><span className="vb-step-tw">小孩哭泣，眼淚落下</span><span className="vb-step-en">Tears fall</span></li>
            <li><span className="vb-step-no">02</span><span className="vb-step-tw">熊熊接住，化為光芒</span><span className="vb-step-en">Bear catches them, light</span></li>
            <li><span className="vb-step-no">03</span><span className="vb-step-tw">光回到小孩身上</span><span className="vb-step-en">Light returns</span></li>
            <li><span className="vb-step-no">04</span><span className="vb-step-tw">新的情緒出現，再次循環</span><span className="vb-step-en">New emotion, loop again</span></li>
          </ol>
          <div className="vb-loop-meaning vb-vertical vb-vertical-sm">
            情緒不是消失<br />
            而是被接住<br />
            被轉化<br />
            再回到自己身上<br />
            成為力量
          </div>
          <img src="assets/scene-bear-down.png" alt="" className="vb-illust-loop"
               style={{ transform: `translateY(${(scrollX - 2800) * 0.05}px) rotate(${(scrollX - 2800) * 0.01}deg)` }} />
        </section>

        <section className="vb-pane vb-pane-end">
          <img src="assets/scene-back.png" alt="" className="vb-end-illust" />
          <div className="vb-end-text vb-vertical vb-vertical-lg">
            我喜歡「人」<br />
            而「人」也喜歡我
          </div>
          <div className="vb-end-side">
            <div className="vb-section-num">叁</div>
            <div className="vb-section-en">Contact</div>
            <div className="vb-end-info">
              <div className="vb-end-name">吳映璇</div>
              <div className="vb-end-name-en">Wu Ying-Hsuan</div>
              <div className="vb-end-class">圖傳四乙　A111040102</div>
              <div className="vb-end-adv">指導老師　李芹羽</div>
              <a className="vb-end-mail" href="mailto:dodowdi1108@gmail.com">dodowdi1108@gmail.com</a>
            </div>
          </div>
        </section>
      </div>

      <div className="vb-progress">
        <div className="vb-progress-bar" style={{ width: `${Math.min(100, (scrollX / Math.max(1, (scrollRef.current?.scrollWidth || 1) - (scrollRef.current?.clientWidth || 0))) * 100)}%` }} />
      </div>
    </div>
  );
}

window.VersionB = VersionB;

/* ============================================================
   main.js — 釣りコンテスト サイト
   ============================================================ */

// ──────────────────────────────────────────
// 1. SCROLL REVEAL — rule cards
// ──────────────────────────────────────────
(function initScrollReveal() {
  const cards = document.querySelectorAll('.rule-card');

  if (!cards.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          // 一度表示したら監視解除
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,  // カードの15%が見えたらトリガー
    }
  );

  cards.forEach((card) => observer.observe(card));
})();


// ──────────────────────────────────────────
// 2. FLOATING BUTTON — スクロール位置で表示/非表示
// ──────────────────────────────────────────
(function initFab() {
  const fab = document.getElementById('fab');
  if (!fab) return;

  // 初期は少し透過 → ヒーロー通過後に完全表示
  fab.style.opacity = '0.3';
  fab.style.transition = 'opacity 0.4s, transform 0.2s, box-shadow 0.2s';

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const heroH   = document.querySelector('.hero')?.offsetHeight ?? 400;

    if (scrollY > heroH * 0.4) {
      fab.style.opacity = '1';
    } else {
      fab.style.opacity = '0.3';
    }
  }, { passive: true });
})();


// ──────────────────────────────────────────
// 3. FORM SUBMIT — バリデーション & フィードバック
// ──────────────────────────────────────────
(function initForm() {
  const btn    = document.getElementById('submitBtn');
  const notice = document.getElementById('formNotice');

  if (!btn || !notice) return;

  btn.addEventListener('click', () => {
    const name  = document.getElementById('name')?.value.trim()  ?? '';
    const email = document.getElementById('email')?.value.trim() ?? '';
    const fish  = document.getElementById('fish')?.value.trim()  ?? '';
    const size  = document.getElementById('size')?.value.trim()  ?? '';

    // ── 簡易バリデーション ──
    if (!name) {
      showNotice('⚠️ お名前を入力してください。', 'warn');
      document.getElementById('name')?.focus();
      return;
    }
    if (!email || !isValidEmail(email)) {
      showNotice('⚠️ 有効なメールアドレスを入力してください。', 'warn');
      document.getElementById('email')?.focus();
      return;
    }
    if (!fish) {
      showNotice('⚠️ 釣った魚の種類を入力してください。', 'warn');
      document.getElementById('fish')?.focus();
      return;
    }
    if (!size || isNaN(Number(size)) || Number(size) <= 0) {
      showNotice('⚠️ サイズ（cm）を正しく入力してください。', 'warn');
      document.getElementById('size')?.focus();
      return;
    }

    // ── 送信成功演出 ──
    btn.textContent   = '送信中…';
    btn.disabled      = true;
    btn.style.opacity = '0.6';

    // ※ 実際のフォーム送信はここで fetch() や form.submit() に差し替えてください
    setTimeout(() => {
      showNotice('✅ 応募が完了しました！確認メールをご確認ください。', 'ok');
      btn.textContent   = '応募済み ✓';
      btn.style.background = 'linear-gradient(135deg, #1ac8e8 0%, #0a8fa8 100%)';
      btn.style.color   = '#ffffff';
      // フォームをリセットしたい場合は以下のコメントを外してください
      // clearForm();
    }, 1200);
  });

  function showNotice(msg, type) {
    notice.textContent = msg;
    notice.style.color = type === 'ok' ? 'var(--cyan)' : 'var(--gold)';
    // 5秒後にメッセージを消す
    clearTimeout(notice._timer);
    notice._timer = setTimeout(() => { notice.textContent = ''; }, 5000);
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function clearForm() {
    ['name', 'email', 'fish', 'size', 'location', 'photo'].forEach((id) => {
      const el = document.getElementById(id);
      if (el) el.value = '';
    });
  }
})();


// ──────────────────────────────────────────
// 4. EASTER EGG — ヒーロータイトルをクリックすると波エフェクト
// ──────────────────────────────────────────
(function initEasterEgg() {
  const title = document.querySelector('.hero-title');
  if (!title) return;

  title.style.cursor = 'pointer';

  title.addEventListener('click', () => {
    title.animate(
      [
        { textShadow: '0 0 40px rgba(240,192,64,0.9)' },
        { textShadow: '0 0 80px rgba(26,200,232,1)' },
        { textShadow: '0 0 40px rgba(240,192,64,0.9)' },
      ],
      { duration: 600, easing: 'ease-out' }
    );
  });
})();

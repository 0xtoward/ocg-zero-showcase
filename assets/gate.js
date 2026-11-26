(() => {
  const KEY = "ocg_zero_unlocked_v1";
  const SALT = "ocg-zero-gate::";
  const EXPECTED_HASH = "13ce683c510fcfecab09a0e81b0433af5932fd7b2949e2884fce96be42bc454e";

  function sha256Hex(str) {
    const bytes = new TextEncoder().encode(str);
    const len = bytes.length;
    const padLen = ((len + 9 + 63) >> 6) << 6;
    const buf = new Uint8Array(padLen);
    buf.set(bytes);
    buf[len] = 0x80;
    const bitLen = len * 8;
    const dv = new DataView(buf.buffer);
    dv.setUint32(padLen - 8, Math.floor(bitLen / 0x100000000), false);
    dv.setUint32(padLen - 4, bitLen >>> 0, false);

    const K = [
      0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
      0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
      0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
      0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
      0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
      0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
      0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
      0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2
    ];
    let h0 = 0x6a09e667, h1 = 0xbb67ae85, h2 = 0x3c6ef372, h3 = 0xa54ff53a;
    let h4 = 0x510e527f, h5 = 0x9b05688c, h6 = 0x1f83d9ab, h7 = 0x5be0cd19;
    const W = new Uint32Array(64);
    const rotr = (x, n) => (x >>> n) | (x << (32 - n));

    for (let off = 0; off < padLen; off += 64) {
      for (let i = 0; i < 16; i++) W[i] = dv.getUint32(off + i * 4, false);
      for (let i = 16; i < 64; i++) {
        const s0 = rotr(W[i - 15], 7) ^ rotr(W[i - 15], 18) ^ (W[i - 15] >>> 3);
        const s1 = rotr(W[i - 2], 17) ^ rotr(W[i - 2], 19) ^ (W[i - 2] >>> 10);
        W[i] = (W[i - 16] + s0 + W[i - 7] + s1) >>> 0;
      }
      let a = h0, b = h1, c = h2, d = h3, e = h4, f = h5, g = h6, h = h7;
      for (let i = 0; i < 64; i++) {
        const S1 = rotr(e, 6) ^ rotr(e, 11) ^ rotr(e, 25);
        const ch = (e & f) ^ ((~e) & g);
        const t1 = (h + S1 + ch + K[i] + W[i]) >>> 0;
        const S0 = rotr(a, 2) ^ rotr(a, 13) ^ rotr(a, 22);
        const maj = (a & b) ^ (a & c) ^ (b & c);
        const t2 = (S0 + maj) >>> 0;
        h = g; g = f; f = e; e = (d + t1) >>> 0;
        d = c; c = b; b = a; a = (t1 + t2) >>> 0;
      }
      h0 = (h0 + a) >>> 0; h1 = (h1 + b) >>> 0; h2 = (h2 + c) >>> 0; h3 = (h3 + d) >>> 0;
      h4 = (h4 + e) >>> 0; h5 = (h5 + f) >>> 0; h6 = (h6 + g) >>> 0; h7 = (h7 + h) >>> 0;
    }
    return [h0, h1, h2, h3, h4, h5, h6, h7]
      .map((v) => v.toString(16).padStart(8, "0"))
      .join("");
  }

  function isUnlocked() {
    try { return sessionStorage.getItem(KEY) === "1"; } catch { return false; }
  }

  if (!isUnlocked()) {
    document.documentElement.classList.add("gate-locked");
  }

  function attachRelock() {
    const nav = document.querySelector(".nav-links");
    if (nav && !document.getElementById("relockBtn")) {
      const btn = document.createElement("button");
      btn.id = "relockBtn";
      btn.type = "button";
      btn.className = "nav-lock-btn";
      btn.textContent = "锁定";
      btn.title = "退出访问状态并重新上锁";
      btn.onclick = () => {
        try { sessionStorage.removeItem(KEY); } catch {}
        location.reload();
      };
      nav.appendChild(btn);
    }
  }

  document.addEventListener("DOMContentLoaded", () => {
    attachRelock();
    if (isUnlocked()) {
      document.documentElement.classList.remove("gate-locked");
      return;
    }

    const overlay = document.createElement("div");
    overlay.id = "gateOverlay";
    overlay.className = "gate-overlay";
    overlay.innerHTML = `
      <form class="gate-card" id="gateForm" autocomplete="off">
        <div class="gate-brand"><span class="brand-dot"></span><span>OCG-Zero</span></div>
        <h2 class="gate-title">访问受限展示页</h2>
        <p class="gate-sub">请输入四位访问口令继续浏览对局回放与实验架构</p>
        <div class="gate-row">
          <input class="gate-input" id="gateInput" type="password" inputmode="numeric" placeholder="输入访问口令" aria-label="访问口令" autofocus />
          <button class="btn primary gate-btn" type="submit">进入</button>
        </div>
        <div class="gate-err" id="gateErr" role="alert"></div>
      </form>
    `;
    document.body.appendChild(overlay);

    const form = document.getElementById("gateForm");
    const input = document.getElementById("gateInput");
    const err = document.getElementById("gateErr");
    requestAnimationFrame(() => input.focus());

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const val = input.value.trim();
      if (sha256Hex(SALT + val) === EXPECTED_HASH) {
        try { sessionStorage.setItem(KEY, "1"); } catch {}
        document.documentElement.classList.remove("gate-locked");
        overlay.classList.add("unlocking");
        setTimeout(() => overlay.remove(), 180);
      } else {
        err.textContent = "口令不正确，请重试";
        form.classList.remove("shake");
        void form.offsetWidth;
        form.classList.add("shake");
        input.value = "";
        input.focus();
      }
    });
  });
})();

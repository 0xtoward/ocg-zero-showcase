# OCG-Zero Showcase

Interactive replay explorer and high-level benchmark results for verified Yu-Gi-Oh! Turn-1 combo synthesis, pre-5th-summon anti-Nibiru lines, and emergent handtrap timing.

Live interactive viewer: https://0xtoward.github.io/ocg-zero-showcase/

## Highlights

- **12 / 12 Real-OCG Golden Tasks Solved**: Verified on unmodified 40-card OCG lists across Swordsoul Tenyi, Branded, Ritual Beast, and Plant Link Rikka.
- **8.0x Search Efficiency Speedup**: Outperforms pure symbolic planning baselines under tight node budgets while maintaining 0% illegal moves.
- **47.1% Emergent Handtrap Holding**: Adversarial interdiction learns to pass early baits and fire on fatal chokepoints without card-specific handtrap rules.
- **Dual-Engine Replay Certification**: Every displayed sequence comes from deterministic engine replays checked with zero rule retries (`MSG_RETRY == 0`).

*(Note: This public repository hosts only the static showcase frontend and sanitized replay summaries. Core engines and training pipelines are kept private.)*

# OCG-Zero 展示站

基于静态 GitHub Pages 的 5 页式真实回放、搜索原理与架构算力展示站（含客户端访问口令门禁 `assets/gate.js`），所有卡牌译名经 YGOCDB 官方中文数据库校对，回放结果源自双核心 0 重试验真。

在线访问：https://0xtoward.github.io/ocg-zero-showcase/

## 页面结构

- `index.html`（**对局回放**）：7×5 对称 OCG 桌垫浏览器（支持酒红 / 深空主题切换、**当前手牌**与**完整 40+15 卡组**查看），覆盖植物均 88 步、相剑 5 步防陨、双边 2 手坑捏坑双杀与后攻天杯龙 8000 OTK。
- `puct.html`（**PUCT 实时选招**）：还原真实求解器 16 轮树搜索现场，展示 MLP 先验、探索加成与引擎实测回传 Q 值如何联动纠偏。
- `psro.html`（**PSRO 博弈演化**）：交互式 4×4 收益矩阵、NashConv 收敛表与多代真实对抗轨迹并排对比。
- `breaker.html`（**后攻破阵**）：拆解 Wave 21 `causal_order_qd` 的 MAP-Elites 三维精英网格与事后动作重排序启发式，展示天杯龙 T2 38.75% OTK / 63.75% 全清效果与联机局限。
- `arch.html`（**架构与算力**）：对比 AlphaGo Zero、微软 Suphx 麻将、Ataraxos / MTG-Causal-RL 与现有游戏王方案（MirrorForce / ygo-agent），给出 `1× H100` 三档可行性估算。

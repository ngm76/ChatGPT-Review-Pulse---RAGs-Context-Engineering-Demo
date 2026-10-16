# ChatGPT Review Intelligence: Weekly Pulse + Fee Explainer (Approval-Gated)

**Milestone 5 · RAGs & Context Engineering**
**Product:** ChatGPT (OpenAI) · **Built with:** n8n Cloud, OpenAI (gpt-5-mini + text-embedding-3-small), Jina Reader, Google Docs, Gmail, MCP

> **In one line:** an n8n workflow that turns 722 real ChatGPT reviews into (1) an internal weekly product pulse and (2) a customer-facing, facts-only explainer for the top charge confusion. It writes to a Google Doc and creates a Gmail draft **only after a human approves**, through two narrow MCP tools.

---

## 1. Deliverables

| Deliverable | Where |
|---|---|
| Demo video (≤3 min) | `[link]` |
| Weekly pulse (final run) | Section 6 below + doc snippet |
| Doc snippet | `doc_snippet.png` (entry appended to *Weekly Product Pulse Log*) |
| Email draft | `email_draft.png` (Gmail draft, never sent) |
| Reviews CSV sample | `reviews_sample.csv` (70 of 722 rows, stratified by source × theme, with all AI tags) |
| Source URLs | Section 8 |
| Workflow exports | `main_workflow.json`, `mcp_server_workflow.json` (secrets removed) |

---

## 2. How it works

```
REVIEWS (Data Table, 722 rows)
  │
  ├─► Tag new reviews only ─► Make batches ► Tag reviews (AI) ► Check & parse ► Save tags
  │      (themes are frozen; each review is tagged once and saved)
  │
  └─► Load tagged reviews
        ► Rank themes (code: pain points, top 3, trend, evals)
        ► Quote shortlist (code) ► Pick quotes (AI) ► Check quotes (code: word-for-word)
        ► Fee list (code) ► Group fee issues (AI, only untagged) ► Pick fee issue (code) ─► Save fee groups
        ► Pulse facts (code) ► Write pulse (AI: judgement only) ► Assemble pulse (code checks)
        ► KB pages ► Fetch page (Jina) ► Clean pages ► Store KB (vector store)
        ► Retrieve KB ► Explainer context (small-to-big) ► Write explainer (AI) ► Check explainer (code)
        ► Prepare review ► ASK FOR APPROVAL (Gmail form: Approve / Reject + comments)
        ► Read decision ► Approved?
              ├─ true  ► MCP: append_to_pulse_log ► MCP: create_email_draft
              └─ false ► Log rejection (nothing written)

MCP SERVER (separate workflow "Pulse Tools (MCP Server)")
  MCP Server Trigger (Bearer auth) exposes exactly two tools:
   • append_to_pulse_log  → Google Docs: append to "Weekly Product Pulse Log"
   • create_email_draft   → Gmail: create a DRAFT (no send tool exists)
```

**Design principle used everywhere: the AI judges, code counts and checks.**
- The AI only does what needs judgement: tagging, choosing a quote, grouping a fee complaint, writing the observation, actions and explainer.
- Code does everything that must be exact: counting, ranking, word limits, verifying quotes word for word, checking links and numbers against sources, and building the final text.
- Numbers and quotes in the pulse are written by code, never by the AI.

---

## 3. How to run

**Prerequisites (n8n Cloud):** credentials for OpenAI, Google Docs (OAuth2), Gmail (OAuth2), a free Jina Reader API key, and a Bearer token of your choice for the MCP server.

1. **Data:** create a Data Table *ChatGPT Reviews Dataset* and import the reviews CSV (columns: source, review_id, date, rating, title, text, …). Add the empty tag columns: theme, theme_name, sub_theme, sub_theme_name, praise_topic, fee_related, fee_type, language, tagged_with, fee_group, fee_group_name.
2. **Doc:** create a Google Doc *Weekly Product Pulse Log* and copy its ID.
3. **MCP server:** import `mcp_server_workflow.json` → set the Google Docs and Gmail credentials and the doc ID in `append_to_pulse_log` → set Bearer Auth → **Publish** → copy the **Production URL**.
4. **Main workflow:** import `main_workflow.json` → set the credentials → in **Fetch page** add the header `Authorization: Bearer <JINA_KEY>` → in both MCP Client nodes paste the Production URL and select the same Bearer credential → in **Ask for approval** set your email.
5. Click **Execute workflow**. The run pauses at **Ask for approval** and emails you the full review.
6. Open the email → **Respond** → choose **Approve** or **Reject** and add comments → **Submit**.
7. **Approve** → a new entry appears at the end of the Google Doc and a Gmail **draft** is created. **Reject** → nothing is written; the rejection is logged.

---

## 4. Where approval happens

- **Node:** `Ask for approval` (Gmail → *Send message and wait for response*, custom form: Decision = Approve/Reject, Comments).
- **What the approver sees:** the automated check results (✅/⚠️), the full weekly pulse, the full customer explainer, and the email subject. *What you approve is exactly what gets written*: the doc entry and email draft are built before the approval and are not changed after it.
- **What happens next:** `Read decision` → `Approved?`
  - **Approve:** two MCP calls, `append_to_pulse_log` and `create_email_draft`. The approver's name/time and comments are stamped into the doc entry.
  - **Reject:** `Log rejection`. Nothing reaches the doc or Gmail.
- **Least privilege:** the main workflow cannot touch Google Docs or Gmail directly. It can only call two MCP tools, and only after approval. There is no "send" tool, so an email can never be sent automatically.

---

## 5. Data

| | |
|---|---|
| Reviews | **722** (Google Play 455 · App Store 76 · Trustpilot 191) |
| Window | 21 Jul 2026 – 12 Oct 2026 (Google Play data ends 19 Sep 2026) |
| Collection | Apify (Google Play), Apple RSS (App Store), Trustpilot export; cleaned and merged in a separate n8n workflow |
| Scope | ChatGPT as a product, all regions, all languages (non-English kept and tagged by language) |

---

## 6. Outputs

### Weekly pulse (16 Oct 2026 run; 228 words, all checks passed)
> *(Replace with the final run's text.)*
```
Weekly Product Pulse: ChatGPT · 16 Oct 2026
722 reviews · 21 Jul 2026–12 Oct 2026 · Google Play, App Store, Trustpilot

TOP THEMES (by user pain)
1. Usage limits, pricing & billing: 36% of pain, mostly usage limits and reset timers
2. Reliability, accounts & support: 22% of pain, mostly crashes, errors and slowness
3. Accuracy & hallucinations: 19% of pain, mostly confident but wrong answers or advice

WHAT USERS SAID
• "…" (Google Play, 1★, Sep 2026)   ×3, verified word for word

KEY OBSERVATION / WHAT'S WORKING / ACTION IDEAS  (AI-written, checked)

Data note: no reliable trend this week; Google Play data ends 19 Sep 2026.
```

### Identified fee issue
**Paid but plan not active or access lost**: 7 of 25 charge-confusion reviews (28%).
It's a **close call** (next: *Refund refused or not offered*, 6), so the approval email flags it. Charge confusion is spread across several types; no single type dominates.

### Customer explainer (facts only, ≤6 bullets, 2 official links)
*(Paste the final run's explainer_text here, including "Last checked: <date>".)*

---

## 7. Evals and checks

| What | How | Result |
|---|---|---|
| Theme stability | Theme discovery run 5× on all reviews | 5/5 consistent → themes frozen (v1-2026-10-14) |
| Coverage | % of non-praise reviews tagged "Other" | 9.5% (pass mark ≤20%) |
| Tagging spot-check | Manual read of 25 tagged reviews | 23/25 agree (92%) |
| Quotes | Code checks every quote is a continuous, word-for-word excerpt; no "…" in the middle; 6–30 words; no emails or ticket numbers | 3/3 verified; flagged fallback if not |
| Pulse | ≤250 words; 3 actions covering the 3 top themes; every number must exist in the fact sheet; facts must be present | 228 words, pass |
| Fee grouping | Every fee review used exactly once; only frozen group IDs; close-call flag | 34/34 accounted for; close call flagged |
| Retrieval eval | Did search retrieve the expected help article for the fee issue? What rank? | Found; expected page ranked 2nd (raw top page was "invoices") |
| Explainer | 1–6 bullets; exactly 2 links, both retrieved and on the approved list; banned phrases (false promises, apologies); every number must appear in the sources | Pass |
| Human approval | Final gate before anything is written | Approve and reject paths both tested |

### What the checks and human review caught during the build
1. **AI wrote a fluent pulse with no facts.** An empty fact sheet still produced plausible text. Fix: an input guard (fail if the facts are missing).
2. **"A/B test *longer* reset timers"** as an action for a usage-limits complaint, a reasoning slip no code check can catch. Fix: a prompt rule ("actions must reduce the pain").
3. **Open-ended fee grouping changed every run** and once picked a group that broke my own definition (usage limits counted as charge confusion). Fix: discover, then freeze 6 fee groups (F1–F6), AI returns IDs only, code holds the names.
4. **The top fee issue flipped across runs** on identical data (Refund → tie → Double charges). Fix: tag once and save `fee_group` per review (like themes); a close-call rule flags the approver.
5. **Explainer missed the core policy and gave Google Play timing to all users.** Context problem: the key chunks were never retrieved. Fix: small-to-big retrieval (whole main page + excerpts).
6. **Only one source link possible:** duplicate inserts in the vector store crowded out other pages. Fix: clear the store on every run.
7. **"Refunds *only* for…"**: a false restriction the source never states. Fix: no-unsupported-qualifiers rule.
8. **Search picked the wrong page** for "paid but plan not active" (scores within 0.002). Fix: the main source is the highest-priority expected article that retrieval found; raw rank is still reported.
9. **Mixing pinned and live nodes** produced mismatched outputs (old explainer vs new sources). The checks caught it twice; final runs use no pins.

### Second-opinion review of the 34 AI fee labels
A careful read flagged 8 of 34 as likely mislabelled (5 strongly), mostly where "refund" was a *follow-up ask* after a different problem (limits, dissatisfaction, a third-party fee). *(State here whether you applied them and the final agreement %.)*

---

## 8. Sources (knowledge base, fetched live each run)

The explainer may only cite pages from this approved list, and only pages that were actually retrieved:

1. https://help.openai.com/en/articles/6950777-what-is-chatgpt-plus
2. https://help.openai.com/en/articles/20001043-how-do-i-avoid-being-charged-twice-if-i-subscribe-to-chatgpt-on-ios-android-and-the-web
3. https://help.openai.com/en/articles/7232895-how-do-i-request-a-refund-for-my-chatgpt-subscription
4. https://help.openai.com/en/articles/7232927-canceling-your-chatgpt-subscription
5. https://help.openai.com/en/articles/7242622-why-did-my-chatgpt-plus-or-chatgpt-pro-renewal-transaction-fail
6. https://openai.com/chatgpt/pricing/

Full KB (14 pages): the above plus Pro tiers, Free tier FAQ, card declined, invoice dates, past invoices, multicurrency billing, billing info/VAT, and the ChatGPT pricing docs.

**Finding:** OpenAI's own pages disagree on refund timing ("5–10 business days" on *What is ChatGPT Plus* vs "5–7 web / 10 Google Play" on the refund article). That inconsistency is itself a source of customer confusion.

---

## 9. Key decisions

| Decision | Why |
|---|---|
| Rank themes by **pain points** (1★=4 … 5★=0), not count | Severity matters more than volume |
| **≤5 themes with sub-themes**, frozen after discovery | The brief's limit; stable week to week; detail is kept in the sub-themes |
| Quotes from the theme's biggest sub-theme, in its dominant source, newest first, with the date shown | Representative and honest about freshness |
| No names, emails or ticket numbers in quotes; attribution = source, stars, month + review_id in the doc | Privacy; credibility comes from traceability |
| "Too expensive" and usage limits ≠ charge confusion | The brief asks for *confusion*; value complaints are already in the pulse |
| RAG over 14 official pages, fetched live; "Last checked" = fetch date | Always current; no stale copies |
| Real MCP (own server, 2 tools) | Meets the brief; least privilege; no send capability |
| "Flag, don't loop" | A failed check goes to the approver with the problem listed; no hidden retries |

---

## 10. Limitations and future scope

- **Trend:** Google Play data ends 19 Sep 2026, so there's no reliable week-on-week trend; the pulse says so.
- **Source mix:** Trustpilot holds 49% of accuracy complaints but only 26% of reviews; App Store is 62% praise.
- **Fee confusion is fragmented** (7 / 6 / 6 / 5): the top issue is a close call, decided by data and flagged.
- **Retrieval** relies on a hand-made "expected article" map per fee group; future: query rewriting or a reranker.
- **Jina Reader** anonymous access is rate-limited per IP (shared on n8n Cloud); a free API key is used. Future: keep a last-good snapshot as a fallback.
- **Quotes** are re-chosen each run (always verified); the explainer is regenerated each run (always checked).
- **Future:** per-section approval comments, a scheduled weekly trigger, an auto-collect workflow for new reviews, multi-language explainers.

---

## 11. Security notes
- Secrets (OpenAI, Google OAuth, Jina key, MCP Bearer token) live in n8n credentials. **They are removed from the exported JSON.**
- The MCP server requires a Bearer token and exposes only two tools.
- No personal data in quotes; reviews are public and carry no author names.

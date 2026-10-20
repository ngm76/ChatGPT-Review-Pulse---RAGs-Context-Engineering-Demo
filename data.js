// =====================================================================
// DATA FOR THE RUN REPORT PAGE
// =====================================================================

// 1) LINKS: paste your links between the quotes (leave "" to hide a button)
window.LINKS = {
  github: "https://github.com/ngm76/ChatGPT-Review-Pulse---RAGs-Context-Engineering-Demo",
  video: "",
  doc: "https://docs.google.com/document/d/1M20MAQh9AXokbWMxprQHfIx7WI96DScTYDDu6WemYkI/edit?usp=sharing"
};

// 2) ENTRY: paste the final run's entry_json (output of the "Read decision" node)
//    Replace everything between  window.ENTRY =  and the final  ;
window.ENTRY = [
 {
  "t": "h1",
  "text": "Weekly Product Pulse — 20 Oct 2026"
 },
 {
  "t": "p",
  "text": "✅ Approved by PM · 20 Oct 2026, 21:14 IST · Run #32",
  "gray": true
 },
 {
  "t": "p",
  "text": "💬 PM comments: ok",
  "italic": true
 },
 {
  "t": "p",
  "text": "Date (date): 2026-10-20 · 722 reviews · 21 Jul 2026 – 12 Oct 2026 · Google Play, App Store, Trustpilot",
  "gray": true
 },
 {
  "t": "h2",
  "text": "Top themes (top_themes)"
 },
 {
  "t": "number",
  "text": "Usage limits, pricing & billing — 36% of pain, mostly usage limits and reset timers",
  "boldPrefix": 31
 },
 {
  "t": "number",
  "text": "Reliability, accounts & support — 22% of pain, mostly crashes, errors and slowness",
  "boldPrefix": 31
 },
 {
  "t": "number",
  "text": "Accuracy & hallucinations — 19% of pain, mostly confident but wrong answers or advice",
  "boldPrefix": 25
 },
 {
  "t": "h2",
  "text": "Weekly pulse (weekly_pulse)"
 },
 {
  "t": "h3",
  "text": "What users said"
 },
 {
  "t": "bullet",
  "text": "“Yet, a minute later, I was hit with another chat limit, this time until 8:30.” (Google Play, 1★, Sep 2026)",
  "italic": true
 },
 {
  "t": "bullet",
  "text": "“Never managed to generate anything then activity is paused and wait to refresh.” (Google Play, 1★, Sep 2026)",
  "italic": true
 },
 {
  "t": "bullet",
  "text": "“If it can't give you the correct answer, it will make up something that sounds plausible and state it as fact.” (Google Play, 1★, Sep 2026)",
  "italic": true
 },
 {
  "t": "h3",
  "text": "Key observation"
 },
 {
  "t": "p",
  "text": "Usage limits and reset timers drive the largest share of pain (36.4%), causing frequent user disruption ahead of reliability and hallucination complaints."
 },
 {
  "t": "h3",
  "text": "What's working"
 },
 {
  "t": "p",
  "text": "Help with studying, productivity and writing."
 },
 {
  "t": "h3",
  "text": "Action ideas"
 },
 {
  "t": "number",
  "text": "Show real-time usage countdown and explicit reset time within each chat session banner."
 },
 {
  "t": "number",
  "text": "Add in-app retry button and automated error reporting for crashes and slow responses."
 },
 {
  "t": "number",
  "text": "Surface low-confidence warnings and source citations for answers flagged as uncertain."
 },
 {
  "t": "p",
  "text": "Data note: no reliable trend this week; Google Play data ends 19 Sep 2026.",
  "gray": true
 },
 {
  "t": "p",
  "text": "Pulse checks: 227/250 words · quotes verified 3/3",
  "gray": true
 },
 {
  "t": "h2",
  "text": "Identified fee issue (identified_fee_issue)"
 },
 {
  "t": "p",
  "text": "Paid but plan not active or access lost — 7 of 25 charge-confusion reviews (close call)",
  "boldPrefix": 39
 },
 {
  "t": "h2",
  "text": "Customer explainer (explanation_bullets)"
 },
 {
  "t": "p",
  "text": "Why paid plan didn't activate",
  "bold": true
 },
 {
  "t": "bullet",
  "text": "ChatGPT Plus is a $20/month subscription; if you believe you were incorrectly charged you can request a refund; refunds are typically processed within 5–10 business days after approval."
 },
 {
  "t": "bullet",
  "text": "If an Apple renewal fails, Apple may continue trying to recover it; your subscription can appear inactive in ChatGPT while Apple still attempts recovery, possibly causing duplicate charges."
 },
 {
  "t": "bullet",
  "text": "Update your Apple payment method and allow Apple to recover the original subscription rather than starting a new subscription on a different platform to avoid duplicates."
 },
 {
  "t": "bullet",
  "text": "Check the ChatGPT account email; on iOS/Android use Settings > Restore purchases; sign out and sign back in; contact support with the receipt or last four card digits if the issue persists."
 },
 {
  "t": "bullet",
  "text": "To cancel: Log into ChatGPT, click your profile icon → Settings → Account → Manage → Cancel subscription."
 },
 {
  "t": "h2",
  "text": "Sources (source_links)"
 },
 {
  "t": "bullet",
  "text": "https://help.openai.com/en/articles/6950777-what-is-chatgpt-plus",
  "link": "https://help.openai.com/en/articles/6950777-what-is-chatgpt-plus"
 },
 {
  "t": "bullet",
  "text": "https://help.openai.com/en/articles/20001043-how-do-i-avoid-being-charged-twice-if-i-subscribe-to-chatgpt-on-ios-android-and-the-web",
  "link": "https://help.openai.com/en/articles/20001043-how-do-i-avoid-being-charged-twice-if-i-subscribe-to-chatgpt-on-ios-android-and-the-web"
 },
 {
  "t": "p",
  "text": "Last checked: 20 Oct 2026",
  "gray": true
 }
];

// 3) STATS: numbers from the n8n run (Rank themes, Pick fee issue, Check explainer)
window.STATS = {
  "run_note": "Numbers from the n8n run on 20 Oct 2026 (run #32) (Rank themes, Pick fee issue, Check explainer nodes).",
  "total_reviews": 722,
  "window": {
    "start": "21 Jul 2026",
    "end": "12 Oct 2026"
  },
  "sources": [
    {
      "name": "Google Play",
      "reviews": 455
    },
    {
      "name": "Trustpilot",
      "reviews": 191
    },
    {
      "name": "App Store",
      "reviews": 76
    }
  ],
  "praise": {
    "reviews": 175,
    "share_pct": 24.2,
    "top": [
      "study help",
      "productivity",
      "writing",
      "learning"
    ]
  },
  "coverage": {
    "other": 52,
    "other_rate_pct": 9.5,
    "pass_mark_pct": 20,
    "pass": true
  },
  "themes": [
    {
      "id": "T4",
      "name": "Usage limits, pricing & billing",
      "reviews": 188,
      "avg_rating": 2.14,
      "share": 36.4,
      "top3": true,
      "subs": [
        [
          "Usage limits and reset timers",
          110
        ],
        [
          "Paid plan limits or value",
          42
        ],
        [
          "Charges, renewals and refunds",
          24
        ],
        [
          "Upgrade pressure and ads",
          12
        ]
      ]
    },
    {
      "id": "T5",
      "name": "Reliability, accounts & support",
      "reviews": 113,
      "avg_rating": 2.12,
      "share": 22.1,
      "top3": true,
      "subs": [
        [
          "Crashes, errors and slowness",
          64
        ],
        [
          "Login, sync and lost chats or files",
          36
        ],
        [
          "Customer support",
          10
        ],
        [
          "Account deactivation",
          3
        ]
      ]
    },
    {
      "id": "T1",
      "name": "Accuracy & hallucinations",
      "reviews": 81,
      "avg_rating": 1.53,
      "share": 19.1,
      "top3": true,
      "subs": [
        [
          "Confident but wrong answers or advice",
          60
        ],
        [
          "Made-up or false facts",
          18
        ],
        [
          "Bias or inconsistent judgements",
          3
        ]
      ]
    },
    {
      "id": "T2",
      "name": "Instruction & context failures",
      "reviews": 66,
      "avg_rating": 2.12,
      "share": 12.9,
      "top3": false,
      "subs": [
        [
          "Ignores instructions or format",
          35
        ],
        [
          "Loses context or memory",
          29
        ],
        [
          "Drifts in long or multi-step work",
          2
        ]
      ]
    },
    {
      "id": "T3",
      "name": "Image generation & editing",
      "reviews": 47,
      "avg_rating": 2,
      "share": 9.6,
      "top3": false,
      "subs": [
        [
          "Image quality and artifacts",
          17
        ],
        [
          "Image generation or upload errors",
          11
        ],
        [
          "Inconsistent image content blocking",
          10
        ],
        [
          "Edits change the wrong things",
          9
        ]
      ]
    }
  ],
  "fees": {
    "fee_reviews": 34,
    "in_groups": 25,
    "excluded": 9,
    "close_call": true,
    "groups": [
      {
        "id": "F4",
        "name": "Paid but plan not active or access lost",
        "reviews": 7
      },
      {
        "id": "F2",
        "name": "Refund refused or not offered",
        "reviews": 6
      },
      {
        "id": "F3",
        "name": "Double or unexpected charges",
        "reviews": 6
      },
      {
        "id": "F1",
        "name": "Charged after cancelling or unable to cancel",
        "reviews": 5
      },
      {
        "id": "F5",
        "name": "Payment failed or card declined",
        "reviews": 1
      },
      {
        "id": "F6",
        "name": "Tax, currency or invoice confusion",
        "reviews": 0
      }
    ]
  },
  "rag": {
    "pages_in_kb": 14,
    "expected_article_found": true,
    "expected_page_rank": 2
  }
};

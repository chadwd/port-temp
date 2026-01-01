---
title: "Turning a Fragile Pricing Engine into a Scalable System"
description: "With a demanding fixed deadline and an unstable legacy system. I led a research-driven redesign of dealer pricing that reduced risks and aligned delivery across teams."
date: 2025-10-31
featured: true
confidentiality: nda
tags: ["Systems Design", "Pricing Operating Model", "Risk Management", "Cross-Functional Leadership", "Enterprise UX"]
coverImage: /images/case-studies/new-pricing/hero-pricing.png
---

## 60-Second Summary (TL;DR)

**The outcome:**
Delivered a redesigned enterprise pricing system under a tight, non-negotiable deadline without increasing delivery or compliance risk. Reduced pricing confusion and errors by making complex logic transparent and explainable. Aligned design, research, product, and engineering around a single delivery plan.

**Why it mattered:**
Leadership needed confidence that a fragile legacy pricing workflow could be replaced in weeks, not months. Engineering needed early clarity to avoid late-stage rework. The business needed a credible pricing story ready for high-visibility demos.

**What I did:**
- Led design while running parallel design and research with the lead researcher, aligning daily as questions and concepts evolved.
- Designed ahead of finalized research, shaping research questions in real time to meet deadlines.
- Partnered closely with product owners and developers to set weekly expectations and delivery options.
- Created a shared FigJam timeline to align leadership, product, research, design, and engineering.

**Proof:**
Research validated core pricing concepts despite compressed timelines.
Engineering began implementation earlier with fewer surprises.
The timeline became the source of truth for scope and sequencing.

**Timeframe:**
Late August – Mid October 2025, with continued design support during development due to build constraints.

External Link (After April 2026):
NDA — not publicly available

---

![Pricing Workflow Timeline for Central Planning](/images/case-studies/new-pricing/image-01-pricing.png)

## Overview

**Primary Impact:**  
<br>
**Stabilized a fragile pricing workflow into a scalable, auditable system while meeting a deadline the organization had previously failed to hit.**

**Secondary Impacts:**
- Reduced dealer pricing errors and compliance risk through transparent rebate logic.
- Enabled engineering to deliver predictably by surfacing scope, tradeoffs, and constraints early.
- Established a repeatable delivery model for complex, high-risk systems.

**Role:**  
Lead Product Designer with end-to-end ownership of system design, UX architecture, and delivery alignment.

**Scope:**  
System-level redesign spanning pricing logic, rebate management, and a new VDP foundation, across design, research, product, and engineering.

**Why This Is Hard:**  
The work required redesigning a critical pricing system while requirements arrived late, scope shifted, legacy architecture resisted change, and the delivery timeline was fixed.

---

## Why Leadership Needed Proof

- A non-movable external demo deadline created real delivery risk if the pricing system slipped or failed.
- The legacy pricing workflow was fragile and poorly understood, increasing the chance of compliance errors if changes were rushed.
- Engineering needed early clarity to scope complex logic, but design and research were still evolving.
- Leadership had seen previous pricing efforts stall due to late discovery and misaligned expectations.

**What leadership needed answered:**
- Can we replace a fragile pricing workflow in weeks without increasing risk?
- Can engineering start early without committing to the wrong solution?
- Is there a credible plan that aligns teams around scope, timing, and tradeoffs?

---

## The Real Problem (Not the Obvious One)

**What leadership thought the problem was:**
- Dealers were struggling to apply rebates correctly.
- Pricing errors were creating compliance risk.
- The system needed a better rebate management UI.

**What was missing from that framing:**
- Rebate errors were a symptom, not the root cause.
- There was no centralized, controllable source of truth for rebates across store and vehicle levels.
- Incremental fixes had already made the legacy system fragile, risky to change, and understood by only a few people.

**The real problem I identified:**
- The organization lacked a scalable, transparent rebate system and a delivery approach that could handle its complexity.
- Scope volatility, unclear ownership, and fragmented documentation were compounding technical risk.
- Without intervention, the new system risked repeating the same fragility as the legacy one.

**What would have broken if nothing changed:**
- The project would miss its delivery window due to late discovery and shifting requirements.
- Engineering would be forced into reactive fixes, increasing long-term maintenance and compliance risk.
- Knowledge would concentrate in a few individuals, recreating the same bottlenecks that stalled past pricing efforts.

**The actual need:**
- A centralized, accurate, and auditable rebate system that dealers could control with confidence.
- A delivery model that surfaced unknowns early, absorbed scope change deliberately, and avoided incremental patchwork.
- Clear timelines, shared documentation, and explicit tradeoffs to prevent silent failure.

---

![Scoping out the Phased approach features plans](/images/case-studies/new-pricing/hero-pricing.png)

---

## Operating Model We Proved

**Strategy:**  
Run design and research in parallel to surface unknowns early, while using a shared timeline and explicit tradeoffs to keep delivery predictable under a fixed deadline.

**Mental model:**
- Design leads direction and scope framing early to unblock engineering.
- Research validates and refines in-flight decisions rather than waiting for a “ready” state.
- Product and engineering receive weekly options, not surprises.
- One shared plan replaces fragmented artifacts as the source of truth.

**What this replaced:**
- Sequential handoffs that delayed discovery until it was too late to course-correct.
- Unlinked documents and informal updates that hid scope changes.
- Late-stage validation that increased rework and delivery risk.

**How it worked in practice:**
- Produced a wireframe and scoping draft within two weeks to anchor feasibility and timeline discussions.
- Partnered daily with the lead researcher to shape research questions as designs evolved.
- Set weekly expectation checkpoints with product owners and developers, presenting clear delivery options and tradeoffs.
- Created a FigJam master timeline to align leadership, product, research, design, and engineering around scope, sequencing, and constraints.

**What changed immediately when adopted:**
- Engineering could start scoping and implementation earlier with clearer assumptions.
- Research validated the highest-risk decisions despite compressed timelines.
- Scope creep became visible and deliberate rather than implicit.
- Leadership gained confidence through a single, credible delivery plan.

---

## The 3 Decisions That Drove the Outcome

### Decision 1: Lock a Two-Week Scoping Draft Before Research Was Ready

**Problem it solved:**  
Engineering needed clarity immediately to meet a non-movable deadline. Waiting for fully validated research would have blocked scoping and guaranteed a slip.

**Options considered:**
- Wait for research validation before sharing designs
- Share a rough, low-fidelity preview to unblock engineering

**Tradeoff accepted:**  
Gave up the certainty of a fully research-validated blueprint in favor of speed and early alignment.

**Decision:**  
Delivered a rough wireframe and scoping draft within two weeks as a preview handoff so engineering could begin API and logic planning in parallel.

**Why this worked:**  
Early visibility surfaced unknowns while changes were still inexpensive.

**Proof:**  
Developers reported reduced churn and fewer late-stage surprises, and final hi-fi designs were still delivered ahead of schedule.

---

### Decision 2: Replace the Legacy Pricing Workflow Instead of Incremental Fixes

**Problem it solved:**  
The existing pricing workflow was fragile, hard to reason about, and risky to extend. Incremental fixes had already created technical debt and institutional knowledge silos.

**Options considered:**
- Patch the legacy workflow to support new pricing logic
- Re-architect the pricing experience around a new, centralized system

**Tradeoff accepted:**  
Temporarily lost feature parity with parts of the legacy workflow.

**Decision:**  
Pivoted to a modern pricing architecture that could support transparent logic, live updates, and future expansion without compounding risk.

**Why this worked:**  
A clean foundation reduced cognitive load for users and long-term technical debt for engineering.

**Proof:**  
Dealers immediately reported improved clarity and trust in pricing decisions.

---

### Decision 3: Use Phased Scope to Protect the MVP While Designing the Full System

**Problem it solved:**  
The full pricing vision was too large to ship safely in one pass under the given timeline.

**Options considered:**
- Deliver the complete system in a single release
- Phase delivery while designing the full system upfront

**Tradeoff accepted:**  
Delayed advanced features in favor of a stable and predictable MVP.

**Decision:**  
Designed multiple future phases but strictly limited Phase 1 to the core pricing and rebate logic needed to succeed.

**Why this worked:**  
Clear boundaries protected delivery while keeping the system future-proof.

**Proof:**  
Engineering cited the phased structure as improving predictability and reducing confusion, and the model was reused on later projects.

---

## Evidence and Validation

**Delivery and execution signals:**
- Engineering began scoping and implementation earlier than usual due to the two-week preview handoff.
- Design handoff landed ahead of schedule despite parallel research and shifting requirements.
- Fewer late-stage questions and rework compared to previous pricing initiatives.

**Research and user validation:**
- Core pricing and rebate concepts validated with dealers despite compressed timelines.
- Dealers consistently understood pricing logic, stacking rules, and control boundaries without additional explanation.
- Feedback confirmed increased trust driven by transparency rather than added features.

**Behavioral and organizational signals:**
- The FigJam timeline became the shared source of truth across design, research, product, engineering, and leadership.
- Scope changes were discussed explicitly and intentionally, rather than discovered during build.
- Engineering referenced the phased structure as improving predictability and reducing delivery risk.

**What would not have happened otherwise:**
- Engineering would have waited on finalized designs, compressing build time and increasing risk.
- Scope creep would have remained implicit, increasing the chance of missed deadlines.
- The new system would likely have repeated the same fragility and knowledge silos as the legacy workflow.

---

## Constraints That Shaped the Work

**Timeline pressure:**  
- The project operated under an extremely compressed timeline that no other design team in the organization had previously delivered against with similar scope and quality.
- Requirements were finalized late, leaving less than two months to scope, research, design, validate, and support development.
- A non-movable external demo deadline eliminated the option to slip or partially deliver.

**Legacy system constraints:**  
- Initial work was constrained by the existing pricing and VDP architecture, which was fragile and difficult to extend safely.
- Midway through the project, it became clear that continuing within the legacy structure would recreate the same long-term risks.
- This forced a deliberate pivot to designing a new VDP foundation from the ground up.

**Design system and architectural limits:**  
- The new VDP needed to leverage existing design system patterns to remain buildable within the timeline.
- Prior system patterns I had established enabled a faster pivot without sacrificing consistency or quality.
- New components had to be flexible enough to support future phases without expanding Phase 1 scope.

**Phasing and scope constraints:**  
- Phase 1 required a tightly scoped MVP to ensure delivery, even though the full system vision extended across multiple future phases.
- Research and validation had to cover Phases 1 through 4 to avoid downstream rework and blind spots.
- Advanced features were intentionally designed and tested, but excluded from the initial release.

**Organizational and resource constraints:**  
- Engineering capacity was limited and partially shared across teams.
- Design needed to absorb uncertainty and adjust sequencing to keep development unblocked.
- Clear tradeoffs and expectation-setting were required to prevent silent scope expansion.

---

## Reflection (Forward-Looking)

**Capability unlocked:**  
- Proved I can lead system-level design delivery under extreme constraint without sacrificing clarity or trust.
- Demonstrated that parallel design and research can be run safely when paired with explicit timelines, tradeoffs, and shared artifacts.
- Established a repeatable model for aligning design, research, product, and engineering around complex, high-risk systems.

**How this changed my approach:**  
- I now treat operating models as a first-class design decision, not a background process.
- I prioritize early scoping artifacts to surface risk while changes are still inexpensive.
- I design full systems upfront, even when delivery must be phased, to avoid recreating legacy fragility.
- I am more explicit about tradeoffs and constraints to prevent silent failure.

**What I look for next:**  
- Problems where system complexity, organizational pressure, and delivery risk intersect.
- Opportunities to replace brittle legacy workflows with scalable foundations.
- Work that requires aligning teams through clarity, not heroics.
- Challenges where design leadership directly influences execution quality and long-term system health.



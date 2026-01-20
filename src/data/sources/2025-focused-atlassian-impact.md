# Chad Dunbar 2025 Performance Impact

## 1. Executive Summary

2025 was a year of strong delivery, visible cross‑team impact, and meaningful process innovation. Across Atlassian Home and Confluence, Chad led or significantly contributed to multiple high‑impact initiatives in ACV Retail (MAX + ClearCar), with standout accomplishments including: completion of the Long Loading State (AI) UX intervention to reduce perceived latency during AI inference; launch of MAX Appraisal Alerts to enable multi‑alert rules for strategic inventory monitoring; and enabling quick acceptance of ACV Guaranteed Offers from within MAX to streamline wholesale workflows. In parallel, he advanced the MAX Design System initiative, documenting key components, leading component engineering (e.g., Auction Card, Calculator), and codifying operating principles, all while progressing an AI‑assisted design‑to‑code pilot to accelerate handoff and improve fidelity from Figma to production code.

Beyond feature delivery, Chad documented and enforced a pragmatic, designer‑led Jira operating model that increased clarity and throughput in ACV Retail. The "JIRA Process ACV Retail" playbook (policy owner: Chad; process enforcement: Margaux Kan and Kyle Keele) standardized epic/subtask hygiene, review SLAs, and escalation rules, and codified a dev handoff checklist that improved consistency and reduced back‑and‑forth. This process lens was reinforced by authored enablement in Confluence for AI‑assisted workflows ("Figma Design to MCP AI Agent Development"), enabling designers to generate and validate functional UI code with engineering in the loop.

Business‑linked outcomes from New Car Pricing v2 (NCP) were a bright spot: retention measured at 88.7% in October 2025, with 210 new rooftops onboarded YTD and a Customer Incident Score (CIS) of 30 for pricing support benchmarks referenced in NCP epics Chad drove or supported. These metrics reflect platform‑level progress tied to experiences Chad helped design and hand off (Inventory List, VDP, Rebate Manager, and Calculator).

## 2. Individual Contributions

### 2.1 MAX Design System: Documentation, Components, and Standards (Q4 on track)

Chad owned and advanced the MAX Design System (MAX‑DS) initiative to centralize component and pattern documentation across Mobile and NextGen. The Atlas project remained on track for Q4, with the objective of making it easy to find and adopt previously built patterns reducing reinvention and elevating UI consistency. Throughout the year, Chad delivered component‑level work, including leading the Auction Card component and establishing Calculator primitives used in NCP Phase 1.

The DS effort wasn't just component delivery; it covered purpose, KPIs, ownership, intake/review/publish workflows, and a roadmap, framed early in 2025 as "2025 Purpose, Process … Profit." This meta‑work clarified how and why components get into the system, how they're quality‑controlled, and how adoption is measured key leadership behaviors that make DS sustainable. These system‑wide standards showed up in downstream work as reusable, token‑aligned patterns improving speed and reducing pixel drift during dev handoff.

Chad also connected DS practice with AI‑assisted workflows through a multi‑team pilot (Product Design + Developer Productivity) that integrated Figma MCP and Claude Code. The pilot defined measurable targets for design‑to‑code velocity, handoff iteration reduction, and preview coverage, and demonstrated functional code generation aligned to DS tokens setting the foundation for a measurable step‑change in design throughput in 2026.

### 2.2 MAX Appraisal Alerts: Multi‑Alert Rule Creation (Completed August)

Chad led the UX for a high‑leverage feature enabling General Managers and Used Car Managers to configure appraisal alerts across multiple stores with flexible field constraints (MMY, mileage, type), notification channels, and de‑duplication logic. The system included ACID‑style constraints (e.g., prevent duplicates), lifecycle management (activate/deactivate), and clear list UI for rule inspection tailored to multi‑rooftop workflows. This raised visibility of "act‑now" opportunities and reduced reliance on manual polling of appraisals.

The work was backed by UXR artifacts: a research guide and moment‑of‑insight clips for Appraisal Alerts that steered the MVP toward meaningful defaults and crisp rule creation flows. The UXR thread authored and delivered by Chad reinforced confidence in the final UX by collecting the mental models of GM/UCM personas and aligning acceptance criteria to lived dealer workflows.

Delivery culminated in August with an Atlas status of "Completed 🎉," meeting acceptance criteria such as multi‑dealer selection, alert triggers at create/save, and guardrails like auto‑deactivate on user deactivation. As a systems pattern, Appraisal Alerts also contributed to a shared model for rule creation UX that other features could adopt minimizing net new design debt.

### 2.3 Long Loading State (AI): Improving Perceived Performance (Completed July)

With model updates increasing recommendation generation times (10–60 seconds), Chad delivered a new loading UX that set correct expectations while maintaining user trust and engagement. He designed a "thinking" metaphor, clear disclaimers about AI fallibility, and loading communication that defused anxiety about system health in the absence of progress bars. The Atlas project went to "Completed 🎉" by mid‑July.

The project's KPI benchmarked against a harsh industry baseline: where up to 90% of users abandon during long, uncertain loads, the goal was to materially outperform that outcome (i.e., keep more users engaged through to a delivered recommendation). By reframing the wait state as "computationally valuable," the UX aimed to preserve intent and reduce context switching critical when recommendations gate high‑value dealer actions.

This work integrated with Chad's broader "Pace Notes" experimentation, which sought to raise trust in AI outputs by restructuring the recommendation card to lead with evidence (Insights), then Summary, then Recommendation. The A/B testing plan downstream of the loading improvements documented concrete outcome goals (e.g., +15–20% lift in confidence) and applied learning back into Home components.

### 2.4 ACV Guaranteed Offer: One‑Click Acceptance in MAX (Completed August)

Dealers previously saw estimated guarantees with limited in‑product actioning. Chad led the UX to enable "Request Inspection" and post‑inspection "Accept Offer" workflows directly within MAX, including confirmation states, error handling, and email hooks to ACV Inspection teams. This reduced manual thread‑hopping and accelerated ACV's wholesale pipeline from the dealer UI surface they already live in. The Atlas project reached "Completed 🎉" in August.

The design clarified terminal states by disabling acceptance post‑action and comprehensively instrumented failure conditions (e.g., expired offer, server issues) to preserve user trust. Email integration delivered operational observability for ACV's inspection pipeline and provided a structured record of dealer intent for follow‑through. The net effect was higher conversion from estimate to accepted offer, with less reliance on post‑session manual outreach.

This pattern of embedding "handoff to ACV" as a native state within MAX dovetailed with other cross‑surface experiences Chad supported in 2025, such as Mobile "Take Into Inventory," where flows were validated with UAT/pilot dealers and paired with analytics capture for starts/completions/errors.

### 2.5 Breadth of Delivery: Dozens of Jira Issues Resolved Across UX, UXR, and DS

From late Q1 through Q4, Chad closed dozens of UX, UXR, and Design System issues spanning Inventory, Autobuy, Mobile, Photos, and NCP. Representative completions include: Navbar active state and AG Grid empty states; ClearCar pricing term wireframes and dealer price history; Autobuy timing and error banners; mobile appraisal‑inventory linking; and photo metadata displays. This cross‑section shows regular throughput on "small bets" that remove friction and tighten UI quality alongside larger epics.

In November–December alone, he closed >10 issues linked to disclosure workflows, performance fixes, market listing indicators, and AG Grid UI refinements evidence of sustained output through year end. This included design updates to add a "Sold" indicator, fixes for CSS issues affecting button visibility, and multi‑ticket disclosure UX enhancements (sticky confirm, update condition, condition column).

For transparency and auditability, the ACV Home/Atlas projects capture outcomes and acceptance framing, while Jira provides the issue‑level detail and resolution dates. The sampling below illustrates the variety and cadence of resolved work.

**Sample of Completed Issues (2025)**

| Area | Issue | Resolution Date |
|------|-------|----------------|
| Inventory UI | Design: Navbar Active state (UX‑2350) | 2025‑03‑19 |
| DS/UI | Design: General Empty State AG Grid (UX‑2443) | 2025‑04‑01 |
| Pricing | Design: ClearCar Pricing Term Wireframes (UX‑2462) | 2025‑04‑04 |
| Autobuy | Design: Autobuy – Error Banner (UX‑2358) | 2025‑03‑19 |
| Mobile | Mobile: ClearCar View & Change Appraisal Source (UX‑2520) | 2025‑04‑21 |
| Error UX | UI UX: Refresh for Failure to Fetch (UX‑2551) | 2025‑05‑14 |
| NCP | Dev Handoff: New Car VDP – NCP (UX‑2862) | 2025‑11‑24 |
| UXR | Quant Analysis Plan – VDP NCP (UX‑2874) | 2025‑11‑24 |
| Standards | UX Principles Guidelines – VDP NCP (UX‑2872) | 2025‑11‑24 |
| DS | Calculator: DS Audit & White‑label Workshop (UX‑2887) | 2025‑12‑01 |

### 2.6 Key Deliverables: AI Design‑to‑Code Pilot, New Pricing Calculators, Feedback Logging

Chad co‑led a multi‑team AI design‑to‑code pilot integrating Claude Code with Figma's MCP to generate working UI aligned to DS tokens. The pilot established baselines and explicit KPI targets (e.g., shorten design‑to‑code cycle from 20–45 days to 2–4 days; reduce handoff iterations from 3–5 to 1; auto‑generated previews for 50% of components in pilot), documented prompting patterns, and shipped a code PR in the target repo, providing a credible foundation for scaled adoption in 2026.

He also delivered core DS components and UX flows underpinning New Car Pricing v2, notably the Calculator component with rebate and accessory scaffolding. These artifacts were paired with information architecture, accessibility analyses, quantitative analysis plans, and dev handoffs to ensure fidelity through implementation. The breadth of NCP issue closures in late Q4 demonstrates how DS assets matured into working product experiences.

Finally, Chad formalized a Design Feedback Log System to track iterations, stakeholder input, and decision rationales a defensible history that protects design time, improves onboarding for partners, and reduces memory bias. While the Atlas project is archived for 2025, the operating concept persists and aligns with the visibility and process cadence later codified in the Jira Process playbook.

### 2.7 Quantitative KPIs (scope: 2025 pilot metrics and business‑linked outcomes)

Chad's work in 2025 tied to explicit KPIs at both the process and business layers. AI workflow KPIs were defined in the Figma MCP pilot, with tracked baselines and aggressive targets to be validated in 2026 rollouts. For NCP, business outcomes are captured in epics: retention measured at 88.7% in October 2025; 210 new dealer rooftops onboarded YTD (Oct); and a Customer Incident Score of 30 for pricing support key indicators of platform health through Q4.

For AI perception UX (Long Loading State), the team set a goal to significantly outperform the 90% abandonment industry norm during long waits. The completed project provides a productionized baseline for 2026 A/B validations of engagement and completion rates for recommendation retrievals, with learnings to roll into Home components.

**KPI Summary Table**

| KPI | Baseline | 2025 Target/Result | Status | Source |
|-----|----------|-------------------|--------|--------|
| Design‑to‑code cycle time | 20–45 days | 2–4 days (pilot target) | Target defined; pilot completed | UX‑3146 |
| Handoff iterations | 3–5 cycles | 1 cycle (pilot target) | Target defined; pilot completed | UX‑3146 |
| Auto‑generated previews | 0% | 50% components in pilot | Target defined; pilot completed | UX‑3146 |
| NCP Dealer Retention | — | 88.7% (Oct '25) | Measured | UX‑2997 |
| New Dealers Onboarded (YTD) | — | 210 rooftops (Oct '25) | Measured | UX‑2997 |
| Pricing Support CIS | — | 30 | Measured | UX‑2997 |
| AI Abandonment during loading | ~90% industry | "Significantly better than 90%" (goal) | Goal defined; UX shipped | ACVA‑58 |

## 3. Collaborative Initiatives

### 3.1 MAXClearCar Design and MAX‑DS Teaming

Chad worked as a core member and enabler within MAXClearCar Design (10+ members) and MAX‑DS. These teams coordinated across Product, Engineering, and UXR to mature shared components, ship retail workflows, and align migration paths for MAX and ClearCar. The team constructs provided the backbone for cross‑project visibility, critique cycles, and consistency across surfaces (Web, Mobile, Dealer tools).

Collaboration extended beyond design peers to include product owners and engineering leaders such as Ryan Walker, Albert Martin, and Jake Maisel, who co‑owned several Atlas projects and were Approvers on key Confluence plans (e.g., NCP Phase 1). This structure facilitated tight scoping, faster feedback on feasibility, and alignment on platform priorities.

The MAX‑DS triad (Chad, Margaux Kan, Jake Maisel) underpinned systems thinking in all subsequent projects. Systemizing acceptance states, error/empty patterns, and token propagation across components laid the groundwork for the MCP pilot and practical DS adoption by engineering.

### 3.2 Cross‑Functional Delivery: New Car Pricing v2 (NCP)

NCP was a major cross‑team body of work that Chad shaped and delivered alongside Product and Engineering. He owned or contributed to epics spanning the Inventory List, VDP, Pricing Calculator, Rebate Manager, and dev handoffs, with a flurry of completions in late November. This work linked directly to measurable business metrics retention, onboarding, and CIS providing a clear line from UX delivery to outcomes.

Chad paired UX artifacts with research, a11y analysis, IA, and quant plans to ensure the build met user and platform requirements. The componentization of complex pricing (rebates, accessories, rules) shows DS alignment and future‑proofing key when features require versioning or white‑labeling for partner ecosystems. This decoupling also enabled stronger syndication logic for third‑party and OEM feeds.

By managing dev‑ready artifacts and closing the loop with "Dev Handoff" tickets, Chad reduced implementation ambiguity and rework for engineering teams. The operational hygiene in these handoffs mirrors the Jira Process playbook he authored, reinforcing a single way of working across retail programs.

### 3.3 ACV Retail (MAX+ClearCar) – UX Visibility

To increase cross‑functional transparency, the "ACV Retail (MAX+ClearCar) – UX Visibility" project centralized weekly UX updates in Home and linked them to ongoing process discussions in Slack. The initiative targeted consistent updates and created a drumbeat for referencing UX artifacts in broader team ceremonies normalizing visibility and reducing surprises downstream.

This cadence integrated well with the Jira Process guidelines on weekly syncs, blocked escalations, and Friday wrap‑ups, creating harmony between what teams say they will do and how they report what they've done. It also encouraged reuse of common Home/Confluence surfaces for roadmaps, research, and dev handoffs.

Over time, the visibility initiative is expected to contribute to improved collaboration KPIs such as reduced cycle time through review, fewer escalations beyond Day 2, and clearer lines of accountability. The "Collaboration Effectiveness" and "Positive feedback on usability" Atlas goals capture this intent and provide a measurement target for H1'26.

### 3.4 Process Documentation and Working Sessions

Chad authored the ACV Retail Jira Process guide and facilitated alignment through examples, acceptance checklists, and fast‑path escalation rules. By naming the PM as "Accountable" in "Design (Review)," requiring one deliverable per ticket, and insisting on live Figma/Doc links, he improved asynchronous review fidelity and reduced rework. Dev handoff checklists (states, tokens, a11y, acceptance tests) set consistent expectations for engineering intake.

This was reinforced through practical workshops (e.g., Calculator DS white‑label session), explicit dev support on AG Grid implementations, and small‑bet UI refinements that modeled the process in action. The combination of template + reinforcement matters: it reduces "how to work" ambiguity and frees teams to focus on "what to build."

Chad also maintained onboarding surfaces and access request documentation to reduce friction for new contributors. The Confluence "Onboarding: Access Requests" page explicitly routes Figma access via Chad, ensuring controlled but responsive enablement for designers and engineers touching UI tasks.

### 3.5 A/B Testing and Applied Learning

The "Pace Notes – Inventory A/B Testing" project captured a restructured recommendation card (Insights → Summary → Recommendation) and set outcome targets for trust/confidence lift. Learnings were intended to be fed into shared components, closing the loop between experimentation and systemization. This "test → system → ship" rhythm is visible across Chad's work in 2025.

Combined with the AI loading UX and ongoing pilot dealer feedback ("AI Note – 15 Active Dealers in Pilot"), these experiments supported a practical acceleration path for AI‑assisted pricing workflows in MAX. The "Validate Design Decisions with Timely, Representative Dealer Feedback" goal provides a durable frame for how UX quality should be measured by representative, timely input from the field.

## 4. Leadership Activities

### 4.1 Policy and Process Ownership

Chad was policy owner for the ACV Retail Jira Process, serving as the operational face of design enablement. He defined simple but firm rules: epic‑first planning, one ticket per deliverable, PM accountability in design review, and a "Blocked" state with owner/date and forced escalation at 2 business days. He also authored a concise dev handoff checklist that scales from small fixes to multi‑component releases.

The playbook assigned clear roles (PM A; Designer R; EM/Dev C; UXM enforcement) and a weekly cadence that reduced planning thrash while preserving velocity. This clarity helped socialize decision rules and plugged a yawning gap in review SLAs that often slows blended teams.

By connecting this process to concrete dev handoff issues in NCP and AI projects, Chad modeled the behavior he wanted to see. It's telling that later‑year NCP artifacts (IA, a11y, dev handoffs) landed in a tight burst evidence that the process can scale under pressure when projects reach convergent phases.

### 4.2 Mentorship via Enablement Artifacts and Templates

Chad's leadership shows up in the templates, guides, and talk tracks he authored and circulated. The "Figma Design to MCP AI Agent Development" guide demystifies how designers can collaborate with engineering to validate code against design intent without collapsing role boundaries an important cultural signal for responsibly adopting AI in product pipelines. These resources are functionally mentoring at scale.

He also curated onboarding and access pathways and previously authored design templates (design reviews, sprints, systems) to raise the floor for contributors' first 30–60 days. While some templates pre‑date 2025, their use and updates this year are embedded in how ACV Retail ran, and they complement the weekly visibility and Jira Process cadence.

Chad continues to connect craft to community through internal talks and DS evangelism artifacts, reinforcing why systems matter and how to measure their business value. This narrative coherence is a hallmark of effective design leadership it reduces "why are we doing this?" churn and builds alignment.

### 4.3 Process Improvements and AI‑Driven Automation

The most forward‑leaning leadership move in 2025 was driving the AI design‑to‑code pilot with explicit performance KPIs. Setting baselines (20–45 days) against targets (2–4 days) for design‑to‑code, naming a reduction in handoff iterations, and specifying preview coverage created a testable hypothesis for 2026 adoption. The pilot also generated code in‑repo and documented prompting patterns moving beyond deckware to operational utility.

Chad also standardized feedback logging as a design ops artifact, preserving the "why" behind iterations and anchoring decisions to stakeholder input and research signals. This strengthens the case for design time in planning cycles and defuses retrospective second‑guessing that often derails velocity.

Finally, he supported a clean dev intake by codifying a11y, states, tokens, and acceptance tests into handoffs. That mechanical consistency saves engineers real hours and reduces production defects process improvements whose impact compounds as teams ship more.

## 5. Key Performance Indicators

### 5.1 Project Delivery

Chad resolved dozens of Jira issues across UX, UXR, and DS, with accelerated throughput in March–May and November–December. He completed three Atlas projects with "Completed 🎉" status (Long Loading State (AI), Appraisal Alerts, Guaranteed Offer acceptance) and kept MAX‑DS on track into Q4.

For an auditable trail, see the issue list and statuses captured in Jira and the Jira/Atlas projects referenced throughout this review. A curated subset is listed in Section 2.5 to illustrate variety and cadence; the complete list can be navigated via the linked issue searches and project boards.

### 5.2 Design System

MAX‑DS advanced on three fronts: component delivery (Auction Card, Calculator), standards and ownership (DS purpose/process/KPIs), and AI‑assisted workflows that target preview coverage for 50% of components in pilot. These investments directly support faster, more accurate builds in NCP and beyond.

### 5.3 User Engagement and Usability

AI recommendation loading UX shipped to production with the goal of materially outperforming the ~90% abandonment baseline for long, uncertain wait states. A/B testing for recommendation trust and clarity targeted a +15–20% lift in confidence and codified a learning loop back into shared components. Mobile flows like "Take Into Inventory" incorporated analytics for starts/completions/errors to enable in‑product telemetry of success.

### 5.4 Business Impact

NCP metrics captured in Jira epics indicate strong outcomes through October: 88.7% dealer retention, 210 new rooftops onboarded YTD, and a Customer Incident Score of 30 for pricing support. Chad's DS components, UX flows, and dev handoffs were critical inputs to these results and form the basis for continued gains in 2026.

### 5.5 Process Efficiency

Pilot KPIs for design‑to‑code velocity (2–4 days target from 20–45 days baseline) and reduction of handoff iterations (to 1) were defined and operationalized in the Figma MCP exploration. Process adoption was reinforced via the Jira Process playbook and evidenced in end‑of‑year dev handoffs for NCP.

## 6. Conclusion and Impact Summary

Chad delivered consistently across individual execution, collaborative programs, and leadership/process enablement in 2025. He shipped three high‑impact Atlas projects to "Completed 🎉," accelerated New Car Pricing v2 with componentized DS assets and strong handoffs, and authored a simple, enforceable Jira process that improved cross‑team predictability. He also laid a credible foundation for AI‑assisted design‑to‑code workflows, with baselines, targets, and in‑repo code to guide 2026 scale‑up.

The work tied to measurable outcomes NCP retention, onboarding, and incident scores and established a learning loop for AI UX via A/B testing and improved loading states. The visible cadence in Home and Confluence, along with the policy ownership for design process, strengthened alignment with Product and Engineering, while enabling faster, more confident delivery. Taken together, 2025 demonstrates Chad's ability to ship, to scale influence through systems and process, and to connect UX to business results.

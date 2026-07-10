# IDBI Innovate 2026 — Orientation Session

**Source:** [YouTube — Orientation Session | IDBI Innovate 2026](https://www.youtube.com/watch?v=yldKK4NMvjA)
**Uploader:** Hack2skill
**Duration:** 40:31 (2430.9s)
**Resolution:** 1280x720
**Detail:** transcript (native captions)

---

## Summary

A 40-minute orientation session for **IDBI Bank's "Innovate 2026" hackathon**, hosted by Sherry. Format: slide-driven presentation by Prashant (Deputy General Manager, Digital Banking, IDBI Bank) explaining the bank's hackathon vision, the five problem statements, partner ecosystem, prize pool, and process — followed by a Q&A. Hosted on Hack2skill.

> **Note:** This is a *different* video from the prior problem-statement explainer/AMA (`sDGX-QvMyQo`). The problem-statement content is the same, but this one is the formal **Orientation Session** with cleaner on-slide breakdowns and a slightly different host (Sherry vs. Shehvi) and presenter structure.

### Visual structure (from frames at 0:00, 0:30, 1:45, 3:40, 4:55, 7:16, 16:12, 18:05, 18:42, 18:54, 20:01, 20:20, 20:38, 20:39, 20:42, 20:57, 21:13, 21:29, 21:34, 21:38, 21:46, 21:49, 38:34, 38:38, 38:40, 39:08, 39:12, 39:15)

- **Title slide** (t=0): "IDBI INNOVATE 2026 — Hackathon by IDBI Bank"
- **Process overview** (t=0:30–7:16): orientation on what the hackathon is, eligibility, timeline, prize pool
- **Problem statement breakdowns** (t=16:12–21:49): official problem statement slide for each track — 5 in total — with objectives, why, expected outcomes, evaluation criteria
- **Q&A / contact / closing** (t=38:34–39:15): contact info, judging criteria, closing slide

### Bank context (from Prashant's intro)

- IDBI is one of India's leading premier commercial banks
- Historically a DFI (Development Finance Institution), now fully retail + commercial
- Currently driving digital initiatives across retail and corporate banking
- Hackathon goal: **co-create** with developers, FinTechs, startups — "production-ready" prototypes that can scale inside the bank

### Partner ecosystem (named in talk)

- **AWS (Amazon Web Services)** — cloud infrastructure & knowledge partner
- **Hack2Skill** — platform / community partner
- **ACC (Applied Cloud Computing)** — sandbox & technology partner (kicks in at the second stage, post-shortlisting)

### Prizes & process (from talk)

- **Total prize pool: ₹15 lakhs**
- Sandbox access in the second stage
- Opportunity to deploy as pilot post-evaluation

**Timeline (from on-screen walkthrough):**
- Registration, team formation, prototype submission → close **9 July 2026**
- AMA session → **30 June 2026**
- Shortlisting → **21 July 2026**
- Refined prototype submissions → **22–31 July 2026**
- Finalist announcement → **13 August 2026**
- Demo day & winner announcement → **21 August 2026**

### Track summaries (from slides + talk)

1. **Digital Wealth Management** (Track 1) — AI-driven 360° view of savings, investments, spending patterns; avatar-based wealth advisory at bank scale
2. **Prospect Assist AI** (Track 2) — lead generation / need matching for IDBI's existing liability customers (home loan, auto loan, consumer durables); later extend to non-IDBI prospects
3. **Financial Health Score** (Track 3) — MSME-focused; uses GST, account aggregator data, AIML to identify unserved/underserved MSMEs' business loan needs
4. **Default Prediction Model** (Track 4) — predictive model for MSME loan defaults, **12 months in advance**; improve over current ~3-month lead time
5. **Open Innovation** (Track 5 / "Noble Idea") — open-ended banking pain point not covered by tracks 1–4

### Key Q&A topics (paraphrased from transcript)

- **Team members from different companies/cities** — yes, allowed. Max team size 4.
- **Track 2 lead gen** — initially for existing IDBI customers; will extend to non-IDBI customers once the solution stabilizes
- **IDBI's existing AI/ML use** — used in lending journeys but limited; this hackathon is part of scaling up
- **NTB/NTC rejection rate** — no public number; in the digital platform rejection happens early via BRE (Business Rule Engine) execution
- **BFSI professionals / solo participants** — eligible
- **Students / fresh graduates** — can participate; will be evaluated on the same criteria (scalability, production-readiness)
- **Student + freelancer** — same rule; long-term association preferred; FinTechs and startups with refineable existing solutions are especially welcome
- **Independent professionals** — explicitly open to
- **First prototype submission (by 9 July)** — PPT + brief idea required. A working prototype is **welcome but not required** at this stage; sandbox/synthetic data only available later
- **Team size** — 1 to 4 members
- **Track 4 target metric** — current accuracy is 16–22%; want to push to ~90% AND extend lead time from ~3 months to 12 months. Pick whichever metric(s) you can defend for imbalanced data.
- **External data for Track 3** — only mock/synthetic; available at sandbox stage
- **Track 5 ("Noble Idea")** — must be unrelated to the four defined problem statements
- **MSME loan TAT vs NBFCs (FlexiLoans, Lendingkart)** — segments differ; IDBI working to close TAT gap via digital solutions
- **Working prototype at registration** — yes, expected at the prototype submission stage
- **Synthetic data scope** — transactions, UPI patterns, MSME financials; whatever is essential
- **Customer-connection automation for loans** — mostly manual today; IDBI looking to improve
- **More problem-statement clarifications** — another session on **30 June 2026**
- **Contact** — `support@hacktoskill.com`

---

## Full Transcript

```
[01:50] >> Hello. Hi, everyone. >> [screaming]
[01:56] >> Hello. Hi, everyone. Hope you all are doing well.
[01:57] doing well. So, a very warm welcome to the official
[02:00] So, a very warm welcome to the official orientation session for IDBI Innovate
[02:03] orientation session for IDBI Innovate 2026. My name is Sherry and I will be
[02:06] 2026. My name is Sherry and I will be your host for the day. We are incredibly
[02:09] your host for the day. We are incredibly excited to have so many talented
[02:11] excited to have so many talented developers, fintech enthusiasts, and
[02:13] developers, fintech enthusiasts, and innovators joining us today from across
[02:16] innovators joining us today from across the country. Over the next few weeks,
[02:18] the country. Over the next few weeks, you will be pushing the boundaries of
[02:20] you will be pushing the boundaries of what's possible in modern banking.
[02:23] what's possible in modern banking. Today, we are going to break down
[02:24] Today, we are going to break down exactly what this journey looks like,
[02:27] exactly what this journey looks like, how you can leverage our sandbox
[02:29] how you can leverage our sandbox infrastructure, and what it takes to
[02:31] infrastructure, and what it takes to build a winning blueprint. So, let's
[02:34] build a winning blueprint. So, let's dive right in.
[02:36] dive right in. Before we unpack the technical details,
[02:39] Before we unpack the technical details, let's look at the bigger picture.
[02:42] let's look at the bigger picture. IDBI Innovate 2026 isn't just a
[02:45] IDBI Innovate 2026 isn't just a competition. It's a launchpad designed
[02:48] competition. It's a launchpad designed to bring external brilliance into
[02:50] to bring external brilliance into institutional banking structures.
[02:53] institutional banking structures. Whether you are a solo developer, your
[02:55] Whether you are a solo developer, your mission here is to challenge
[02:57] mission here is to challenge conventional engineering. Quick bit of
[02:59] conventional engineering. Quick bit of housekeeping, we have a dedicated time
[03:02] housekeeping, we have a dedicated time at the end for a live Q&A sessions where
[03:05] at the end for a live Q&A sessions where you can ask all your queries. So, as we
[03:08] you can ask all your queries. So, as we go through the slides, please drop your
[03:09] go through the slides, please drop your questions directly into the live chat
[03:11] questions directly into the live chat framework, and our moderation team will
[03:13] framework, and our moderation team will pull them up for the final segment. Now,
[03:16] pull them up for the final segment. Now, I would like to introduce our guest
[03:18] I would like to introduce our guest speaker today, Prashant sir, who is a
[03:21] speaker today, Prashant sir, who is a deputy general manager, digital banking
[03:24] deputy general manager, digital banking department at IDBI Bank.
[03:27] department at IDBI Bank. Hi Prashant sir.
[03:30] Hi Prashant sir. >> Yeah, hi.
[03:31] >> Yeah, hi. >> How are you?
[03:32] >> How are you? >> Hi Sherry.
[03:33] >> Hi Sherry. Yeah, good. How are you?
[03:34] Yeah, good. How are you? >> All good. All good. So, Prashant sir,
[03:36] >> All good. All good. So, Prashant sir, stage is all yours. We can start up with
[03:39] stage is all yours. We can start up with the session now.
[03:44] >> Yeah, thank you, Sherry. Uh good afternoon, everyone. We are here
[03:46] Uh good afternoon, everyone. We are here to discuss on the
[03:48] to discuss on the uh agenda that we we today for
[03:51] uh agenda that we we today for the hackathon that IDBI has just
[03:53] the hackathon that IDBI has just launched. We would welcome warmly all
[03:56] launched. We would welcome warmly all the participants,
[03:57] the participants, the fintech startups, and individual
[04:00] the fintech startups, and individual professionals whoever would be willing
[04:02] professionals whoever would be willing to participate here. And thank you for
[04:04] to participate here. And thank you for registering for this hackathon event
[04:06] registering for this hackathon event today.
[04:07] today. Uh
[04:09] Uh we would go about this session in the
[04:13] we would go about this session in the order wherein we would first like to
[04:15] order wherein we would first like to give you an introduction of our bank.
[04:17] give you an introduction of our bank. Then we'll go to the brief details of
[04:20] Then we'll go to the brief details of this hackathon event.
[04:22] this hackathon event. The details would contain overall agenda
[04:25] The details would contain overall agenda of the hackathon. And then post that we
[04:28] of the hackathon. And then post that we would like to
[04:30] would like to respond to few of the queries which you
[04:32] respond to few of the queries which you might be having.
[04:33] might be having. And not keeping you waiting, we would
[04:36] And not keeping you waiting, we would just go about this orientation session
[04:39] just go about this orientation session so that you can plan accordingly and
[04:41] so that you can plan accordingly and start your work with regards to
[04:43] start your work with regards to preparing solutions for the problem
[04:45] preparing solutions for the problem statements that we have just posted on
[04:48] statements that we have just posted on this hackathon.
[04:49] this hackathon. Yeah, to give you a brief
[04:52] Yeah, to give you a brief about our bank.
[04:54] about our bank. See, our bank IDBI is
[04:58] See, our bank IDBI is one of the leading premier commercial
[05:00] one of the leading premier commercial banks in India. And we are trying to
[05:03] banks in India. And we are trying to consistently push the boundaries on the
[05:05] consistently push the boundaries on the digital front as well, both in the
[05:08] digital front as well, both in the retail and corporate banking side.
[05:11] retail and corporate banking side. Right? And this being a very traditional
[05:14] Right? And this being a very traditional bank since long, and we have been part
[05:17] bank since long, and we have been part of the DFI era of India wherein we had
[05:20] of the DFI era of India wherein we had supported the institution building
[05:23] supported the institution building atmosphere of the country. Now, as part
[05:26] atmosphere of the country. Now, as part of its
[05:28] of its revised uh
[05:30] revised uh uh profile of the bank as a commercial
[05:32] uh profile of the bank as a commercial banking
[05:33] banking segment partner, we are into purely
[05:37] segment partner, we are into purely retail and commercial banking, and we
[05:39] retail and commercial banking, and we are driving the digital initiatives in
[05:42] are driving the digital initiatives in the banking sector as well.
[05:44] the banking sector as well. So, this is a big paradigm shift for the
[05:46] So, this is a big paradigm shift for the banking as well and for us as a bank.
[05:50] banking as well and for us as a bank. And now the goal that we are looking at
[05:52] And now the goal that we are looking at to achieve through this hackathon would
[05:55] to achieve through this hackathon would be to co-create with developers like
[05:58] be to co-create with developers like you, fintechs, and startups
[06:01] you, fintechs, and startups to build some interesting and innovative
[06:03] to build some interesting and innovative products in the banking segment for
[06:06] products in the banking segment for overall banking segment as well and for
[06:08] overall banking segment as well and for IDBI's overall digital development.
[06:12] IDBI's overall digital development. Right, so
[06:14] Right, so going ahead with this agenda, what we
[06:17] going ahead with this agenda, what we thought was as part of the bank's
[06:19] thought was as part of the bank's innovation journey, we had done few of
[06:22] innovation journey, we had done few of the internal exercises where we have
[06:24] the internal exercises where we have collected few of the problem statements
[06:26] collected few of the problem statements which are internal departments and
[06:28] which are internal departments and business teams have been facing. Right,
[06:31] business teams have been facing. Right, and now we have come forward with those
[06:35] and now we have come forward with those problem statements
[06:36] problem statements in front of you
[06:38] in front of you to seek
[06:40] to seek your co-creation abilities and your
[06:42] your co-creation abilities and your skill sets
[06:43] skill sets to build solutions which would be
[06:47] to build solutions which would be feasible to be deployed at a large scale
[06:50] feasible to be deployed at a large scale in the bank and has a scalable
[06:52] in the bank and has a scalable architecture and the productions the
[06:56] architecture and the productions the prototypes should be production ready.
[06:57] prototypes should be production ready. That is what is our motive
[07:00] That is what is our motive to put forward these problem statements.
[07:03] to put forward these problem statements. While we'll be doing it, the technology
[07:06] While we'll be doing it, the technology that we'll be using would be the latest
[07:09] that we'll be using would be the latest in the industry, latest in banking
[07:11] in the industry, latest in banking industry.
[07:12] industry. For that, we would be providing some
[07:15] For that, we would be providing some enablers for you to work and those
[07:18] enablers for you to work and those enablers would be in the form of APIs
[07:20] enablers would be in the form of APIs and our sandbox environment. If at all
[07:24] and our sandbox environment. If at all the solution, the prototype is
[07:26] the solution, the prototype is acceptable in the initial stages, we'll
[07:28] acceptable in the initial stages, we'll go about providing the sandbox
[07:30] go about providing the sandbox environment to test the feasibility of
[07:32] environment to test the feasibility of the solution, right?
[07:34] the solution, right? So, moving ahead, that was the
[07:36] So, moving ahead, that was the background of what we intend to do in
[07:39] background of what we intend to do in this hackathon. Moving ahead, we would
[07:41] this hackathon. Moving ahead, we would just give you a brief of what problem
[07:43] just give you a brief of what problem statements we have showcased in this
[07:45] statements we have showcased in this hackathon for you to
[07:48] hackathon for you to start working on them and help us
[07:51] start working on them and help us co-create and build some suitable
[07:53] co-create and build some suitable solutions for it. The first problem
[07:56] solutions for it. The first problem statement that we have is for creating a
[07:58] statement that we have is for creating a digital wealth management application.
[08:02] digital wealth management application. What we are looking for is a
[08:04] What we are looking for is a comprehensive solution that can be
[08:07] comprehensive solution that can be provided to the customers of our bank,
[08:10] provided to the customers of our bank, our retail and liability customers, or
[08:14] our retail and liability customers, or say the
[08:16] say the liability customers of the bank, wherein
[08:19] liability customers of the bank, wherein we can have an overall 360° view of
[08:22] we can have an overall 360° view of their savings, investments, and all
[08:25] their savings, investments, and all their spending patterns. Using this data
[08:29] their spending patterns. Using this data and using the power of AI, we would like
[08:32] and using the power of AI, we would like to like you to help us in building a
[08:35] to like you to help us in building a solution, avatar-based wealth management
[08:37] solution, avatar-based wealth management app, that would be helpful in providing
[08:41] app, that would be helpful in providing advisory services at bank scale to our
[08:44] advisory services at bank scale to our customers. Right? And if the solution is
[08:48] customers. Right? And if the solution is feasible, I guess the industry adoption
[08:51] feasible, I guess the industry adoption would definitely be there.
[08:53] would definitely be there. So, this is the first problem statement
[08:55] So, this is the first problem statement that we have.
[08:56] that we have. Going ahead and
[08:58] Going ahead and going through the second problem
[09:00] going through the second problem statement, that is something where we
[09:02] statement, that is something where we would like you to help us in building a
[09:05] would like you to help us in building a solution to identify prospective
[09:08] solution to identify prospective customers for us
[09:11] customers for us from our pool of customers. Initially,
[09:14] from our pool of customers. Initially, we would be interested in
[09:17] we would be interested in selecting the customers which are
[09:18] selecting the customers which are already there with us on the liability
[09:20] already there with us on the liability side. We would like to understand what
[09:22] side. We would like to understand what their personal needs would be. Maybe if
[09:25] their personal needs would be. Maybe if someone would be looking out for home
[09:28] someone would be looking out for home loans or auto loan or consumer durable
[09:30] loans or auto loan or consumer durable loans or something like that, wherein we
[09:33] loans or something like that, wherein we can identify the need, we can match it
[09:36] can identify the need, we can match it with our products based on the features
[09:39] with our products based on the features of the products and the requirement
[09:41] of the products and the requirement initial scrutiny requirements of the
[09:42] initial scrutiny requirements of the product. And we would start
[09:46] product. And we would start pitching it to them
[09:48] pitching it to them so that in a manner to attract their
[09:51] so that in a manner to attract their attention and also to serve their
[09:53] attention and also to serve their purpose.
[09:54] purpose. Right.
[09:55] Right. Uh, so this would be initially for our
[09:57] Uh, so this would be initially for our existing customers and then maybe we can
[09:59] existing customers and then maybe we can look for customers who are not there
[10:01] look for customers who are not there with us, but we can look for onboarding
[10:04] with us, but we can look for onboarding them. So, that is the second problem
[10:06] them. So, that is the second problem statement that we have.
[10:08] statement that we have. And the third problem statement that we
[10:11] And the third problem statement that we have is specifically designed
[10:13] have is specifically designed specifically to target our MSME
[10:16] specifically to target our MSME customers.
[10:18] customers. Wherein today what we face is in the
[10:20] Wherein today what we face is in the banking industry there is a huge
[10:23] banking industry there is a huge unserved segment. Unserved and
[10:27] unserved segment. Unserved and underserved segment in the MSME segment,
[10:29] underserved segment in the MSME segment, which is the backbone of Indian economy.
[10:32] which is the backbone of Indian economy. Right. So, using AIML tools and the data
[10:35] Right. So, using AIML tools and the data that is there at our disposable
[10:38] that is there at our disposable disposal, which is
[10:40] disposal, which is freely available or say you do not have
[10:43] freely available or say you do not have to get the consent of the borrowers or
[10:46] to get the consent of the borrowers or the customers prospective borrowers
[10:48] the customers prospective borrowers initially.
[10:49] initially. Like
[10:51] Like the GST details, initial GST details or
[10:54] the GST details, initial GST details or using account aggregator details we can
[10:57] using account aggregator details we can get their
[10:59] get their liability account details from other
[11:01] liability account details from other banks and all.
[11:02] banks and all. Consolidating all these details we can
[11:05] Consolidating all these details we can formulate a solution wherein we can look
[11:08] formulate a solution wherein we can look for
[11:09] for customers needs, customers business
[11:11] customers needs, customers business needs
[11:12] needs which can be met by providing them some
[11:15] which can be met by providing them some kind of business loan.
[11:17] kind of business loan. Right. So, using this tools using these
[11:20] Right. So, using this tools using these tools and our
[11:23] tools and our technical expertise we would want to
[11:25] technical expertise we would want to co-create a product wherein we can
[11:28] co-create a product wherein we can identify the business needs of the MSME
[11:31] identify the business needs of the MSME segment
[11:32] segment which is a large segment and it is
[11:35] which is a large segment and it is mostly underserved and unserved.
[11:38] mostly underserved and unserved. Right. And the fourth problem statement
[11:42] Right. And the fourth problem statement that we have is once we extend the
[11:45] that we have is once we extend the loans, once we extend the credit
[11:47] loans, once we extend the credit facilities, we also want to keep a tab
[11:50] facilities, we also want to keep a tab on the overall utilization of the credit
[11:52] on the overall utilization of the credit facility and also to see whether how
[11:55] facility and also to see whether how well this credit facility is being
[11:58] well this credit facility is being utilized and if there are any inherent
[12:00] utilized and if there are any inherent weaknesses in the overall business.
[12:03] weaknesses in the overall business. So, we would like to identify those
[12:06] So, we would like to identify those weaknesses pretty in advance so that we
[12:09] weaknesses pretty in advance so that we can take corrective measures, we can
[12:11] can take corrective measures, we can advise our customers to improve and
[12:14] advise our customers to improve and wherever there are scope there is scope
[12:16] wherever there are scope there is scope for improvement, we would try to
[12:18] for improvement, we would try to request the customer and improve it or
[12:21] request the customer and improve it or we can start arresting those lackness
[12:24] we can start arresting those lackness wherever it is identifiable.
[12:28] wherever it is identifiable. As of now, bank is already working on
[12:30] As of now, bank is already working on this by utilizing the model that bank
[12:34] this by utilizing the model that bank has initially developed internally by
[12:38] has initially developed internally by the help of our existing
[12:40] the help of our existing vendors and our existing team. But what
[12:43] vendors and our existing team. But what we realized it, we are not getting the
[12:46] we realized it, we are not getting the level of accuracy that we are expecting.
[12:49] level of accuracy that we are expecting. So, we want to improve our accuracy
[12:51] So, we want to improve our accuracy levels and also to see if we can build a
[12:55] levels and also to see if we can build a predictive model which can in advance of
[12:58] predictive model which can in advance of 12 months help us in predicting defaults
[13:02] 12 months help us in predicting defaults in the accounts in mostly in MSME loans
[13:06] in the accounts in mostly in MSME loans as of now.
[13:07] as of now. Slowly and slowly we'll try to see where
[13:09] Slowly and slowly we'll try to see where we can strengthen and how we can refine
[13:13] we can strengthen and how we can refine this offering.
[13:14] this offering. So, this product or this application
[13:17] So, this product or this application what we are looking at is the inputs
[13:20] what we are looking at is the inputs would be in the form of both structured
[13:21] would be in the form of both structured and unstructured data.
[13:24] and unstructured data. So, using these data points you would
[13:26] So, using these data points you would like to
[13:28] like to build a solution around it.
[13:30] build a solution around it. Right.
[13:31] Right. Uh
[13:32] Uh and apart from these problem statements,
[13:35] and apart from these problem statements, the last track that we have, which is
[13:38] the last track that we have, which is the track track five, is of novel
[13:40] the track track five, is of novel innovation. This track we thought
[13:44] innovation. This track we thought it should be open, wherein we can
[13:47] it should be open, wherein we can explore uh
[13:49] explore uh problem statements or we can explore
[13:51] problem statements or we can explore solutions to problem statements
[13:53] solutions to problem statements which we were not able to identify, but
[13:56] which we were not able to identify, but which development developers,
[13:59] which development developers, co-creators, or FinTechs startups like
[14:02] co-creators, or FinTechs startups like you might have already identified and
[14:05] you might have already identified and you might have worked on it. You already
[14:07] you might have worked on it. You already would have some kind of solution with
[14:09] would have some kind of solution with you.
[14:10] you. You can propose, you can submit your
[14:13] You can propose, you can submit your ideas, you have solutions to us. We will
[14:15] ideas, you have solutions to us. We will evaluate, our team internally would
[14:17] evaluate, our team internally would evaluate. The top management in IDBI,
[14:20] evaluate. The top management in IDBI, the senior management would go through
[14:22] the senior management would go through your proposals. We'll see if that is
[14:26] your proposals. We'll see if that is acceptable to our bank.
[14:28] acceptable to our bank. And if so, we can try to see how to
[14:32] And if so, we can try to see how to adopt it if at all it is feasible and
[14:35] adopt it if at all it is feasible and the possibility is there, and then take
[14:37] the possibility is there, and then take it forward and try to see how well we
[14:39] it forward and try to see how well we can utilize it.
[14:41] can utilize it. Right. So, this is an open track wherein
[14:44] Right. So, this is an open track wherein you can provide us some innovative
[14:45] you can provide us some innovative solutions that you might think that
[14:47] solutions that you might think that would be helpful to the bank and the
[14:50] would be helpful to the bank and the banking segment as a whole.
[14:52] banking segment as a whole. Right. So, these are the few problem
[14:54] Right. So, these are the few problem statements and the novel idea track that
[14:57] statements and the novel idea track that we have. In this initiative, we are
[14:59] we have. In this initiative, we are partnered with AWS, that is
[15:03] partnered with AWS, that is Amazon Web Services,
[15:05] Amazon Web Services, which is providing us support on the
[15:08] which is providing us support on the cloud
[15:09] cloud infrastructure, and
[15:12] infrastructure, and they would also be our knowledge partner
[15:14] they would also be our knowledge partner in this whole initiative while providing
[15:17] in this whole initiative while providing guidance on various aspects of the
[15:19] guidance on various aspects of the hackathon.
[15:21] hackathon. And Hack2Skill is our partner in
[15:25] And Hack2Skill is our partner in managing and providing us these kind of
[15:27] managing and providing us these kind of platforms where we interact with you,
[15:30] platforms where we interact with you, where we get in touch with uh
[15:32] where we get in touch with uh co-creators, developers, startups, and
[15:34] co-creators, developers, startups, and fintechs like you. And with their
[15:37] fintechs like you. And with their support, we are trying to build these
[15:39] support, we are trying to build these solutions.
[15:41] solutions. The last partner that we have in this
[15:43] The last partner that we have in this initiative is our technology partner,
[15:46] initiative is our technology partner, which is ACC, Applied Cloud Computing,
[15:48] which is ACC, Applied Cloud Computing, who are providing this uh sandbox
[15:50] who are providing this uh sandbox support to us. And they would be coming
[15:53] support to us. And they would be coming in at the second stage of the evaluation
[15:55] in at the second stage of the evaluation round once uh the idea is initially
[15:58] round once uh the idea is initially scrutinized and found to be uh
[16:01] scrutinized and found to be uh acceptable. Uh the prototype is
[16:04] acceptable. Uh the prototype is acceptable, then while we move to the
[16:06] acceptable, then while we move to the sandboxing stage, ACC would be providing
[16:09] sandboxing stage, ACC would be providing required support to us.
[16:11] required support to us. Right. So, this is about the partners.
[16:14] Right. So, this is about the partners. And now we come to the most exciting
[16:16] And now we come to the most exciting part of this uh hackathon, which you
[16:18] part of this uh hackathon, which you would be most interested in. This is the
[16:20] would be most interested in. This is the prize pool that we have.
[16:23] prize pool that we have. Phew. [cough and clears throat]
[16:25] Phew. [cough and clears throat] It's about 15 lakhs that we have, the
[16:27] It's about 15 lakhs that we have, the overall prize pool.
[16:30] overall prize pool. While we would be providing you the
[16:32] While we would be providing you the sandbox access in the second stage of
[16:34] sandbox access in the second stage of the hackathon.
[16:37] the hackathon. And then we would also like to explore
[16:40] And then we would also like to explore the opportunities of deployment of pilot
[16:44] the opportunities of deployment of pilot just to see the acceptability and the
[16:47] just to see the acceptability and the feasibility of the application going
[16:49] feasibility of the application going forward.
[16:55] Right. So, with this, we would like to also just reiterate uh of course, the
[16:57] also just reiterate uh of course, the details are there on the portal, the
[17:00] details are there on the portal, the microsite that we have hosted for this
[17:02] microsite that we have hosted for this hackathon.
[17:04] hackathon. This is being an orientation session, we
[17:07] This is being an orientation session, we would be providing you the brief. We
[17:08] would be providing you the brief. We have provided you a brief of what we
[17:10] have provided you a brief of what we intend to do, what is the vision of the
[17:13] intend to do, what is the vision of the bank,
[17:14] bank, how we would be going about conducting
[17:16] how we would be going about conducting this hackathon.
[17:17] this hackathon. Uh the second session that we have an
[17:19] Uh the second session that we have an interaction with you would be on June
[17:21] interaction with you would be on June 30th, wherein we would be
[17:24] 30th, wherein we would be specifically taking a deep dive in the
[17:27] specifically taking a deep dive in the problem statement-wise details and
[17:29] problem statement-wise details and discussions.
[17:31] discussions. On July 9th,
[17:32] On July 9th, which is the last date for submission of
[17:36] which is the last date for submission of registration and submission of your
[17:38] registration and submission of your proposals.
[17:39] proposals. So, July 9th would be the next
[17:41] So, July 9th would be the next milestone. And subsequently during July
[17:44] milestone. And subsequently during July and August, we would be carrying out the
[17:46] and August, we would be carrying out the evaluation stages.
[17:48] evaluation stages. So, those details anyways are there on
[17:51] So, those details anyways are there on our microsite. You can visit there. But,
[17:54] our microsite. You can visit there. But, this is just a reiteration and a
[17:57] this is just a reiteration and a reminder to you that please do all your
[18:00] reminder to you that please do all your submissions by July 9th.
[18:02] submissions by July 9th. And please submit the most
[18:06] And please submit the most innovative ideas for us to start
[18:08] innovative ideas for us to start building for these problem statements.
[18:11] building for these problem statements. Start building solutions for these
[18:12] Start building solutions for these problem statements.
[18:14] problem statements. I hope
[18:15] I hope I have provided
[18:17] I have provided a comprehensive idea of the whole
[18:20] a comprehensive idea of the whole hackathon initiative.
[18:25] Yeah, Shailvi, over to you. I guess these are the people
[18:28] these are the people >> Yeah, thank you so much, Prashant sir.
[18:30] >> Yeah, thank you so much, Prashant sir. Thank you for this. Now, I would like to
[18:32] Thank you for this. Now, I would like to share my screen so I can explain the our
[18:35] share my screen so I can explain the our participants that where they can submit
[18:38] participants that where they can submit and everything, okay?
[18:40] and everything, okay? So, I hope my screen is visible.
[18:43] So, I hope my screen is visible. Yes, it is.
[18:45] Yes, it is. So, once you search for IDBI Innovate
[18:48] So, once you search for IDBI Innovate Hackathon, the page looks like this. You
[18:51] Hackathon, the page looks like this. You need to go to the team dashboard.
[18:54] need to go to the team dashboard. Here is our roadmap. So, currently we
[18:56] Here is our roadmap. So, currently we are live with registration, team
[18:58] are live with registration, team formation, prototype submission.
[19:01] formation, prototype submission. So, the these things they are closing on
[19:04] So, the these things they are closing on 9th of July. Now, that we have then a
[19:07] 9th of July. Now, that we have then a dedicated AMA session. So, where the
[19:09] dedicated AMA session. So, where the participants can interact and ask all
[19:12] participants can interact and ask all their queries. It's on 30th June.
[19:15] their queries. It's on 30th June. Shortlisting will be done on 21st June
[19:18] Shortlisting will be done on 21st June uh for 21st July 2026.
[19:21] uh for 21st July 2026. Then there will be a refined prototype
[19:23] Then there will be a refined prototype submissions. So, basically here what you
[19:25] submissions. So, basically here what you need to do is whatever prototype you
[19:27] need to do is whatever prototype you have built and it is shortlisted, then
[19:29] have built and it is shortlisted, then you need to refine it for the for the
[19:32] you need to refine it for the for the finale and everything. So, it will start
[19:34] finale and everything. So, it will start from 22nd July and go till 31st of July.
[19:38] from 22nd July and go till 31st of July. Then the finalist announcement will be
[19:40] Then the finalist announcement will be made on 13th August 2026 and the demo
[19:44] made on 13th August 2026 and the demo day and winner announcement will be on
[19:46] day and winner announcement will be on 21st of August.
[19:48] 21st of August. Now for the
[19:50] Now for the for those who are making a team, so here
[19:53] for those who are making a team, so here the team size is up to maximum up to
[19:55] the team size is up to maximum up to four members. So, what you need to do is
[19:58] four members. So, what you need to do is go to team management, click on create a
[20:00] go to team management, click on create a team, click on I understand. You can
[20:03] team, click on I understand. You can write any unique team name or anything
[20:06] write any unique team name or anything over here. Give a team description like
[20:08] over here. Give a team description like why your in which way your team
[20:12] why your in which way your team is capable or something like that and
[20:15] is capable or something like that and then you can put even a cool logo of
[20:17] then you can put even a cool logo of your team over here. And you just need
[20:19] your team over here. And you just need to click on create.
[20:20] to click on create. After that, you need you can send a
[20:23] After that, you need you can send a request to your fellow colleagues or
[20:25] request to your fellow colleagues or anyone who you want to join their team
[20:28] anyone who you want to join their team and you can even accept their request as
[20:31] and you can even accept their request as well. Now for the submissions, go to the
[20:34] well. Now for the submissions, go to the submission tab. Here it is prototype
[20:37] submission tab. Here it is prototype submission written over here. Click
[20:38] submission written over here. Click here. So, we have given a PPT template.
[20:42] here. So, we have given a PPT template. You need to exactly see you need to
[20:45] You need to exactly see you need to exactly use this template only the
[20:47] exactly use this template only the number of slides which is mentioned over
[20:49] number of slides which is mentioned over here and everything should be same. You
[20:51] here and everything should be same. You cannot change this template.
[20:54] cannot change this template. Then you need to select uh these are the
[20:56] Then you need to select uh these are the problem statement. You need to select
[20:58] problem statement. You need to select any one problem statement on which you
[21:00] any one problem statement on which you are working. Here should be the
[21:01] are working. Here should be the deployment link and the prototype PPT
[21:04] deployment link and the prototype PPT and the GitHub repo link. You have to
[21:06] and the GitHub repo link. You have to paste it over here and click on submit.
[21:09] paste it over here and click on submit. Okay? Now, moving ahead
[21:13] Okay? Now, moving ahead in the interactions tab, if you have
[21:15] in the interactions tab, if you have missed today's session, you can go to
[21:18] missed today's session, you can go to click on watch over here and you can see
[21:20] click on watch over here and you can see the sessions for the recordings. If you
[21:22] the sessions for the recordings. If you need any need to know something about
[21:25] need any need to know something about any particular problem statement, you
[21:26] any particular problem statement, you can watch from this session. Now, in the
[21:29] can watch from this session. Now, in the challenges section, there are five all
[21:31] challenges section, there are five all the problem statement mentioned and a
[21:33] the problem statement mentioned and a brief about each problem statement is
[21:35] brief about each problem statement is also given over here. So, you can even
[21:37] also given over here. So, you can even see it from here. So, I hope all the
[21:41] see it from here. So, I hope all the things are clear to everyone. So, now
[21:45] things are clear to everyone. So, now moving ahead,
[21:46] moving ahead, uh we can go for the Q&A part as well.
[21:56] Okay. So,
[21:58] So, can team members can be from different
[22:01] can team members can be from different companies or cities? Yes, they can be
[22:02] companies or cities? Yes, they can be from uh different companies and cities,
[22:05] from uh different companies and cities, but the team size should be four
[22:07] but the team size should be four members, maximum four members.
[22:15] Question. So, one question is there uh from problem statement two, is this lead
[22:18] from problem statement two, is this lead generation tool meant for existing IDBI
[22:21] generation tool meant for existing IDBI customers only or can it pull in
[22:24] customers only or can it pull in completely new prospects who have never
[22:26] completely new prospects who have never banked with IDBI?
[22:32] >> Yeah, I would like to take it uh Shaili. Uh we would be looking initially at
[22:35] Uh we would be looking initially at uh the lead generation from our existing
[22:38] uh the lead generation from our existing customers right now.
[22:41] customers right now. And
[22:42] And maybe once the uh solution is stabilized
[22:45] maybe once the uh solution is stabilized and refined products are there, we would
[22:48] and refined products are there, we would like to extend it to uh non-IDBI
[22:50] like to extend it to uh non-IDBI customers as well. But, initially it
[22:53] customers as well. But, initially it would be for existing customers of the
[22:54] would be for existing customers of the bank.
[22:56] bank. Uh I don't think there would be much
[22:58] Uh I don't think there would be much change in the solution even if it is for
[23:00] change in the solution even if it is for an ETB or an NTB,
[23:03] an ETB or an NTB, the solution would be the same. But bank
[23:05] the solution would be the same. But bank would be looking at existing customers
[23:07] would be looking at existing customers initially.
[23:09] initially. >> Okay.
[23:11] >> Okay. So, I hope Karthik
[23:12] So, I hope Karthik got your answer.
[23:18] So, next question is, does IDBI already use any AI/ML in its lending currently
[23:21] use any AI/ML in its lending currently or would this be the first major
[23:23] or would this be the first major deployment?
[23:25] deployment? >> Uh
[23:26] >> Uh right. So, IDBI is using AI and ML tools
[23:30] right. So, IDBI is using AI and ML tools in its lending journeys, but not to a
[23:33] in its lending journeys, but not to a great extent. But we would we are in the
[23:36] great extent. But we would we are in the process of scaling it up.
[23:38] process of scaling it up. So, this is one of the initiatives where
[23:40] So, this is one of the initiatives where we would like to build solutions
[23:43] we would like to build solutions and start using it more prolifically.
[23:48] and start using it more prolifically. >> Okay, great.
[23:55] So, for next question, what's IDBI current NTC NTB rejection rate and
[23:58] current NTC NTB rejection rate and what's the {hashtag} one reason for
[24:01] what's the {hashtag} one reason for rejection when it happens?
[24:11] But NTC, what do you mean by NTC? If someone NTB, I understand it's new to
[24:13] someone NTB, I understand it's new to bank customers, right?
[24:16] bank customers, right? So,
[24:17] So, current rejection rate, see, generally
[24:20] current rejection rate, see, generally what we are doing is today most of the
[24:23] what we are doing is today most of the banking in our
[24:25] banking in our retail segment is being done in a
[24:27] retail segment is being done in a traditional manner or same manner.
[24:31] traditional manner or same manner. But the
[24:33] But the online journeys or
[24:35] online journeys or STP journeys which are being built in a
[24:37] STP journeys which are being built in a digital platform are mostly for our
[24:39] digital platform are mostly for our existing customers.
[24:42] existing customers. So, the NTB journey rate of rejection
[24:44] So, the NTB journey rate of rejection and NTC would be in the form of
[24:47] and NTC would be in the form of generally uh
[24:50] generally uh uh the
[24:52] uh the manual form or traditional banking
[24:54] manual form or traditional banking journeys that we are doing. So, it is as
[24:56] journeys that we are doing. So, it is as per the market standards for banking
[24:58] per the market standards for banking industry norms that we are following.
[25:04] Yeah. >> Okay.
[25:06] >> Okay. So, next question is
[25:09] So, next question is if a BFSI professional with 4.5 years
[25:12] if a BFSI professional with 4.5 years professional in wealth management and
[25:15] professional in wealth management and banking, I'm participating solo. Am I
[25:18] banking, I'm participating solo. Am I still eligible for submission of my
[25:20] still eligible for submission of my prototype?
[25:21] prototype? >> Yes, you are. Because yes, you are
[25:23] >> Yes, you are. Because yes, you are eligible.
[25:30] >> You are eligible, Vikas. We would just like to
[25:31] like to evaluate your solution during the
[25:34] evaluate your solution during the initial stage. If found suitable, we'll
[25:36] initial stage. If found suitable, we'll try to take it to the next level as
[25:38] try to take it to the next level as well. But we would also like to
[25:40] well. But we would also like to understand
[25:41] understand how you would provide us a digital
[25:43] how you would provide us a digital solution on this front. So, uh the tech
[25:47] solution on this front. So, uh the tech part would also be evaluated while we
[25:50] part would also be evaluated while we are evaluating your solution.
[25:57] >> Okay. >> Yeah, this question is regarding fresh
[26:00] >> Yeah, this question is regarding fresh graduate students can participate in
[26:02] graduate students can participate in this hackathon. Right now, we are
[26:04] this hackathon. Right now, we are looking at scalable solutions
[26:07] looking at scalable solutions that can be deployed across the bank.
[26:10] that can be deployed across the bank. So,
[26:12] So, and this being a hackathon which we are
[26:15] and this being a hackathon which we are looking for solutions with the fintech
[26:18] looking for solutions with the fintech partners, startups as well, and
[26:20] partners, startups as well, and professionals with some experience and
[26:23] professionals with some experience and expertise in the mentioned domains.
[26:26] expertise in the mentioned domains. So, in case students or graduates who
[26:30] So, in case students or graduates who are there, if they can provide us
[26:32] are there, if they can provide us suitable options or suitable solutions,
[26:35] suitable options or suitable solutions, we'll definitely accept, but
[26:42] solutions or products which would help us solve our problem statements right
[26:44] us solve our problem statements right now.
[26:48] >> Okay. So, next question is at what stage do
[26:51] So, next question is at what stage do most of the MSME applications get
[26:53] most of the MSME applications get rejected?
[26:59] >> See, right now, while we are looking at digital journeys,
[27:01] digital journeys, while we get the information immediately
[27:04] while we get the information immediately and with
[27:06] and with ample amount of data available through
[27:08] ample amount of data available through APIs,
[27:10] APIs, we can run the BREs and
[27:14] we can run the BREs and the BRE
[27:15] the BRE execution doesn't take much time, based
[27:17] execution doesn't take much time, based on which we can come to a conclusion
[27:19] on which we can come to a conclusion whether we can move ahead with this
[27:21] whether we can move ahead with this application or not.
[27:23] application or not. So, it would be at the initial stage
[27:26] So, it would be at the initial stage once the borrower is willing to share
[27:28] once the borrower is willing to share the respective or related data points
[27:31] the respective or related data points with us, we'll be in a position to
[27:33] with us, we'll be in a position to immediately
[27:34] immediately inform whether we are moving ahead or we
[27:37] inform whether we are moving ahead or we need to reject this application. So, it
[27:39] need to reject this application. So, it doesn't take much time. It would be
[27:41] doesn't take much time. It would be initial, but first stage, I guess, in
[27:44] initial, but first stage, I guess, in the application review process.
[27:52] >> Okay. So, the next question is, can a team participate in multiple tracks? No.
[27:55] team participate in multiple tracks? No. You Each team needs to uh
[27:57] You Each team needs to uh >> No,
[27:58] >> No, right. Each team is to submit one
[28:00] right. Each team is to submit one particular problem statement, solution
[28:03] particular problem statement, solution to one particular problem.
[28:06] to one particular problem. >> Yes.
[28:12] How do you currently identify an MSME that is growing rapidly?
[28:19] >> See, identification of an MSME which is growing rapidly, it is purely based on
[28:22] growing rapidly, it is purely based on the traditional methods of going through
[28:24] the traditional methods of going through their balance sheets, their turnover
[28:26] their balance sheets, their turnover which is increasing year on year and
[28:28] which is increasing year on year and all.
[28:29] all. So, I don't know.
[28:31] So, I don't know. And then, we would What we traditionally
[28:34] And then, we would What we traditionally do is we identify a cluster of MSMEs,
[28:37] do is we identify a cluster of MSMEs, start screening those
[28:40] start screening those MSME units which are operating there,
[28:42] MSME units which are operating there, and start studying their balance sheets,
[28:44] and start studying their balance sheets, start going through their banking
[28:46] start going through their banking records.
[28:47] records. This is the traditional process. That is
[28:49] This is the traditional process. That is what we would be deploying in the
[28:51] what we would be deploying in the digital world as well.
[28:57] And you people should help us in identifying them if there are any
[28:59] identifying them if there are any digital tools available and if we can
[29:03] digital tools available and if we can fasten this process.
[29:09] Yeah. >> Yeah.
[29:10] >> Yeah. So, next question is
[29:13] So, next question is if a person is currently a student but
[29:15] if a person is currently a student but also works as a freelancer, so are they
[29:18] also works as a freelancer, so are they eligible to participate under the
[29:20] eligible to participate under the freelancer category?
[29:27] >> Yeah, like I have responded previously in terms of
[29:29] in terms of category where students are willing to
[29:31] category where students are willing to participate, we are actually looking at
[29:33] participate, we are actually looking at scaling up the solutions and taking it
[29:36] scaling up the solutions and taking it to deployment if at all it is acceptable
[29:38] to deployment if at all it is acceptable to the bank.
[29:39] to the bank. So, while we do it, we want a long-term
[29:42] So, while we do it, we want a long-term association with any of the
[29:44] association with any of the participants, right? If at all it is
[29:46] participants, right? If at all it is selected. So, it should help us if there
[29:51] selected. So, it should help us if there are FinTechs and startups which are
[29:54] are FinTechs and startups which are already having some solution which can
[29:56] already having some solution which can be refined to meet our
[29:58] be refined to meet our requirements.
[29:59] requirements. While students can participate, but they
[30:02] While students can participate, but they need to also provide us the digital
[30:04] need to also provide us the digital solutions. They need to
[30:06] solutions. They need to build confidence in the banking
[30:10] build confidence in the banking bank's management that the solution is
[30:12] bank's management that the solution is feasible and it can be scalable. If that
[30:15] feasible and it can be scalable. If that is there, then we can further evaluate
[30:17] is there, then we can further evaluate and look to see how we can take forward
[30:20] and look to see how we can take forward the association.
[30:26] >> Okay. [clears throat] So, next question is is the hackathon
[30:29] So, next question is is the hackathon open only to registered startups and
[30:31] open only to registered startups and FinTech companies or can any independent
[30:35] FinTech companies or can any independent professional also apply?
[30:38] professional also apply? >> Yeah, as of now it is open for
[30:40] >> Yeah, as of now it is open for professionals as well, which is very
[30:43] professionals as well, which is very clearly mentioned.
[30:44] clearly mentioned. >> Yes.
[30:45] >> Yes. >> So, they can apply.
[30:47] >> So, they can apply. It would be evaluated in the same manner
[30:50] It would be evaluated in the same manner that we would be evaluating the solution
[30:52] that we would be evaluating the solution submitted by any other participant in
[30:54] submitted by any other participant in this.
[30:58] >> Okay. So,
[30:59] So, next question is
[31:02] next question is in the first prototype session, do we
[31:04] in the first prototype session, do we have to create the prototype or only the
[31:07] have to create the prototype or only the PPT? Since we would not have the access
[31:10] PPT? Since we would not have the access to synthetic data sets and sandbox APIs
[31:13] to synthetic data sets and sandbox APIs at this stage. So, you need to submit a
[31:15] at this stage. So, you need to submit a working prototype for the for the first
[31:18] working prototype for the for the first stage.
[31:19] stage. Like the deployment link and the GitHub
[31:21] Like the deployment link and the GitHub link, everything with the PPT also.
[31:29] >> Right. >> [clears throat]
[31:30] >> [clears throat] >> So, it's idea only in PPT for the for
[31:34] >> So, it's idea only in PPT for the for the 9th July prototype should be our own
[31:37] the 9th July prototype should be our own data and will be shortlisted based on
[31:40] data and will be shortlisted based on that.
[31:49] >> Uh see, while you are submitting the PPTs
[31:53] see, while you are submitting the PPTs and
[31:54] and brief idea of how the solution should
[31:57] brief idea of how the solution should be,
[31:58] be, I don't think we'll be looking at
[32:00] I don't think we'll be looking at anything with regards to the synthetic
[32:02] anything with regards to the synthetic data point of view, but in case if you
[32:06] data point of view, but in case if you have a ready-made prototype you and if
[32:09] have a ready-made prototype you and if it is feasible for you to submit the
[32:11] it is feasible for you to submit the prototype with some synthetic data, it
[32:13] prototype with some synthetic data, it is welcome.
[32:14] is welcome. But, initially we are looking at the
[32:16] But, initially we are looking at the solution and idea of how the solution
[32:19] solution and idea of how the solution can be built, what tools you would be
[32:21] can be built, what tools you would be using to build it, so that we can also
[32:24] using to build it, so that we can also check the acceptability within the
[32:26] check the acceptability within the banking
[32:28] banking atmosphere, and then the evaluation
[32:30] atmosphere, and then the evaluation would take place.
[32:37] >> Okay. So, next question is what is the minimum size of the team? So, you can
[32:39] minimum size of the team? So, you can participate as a solo member and the
[32:41] participate as a solo member and the maximum team size is four. So, it's one
[32:44] maximum team size is four. So, it's one to four.
[32:52] >> Track four target moving accuracy from 16 to 22% to 90% on an imbalance default
[32:57] 16 to 22% to 90% on an imbalance default portfolio raw accuracy can
[32:59] portfolio raw accuracy can [clears throat] be misleading. Could you
[33:00] [clears throat] be misleading. Could you clarify the intended target metric?
[33:07] >> Uh see, we want to improve the accuracy.
[33:10] see, we want to improve the accuracy. The accuracy levels right now that we
[33:13] The accuracy levels right now that we have is
[33:15] have is very less as per our understanding. We
[33:17] very less as per our understanding. We wanted to improve that and also apart
[33:21] wanted to improve that and also apart from the accuracy levels, we also want
[33:23] from the accuracy levels, we also want to try and build a solution which can
[33:27] to try and build a solution which can predict it well in advance. As of now,
[33:30] predict it well in advance. As of now, what we are working is the data is
[33:33] what we are working is the data is providing us some solution which is
[33:35] providing us some solution which is predicting it maybe 3 months in advance.
[33:39] predicting it maybe 3 months in advance. That is not enough time to start acting
[33:41] That is not enough time to start acting on it and start working out on
[33:44] on it and start working out on rectifying measures, taking the
[33:46] rectifying measures, taking the corrective measures.
[33:47] corrective measures. So, there are two aspects. One to
[33:50] So, there are two aspects. One to improve on the accuracy levels and to
[33:52] improve on the accuracy levels and to also improve on the time in advance, how
[33:55] also improve on the time in advance, how much time can we
[33:58] much time can we start predicting the defaults.
[34:02] start predicting the defaults. So, considering that, you can select
[34:04] So, considering that, you can select whichever target metrics you want to
[34:06] whichever target metrics you want to follow and you can build the solution to
[34:09] follow and you can build the solution to suit our results and requirement.
[34:14] >> Okay. So, next question is will IDBI be
[34:16] So, next question is will IDBI be providing the external data for
[34:18] providing the external data for financial health scorecard track?
[34:26] >> The external data points or the internal data points, it would all be mock data
[34:29] data points, it would all be mock data that would be providing
[34:30] that would be providing And that would be the data sets which
[34:34] And that would be the data sets which would be made available during the
[34:36] would be made available during the sandboxing stage.
[34:39] sandboxing stage. So, it all depends on what kind of data
[34:41] So, it all depends on what kind of data points we require, and then we'll see
[34:44] points we require, and then we'll see how we can generate the synthetic data.
[34:47] how we can generate the synthetic data. Yes, of course the external data points
[34:49] Yes, of course the external data points whichever are relevant for the solution
[34:52] whichever are relevant for the solution to be developed, we'll try and make it
[34:54] to be developed, we'll try and make it available.
[34:58] >> Okay. So, next question is, what exactly
[35:02] So, next question is, what exactly qualifies as a noble idea? Does it need
[35:05] qualifies as a noble idea? Does it need to be completely unrelated to all four
[35:08] to be completely unrelated to all four defined problem statements?
[35:11] defined problem statements? >> Yes, it should be unrelated to the four
[35:14] >> Yes, it should be unrelated to the four problem statements, and it can be
[35:16] problem statements, and it can be related to any of the segments in the
[35:18] related to any of the segments in the banking industry.
[35:20] banking industry. And yeah, it shouldn't be related to any
[35:24] And yeah, it shouldn't be related to any of the problem statements.
[35:34] Next question is, how does IDBI's current MSME
[35:36] current MSME MSME loan approval timeline compared to
[35:38] MSME loan approval timeline compared to NBFC competitors like FlexiLoans or
[35:43] NBFC competitors like FlexiLoans or Lendingkart?
[35:45] Lendingkart? >> See, the target segment that is being
[35:48] >> See, the target segment that is being targeted by NBFCs and banks are
[35:50] targeted by NBFCs and banks are completely different. So, I guess there
[35:54] completely different. So, I guess there shouldn't be any comparison on that part
[35:57] shouldn't be any comparison on that part as well. But right now, what we are
[35:59] as well. But right now, what we are doing is we are trying to build digital
[36:01] doing is we are trying to build digital solutions to improve upon that TAT
[36:05] solutions to improve upon that TAT that is there, and try to achieve the
[36:07] that is there, and try to achieve the TAT which is there in the market.
[36:10] TAT which is there in the market. So, of course the difference is there,
[36:12] So, of course the difference is there, but the gap is closing.
[36:21] >> So, do we need a working prototype or MVP at the time of registration?
[36:28] >> Yes. We would need that.
[36:36] >> What kind of synthetic data is available? Transactions, UPI patterns,
[36:38] available? Transactions, UPI patterns, MSME financials.
[36:51] Yes, synthetic data would be whatever is absolutely essential for the solution to
[36:54] absolutely essential for the solution to be built. We'll try to provide that.
[36:57] be built. We'll try to provide that. So, once the solutions are shortlisted
[37:00] So, once the solutions are shortlisted in the first evaluation stage, we'll
[37:03] in the first evaluation stage, we'll have a detailed
[37:06] have a detailed understanding of what kind of data sets
[37:08] understanding of what kind of data sets we required for these solutions to be
[37:10] we required for these solutions to be built and accordingly we'll start
[37:13] built and accordingly we'll start working on that.
[37:20] >> So, to connect customers for loans, how much of it's
[37:22] much of it's automated? Do you manually call via call
[37:25] automated? Do you manually call via call center? If yes, what percentage?
[37:35] >> For loans, how much of it is automated? Yes, see, [snorts] traditional methods
[37:37] Yes, see, [snorts] traditional methods follow all the
[37:39] follow all the processes. It is manually we generally
[37:42] processes. It is manually we generally call the customers and we
[37:45] call the customers and we automate it a bit. So, we are looking at
[37:49] automate it a bit. So, we are looking at improving the processes that are there.
[37:52] improving the processes that are there. Right? And
[37:54] Right? And >> [clears throat]
[37:54] >> [clears throat] >> I would like to add that any problem
[37:57] >> I would like to add that any problem statement specific
[37:59] statement specific discussions or clarifications, we would
[38:01] discussions or clarifications, we would again be holding a session on 30th.
[38:04] again be holding a session on 30th. Maybe we can have a discussion during
[38:05] Maybe we can have a discussion during that time as well.
[38:07] that time as well. So, in case if there are any other
[38:10] So, in case if there are any other queries related to the process that is
[38:12] queries related to the process that is there in the hackathon that we need to
[38:14] there in the hackathon that we need to follow, maybe we can focus on that.
[38:17] follow, maybe we can focus on that. Or else also we are open. Maybe you can
[38:20] Or else also we are open. Maybe you can send your queries to Hack to Skill and
[38:23] send your queries to Hack to Skill and we'll try to respond to that.
[38:26] we'll try to respond to that. >> Okay. So, if you have any other queries
[38:29] >> Okay. So, if you have any other queries or any doubts, you can reach out to us
[38:33] or any doubts, you can reach out to us at support@hacktoskill.com.
[38:42] Thank you so much Prashant sir for this session.
[38:44] session. Thank you so much for the
[38:45] Thank you so much for the Yes, the session was very interactive
[38:47] Yes, the session was very interactive and thank you so much everyone for
[38:48] and thank you so much everyone for joining this session.
[38:50] joining this session. See you soon.
[38:53] See you soon. >> Thank you participants.
[38:55] >> Thank you participants. You would like to go through the
[38:56] You would like to go through the solutions you would be submitting.
[38:59] solutions you would be submitting. Thank you hacktoskill team.
[39:02] Thank you hacktoskill team. >> Thank you. Keep building guys.
```

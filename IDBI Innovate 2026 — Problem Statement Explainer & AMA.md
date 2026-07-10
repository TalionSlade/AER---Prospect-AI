# IDBI Innovate 2026 — Problem Statement Explainer & AMA

**Source:** [YouTube](https://www.youtube.com/watch?v=sDGX-QvMyQo)
**Duration:** 47:04 (2824.1s)
**Detail:** transcript-only (Whisper via Groq, since native captions had no speech content)

---

## Summary

A 47-minute official problem statement explainer and live Q&A for **IDBI Bank's "Innovate 2026" hackathon**, hosted by Shehvi. The bank presents five tracks, then opens the floor to questions from participants.

### The Five Problem Statements

**Track 1 — Digital Wealth Management** (Harikishan Jay Kumar, GM)
- Build an AI-based wealth advisory integrated with IDBI's mobile app
- Hybrid model: AI handles vanilla products (direct advice + transactions); regulated products (market-linked, etc.) generate leads passed to relationship managers
- **Multilingual support** required (pan-India branch network)
- Should consider customer behavior: spending pattern, investment pattern, goals, long-term/short-term, current exposure

**Track 2 — Prospect Assist AI** (Saikumar / Nagasai + Abu Saral)
- Loan lead-scoring using transaction/sandbox data
- Two goals: identify *repayment capacity* (behavioral analysis of bank statement — needs vs. wants, savings discipline, salary-day spending) and *genuine interest* (filter window-shoppers from real prospects)
- Current lead conversion is ~1% or less — they want quality leads, not volume
- Cross-account analysis and credit bureau data are fair game

**Track 3 — Financial Health Score** (Rithu Raj Singh Rathore, DGM)
- For new-to-bank / new-to-credit customers, esp. SMEs
- Use non-traditional data: electricity/water consumption, EPFO contributions, digital presence, power consumption — beyond just balance sheets
- Categorize as disciplined vs. non-disciplined, NTB/NTC

**Track 4 — Default Prediction Model** (Salil Batsi, DGM)
- Predict loan default **12 months in advance** with ≥90% accuracy
- Combine borrower behavior, internal bank data, and public domain data
- Output should be **bucketized / RAG color-coded** (high/medium/low risk) for loan officers
- AI gives reasons/logic; **human underwriter keeps final decision**

**Track 5 — Open Innovation Track** (Prashant Kumar, GM Digital Banking)
- Open for any banking pain point *not* covered above
- Examples called out: back-office reconciliation, KYC struggles
- May be regulatory in nature or operational efficiency

### Prizes
- **Total pool: ₹15 lakhs**
- Winner: ₹2 lakh per track; Runner-up: ₹1 lakh per track
- Exclusive sandbox access and enterprise-scale pilot deployment

### Notable Q&A Highlights

- **Sandbox & APIs**: Internal IDBI APIs + synthetic data provided; teams can use their own APIs too. Sandbox runs on **AWS**.
- **Tech stack**: No hard requirement; AWS preferred inside sandbox, but GCP tools can be used if API calls work. Must respect RBI/SEBI/DPDP/Aadhar/kyc/MNRL guidelines.
- **Track 1 — Avatar**: Not required to be a hyper-realistic 3D avatar; **text-based conversational interface is fine** (mixed is preferred).
- **Track 2 — Income estimation for gig workers**: Use business turnover, UPI flows, retained vs. spent money, industry-margin awareness.
- **Track 3 — Thin data for new-to-credit**: Augment with electricity/water/fuel/EPFO/other digital footprint signals.
- **Track 4 — 90% accuracy on imbalanced data**: Bank insists on **>90%** (caller notes raw accuracy is misleading on imbalanced sets — bank is firm on the threshold).
- **Unified score vs. per-segment**: Hybrid — single comparable output, but with separate dimensions (vintage, location, experience, age, qualification).
- **AI coding tools (Claude Code, Cursor, etc.)**: Allowed, provided outputs respect RBI AI norms, don't copy prior code, and have no copyright issues.
- **IDBI's own LLM use**: Currently in **UAT/testing only**, not production.
- **Recommendation granularity (Track 1)**: Asset-class level is fine (e.g., "equity mutual funds") — not specific scheme names.
- **SMS-data-only MVP for Track 3**: Not sufficient alone — needs cross-validation; SMS data may have wrong-number issues.

### Closing
Contact: `support@theqthskill.com` (Whisper's audio transcription garbled the email; verify on the official hackathon page before sending). Mentors wish participants good luck.

---

## Full Transcript

```
[00:00] Thank you.
[00:30] Thank you.
[01:00] Thank you.
[01:30] Hello, hi everyone. Hope you all are doing well. So welcome to the official problem statement
[01:41] explainer and AMA session for IDBI Innovate 2026. So my name is Shehvi and I will be your
[01:48] host for the day. So we are incredibly excited to have so many talented developers, fintech
[01:54] enthusiasts and innovators joining us today from across the country. So before we unpack the
[02:00] technical details, let's look at the bigger picture. So basically, IDBI Innovate 2026 isn't
[02:07] just a competition, it's a launchpad designed to bring external brilliance into institutional
[02:13] banking structure. Whether you are a solo developer or an established fintech startup,
[02:18] Your mission here is to challenge conventional engineering.
[02:23] Quick bit of housekeeping.
[02:26] We have a dedicated time at the end for a live Q&A.
[02:29] So as we go through the slides, please drop your questions directly into the live chat framework.
[02:34] And then we will pick it up at the end.
[02:36] So moving ahead, in today's problem statement explainer session,
[02:41] we will be describing and explaining about all the five problem statements,
[02:45] which are digital wealth management prospect assist ai financial health score default
[02:50] prediction model and open track now for the first problem statement which is track one digital wealth
[02:57] management i would like to welcome harikation jay kumar who is a general manager at idpi hi sir
[03:08] hello hi hi how are you great how are you yeah
[03:15] So you can start with this issue.
[03:23] Basically, I think the problem statement is already explained.
[03:25] You want me to explain the problem statement too?
[03:34] Actually, we are looking for a digital wealth management solution.
[03:39] Basically, at present, in the wealth management,
[03:43] as you know that there are multiple products are there and we as a bank we are using different
[03:49] systems and either manual as well as and few are automated but that they are that as a retail bank
[03:56] you know we have a huge set of customers are there for servicing their need you know we need a modern
[04:01] technology that is the reason you know because the different segmentation of customers are there
[04:08] Usually there is a mass customer is there as well as H&A customers and NRA customers,
[04:14] various customer categories are there.
[04:16] For giving a better wealth advisory, we are looking for an AI-based digital wealth management solution.
[04:26] It should integrate with the bank's mobile application as a first phase.
[04:30] And there are multiple things that we are looking for the first phases mobile application.
[04:34] That is also we are looking for a hybrid model and first will be at the AI-based in addition to this, it should be a lead generator.
[04:44] And depends on the complexity of the case, the lead can be passed to our seasoned relationship manager because few tasks are complex in nature.
[04:54] And you know, it should be a scaled wealth advisory services, through that various digital
[05:02] initiative should provide to our customer.
[05:04] That is our basic idea.
[05:07] And in this, we have a couple of needs is that, you know that the bank got a branch
[05:13] network in pan India, and you know, the people are all practicing different multi languages
[05:19] people have practiced.
[05:20] So whatever be the system we are providing to the field, it should support the multi-language,
[05:27] that is more important.
[05:28] And there are basic products are available and there are few well product which is regulated
[05:36] by the regulators.
[05:39] So the Vanilla products simply we can give an AI-based solution based on their suitability
[05:45] whatever be the data and the customer behavior spending pattern and you know the the and the
[05:51] in and i mean investment pattern like that you can take a call accordingly and wherever the suitability
[05:56] is required and you know the suitability will be arrived based on the gold based what is their
[06:02] requirement and what is their long-term goal short-term goal and how much amount they can spare
[06:07] and talk you know then how much at present they are doing through our bank our institution
[06:13] institution as well as through other institution that details it is now very well it is available
[06:18] with that you can arrive at suitability you can arrive a suitability matrix and now based on that
[06:24] suitability matrix you can suggest that that product where the regulatory interference is
[06:30] there in that case we will we will we will be getting an assistance through our specialized
[06:34] relationship managers and the second aspect of the second product will be market linked products are
[06:41] there market is as you know that it is very dynamic in nature then it and so our customer
[06:47] need a frequent updates where they are they fall the market ups and downs and falls and what is
[06:54] what is an informative decision now for that necessary information other things you have to
[06:58] provide but these are what the basic look out we are looking at this digital wealth management
[07:03] software okay anything any clarification or anything it is required you are free to
[07:11] Thank you, Harikashan sir. So the questions will be taken at the end only. So moving for the next problem statement, we have for track two, we have CSI Gopal, who is the product manager at IDBI and the track two is Prospect Assist AI.
[07:26] I'm Saikumar here. The problem vision statement what we are looking from this assistant is
[07:38] we want to like there are so many customers who tries to take a loan actually this will
[07:44] be related to particularly loan structures actually where they want to take a loan but
[07:49] at the time of their everybody wants a loan but how to assess whether he is capable of
[07:56] loan or whether his repayment capacity is there or not so we want to identify there is a person
[08:02] who is interested with has to be linked to his repayment capacity so we want to try to understand
[08:07] whether the customer is first interested or not second whether he is having the repayment capacity
[08:13] or not generally when we look at people now so with let's assume uh there will be some behavioral
[08:19] documents which will be available like bank statements in particular from the bank statements
[08:23] if we are able to understand what is his real uh repayment capacity because let's let's say
[08:30] when there is a salaried person or there is a businessman generally people might not keep the
[08:34] money in their accounts so this they get money they spend money they invest money this uh they
[08:40] save they repay there are so many things which are linked to his income so out of this what he can
[08:46] contribute towards my uh like his requirement to assess how much he can actually pay my i might
[08:54] need a loan of one crore but whether i will be able to afford that obligation to my existing
[09:00] income levels that is what we are looking at second uh repayment capacity and then whether
[09:05] actually he is interested in the product so that our conversion ratios will be high because there
[09:11] are so many people who do just a window shopping try to come and check what uh whether i am
[09:17] eligible or not like we check our health records whether i'm fit and fine so we doesn't want that
[09:24] kind of customer we want a customer who is actually interested in it and he is having
[09:29] the repayment capacity in this or not with me mr nagasan sir and abu saral also there they will
[09:35] also put their views for your value addition sir
[09:45] see i mean uh uh good afternoon uh what we are looking at is we will be exposing the uh
[09:53] solution to our transaction database or the sandbox database which will be based on uh
[09:59] perusing those transactions we should be in a position to identify the capabilities of the
[10:05] person who is in who is trying to take a loan whether his patron would result into any kind
[10:11] of delinquencies in future based on the kind of spending that he is into whether those spendings
[10:19] would we can understand the behavioral pattern of the customer based on the transactions
[10:26] so identify a customer base his repayment intentions basically if all we look at
[10:34] traditional methods will be there would be a factor on their income which he would be
[10:41] apportioning for repayment we we are not interested in looking at only the traditional
[10:47] method of uh foyer calculations and all we should be able to identify his behavioral pattern based
[10:54] on his spending pattern whether he is using current earnings towards savings or disciplined
[11:00] way of spending whether say for example for customers there could be somebody whose account
[11:07] is credited the salary is credited immediately on the day when he spends entire amount so
[11:14] based on certain parameters which we will you can identify and suggest
[11:22] suitable customers who would be ensuring proper repayment instead of having a delinquency level
[11:29] in the future and also on those customers who are visiting the website visiting our sites we should
[11:37] be able to identify the real interested customers whether it is window shopping kind based on the time that they spent or something like that we should be able to identify a pattern to identify seriously interested customers so that
[11:54] quality leads are passed on to our back-end staff would further close the leads as on date we have
[12:01] a lead conversion of about one percent or less than that so we have a huge number of sundry leads
[12:07] that get generated.
[12:10] And it so happens that our people
[12:12] would not be reaching the ideal customer
[12:14] before that only it ends up.
[12:16] So if at all the leads are categorized
[12:19] into serious leads,
[12:21] interested leads, quality leads,
[12:22] based on the potential,
[12:23] based on the reprimand intentions of the customer.
[12:26] So the target segment would be reached
[12:28] only to that extent
[12:30] and our human manpower also would not be wasted.
[12:32] So, thank you so much. Any questions please? Yeah. Yeah. So for next track, which is financial
[12:46] health score, we have Mr. Rithu Raj Singh Rathore who is a deputy general manager at
[12:52] IDBI Bank. So yes, you can go ahead with this track.
[12:59] the industrial development bank or id now idj bank is the leading bank for the economic development
[13:07] and the financing of the industry presently we are working in the traditional method
[13:17] the score financial health score what we are searching for is that when a new to bank or new
[13:23] to credit customer comes to us we should be able to understand its needs not only by the traditional
[13:30] documents of balance sheet and this thing but that their other presence also like their electricity
[13:36] consumption if it is a manufacturing unit their epfo contributions their other side methods which
[13:44] are not directly available to us but they are available in the digital environment digital
[13:50] platform their digital presence and their other supplementary uses of the power consumption data
[14:00] that we want to use for generating good leads and getting the customer categorized in the
[14:07] discipline non-discipline uh no to go or yes go type of customer that so you can we can take a
[14:14] quick and easy result with the most reliable methods that is what we want
[14:20] looking for and we will be looking for your solutions for this problem thank
[14:24] you
[14:28] thank you mr. Dutturad Singh now moving ahead for track 4 which is default
[14:34] prediction model we have Salil Batsi who is the deputy general manager at IDBI
[14:40] bank good afternoon everyone here we are looking for a default prediction model this is for the
[14:50] customers basically loan accounts which are running in the bank for them we want to predict
[14:57] the default in advance like 12 months with the highest accuracy which should be around 90 percent
[15:04] which will help bank to contain the stress pre-hand. So, this is our basic requirement.
[15:12] However, this prediction model should encompass borrower behavior, internal system,
[15:19] internal database what we are holding in the bank, the data which is available in the public domain.
[15:26] These all should form part of the prediction model. Thank you very much.
[15:34] Thank you, sir. So now for the next track, which is Noble Innovation, which is open for
[15:41] all. Now I would like to invite Prashant Kumar, sir, who is the Liberty General Manager, Digital
[15:47] Banking Department, IDBI Bank. Hi, sir.
[15:51] Hi, good afternoon. This is Prashant. I will be explaining about the open track that we
[16:00] have introduced in our hackathon uh this year's hackathon the open track has been introduced
[16:06] wherein bank would expect innovators and collaborators or developers to work on some
[16:14] pain points which banking banking is facing or our banks are facing right now and they can provide us
[16:22] solutions to meet these issues and we can address those problem statements which may be regulatory
[16:29] in nature, which has immediately come up due to some of the other regulatory requirements
[16:35] or advisories, or they may be in the form of an innovative solution for operational
[16:41] issues, which have been faced by the bankers on an ongoing basis.
[16:46] Right.
[16:47] Those innovations should address the effectiveness and improve the efficiency of the overall
[16:55] process and procedures within the banking atmosphere.
[16:58] So this is something which we are keeping it open and this should be apart from the
[17:04] problem statements that we have already explained and my colleagues here have explained.
[17:08] We should not fall under any of these four categories, but it should be a separate point
[17:15] which you may suggest us and we will evaluate accordingly.
[17:19] We'll take support of our subject matter experts on those particular issues and then evaluate
[17:25] accordingly and come back to you.
[17:27] in thought listed we will consider it as one of the innovative solutions which might emanate
[17:32] from this hackathon yeah thank you uh shivy you can take it forward sure thank you sir
[17:41] so moving ahead now the perks prices and the scale so the total cash price pool for this
[17:47] particular hackathon is 15 lakhs winner will get 2 lakhs for per track and runner up will
[17:52] get rupees one lakh per track then there is exclusive sandbox access and enterprise scale
[17:58] where you will explore deployment of pilots with idbf bank now we have am now let's begin with our
[18:05] ama session that is ask me anything so guys do drop your queries in the chat box and we have
[18:10] our mentors with us who will be asking who will be taking your doubts and us answering your queries
[18:22] so the first question is just curious wanted to understand what i team idba is trying to
[18:46] achieve through this hackathon what is the end goal no doubt it's an amazing initiative by the
[18:52] bank and the team like to take this we are trying to look out for solutions for
[19:01] the problem shipments which are there and which we have gathered during an
[19:06] internal equity that was run within the bank wherein problem statements were
[19:11] collected from the business teams right and these are such problem statements
[19:16] which can be solved and where the solution can be built using digital channels and digital tools
[19:23] so this activity is for generating some solutions some innovative solutions to meet the
[19:33] meet the goal of building digital solutions
[19:38] okay thank you so much sir yes the next question is uh let's check
[19:46] Will we provide it with sandbox access to any account aggregator APIs or should we rely entirely on our synthetic data sets for track 3?
[19:58] The sandbox access that we will be providing that would have our internal APIs which will be provided and the synthetic data sets that we will be providing.
[20:10] And in case the solution that the innovators or developers might bring in, if they have
[20:17] their own APIs, maybe they can work on that.
[20:20] In case the APIs are not there with us, they can utilize their own APIs.
[20:24] Otherwise we'll be providing the APIs, the synthetic data sets and the dummy response
[20:31] and request sets as well for those particular APIs.
[20:36] But that would be purely dependent on the use case that they are providing and the solution
[20:40] that they are providing.
[20:42] So that can be discussed once we go through the problem statements.
[20:47] Okay, now, next question is any preferred tech stack considering it should integrate
[20:56] with current applications, complements of SEBI, RBI or DPDP.
[21:06] the text tag it would be uh purely dependent on the regulatory guidelines it should not go beyond
[21:13] that and basically we will be looking at all the tech stack that currently is being used in the
[21:21] banking domain basically this kyc aadhar and if at all the recent guidelines which are there on the
[21:31] mnrl related to telecom service providers those kind of digital tools if there are
[21:40] available we can use that and while we are working on the sandbox that is there on aws cloud so aws
[21:48] cloud related tools and solutions services will be utilized that is what is banks expected
[21:55] okay thank you sir so hope this answer was clear now next question is mgcp gemini ai experienced
[22:07] since sandbox is aws based can i continue using gcp tools bigquery plus local studio for my solution
[22:14] if at all the services are available and can we if we can make api calls to gcp then it can be
[22:27] used otherwise we will be relying mostly on aws services only in the sandbox environment
[22:33] okay now we'll be taking track wise questions so for track one we'll take first from track one
[22:47] when you specify an avatar based application are you expecting a fully voice enabled hyper
[22:52] realistic 3d avatar emotionally intelligent text 2d conversional interface sufficient
[22:58] yeah and no we are we are expecting as a mix only because you know the voice as well as you know
[23:13] the text base is also work and one second also okay now it is not fully voice it will be a mix
[23:22] only text base also it is your cake okay so now our next question is for track the next question will be from track two
[23:41] let's see what's the next question
[23:50] how should the air handle the regulatory line between general financial education
[23:55] nudges and direct investment advice which is strictly regulated by bodies like semi for
[24:01] detailed mass mass market custom okay okay let me ask this query because you know then as far as a
[24:10] bank is concerned we are handling with various products it will be regulated by sebi as well as
[24:16] irda but the insurance is one of the business segment we are handling and another is the mutual
[24:22] funds and the third one will be the pension related national pension scheme and and fourth
[24:28] will be rba bonds and other things these are the main segment of business we are handling it there
[24:33] are in that you know there are two businesses a couple of businesses regulated for doing that
[24:39] businesses you need a special specialized certifications and other things it is required
[24:43] and there are there are a few vanilla businesses there that that you know without without
[24:48] certifications the regulators are permitting that and during wherever the and i mean the
[24:54] certification is not required there you know that there the a can give an advice
[25:02] after doing the suitability and need analysis say i can give an advice and directly it can be
[25:08] converted as a transaction wherever the regulation is not there wherever the expert advice is
[25:13] required in that case i know uh the uh the your tool will be using as a lead generator
[25:19] and based on the the profile and other various parameters and you know that you will be arriving
[25:25] a suitability and they will be suggesting the product then it will be that that lead will be
[25:30] generating to the experienced uh that is a hybrid model uh our our relationship manager will be
[25:37] handling that that's what we are that's what we are telling you the hybrid solution we are looking
[25:42] into that okay the chocolate conservative
[25:48] okay as far as one more career you are one more one more career you are asking for the financial
[25:52] education until uh i mean financial literacy that that that is that is also because you know now
[25:59] government of india is coming with various initiatives at the for you know the the middle
[26:05] middle and low income group at there we are servicing one way or another way so financial
[26:11] literacy creation is on part of our the same so we we want you know the wherever the the general mass
[26:18] customers are there for them i know we we will make it two eternal whenever based on their
[26:24] balance and you know their goals and that data we are collecting it and with the gold we'll give
[26:30] some suggestions and if they are accepting that suggestion they can go they can go to the next
[26:34] level that part only we are taking ahead as a part of financial literacy
[26:40] okay thank you sir so next question we'll be taking it's from track one beyond standard
[26:46] transaction history credits or debits what specific behavioral insights does the bank
[26:52] currently capture are we looking at an app clickstream data browsing pattern or geolocation
[27:04] um uh the strength normally in the bank account nowadays we will be able to access all kind of
[27:13] transactions like it is not only income but also his expenses other kind of incomes everything
[27:20] but what we are looking at is like from the expenses and whatever he what he is doing
[27:27] how much like he can contribute towards the loan and from from his behavior location and all we
[27:35] would like to understand whether he is interested or just he is browsing as a time pass like he
[27:41] wanted to know like gathering some knowledge or information like that we are aware based on the
[27:48] transaction i mean whatever we we are not sure whether entire information would be captured in the
[27:54] transactions but whatever transaction that has information captured based on that an assessment
[28:00] can be made whether it is whether the spending pattern is in line with a genuine customer or a
[28:06] customer whose financial discipline would be very doubtful we will not be it depends on the
[28:15] origination of the transaction so there could be transactions where these these patterns would
[28:20] have been noticed so through that a suggestive mechanism can be uh generated even we'll have
[28:28] like let's assume my customer is having uh like a person is having more than one accounts like
[28:33] that can also be crossed because we will have definitely access like your credit bureau data
[28:39] credit details and all so we can say saying that he need to upload another bank statement
[28:44] so multiple bank accounts also can can be analyzed to understand his entire like income expenses
[28:51] everything thank you sir now we'll take up next question now from track two we'll be taking the
[29:05] questions which is first is when you mention behavioral insights what kind of data do we
[29:10] actually have to play with are we looking at how they click around in the app or is it mostly just
[29:16] looking deeper it will be a very deeper analysis of his uh behavior not only the like digital uh
[29:27] like access what he is doing but also the transactions what is having in the account
[29:33] Lot of insights can be taken from the transactions which he do in terms of his behavior,
[29:40] where he is spending the money, how he is spending the money, how much is left in his account,
[29:46] what is the geographical location where he is doing, all those things can be captured.
[29:51] It is visible in fact in the transactions only.
[29:53] In the current scenario, every transaction is happening through your wallets and your bank
[29:59] accounts that hardly we can see people carrying their like hard cash or money like everybody is
[30:05] using dependent on their mobile through epi and everything and every footprint is now present in
[30:10] bank transaction whether what he eats where he eats what he does everything is available so there
[30:15] will be a lot of behavioral insight will be available from the bank statement and the credit
[30:20] reports what we get from the credit agencies and geographical location also plays a very vital role
[30:26] to understand from which background what background he comes out all these things
[30:34] okay thank you so much sir now the next question will be taking is estimating
[30:41] income is straightforward for salary folks but how would you like us to
[30:45] handle gig workers or self-employed customers whose cash flows are all over
[30:51] the place from month to month see uh the transactions now what we are looking at for
[30:59] solid uh employees no we are saying sell it we know what is their salary that is very clear
[31:05] but other professionals also they have what is the amount retained what is the amount transferred to
[31:10] the savings right wait what comes in and what goes out like now let's say i'm a we are analyzing a
[31:16] current account or a savings account now what i am sending it to for my investment that is my
[31:21] retained money that is my that might be my actual uh retained income other than that there might be
[31:27] some expenses what is the necessary need and uh want and what is need what is compulsory want
[31:34] some something might be in luxury so these paints might be segregated to understand what he can pay
[31:40] what he need to spend what he can skip on that basis the analysis has to be carried out
[31:45] Right. To just add to what Sai Sir has mentioned, we would like you to come up with some kind of
[31:53] innovative ideas to check where and all they are spending and what kind of income they are
[32:00] generating and what is the disposable income that is left with them during the month. Right. So that
[32:07] is what we are actually looking at. While we can give what Sai Sir has given, it is just a guide.
[32:13] numbers yeah it is just an example a kind of pointers that we can give but we would like you
[32:18] to work on and suggest some innovative solutions around it so based on the business the customer
[32:24] is in you would have industry margins i mean that can be called out and based on the turnover that
[32:30] you would reflect based on the business transactions which are generated through upa and
[32:35] all we should be in a position to identify his grass margins accordingly we can assess
[32:43] Basically, you know, to arriving the behavior pattern is that is what we are expecting from your end.
[32:49] Actually, it may be taking the investment or taking the credit decision.
[32:53] The important thing is that we should know the behavior pattern of the customer.
[32:56] That is what this much of the data is thrown to you.
[33:00] From that, you have to come with a different model.
[33:02] That model will help us to do our business.
[33:08] OK, thank you for this answer.
[33:10] now moving ahead now the next question is for the completely new new to credit business alternate
[33:20] data like GST or UPI might be pretty thin what's the best way for the model to handle these blank
[33:26] state applicants without auto rejecting them and this is from track 3 a person is new to credit
[33:37] It means you are right.
[33:40] GST and UPI might be participating.
[33:42] Very good.
[33:43] But the purchase sale and other things will also be need to know.
[33:47] There are various other aspects which is not available on the paper, but are available in the system.
[33:54] So that's what we are telling.
[33:55] We have to check these things also.
[34:01] Like what Ritraj sir had initially mentioned.
[34:05] it can be the electricity building of that manufacturing unit or water consumption
[34:12] all the fuel costs that they are incurring towards running their businesses if they are into trading
[34:18] and all if they are into supplying or logistics kind of unit so you can think of any kind of
[34:27] additional sources of information or data through which this can be considered the business turnover
[34:34] can be built for a particular entity.
[34:38] Yes, we will move to the next.
[34:45] Okay, we'll be moving to the next question.
[34:49] AI test and underwriter will definitely ask why how detailed does the explanation trust
[35:03] tool and this is from prior three.
[35:08] I have told we are not going to replace our underwriters The credit decision will lie with underwriter only The AI will give us the reason and logic that resting that will be take care human intervention is not we are
[35:26] going to remove okay so we can move to the next question right yeah yeah okay
[35:41] so the next question is to make sure the loan offices can actually use these
[35:47] predictions is there a specific way they prefer to see risk presented we want to
[35:53] make sure the output speaks their language and this is from practical
[36:03] we are not able to see full question here yeah Chevy if you can just read out
[36:10] the question yeah yeah sure i'll read it again to make sure the loan officers can actually use their
[36:16] predictions is there a specific way they prefer to see risk presented we want to make sure the output
[36:24] speaks their language okay in terms of this uh track for where we are looking for our default
[36:31] prediction model we would be needing a categorization or bucket wise output to show cause
[36:37] whether it is a high risk borrower low risk medium risk that kind of thing or
[36:42] rag a color coded red amber green kind of thing
[36:50] okay so can we move to the next question
[36:54] so for track 4
[37:05] accuracy improving to 90%
[37:08] is a red flag for anyone
[37:11] with stats background
[37:13] since raw accuracy on an
[37:15] imbalanced default data set
[37:17] pick up the question fully we are not able to
[37:24] see the full version here.
[37:26] So I'll read it again.
[37:28] I'll read it out.
[37:34] For track four, accuracy improving to 90% is a red flag for anyone with stats background.
[37:42] Since raw accuracy on an imbalanced default data sets.
[37:51] is visible
[38:01] okay we are looking for an accuracy of anything greater than 90 that's fine that is where the
[38:08] bank is looking to contain its stress and that too we are looking for this
[38:13] 12 months in advance and that is the requirement here what developers has to provide to the bank
[38:21] okay so now we will take the next question we have some idea but to make it useful for the
[38:32] bank are there any points like back office reconciliations or kyc struggles that you
[38:37] secretly love someone to solve today so this is from track 5 yes definitely we would love
[38:46] someone to solve these issues for us okay now the next question is since the
[38:56] goal is something that can actually be integrated into IDB is banks ecosystem
[39:01] down the line what is the current tech stack look like behind the scenes it's
[39:06] again contract size see a tech stack would be different for different use
[39:16] cases and different applications so while we are looking at solutions which are innovative we would
[39:23] also like to understand if the solution can be deployed on-prem or on cloud if it is deployable
[39:29] on cloud i don't think there should be any challenge in deploying within the bank's
[39:35] environment because we would be having all the kinds of hardware and software related aspects
[39:41] available to us on various cloud environments which bank has internally which is AWS, GCP and all.
[39:50] But we would like to evaluate the solutions during this hackathon and if found feasible we'll try to
[39:57] check whether we can take it forward. So the integrations and tech stack that
[40:05] bank is presently following should not be a challenge.
[40:07] okay so now we'll take some general questions the first one is are we allowed to use ai coding
[40:19] agents such as cloud code anti-gravity cursor etc for the solution development and level labs
[40:25] for real-time talking avatars
[40:27] But see, we are looking at the solutions right now.
[40:41] So whatever coding tools you might use, it is up to you, but it should not be beyond
[40:47] the regulatory guidelines and it should abide by the AI norms, which are being issued by
[40:54] by RBI and various regulatory bodies.
[40:57] So if that is within the regulatory norms,
[41:01] that is fine with us.
[41:03] And it should not even copy any of the quotes
[41:06] which have been written earlier.
[41:08] So those kinds of things should be taken care of.
[41:10] Copyright issues would also not be appreciated.
[41:16] Okay.
[41:17] Now we'll take the next question.
[41:20] When you say common interpretation framework
[41:22] across loan types and borrower segments are you looking for a single unified
[41:28] credit score output or separate model per segment with a shared explain this
[41:39] will be a hybrid of both so that will depend on the segment locality and the
[41:47] common scale should also come that will be not a single score kill file number
[41:51] there will be separate thing what is vintage what is your location what is the experience
[41:58] qualification age group and based on it a unified score will come
[42:07] okay now the next question is has idba used any llm ai models in production before and if so
[42:18] was it closed api or self-hosted what worked did it
[42:25] so now iddi is not using any of the lms or ai models in
[42:29] production environment it is all in uat stage and in testing environment as of
[42:36] okay now we'll be taking few more questions should the air recommend at the asset class
[42:48] category level example invest in equity meet for equity mutual funds or actual specific schemes
[42:55] you should recommend that is that is the purpose because you know this part will you'll be you'll
[43:05] be getting the various customer categories from that and you can easily you can arrive the behave
[43:11] patterns from that whatever the transaction it is happening for example i can tell you
[43:17] maybe a salary upon customers and then they may be more keen on doing a systematic investment plan
[43:25] like that okay and I know that other customer category would take it as a high network and
[43:32] I know and again based on the age group somebody 40 years or something maybe a high risk taking
[43:39] person and for that your suggestion should be on that angle and you know when the customer
[43:45] is of something around does I mean 50 or 50 plus and he may not able to take more risk and there
[43:51] a risk the analyzing pattern is there based on that a should recommend and they should suggest
[43:57] and first level decisions and it should be a useful tool that is what we are respecting
[44:05] okay now uh the next question is we have built ai financial health score algorithm from
[44:13] sms data of multiple banks is that enough for mvp also it gives insights of behavior
[44:21] Right.
[44:26] This would be one of the solutions, but this might not be the only information point based
[44:33] on which you can build a solution.
[44:36] We might need other information aspects also.
[44:40] And while you are mentioning this as financial health score, we are assuming this is on the
[44:45] part of the retail asset loans that we were discussing.
[44:50] right so only based on sms data would not be sufficient for building a solution we would
[44:58] be looking for some other data points as well because that the data is what we are relying
[45:05] should be reliable that sometimes now there is a wrong number updated you get false data also
[45:11] so we don't know whether this pertains to the same customer or not you need to validate and
[45:15] cross-check the data points which are being captured in this sms data as well so you can
[45:21] build around this functionality by including other data points as well for the individual
[45:31] okay i think we have covered pretty much all the questions so if by chance we have missed any of
[45:37] the questions uh guys you can mail us at support at the rate have the skill.com and thank you so
[45:42] so much mentors thank you so much participants for joining this session it
[45:46] was really really great session and interactive as well so thank you so much
[45:51] everyone for joining today's session thank you Chevy thanks to all the
[45:56] participant and best of luck we are looking forward for this event and
[46:01] initiatives yeah keep building guys thank you
[46:09] you
[46:12] you
[46:42] you
```

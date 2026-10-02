/**
 * TribesforGOOD form logger and auto-responder
 *
 * Receives submissions from tribesforgood.com, appends them to this Sheet, and
 * sends the enquirer an automatic reply.
 *
 * Tabs "Brochure Leads" and "Contact Messages" are created on first use.
 *
 * SETUP (once):
 *   1. Extensions > Apps Script, paste this file in, Save.
 *   2. IMPORTANT: pick "sendTestEmail" in the function dropdown and press Run.
 *      This is what grants permission to send email. Approve when asked.
 *      Without it every send fails with "You do not have permission to call
 *      MailApp.sendEmail", because a deployment only carries the permissions
 *      that were approved when it was authorised.
 *   3. Deploy > Manage deployments > edit > Version: New version > Deploy.
 *      (First time only: Deploy > New deployment > Web app,
 *       Execute as: Me, Who has access: Anyone.)
 *   4. For Facebook/Instagram Lead Ads emails: pick "setupFacebookLeadsTrigger"
 *      in the function dropdown and press Run, once. This account also needs
 *      access to the separate Meta leads Sheet (see metaLeadsSheetId in
 *      CONFIG below) — if that Sheet's owner hasn't shared it with this
 *      account yet, ask them to.
 *   5. For WhatsApp (via Interakt, template "discovery_call_request",
 *      already approved): go to Project Settings (gear icon) > Script
 *      Properties and add INTERAKT_API_KEY. Add TEST_WHATSAPP_PHONE too and
 *      run "sendTestWhatsApp" once to confirm it actually works before
 *      relying on it for real leads. See the WHATSAPP section below for
 *      details.
 *   6. For the FAQ/story/theme follow-up sequence (2/4/7 days after a
 *      lead): CONFIG.faqTemplate ("outcomesandfaq") and studentStoryTemplate
 *      ("chitrastudentstory") are already created and set below.
 *      themeDetailsTemplate is deliberately blank — that step is on hold
 *      until a theme-details template is created and Meta-approved in
 *      Interakt; runDripSequence() skips a step with no template name
 *      configured rather than failing it permanently, so once
 *      CONFIG.themeDetailsTemplate is filled in, leads already past day 7
 *      pick it up on the next run rather than having missed it for good.
 *      Same skip-not-fail treatment applies to studentStoryImageUrl —
 *      chitrastudentstory requires a header image, so that step is also on
 *      hold until CONFIG.studentStoryImageUrl is filled in with a real,
 *      hosted image. OutcomesAndFAQ needs one body variable (the lead's
 *      first name); the brochure form never collects a name, so that case
 *      falls back to CONFIG.genericGreetingName — see DRIP_SEQUENCE's
 *      needsName/needsImage flags below for exactly which steps need what.
 *      Run "sendTestFaqWhatsApp" / "sendTestStoryWhatsApp" once each to
 *      confirm before relying on them (sendTestThemeWhatsApp will just say
 *      it's not set up yet, that's expected), then run
 *      "setupDripSequenceTrigger" once to start the recurring check.
 *      Reuses the same
 *      INTERAKT_API_KEY, no new Script Property needed.
 *
 * TO EDIT THE EMAIL: change the text in the CONFIG block below. Nothing else
 * needs touching, and no developer is required.
 */

// ---------------------------------------------------------------- CONFIG ----
// Everything you are likely to want to change lives here. Edit, Save, then
// Deploy > Manage deployments > New version. No developer needed.
var CONFIG = {
  fromName: 'TribesforGOOD',

  // Replies land here, and this is the address the email is signed off with.
  replyTo: 'khwahish@tribesforgood.com',
  // CC'd on every brochure/contact-reply email sent to a lead.
  ccEmail: 'khwahish@tribesforgood.com',
  signName: 'Khwahish Vig',
  signTitle: 'Project Associate, Strategy, Partnerships and New Product Development',
  signPhone: '91-9041075615',

  // Leave blank to switch off the internal heads-up email.
  notifyTeam: '',

  // Real, hosted images.
  logoUrl: 'https://www.tribesforgood.com/assets/assets/logo1.png',
  financeBannerUrl: 'https://www.tribesforgood.com/assets/home-v2/email-finance-banner.jpg',
  fundHerRiseUrl: 'https://www.tribesforgood.com/assets/home-v2/email-fundherrise.jpg',

  brochureUrl: 'https://www.tribesforgood.com/assets/winter-brochure-tfg.pdf',
  applyUrl:
    'https://docs.google.com/forms/d/e/1FAIpQLSdsd6fZUeQn5DW__-3y7uGoDsnTmVjlyaZ5YPNQABghGBKX5Q/viewform',

  // Approved WhatsApp template that asks a lead to book a Discovery Call.
  // Fires for both website brochure leads and Instagram/Facebook leads.
  // headerValues at send time overrides whatever sample image Meta approved
  // the template with, per Interakt's own docs, so this can safely be a real
  // brand image even though a placeholder was used at submission time.
  discoveryCallTemplate: 'discovery_call_request',
  discoveryCallImageUrl: 'https://www.tribesforgood.com/assets/assets/og/home.png',

  // Follow-up WhatsApp sequence, sent after the discovery-call ask above:
  // an FAQ message 2 days after the lead, a student success story 2 days
  // after that (day 4 total), programme/theme details on day 7 (its own
  // fixed offset from the lead, not chained off the story anymore — see
  // DRIP_SEQUENCE below). Image URLs are optional for a template with no
  // header image; leave '' — but note studentStoryImageUrl below is NOT
  // optional, chitrastudentstory requires one.
  // Confirmed via Interakt dashboard 2026-10-02 — template names are
  // case-sensitive there, and the approved name is all-lowercase, not the
  // "OutcomesAndFAQ" casing originally assumed. That mismatch was the
  // actual cause of every FAQ send failing with Interakt's "No approved
  // template found" error.
  faqTemplate: 'outcomesandfaq',
  faqImageUrl: '',
  // Deliberately blank — not created in Interakt yet. Leaving this '' is
  // safe: runDripSequence() skips a step with no template name configured
  // rather than attempting it and recording a permanent failure, so once a
  // real template name goes here, leads already past day 7 pick it up on
  // the very next trigger run instead of having been silently locked out.
  themeDetailsTemplate: '',
  themeDetailsImageUrl: '',
  studentStoryTemplate: 'chitrastudentstory',
  // Required, not optional — chitrastudentstory has an image header
  // component, and Interakt rejects a send with no headerValues the same
  // way it rejected a missing body variable (see needsImage in
  // DRIP_SEQUENCE below — if this ever goes blank again, that flag is what
  // keeps the step skipping safely instead of failing permanently).
  // Chitrita Nair's Johns Hopkins story slide, compressed from a 1.3MB
  // 1920x1080 PNG to this 1200x675 JPEG (~240KB), same convention as
  // financeBannerUrl/fundHerRiseUrl above. Not yet live on the site — this
  // URL only resolves after the next `vercel deploy --prod`.
  studentStoryImageUrl: 'https://www.tribesforgood.com/assets/home-v2/email-chitrita-story.jpg',
  // OutcomesAndFAQ needs exactly one body variable (the lead's first name —
  // confirmed by Interakt's own 400 error, "expected number of values are
  // 1"). Facebook/Instagram leads have a real name (full_name column);
  // website brochure leads never do, the form has no name field at all, so
  // this is the greeting used whenever no real name is known. See
  // DRIP_SEQUENCE's needsName flag below for which steps this applies to —
  // don't assume it's all of them, discovery_call_request has zero
  // variables and already works fine as-is.
  genericGreetingName: 'there',

  // Programme facts, kept in one place so the email can never drift from
  // the website. Update these when a new season opens.
  season: 'Winter 2026',
  programmes: 'Global Challenges & Social Justice | Social Entrepreneurship | GenZ Innovators Hub',
  cohortStartsLabel: '15 Oct / 1 Nov / 15 Nov / 1 Dec / 10 Dec / 5 Jan / 15 Jan',
  applicationsWindow: 'October 2026 to January 2027',
  duration: '4 Weeks (25 hours) or 6 Weeks (35 hours)',
  fee: 'INR 29,500 / 38,000',
  ageGroup: 'Grades 8 to 12 (13+ years)',
  queryEmails: 'mandeep@tribesforgood.com',

  brochureSubject: 'Winter 2026 Program - TribesforGOOD',
  contactSubject: 'We have got your message',

  // Facebook/Instagram Lead Ads: Meta writes new leads directly into its own
  // separate Google Sheet (its native CRM export), not into this project's
  // Sheet. processFacebookLeads() reads that sheet and emails anyone new.
  // Owned by ashi@getabsoluteadvantage.com — whichever account this script
  // runs as needs at least Viewer (ideally Editor) access to it.
  metaLeadsSheetId: '1tsVGn9GB_UrrV7N2Vu75TNkS_6CmTIlBdHqMAGm7GIw',
  // Targeted by name, not position — that spreadsheet has more than one
  // tab, and relying on "whichever is first" silently pointed this script
  // at the wrong one.
  metaLeadsTabName: 'Instalead form Raw',
};

var SOCIAL = [
  ['Website', 'https://www.tribesforgood.com'],
  ['Instagram', 'https://www.instagram.com/tribesforgood/'],
  ['LinkedIn', 'https://www.linkedin.com/company/tribesforgood/'],
  ['Facebook', 'https://www.facebook.com/Tribesforgood/'],
];

var BRAND = { navy: '#0F1C4D', teal: '#65D5E5', yellow: '#FFE169', grey: '#66718A' };
// -----------------------------------------------------------------------------

var TABS = {
  brochure: {
    name: 'Brochure Leads',
    headers: ['Timestamp', 'Email', 'Phone', 'School', 'Source', 'Page', 'Emailed', "WhatsApp'd",
               'FAQ Sent', 'Theme Sent', 'Story Sent'],
  },
  contact: {
    name: 'Contact Messages',
    headers: ['Timestamp', 'Name', 'Email', 'Phone', 'Subject', 'Message', 'Page', 'Emailed'],
  },
  // Mirror of new rows from the separate Meta Lead Ads Sheet (see
  // CONFIG.metaLeadsSheetId), kept on this project's own Sheet so Instagram/
  // Facebook leads don't require checking a second spreadsheet. Only new
  // leads going forward get copied in, same non-backfill policy as email/
  // WhatsApp — the November 2025 archive stays in the Meta sheet only.
  instagram: {
    name: 'Instagram Leads',
    headers: ['Timestamp', 'Campaign', 'Full Name', 'Email', 'Phone', 'Grade', 'School',
               'Quality Lead', 'Emailed', "WhatsApp'd"],
  },
};

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var type = TABS[data.type] ? data.type : 'brochure';
    var conf = TABS[type];
    var sheet = getSheet(conf);

    var stamp = Utilities.formatDate(new Date(), 'Asia/Kolkata', 'yyyy-MM-dd HH:mm:ss');

    // Send first so the row can record whether it worked. A mail failure must
    // never stop the lead being written down.
    var emailed = 'no';
    try {
      if (data.email) {
        if (type === 'contact') sendContactReply(data);
        else sendBrochureEmail(data);
        emailed = 'yes';
        notifyTeam(type, data);
      }
    } catch (mailErr) {
      emailed = 'failed: ' + mailErr;
    }

    // WhatsApp is best-effort and must never affect the row being written or
    // the email outcome above. Its outcome is written into its own column on
    // the Sheet (below), not just logged — the Apps Script Executions log
    // view has proven unreliable to actually read in practice, so this is
    // the reliable way to see what happened to any given lead.
    // The Discovery Call ask assumes a 10-digit Indian number (hardcodes
    // +91), and the brochure form has no country selector, so skip it for
    // Dubai leads until that's built properly rather than send to a
    // mismatched country code.
    var isDubaiLead = String(data.page || '').indexOf('/dubai') === 0;
    var waStatus = '';
    if (type === 'brochure') {
      if (isDubaiLead) {
        waStatus = 'skipped (dubai)';
      } else if (!data.phone) {
        waStatus = 'skipped (no phone)';
      } else {
        var normalizedPhone = normalizeIndianPhone(data.phone);
        if (!normalizedPhone) {
          waStatus = 'skipped (bad phone)';
        } else {
          try {
            sendDiscoveryCallWhatsApp('+91', normalizedPhone);
            waStatus = 'sent';
          } catch (waErr) {
            waStatus = 'failed: ' + waErr;
            Logger.log('Discovery-call WhatsApp send failed for ' + data.phone + ': ' + waErr);
          }
        }
      }
    }

    // appendRow writes to whatever columns the row array has, regardless of
    // what the header row (row 1) currently says — so a brochure row simply
    // has an 8th value now. If the sheet's own header row doesn't yet say
    // "WhatsApp'd" in column H, that's cosmetic only; type H1 in manually
    // once. Deliberately not auto-detecting/writing the header column here
    // (an earlier version did) — that meant reading and conditionally
    // rewriting the header row on every single submission, more moving
    // parts than this needs and a bigger failure surface for something
    // that's just a label.
    var row =
      type === 'contact'
        ? [stamp, data.name || '', data.email || '', data.phone || '',
           data.subject || '', data.message || '', data.page || '', emailed]
        : [stamp, data.email || '', data.phone || '', data.school || '',
           data.source || 'brochure', data.page || '', emailed, waStatus];

    sheet.appendRow(row);
    return json({ ok: true, emailed: emailed, whatsapp: waStatus });
  } catch (err) {
    return json({ ok: false, error: String(err) });
  }
}

function getSheet(conf) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(conf.name);
  if (!sheet) {
    sheet = ss.insertSheet(conf.name);
    sheet.appendRow(conf.headers);
    sheet.getRange(1, 1, 1, conf.headers.length)
      .setFontWeight('bold').setBackground(BRAND.navy).setFontColor('#FFFFFF');
    sheet.setFrozenRows(1);
  }
  return sheet;
}

// --------------------------------------------------------------- EMAILS ----

function sendBrochureEmail(data) {
  var body =
    '<p>Dear Parents,</p>' +

    '<p>The student who just got rejected from Wharton had a Goldman ' +
    'internship and a 4.2 GPA. The one who got in? She built a climate risk ' +
    'model for a municipal bond portfolio in rural Kenya.</p>' +

    '<p>In 2026, the bank internship and the stock market simulation are the ' +
    'baseline, not the differentiator. Admissions committees have moved on. ' +
    'The question is: has your child?</p>' +

    '<p>Today\'s top programs are selecting for students who can navigate ' +
    'the "Crisis Intersection", where climate change, systemic bias and ' +
    'capital markets collide. At TribesforGOOD, we have replaced mock ' +
    'trades with Financial First Response: real projects at the crossroads ' +
    'of Finance, Climate Resilience and Public Policy. What stands out is ' +
    'the student who is already doing the work the world actually needs.</p>' +

    discoveryCta() +

    '<img src="' + CONFIG.financeBannerUrl + '" width="100%" alt="Applied ' +
    'Finance, Economics and Public Policy, a rigorous winter program for ' +
    'high-performing high school students" style="display:block;width:100%;' +
    'max-width:400px;height:auto;margin:22px auto;border-radius:10px" />' +

    '<p>Our Winter 2026 Applied Finance track allows students to lead ' +
    'high-stakes campaigns based on real-world data from the World Bank, ' +
    'UNICEF and Dasra.</p>' +

    '<ol style="padding-left:20px;margin:0 0 16px">' +
      '<li style="margin-bottom:14px"><b>Climate-Smart Macroeconomics:</b> ' +
      'The World Bank estimates that climate change could push 100 million ' +
      'people into poverty by 2030. Our students do not just read these ' +
      'stats, they build solutions. From analysing Farming-as-a-Service ' +
      '(FaaS) using solar-powered irrigation and milling on pay-per-use ' +
      'models, to addressing the Documentation Gap, students learn how ' +
      'financial shocks become life-altering catastrophes. When 60% of ' +
      'families lose the identity papers required for government relief ' +
      'post-disaster, our students design the "Financial First Responder" ' +
      'frameworks needed to bridge that gap.</li>' +

      '<li style="margin-bottom:14px"><b>The Psychology of Poverty:</b> ' +
      'For decades, financial literacy programs operated on a flawed ' +
      'assumption, that poverty is simply a lack of mathematical ' +
      'knowledge. Modern research from UNICEF and YourDost reveals a more ' +
      'complex reality. Students work on "Financial Anxiety" frameworks, ' +
      'addressing the shame and family stress that UNICEF identifies as a ' +
      'key barrier to adolescent well-being.</li>' +

      '<li><b>Impact Investing &amp; Blended Finance:</b> Students analyse ' +
      'how "Patient Capital" (long term investments with no immediate ' +
      'demand for profit) can be layered with government grants to fund ' +
      'high-risk social innovations. They work on frameworks for Social ' +
      'Impact Bonds, where private investors are repaid by the government ' +
      'only if a specific social outcome, like a 20% increase in rural ' +
      'literacy, is achieved.</li>' +
    '</ol>' +

    '<p>For the student aiming for the world\'s top universities, the ' +
    'message is clear: <b>Do not just study the economy. Change the way it ' +
    'serves the most vulnerable.</b></p>' +

    '<p style="font-size:11px;font-weight:bold;letter-spacing:1.5px;' +
    'text-transform:uppercase;color:' + BRAND.grey + ';margin-top:30px">' +
      'TFG Changemaker Spotlight:</p>' +

    '<p>When Siona and Avi looked at India\'s small business economy, 30% ' +
    'of GDP, and yet women entrepreneurs are routinely locked out of ' +
    'finance and markets, they decided to do something about both.</p>' +

    '<img src="' + CONFIG.fundHerRiseUrl + '" width="100%" alt="Fund Her ' +
    'Rise, changemakers Siona Solanki and Avi Gupta" style="display:block;' +
    'width:100%;height:auto;border-radius:10px;border:1px solid #E8EBF1" />' +

    detailsBlock() +

    '<p style="margin-top:24px">' +
      button('Download the Brochure', CONFIG.brochureUrl) +
    '</p>' +

    '<p style="margin-top:24px">Adolescence changes everything. The ' +
    'question is, what are we placing in front of young people during ' +
    'that shift?</p>' +

    discoveryCta() +

    signature();

  var plainText =
    'Download your TribesforGOOD brochure here: ' + CONFIG.brochureUrl + '. ' +
    'Reply to this email to book a complimentary Discovery Call.';
  var options = {
    htmlBody: wrap(body),
    name: CONFIG.fromName,
    cc: CONFIG.ccEmail,
  };

  // Attach the actual PDF rather than only linking to it. Falls back to a
  // link-only email if the fetch fails, so a brochure hiccup never blocks
  // the reply reaching the family.
  try {
    var pdf = UrlFetchApp.fetch(CONFIG.brochureUrl).getBlob()
      .setName('TribesforGOOD-Winter-Brochure.pdf');
    options.attachments = [pdf];
  } catch (fetchErr) {
    Logger.log('Could not attach brochure, sending link only: ' + fetchErr);
  }

  MailApp.sendEmail(data.email, CONFIG.brochureSubject, plainText, options);
}

/**
 * Programme facts, in the reference email's own order: cohort starts,
 * duration, fee, age group, then the apply link and query addresses.
 */
function detailsBlock() {
  var row = function (label, value) {
    return '<div style="margin-bottom:10px"><b>' + label + '</b><br>' +
      value + '</div>';
  };
  return (
    '<div style="margin-top:28px">' +
    '<div style="color:#2E7D32;font-weight:bold;font-size:15px;' +
    'margin-bottom:10px">' + escapeHtml(CONFIG.programmes) + '</div>' +
    '<div style="font-size:14px;color:' + BRAND.navy + '">' +
      row('Join us for our ' + CONFIG.season + ' Cohorts Starting',
          escapeHtml(CONFIG.cohortStartsLabel)) +
      row('Duration', escapeHtml(CONFIG.duration)) +
      row('Fee', escapeHtml(CONFIG.fee) + ' <small>(+ GST)</small>') +
      row('Age Group', escapeHtml(CONFIG.ageGroup)) +
    '</div>' +
    '<p style="margin-top:10px">Apply Here: ' +
      '<a href="' + CONFIG.applyUrl + '"><b>Application Form</b></a>' +
      ' or write to us for your queries on: ' +
      escapeHtml(CONFIG.queryEmails) + '</p>' +
    '</div>'
  );
}

function signature() {
  var links = SOCIAL.map(function (s) {
    return '<a href="' + s[1] + '" style="color:' + BRAND.grey + '">' + s[0] + '</a>';
  }).join(' &nbsp;|&nbsp; ');
  return (
    '<p style="margin-top:56px;margin-bottom:4px">Warmly,</p>' +
    '<p style="margin:0"><b>' + escapeHtml(CONFIG.signName) + '</b><br>' +
    '<span style="color:' + BRAND.grey + ';font-size:13px">' +
      escapeHtml(CONFIG.signTitle) + '</span><br>' +
    '<span style="font-size:13px">' + escapeHtml(CONFIG.signPhone) +
      ' &nbsp;|&nbsp; <a href="mailto:' + CONFIG.replyTo + '">' +
      CONFIG.replyTo + '</a></span></p>' +
    '<p style="margin-top:14px;font-size:13px">' + links + '</p>' +
    '<p style="margin-top:16px;font-style:italic;color:' + BRAND.grey + '">' +
    'Activating changemakers since 2018.<br>Find your Tribe with us.</p>'
  );
}

function sendContactReply(data) {
  var first = (data.name || '').split(' ')[0];
  var body =
    '<p>Hi' + (first ? ' ' + escapeHtml(first) : '') + ',</p>' +
    '<p>Thanks for getting in touch. Your message has reached us and someone ' +
    'will reply personally, usually within one working day.</p>' +
    '<p style="color:' + BRAND.grey + '"><b>What you sent us</b><br>' +
    escapeHtml(data.message || '').replace(/\n/g, '<br>') + '</p>' +
    '<p>In the meantime you are welcome to look through the brochure:</p>' +
    button('Open the brochure', CONFIG.brochureUrl);

  MailApp.sendEmail({
    to: data.email,
    subject: CONFIG.contactSubject,
    htmlBody: wrap(body),
    body: 'Thanks for getting in touch. We will reply shortly.',
    name: CONFIG.fromName,
    cc: CONFIG.ccEmail,
  });
}

function notifyTeam(type, data) {
  if (!CONFIG.notifyTeam) return;
  var lines = Object.keys(data).map(function (k) {
    return '<b>' + escapeHtml(k) + ':</b> ' + escapeHtml(String(data[k]));
  });
  MailApp.sendEmail({
    to: CONFIG.notifyTeam,
    subject: 'New ' + type + ' lead: ' + (data.email || ''),
    htmlBody: lines.join('<br>'),
    name: CONFIG.fromName,
  });
}

// --------------------------------------------------------------- HELPERS ----

function wrap(inner) {
  return (
    '<div style="font-family:Arial,Helvetica,sans-serif;font-size:15px;' +
    'line-height:1.6;color:' + BRAND.navy + ';max-width:560px;margin:0;' +
    'padding:28px 24px">' +
    inner +
    '<hr style="border:none;border-top:1px solid #E8EBF1;margin:30px 0 16px">' +
    '<p style="font-size:12px;color:' + BRAND.grey + ';margin:0">' +
    'TribesforGOOD &middot; <a href="https://www.tribesforgood.com" ' +
    'style="color:' + BRAND.grey + '">tribesforgood.com</a></p></div>'
  );
}

function discoveryCta() {
  return '<p style="background:' + BRAND.yellow + ';color:' + BRAND.navy +
    ';padding:12px 16px;border-radius:8px;font-weight:bold;margin:20px 0">' +
    'Reply to this email to book a complimentary Discovery Call.</p>';
}

function button(label, url, outline) {
  var bg = outline ? '#FFFFFF' : BRAND.yellow;
  var border = outline ? '2px solid ' + BRAND.navy : '2px solid ' + BRAND.yellow;
  return (
    '<a href="' + url + '" style="display:inline-block;background:' + bg +
    ';color:' + BRAND.navy + ';border:' + border + ';border-radius:8px;' +
    'padding:13px 26px;text-decoration:none;font-weight:bold">' + label + '</a>'
  );
}

function escapeHtml(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

/**
 * Run this once from the editor to approve the email permission, and any time
 * you want to preview the wording. It emails the brochure template to whoever
 * owns this script.
 */
function sendTestEmail() {
  var me = Session.getEffectiveUser().getEmail();
  sendBrochureEmail({ email: me });
  Logger.log('Test brochure email sent to ' + me);
  return 'Sent to ' + me;
}

// -------------------------------------------------------------- WHATSAPP ----
// Sent via Interakt (interakt.ai). Templates: discovery_call_request
// (CONFIG.discoveryCallTemplate, sent immediately, already approved by
// Meta) plus the 3-step FAQ/theme/story follow-up sequence below
// (DRIP_SEQUENCE), each needing its own Meta-approved template — see the
// CONFIG comments above. Needs one Script Property set once, under Project
// Settings > Script Properties in the Apps Script editor — never hardcode
// the API key here:
//   INTERAKT_API_KEY     the key from Interakt's Settings > API Key
//   TEST_WHATSAPP_PHONE  your own number (10 digits), for the sendTest*
//                        functions below
//
// Until INTERAKT_API_KEY is set, every send quietly no-ops (logged, not
// thrown) so leads keep being emailed and recorded normally either way.

// Cumulative days since a lead's own capture date, not since this feature
// went live — a lead already 9 days old the first time this runs gets both
// the FAQ and theme steps sent back-to-back in the same pass, then
// continues normally. Deliberately different from every other tracking
// column in this file (which skip their pre-existing backlog on first run)
// — confirmed as the wanted behaviour for this sequence specifically.
// `days` is each step's own offset from the lead's capture date, not
// chained off the previous step — story (day 4) deliberately fires before
// theme (day 7) here, that's intentional, not a typo.
// needsName: true means the template has one body variable (the lead's
// first name) and will fail with a real Interakt 400 if sent with none —
// confirmed for OutcomesAndFAQ specifically, not assumed for the others.
// needsImage: true means the template has an image header component and
// will similarly fail with no headerValues — confirmed for
// chitrastudentstory. Neither flag is assumed for theme, since that
// template doesn't exist yet; confirm the same way (try it, read the
// error) once it does, rather than guessing.
// Array order must stay faq/theme/story — it's matched positionally
// against each caller's `cols` array (processBrochureDrip's [8, 9, 10],
// processFacebookDrip's [faqCol, themeCol, storyCol]), both of which are
// FAQ/Theme/Story column order on their respective sheets. Reordering this
// array without also reordering both `cols` arrays would silently write
// each step's status into the wrong column.
var DRIP_SEQUENCE = [
  { key: 'faq', days: 2, templateKey: 'faqTemplate', imageKey: 'faqImageUrl', needsName: true, needsImage: false },
  { key: 'theme', days: 7, templateKey: 'themeDetailsTemplate', imageKey: 'themeDetailsImageUrl', needsName: false, needsImage: false },
  { key: 'story', days: 4, templateKey: 'studentStoryTemplate', imageKey: 'studentStoryImageUrl', needsName: false, needsImage: true },
];

var MS_PER_DAY = 24 * 60 * 60 * 1000;
var IST_OFFSET_MS = 5.5 * 60 * 60 * 1000;

/**
 * Strips everything but digits and keeps the last 10, since Indian mobile
 * numbers submitted through the site may or may not include a country code
 * or formatting. Returns '' if what's left doesn't look like a real number.
 */
function normalizeIndianPhone(raw) {
  var digits = String(raw || '').replace(/\D/g, '');
  if (digits.length < 10) return '';
  return digits.slice(-10);
}

// Country codes actually seen in TFG's ad campaigns (India + Gulf), longest
// first so a 3-digit Gulf code is never misread as starting with the
// 2-digit Indian one. Meta's Lead Ads sheet gives phone numbers as one
// digit string with the country code already baked in (e.g. '971501234567'),
// unlike the website's own form, which only ever collects a bare 10-digit
// Indian number with no country code at all.
var KNOWN_COUNTRY_CODES = ['971', '974', '968', '966', '965', '973', '91'];

/**
 * Splits a Meta Lead Ads phone string into {countryCode, phoneNumber} for
 * Interakt's API. Returns null rather than guessing when the prefix isn't
 * one of the codes above, so an unrecognised number is skipped, not
 * silently sent to the wrong country.
 */
function splitCountryCode(raw) {
  var digits = String(raw || '').replace(/\D/g, '');
  for (var i = 0; i < KNOWN_COUNTRY_CODES.length; i++) {
    var code = KNOWN_COUNTRY_CODES[i];
    if (digits.indexOf(code) === 0 && digits.length > code.length) {
      return { countryCode: '+' + code, phoneNumber: digits.slice(code.length) };
    }
  }
  return null;
}

/**
 * Sends any approved WhatsApp template with no body variables. Takes an
 * already-resolved countryCode/phoneNumber pair rather than a raw string,
 * since callers (the website form vs Meta's Lead Ads sheet) hand phone
 * numbers over in different shapes and each knows how to parse its own.
 * imageUrl is optional — pass '' for a template with no header image.
 */
function sendWhatsAppTemplate(templateName, imageUrl, countryCode, phoneNumber, bodyValues) {
  var apiKey = PropertiesService.getScriptProperties().getProperty('INTERAKT_API_KEY');
  if (!apiKey) {
    Logger.log('sendWhatsAppTemplate(' + templateName + '): skipped, INTERAKT_API_KEY not set yet.');
    return 'skipped, INTERAKT_API_KEY not set yet.';
  }

  // Send fullPhoneNumber only. Interakt's API has given two different,
  // contradictory 400 errors on this account: first "Either phoneNumber
  // with countryCode Or fullPhoneNumber is required" (read at the time as
  // permission to send both), then later "Both phoneNumber and
  // fullPhoneNumber is not allowed" once both were actually being sent.
  // The second message is unambiguous — exactly one shape, not more — so
  // this sends only fullPhoneNumber and drops countryCode/phoneNumber
  // entirely, rather than trying to guess which single field to keep.
  var countryDigits = String(countryCode || '').replace(/\D/g, '');
  var template = { name: templateName, languageCode: 'en', bodyValues: bodyValues || [] };
  // Overrides whatever sample image the template was approved with — see
  // the discoveryCallImageUrl CONFIG comment above.
  if (imageUrl) template.headerValues = [imageUrl];

  var res = UrlFetchApp.fetch('https://api.interakt.ai/v1/public/message/', {
    method: 'post',
    contentType: 'application/json',
    headers: { Authorization: 'Basic ' + apiKey },
    payload: JSON.stringify({
      fullPhoneNumber: countryDigits + phoneNumber,
      type: 'Template',
      template: template,
    }),
    muteHttpExceptions: true,
  });

  var bodyText = res.getContentText();
  var diagnostic = 'HTTP ' + res.getResponseCode() + ': ' + bodyText;
  // Always log the raw response, not only on an HTTP error. Interakt's own
  // error shape is {"result": false, "message": "..."} — it's possible for
  // that to come back on an HTTP 200 for reasons the status code alone
  // doesn't reveal, and status-code-only checking would silently record a
  // real send as "sent" when Interakt is actually reporting failure in the
  // body. Confirmed missing this once already: real leads' WhatsApp sends
  // showed "sent" in the Sheet with nothing ever arriving.
  Logger.log('sendWhatsAppTemplate(' + templateName + '): Interakt ' + diagnostic);

  if (res.getResponseCode() >= 300) {
    throw new Error(diagnostic);
  }

  var parsed;
  try {
    parsed = JSON.parse(bodyText);
  } catch (parseErr) {
    parsed = null;
  }
  if (parsed && parsed.result === false) {
    throw new Error('Interakt reported failure: ' + bodyText);
  }

  return diagnostic;
}

/** Sends the discovery_call_request template specifically — see CONFIG. */
function sendDiscoveryCallWhatsApp(countryCode, phoneNumber) {
  return sendWhatsAppTemplate(
    CONFIG.discoveryCallTemplate, CONFIG.discoveryCallImageUrl, countryCode, phoneNumber);
}

/**
 * Run this once from the editor after setting the two Script Properties
 * above, to confirm the template and API key actually work before relying
 * on it for real leads. Sends to TEST_WHATSAPP_PHONE (a bare 10-digit
 * Indian number, same format the website form collects).
 *
 * Writes its result into a "Debug" tab on this project's own Sheet rather
 * than only logging it — the Apps Script Executions log view has proven
 * unreliable to actually read in practice throughout this project, showing
 * "No logs available" even for runs that definitely logged something.
 */
function sendTestWhatsApp() {
  var phone = PropertiesService.getScriptProperties().getProperty('TEST_WHATSAPP_PHONE');
  if (!phone) return writeDebugResult('Set the TEST_WHATSAPP_PHONE script property first.');
  var normalizedPhone = normalizeIndianPhone(phone);
  if (!normalizedPhone) return writeDebugResult("TEST_WHATSAPP_PHONE doesn't look like a usable number.");
  try {
    var result = sendDiscoveryCallWhatsApp('+91', normalizedPhone);
    return writeDebugResult('Sent to ' + phone + '. Interakt response: ' + result);
  } catch (err) {
    return writeDebugResult('Send to ' + phone + ' failed: ' + err);
  }
}

/**
 * Same idea as sendTestWhatsApp, one per drip step, so each new template
 * can be confirmed working on its own before the trigger relies on it for
 * real leads. Run each once after setting its CONFIG template name.
 */
function sendTestDripStep(step) {
  var templateName = CONFIG[step.templateKey];
  if (!templateName) return writeDebugResult('CONFIG.' + step.templateKey + ' is not set yet — nothing to test.');
  if (step.needsImage && !CONFIG[step.imageKey]) {
    return writeDebugResult('CONFIG.' + step.imageKey + ' is not set yet — this template needs a header image.');
  }
  var phone = PropertiesService.getScriptProperties().getProperty('TEST_WHATSAPP_PHONE');
  if (!phone) return writeDebugResult('Set the TEST_WHATSAPP_PHONE script property first.');
  var normalizedPhone = normalizeIndianPhone(phone);
  if (!normalizedPhone) return writeDebugResult("TEST_WHATSAPP_PHONE doesn't look like a usable number.");
  var bodyValues = step.needsName ? [CONFIG.genericGreetingName] : [];
  try {
    var result = sendWhatsAppTemplate(
      templateName, CONFIG[step.imageKey], '+91', normalizedPhone, bodyValues);
    return writeDebugResult('Sent "' + step.key + '" step to ' + phone + '. Interakt response: ' + result);
  } catch (err) {
    return writeDebugResult('Send "' + step.key + '" step to ' + phone + ' failed: ' + err);
  }
}

function sendTestFaqWhatsApp() { return sendTestDripStep(DRIP_SEQUENCE[0]); }
function sendTestThemeWhatsApp() { return sendTestDripStep(DRIP_SEQUENCE[1]); }
function sendTestStoryWhatsApp() { return sendTestDripStep(DRIP_SEQUENCE[2]); }

function writeDebugResult(message) {
  var sheet = getSheet({ name: 'Debug', headers: ['Timestamp', 'Result'] });
  sheet.appendRow([Utilities.formatDate(new Date(), 'Asia/Kolkata', 'yyyy-MM-dd HH:mm:ss'), message]);
  return message;
}

// ------------------------------------------------------- FACEBOOK LEADS ----

/**
 * Checks Meta's Lead Ads sheet (CONFIG.metaLeadsSheetId) for new leads,
 * emails them the brochure, WhatsApps them the Discovery Call ask, and
 * mirrors the row onto this project's own Sheet (the "Instagram Leads"
 * tab, TABS.instagram) so that sheet never has to be checked separately.
 * Run setupFacebookLeadsTrigger() once so this runs on its own every
 * 15 minutes — do not run this one directly on a schedule, run the setup
 * function instead.
 *
 * Adds "TFG Emailed", "TFG WhatsApp'd" and "TFG Logged" columns to the Meta
 * sheet, tracked independently so a failure or skip in one can never
 * affect the others. Each column backfills the same way on its own
 * first-ever run: every row that already existed gets marked
 * "skipped (pre-existing)" rather than acting on the whole historical
 * archive — only leads captured from that point on get contacted or
 * mirrored. This is the same non-backfill behaviour already confirmed with
 * the client for email, now applied identically to WhatsApp and to the
 * local mirror.
 */
function processFacebookLeads() {
  var sheet = SpreadsheetApp.openById(CONFIG.metaLeadsSheetId)
    .getSheetByName(CONFIG.metaLeadsTabName);
  if (!sheet) {
    Logger.log('processFacebookLeads: tab "' + CONFIG.metaLeadsTabName + '" not found, aborting.');
    return;
  }
  var data = sheet.getDataRange().getValues();
  if (data.length < 2) return;

  var headers = data[0].map(function (h) { return String(h).trim().toLowerCase(); });
  var emailCol = headers.indexOf('email');
  var phoneCol = headers.indexOf('phone_number');
  // Confirmed against the real headers on this sheet 2026-09-29 — 'date'
  // and 'campaign name' never actually existed (the real names are
  // 'created_time' and 'campaign_name'), so dateCol/campaignCol have been
  // silently -1 this whole time. Harmless here (both are read with a
  // `=== -1 ? '' : ...` fallback below), but it meant the Instagram Leads
  // mirror tab's Timestamp and Campaign columns have likely been blank for
  // every row ever copied there.
  var dateCol = headers.indexOf('created_time');
  var campaignCol = headers.indexOf('campaign_name');
  var nameCol = headers.indexOf('full_name');
  var gradeCol = headers.indexOf("what_is_your_child's_grade_level?");
  var schoolCol = headers.indexOf("your_child's_school_(name)_?");
  // 'quality lead' doesn't appear in the real headers either — the closest
  // candidate is 'lead_status', but that may be a different concept (lead
  // pipeline stage vs. a quality score), so this is left as-is rather than
  // guessed. Flagged to the client; fix once confirmed which column (if
  // any) is the real equivalent.
  var qualityCol = headers.indexOf('quality lead');
  if (emailCol === -1) {
    Logger.log('processFacebookLeads: no "email" column found, aborting.');
    return;
  }

  var emailTrackCol = headers.indexOf('tfg emailed');
  var isFirstEmailRun = emailTrackCol === -1;
  if (isFirstEmailRun) {
    emailTrackCol = headers.length;
    headers.push('tfg emailed');
    sheet.getRange(1, emailTrackCol + 1).setValue('TFG Emailed');
  }

  var waTrackCol = headers.indexOf("tfg whatsapp'd");
  var isFirstWaRun = waTrackCol === -1;
  if (isFirstWaRun) {
    waTrackCol = headers.length;
    headers.push("tfg whatsapp'd");
    sheet.getRange(1, waTrackCol + 1).setValue("TFG WhatsApp'd");
  }

  var logTrackCol = headers.indexOf('tfg logged');
  var isFirstLogRun = logTrackCol === -1;
  if (isFirstLogRun) {
    logTrackCol = headers.length;
    headers.push('tfg logged');
    sheet.getRange(1, logTrackCol + 1).setValue('TFG Logged');
  }
  var localSheet = getSheet(TABS.instagram);

  for (var r = 1; r < data.length; r++) {
    // getDataRange() returns every row up to the last one with any
    // formatting or history, not just rows with real data — a sheet that's
    // ever had a border, conditional formatting, or a stray keystroke
    // applied further down than the real leads go will report thousands of
    // blank phantom rows. Skip a row entirely, touching no tracking column
    // and mirroring nothing, unless it actually has an email or phone.
    var hasEmail = emailCol !== -1 && String(data[r][emailCol] || '').trim();
    var hasPhone = phoneCol !== -1 && String(data[r][phoneCol] || '').trim();
    if (!hasEmail && !hasPhone) continue;

    // Tracks each row's current status regardless of whether it was set
    // just now or on an earlier run, so the mirror block below (which may
    // run on a later pass than the email/WhatsApp ones did) always has the
    // real answer rather than an unset local variable.
    var emailStatus = data[r][emailTrackCol];
    if (!emailStatus) {
      if (isFirstEmailRun) {
        emailStatus = 'skipped (pre-existing)';
      } else {
        var email = String(data[r][emailCol] || '').trim();
        if (!email) {
          emailStatus = 'skipped (no email)';
        } else {
          try {
            sendBrochureEmail({ email: email });
            emailStatus = 'yes';
          } catch (err) {
            emailStatus = 'failed: ' + err;
          }
        }
      }
      sheet.getRange(r + 1, emailTrackCol + 1).setValue(emailStatus);
    }

    var waStatus = data[r][waTrackCol];
    if (!waStatus) {
      if (isFirstWaRun) {
        waStatus = 'skipped (pre-existing)';
      } else {
        var phone = phoneCol === -1 ? '' : String(data[r][phoneCol] || '').trim();
        var parsed = phone ? splitCountryCode(phone) : null;
        if (!phone) {
          waStatus = 'skipped (no phone)';
        } else if (!parsed) {
          waStatus = 'skipped (unrecognised country code)';
        } else {
          try {
            sendDiscoveryCallWhatsApp(parsed.countryCode, parsed.phoneNumber);
            waStatus = 'sent';
          } catch (err) {
            waStatus = 'failed: ' + err;
          }
        }
      }
      sheet.getRange(r + 1, waTrackCol + 1).setValue(waStatus);
    }

    // Mirrors this row onto the local "Instagram Leads" tab so it never has
    // to be checked in the separate Meta sheet. Runs after the two blocks
    // above so it always captures their final status for this row, whether
    // freshly computed just now or already set on an earlier run.
    if (!data[r][logTrackCol]) {
      var logStatus;
      if (isFirstLogRun) {
        logStatus = 'skipped (pre-existing)';
      } else {
        localSheet.appendRow([
          dateCol === -1 ? '' : data[r][dateCol],
          campaignCol === -1 ? '' : data[r][campaignCol],
          nameCol === -1 ? '' : data[r][nameCol],
          data[r][emailCol] || '',
          phoneCol === -1 ? '' : data[r][phoneCol],
          gradeCol === -1 ? '' : data[r][gradeCol],
          schoolCol === -1 ? '' : data[r][schoolCol],
          qualityCol === -1 ? '' : data[r][qualityCol],
          emailStatus,
          waStatus,
        ]);
        logStatus = 'copied';
      }
      sheet.getRange(r + 1, logTrackCol + 1).setValue(logStatus);
    }
  }
}

/**
 * Run this once from the editor. Sets up the recurring 15-minute check for
 * new Facebook/Instagram leads. Safe to re-run — clears any existing
 * trigger for this function first so you never end up with duplicates.
 */
function setupFacebookLeadsTrigger() {
  ScriptApp.getProjectTriggers().forEach(function (t) {
    if (t.getHandlerFunction() === 'processFacebookLeads') ScriptApp.deleteTrigger(t);
  });
  ScriptApp.newTrigger('processFacebookLeads').timeBased().everyMinutes(15).create();
  return 'Facebook leads will be checked and emailed every 15 minutes.';
}

// ------------------------------------------------------------ DRIP SEQUENCE ----

/**
 * doPost() writes the Timestamp column as the exact 'yyyy-MM-dd HH:mm:ss'
 * string from Utilities.formatDate(..., 'Asia/Kolkata', ...), but Sheets
 * auto-converts a string that looks like a date into a real Date-typed
 * cell on write — confirmed 2026-10-02, getDataRange().getValues() was
 * actually handing back Date objects here, not strings, so the regex below
 * silently matched nothing and every row got skipped with no error. A Date
 * object is trusted as-is (the sheet's own timezone setting produced it);
 * only a genuine leftover string (older rows, or a format change) falls
 * through to the manual IST wall-clock reconstruction, which exists
 * precisely because a bare string can't be trusted to parse in the right
 * zone otherwise. Returns null, not a guess, for anything that fits neither.
 */
function parseIstStamp(stamp) {
  if (stamp instanceof Date) return isNaN(stamp.getTime()) ? null : stamp;
  var m = /^(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})$/.exec(String(stamp || '').trim());
  if (!m) return null;
  var utcMs = Date.UTC(+m[1], +m[2] - 1, +m[3], +m[4], +m[5], +m[6]) - IST_OFFSET_MS;
  return new Date(utcMs);
}

/**
 * Meta's Lead Ads sheet may hand back its "date" column as an actual Date
 * object or as a string, depending on how the cell is formatted — accepts
 * either, returns null (skip, don't guess) for anything unparseable.
 */
function toDate(value) {
  if (value instanceof Date) return isNaN(value.getTime()) ? null : value;
  if (!value) return null;
  var d = new Date(value);
  return isNaN(d.getTime()) ? null : d;
}

/**
 * Finds (or creates) a tracking column by header name, same pattern used
 * inline in processFacebookLeads() for TFG Emailed/WhatsApp'd/Logged, moved
 * here as a shared helper since the drip sequence needs 3 more.
 */
function ensureTrackingColumn(sheet, headers, key, label) {
  var col = headers.indexOf(key);
  if (col === -1) {
    col = headers.length;
    headers.push(key);
    sheet.getRange(1, col + 1).setValue(label);
  }
  return col;
}

/**
 * Sends whichever DRIP_SEQUENCE steps are now due and not yet recorded for
 * one row, writing each step's own status into its own column — same
 * independent-columns rule as every other tracking column in this file, so
 * a failure on one step never blocks or gets confused with another. `cols`
 * gives the sheet column (0-indexed) for each step in DRIP_SEQUENCE order.
 * A lead already past more than one threshold gets every due step sent in
 * this same pass (see the DRIP_SEQUENCE comment above for why that's
 * intentional here).
 */
function runDripSequence(sheet, rowNumber, existingValues, cols, daysElapsed, countryCode, phoneNumber, firstName) {
  for (var i = 0; i < DRIP_SEQUENCE.length; i++) {
    var step = DRIP_SEQUENCE[i];
    var col = cols[i];
    if (existingValues[col]) continue; // already sent, or already failed — never retried
    if (daysElapsed < step.days) continue;
    var templateName = CONFIG[step.templateKey];
    // A step with no template name configured yet (e.g. theme details,
    // pending Interakt setup) is skipped without writing anything, not
    // recorded as failed — a real API error would be permanent (see the
    // line above), but "not built yet" must not be. Leaves the column
    // blank so this is retried on every future run until it's configured.
    if (!templateName) continue;
    // Same treatment for a step that needs a header image but doesn't have
    // one configured yet (e.g. studentStoryTemplate, pending a real
    // image) — skip without writing anything, don't record a permanent
    // failure for "not ready yet".
    if (step.needsImage && !CONFIG[step.imageKey]) continue;
    // Only build a name value for a step that actually needs one — a step
    // with needsName: false must keep bodyValues empty, sending a value a
    // template doesn't expect is its own Interakt error, same as sending
    // none when one is expected.
    var bodyValues = step.needsName ? [firstName || CONFIG.genericGreetingName] : [];
    var status;
    try {
      sendWhatsAppTemplate(templateName, CONFIG[step.imageKey], countryCode, phoneNumber, bodyValues);
      status = 'sent';
    } catch (err) {
      status = 'failed: ' + err;
    }
    sheet.getRange(rowNumber, col + 1).setValue(status);
    existingValues[col] = status;
  }
}

/**
 * Drip sequence for website brochure-form leads. Same Dubai/phone
 * exclusions as the immediate discovery-call send in doPost() — re-derived
 * fresh from each row's own Phone/Page columns rather than trusting the
 * old WhatsApp'd column's text, since rows written before that column
 * existed would otherwise be skipped by a blank status that doesn't
 * actually mean "excluded".
 */
function processBrochureDrip() {
  var sheet = getSheet(TABS.brochure);
  var data = sheet.getDataRange().getValues();
  for (var r = 1; r < data.length; r++) {
    var phone = data[r][2];
    var page = data[r][5];
    if (!phone) continue;
    if (String(page || '').indexOf('/dubai') === 0) continue;
    var normalizedPhone = normalizeIndianPhone(phone);
    if (!normalizedPhone) continue;
    var leadDate = parseIstStamp(data[r][0]);
    if (!leadDate) continue;
    var daysElapsed = Math.floor((Date.now() - leadDate.getTime()) / MS_PER_DAY);
    // The brochure form never collects a name (only email/phone/school) —
    // pass null, runDripSequence() falls back to CONFIG.genericGreetingName
    // for any step that actually needs one.
    runDripSequence(sheet, r + 1, data[r], [8, 9, 10], daysElapsed, '+91', normalizedPhone, null);
  }
}

/**
 * Same sequence for Facebook/Instagram leads, reading the same Meta sheet
 * processFacebookLeads() already reads and adding its own 3 tracked
 * columns (TFG FAQ/Theme/Story Sent). Deliberately excludes any row whose
 * TFG WhatsApp'd status is blank or "skipped (pre-existing)" — that status
 * means the row is part of the Nov 2025 archive processFacebookLeads()
 * already deliberately never contacts, or predates WhatsApp being wired up
 * at all. This sequence extends a conversation that was actually started,
 * it does not start a new one with leads that were intentionally left
 * alone. (Does not touch the "Instagram Leads" mirror tab — that tab only
 * ever snapshots a row once, at first sighting, and has no mechanism to
 * revisit a row days later, so drip status is visible on the Meta sheet
 * itself, not mirrored.)
 */
function processFacebookDrip() {
  var sheet = SpreadsheetApp.openById(CONFIG.metaLeadsSheetId).getSheetByName(CONFIG.metaLeadsTabName);
  if (!sheet) {
    Logger.log('processFacebookDrip: tab "' + CONFIG.metaLeadsTabName + '" not found, aborting.');
    return;
  }
  var data = sheet.getDataRange().getValues();
  if (data.length < 2) return;

  var headers = data[0].map(function (h) { return String(h).trim().toLowerCase(); });
  var phoneCol = headers.indexOf('phone_number');
  // 'created_time' — confirmed against the real headers on this sheet
  // 2026-09-29 (via a live "missing columns" error), 'date' never existed.
  var dateCol = headers.indexOf('created_time');
  var nameCol = headers.indexOf('full_name');
  var waTrackCol = headers.indexOf("tfg whatsapp'd");
  if (phoneCol === -1 || dateCol === -1 || waTrackCol === -1) {
    // Name exactly which column is missing and what's actually there —
    // "required columns not found" told us nothing actionable last time
    // this happened. Written to the Debug tab too, not just Logger.log,
    // since the Executions panel has proven unreliable all through this
    // project (see the WhatsApp payload bug notes).
    var missing = [];
    if (phoneCol === -1) missing.push('"phone_number"');
    if (dateCol === -1) missing.push('"date"');
    if (waTrackCol === -1) missing.push('"TFG WhatsApp\'d" (only exists after processFacebookLeads has run at least once)');
    var missingMsg = 'processFacebookDrip: missing ' + missing.join(', ') +
      '. Actual headers on "' + CONFIG.metaLeadsTabName + '": [' + headers.join(', ') + ']';
    Logger.log(missingMsg);
    writeDebugResult(missingMsg);
    return;
  }

  var faqCol = ensureTrackingColumn(sheet, headers, 'tfg faq sent', 'TFG FAQ Sent');
  var themeCol = ensureTrackingColumn(sheet, headers, 'tfg theme sent', 'TFG Theme Sent');
  var storyCol = ensureTrackingColumn(sheet, headers, 'tfg story sent', 'TFG Story Sent');

  for (var r = 1; r < data.length; r++) {
    var waStatus = data[r][waTrackCol];
    if (!waStatus || waStatus === 'skipped (pre-existing)') continue;

    var phone = String(data[r][phoneCol] || '').trim();
    var parsed = phone ? splitCountryCode(phone) : null;
    if (!parsed) continue;

    var leadDate = toDate(data[r][dateCol]);
    if (!leadDate) continue;

    var fullName = nameCol === -1 ? '' : String(data[r][nameCol] || '').trim();
    var firstName = fullName ? fullName.split(/\s+/)[0] : '';

    var daysElapsed = Math.floor((Date.now() - leadDate.getTime()) / MS_PER_DAY);
    runDripSequence(sheet, r + 1, data[r], [faqCol, themeCol, storyCol],
      daysElapsed, parsed.countryCode, parsed.phoneNumber, firstName);
  }
}

function processDripSequence() {
  processBrochureDrip();
  processFacebookDrip();
}

/**
 * Run this once from the editor. Sets up the recurring check for the FAQ/
 * theme/story follow-up sequence. Every 6 hours, not every 15 minutes like
 * the Facebook lead check — day-scale delays don't need minute-level
 * precision, and this scans every row in both sheets on every run. Safe to
 * re-run, clears any existing trigger for this function first.
 */
function setupDripSequenceTrigger() {
  ScriptApp.getProjectTriggers().forEach(function (t) {
    if (t.getHandlerFunction() === 'processDripSequence') ScriptApp.deleteTrigger(t);
  });
  ScriptApp.newTrigger('processDripSequence').timeBased().everyHours(6).create();
  return 'FAQ/theme/story follow-ups will be checked every 6 hours.';
}

function doGet() {
  return json({ ok: true, message: 'TribesforGOOD form logger is running.' });
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

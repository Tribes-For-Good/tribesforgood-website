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
  signPhone: '91-9930926119',

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
    headers: ['Timestamp', 'Email', 'Phone', 'School', 'Source', 'Page', 'Emailed', "WhatsApp'd"],
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
// Sent via Interakt (interakt.ai). Only one template exists: discovery_call
// _request (CONFIG.discoveryCallTemplate), already approved by Meta, name
// fixed in CONFIG since it's not expected to change. Needs one Script
// Property set once, under Project Settings > Script Properties in the
// Apps Script editor — never hardcode the API key here:
//   INTERAKT_API_KEY     the key from Interakt's Settings > API Key
//   TEST_WHATSAPP_PHONE  your own number (10 digits), for sendTestWhatsApp
//
// Until INTERAKT_API_KEY is set, every send quietly no-ops (logged, not
// thrown) so leads keep being emailed and recorded normally either way.

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
 * Sends the discovery_call_request template. Takes an already-resolved
 * countryCode/phoneNumber pair rather than a raw string, since the two
 * callers (the website form vs Meta's Lead Ads sheet) hand phone numbers
 * over in different shapes and each knows how to parse its own.
 */
function sendDiscoveryCallWhatsApp(countryCode, phoneNumber) {
  var apiKey = PropertiesService.getScriptProperties().getProperty('INTERAKT_API_KEY');
  if (!apiKey) {
    Logger.log('sendDiscoveryCallWhatsApp: skipped, INTERAKT_API_KEY not set yet.');
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
  var res = UrlFetchApp.fetch('https://api.interakt.ai/v1/public/message/', {
    method: 'post',
    contentType: 'application/json',
    headers: { Authorization: 'Basic ' + apiKey },
    payload: JSON.stringify({
      fullPhoneNumber: countryDigits + phoneNumber,
      type: 'Template',
      template: {
        name: CONFIG.discoveryCallTemplate,
        languageCode: 'en',
        // Overrides whatever sample image the template was approved with —
        // see the CONFIG comment above.
        headerValues: [CONFIG.discoveryCallImageUrl],
        bodyValues: [],
      },
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
  Logger.log('sendDiscoveryCallWhatsApp: Interakt ' + diagnostic);

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
  var dateCol = headers.indexOf('date');
  var campaignCol = headers.indexOf('campaign name');
  var nameCol = headers.indexOf('full_name');
  var gradeCol = headers.indexOf("what_is_your_child's_grade_level?");
  var schoolCol = headers.indexOf("your_child's_school_(name)_?");
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

function doGet() {
  return json({ ok: true, message: 'TribesforGOOD form logger is running.' });
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

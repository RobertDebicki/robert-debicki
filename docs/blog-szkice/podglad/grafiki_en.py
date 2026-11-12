"""Angielskie wersje grafik i miniaturek wpisów (grafiki-en.html do zrzutów).
ALT każdej grafiki jest ten sam co w src/content/wpisy/<adres>/en.md.
Uruchom: python3 docs/blog-szkice/podglad/grafiki_en.py, potem node docs/blog-szkice/podglad/zrzuty.mjs en"""
from generuj import (KATALOG, KOLEJNOSC, PLYTY, K, P, M, Y, C, NAG, MONO, figura, svg, kwadraty)

AI_ACT = [
    figura('Website chat window where the bot opens the conversation by saying it is an AI assistant', '''<div class="czat">
  <div class="czat-gora mono"><span class="kropka"></span>Website chat</div>
  <div class="dymek bot"><b>Hello, I'm an AI assistant.</b> I can answer questions about our offer or pass your request to the team.</div>
  <div class="dymek klient">How long does an order take?</div>
  <div class="dymek bot">Let me check that for you.</div>
</div>
<div class="czat-opis"><p class="mono">One sentence is enough</p><p>The customer knows from the first message that they're talking to AI. Article 50 of the AI Act requires this when it isn't obvious.</p></div>'''),
    figura('AI Act timeline from February 2025 to August 2028 with August 2, 2026 marked as in force now', '''<ol class="os">
  <li><time class="mono">Feb. 2, 2025</time><b>AI literacy</b><span>Article 4 applies.</span></li>
  <li class="teraz"><time class="mono">Aug. 2, 2026</time><b>Transparency</b><span>Customers know they're talking to AI. In force now.</span></li>
  <li><time class="mono">Dec. 2, 2026</time><b>Content labeling</b><span>Transition period ends for vendors.</span></li>
  <li class="pozniej"><time class="mono">Dec. 2, 2027</time><b>High risk</b><span>E.g., hiring, access to services.</span></li>
  <li class="pozniej"><time class="mono">Aug. 2, 2028</time><b>Regulated products</b><span>AI built into products.</span></li>
</ol>'''),
    figura('Comparison of AI Act duties: what belongs to the tool vendor and what belongs to the business using it', '''<div class="dwie">
  <div class="kol"><p class="mono">Tool vendor</p><ul><li>Technical labeling of AI content</li><li>AI disclosure designed into the product</li></ul></div>
  <div class="kol ty"><p class="mono">You</p><ul><li>Check that the bot introduces itself</li><li>Read the vendor contract</li><li>Disclose deepfakes</li></ul></div>
</div>'''),
    figura('Three steps for a small business to comply with the AI Act: list AI touchpoints, greeting sentence, review graphics', '''<ol class="kroki">
  <li><span class="nr">1</span><b>List AI touchpoints</b><span>Chat, phone bot, automatic emails.</span></li>
  <li><span class="nr">2</span><b>Add one sentence</b><span>“I'm an AI assistant” at the start.</span></li>
  <li><span class="nr">3</span><b>Review media</b><span>Images and audio imitating people must be disclosed.</span></li>
</ol>
<div class="kara"><span class="duza">EUR 15M</span><span>or 3% of turnover is the <b>maximum</b> fine for lack of transparency. SMBs have a lower cap.</span></div>'''),
]

SLUPKI = [('Poland', 8.36, True), ('EU, all', 19.95, False), ('EU, small', 17.13, False),
          ('EU, medium', 30.36, False), ('EU, large', 55.03, False)]
WYKRES = ''.join(
    f'<div class="rz"><span class="etk">{n}</span><span class="tor"><span class="sl{" pl" if pl else ""}" '
    f'style="width:{v / 60 * 100:.1f}%"></span></span><span class="wart mono">{v}%</span></div>' for n, v, pl in SLUPKI)

AUTOMATYZACJA = [
    figura('Bar chart: 8.36 percent of companies in Poland use AI, compared with 19.95 percent in the European Union',
           f'<p class="graf-tyt">Companies using AI in 2025</p><div class="slupki">{WYKRES}</div>'),
    figura('Three questions before your first automation: hours the task takes, where the data comes from, what if the system errs', '''<ol class="kroki">
  <li><span class="nr">1</span><b>How many hours?</b><span>How long the task takes each month.</span></li>
  <li><span class="nr">2</span><b>Where's the data?</b><span>Always in the same place: email, a form.</span></li>
  <li class="wazne"><span class="nr">3</span><b>What if it errs?</b><span>Who will notice. A person decides here.</span></li>
</ol>'''),
    figura('Three project results: 60 fewer hours of work a month, AI model for 29 of 230 customers, 28 customers beyond the manual list', '''<div class="liczby">
  <div><span class="duza">60 h</span><span>less manual work a month at a training company, according to the owner</span></div>
  <div><span class="duza">29 of 230</span><span>customers for whom the language model kicks in</span></div>
  <div><span class="duza">+28</span><span>customers beyond the manual list, order history PLN 174,717</span></div>
</div>'''),
]

DOKUMENTY = [
    figura('Before and after: retyping applications from files by hand versus one database with an owner for each application', '''<div class="dwie">
  <div class="kol"><p class="mono">Before</p><ul><li>Data retyped by hand</li><li>Files in email and SharePoint</li><li>No shared database</li></ul></div>
  <div class="kol ty"><p class="mono">After</p><ul><li>Documents downloaded daily</li><li>One database in Airtable</li><li>Every application has an owner</li></ul></div>
</div>'''),
    figura('Document reading flow: email and SharePoint, OCR with a language model, data in Airtable, uncertain reads to a person', '''<div class="przeplyw">
  <div class="wezel"><span class="mono">1</span><b>Email and SharePoint</b><span>downloaded daily</span></div>
  <div class="strz" aria-hidden="true"></div>
  <div class="wezel"><span class="mono">2</span><b>OCR and a language model</b><span>Gemini reads the document</span></div>
  <div class="strz" aria-hidden="true"></div>
  <div class="wezel"><span class="mono">3</span><b>Amounts, deadlines, counterparties</b><span>extracted data</span></div>
  <div class="strz" aria-hidden="true"></div>
  <div class="rozwidlenie">
    <div class="wezel ok"><span class="mono">confident read</span><b>Airtable</b><span>saved, owner assigned</span></div>
    <div class="wezel czlowiek"><span class="mono">uncertain read</span><b>A person confirms</b><span>a designated person approves</span></div>
  </div>
</div>'''),
    figura('Mockup of a review screen: an application scan next to an extracted amount flagged as uncertain, waiting for approval', '''<div class="potw">
  <div class="skan" aria-hidden="true"><i></i><i></i><i class="kr"></i><i></i><i class="kr"></i><i></i></div>
  <dl class="pola">
    <div><dt class="mono">Counterparty</dt><dd>Municipality, sample</dd></div>
    <div><dt class="mono">Deadline</dt><dd>Nov. 30</dd></div>
    <div class="niep"><dt class="mono">Amount</dt><dd>PLN 12,400 <em class="mono">uncertain</em></dd></div>
    <div class="przyc"><span class="btn solid">Approve</span><span class="btn">Correct</span></div>
  </dl>
</div>'''),
]

VOICE_BOT = [
    figura('Voice bot timeline: form at 0:00, bot call at 2:00, a note with need and budget goes to Pipedrive', '''<ol class="minuty">
  <li><time class="mono">0:00</time><b>Form</b><span>The customer sends an inquiry.</span></li>
  <li class="teraz"><time class="mono">2:00</time><b>Bot calls</b><span>Qualifying questions.</span></li>
  <li><time class="mono">after the call</time><b>Note</b><span>Need and budget.</span></li>
  <li><time class="mono">n8n</time><b>Pipedrive</b><span>On the right deal.</span></li>
</ol>
<div class="kara"><span class="duza">15</span><span>calls a day in the project described</span></div>'''),
    figura('Mockup of a voice bot note in a CRM with need, budget, and next step fields for the sales rep', '''<div class="ticket">
  <header class="mono"><span>Bot call note</span><span>Pipedrive</span></header>
  <dl>
    <div><dt>Need</dt><dd>Description of the customer's need</dd></div>
    <div><dt>Budget</dt><dd>Amount given on the call</dd></div>
    <div><dt>Status</dt><dd>Call completed or needs follow-up</dd></div>
    <div><dt>Next step</dt><dd>Sales rep's call</dd></div>
  </dl>
</div>'''),
    figura('Division of work: the voice bot gathers information and writes the note, the sales rep runs the sales conversation', '''<div class="dwie">
  <div class="kol"><p class="mono">Voice bot</p><ul><li>Calls within 2 minutes</li><li>Asks qualifying questions</li><li>Saves the note</li></ul></div>
  <div class="kol ty"><p class="mono">Sales rep</p><ul><li>Knows the need before calling</li><li>Sells and negotiates</li><li>Follows up on dropped calls</li></ul></div>
</div>'''),
]

NARZEDZIA = [
    figura('A workflow with a trigger and four actions: four tasks in Zapier, five operations in Make, one execution in n8n', f'''<p class="graf-tyt">Trigger and four actions, one record: units used</p>
<div class="licznik">
  <div class="rz"><b>Zapier</b><span class="kw">{kwadraty(4)}</span><span class="mono">4 tasks</span></div>
  <div class="rz"><b>Make</b><span class="kw">{kwadraty(5)}</span><span class="mono">5 operations</span></div>
  <div class="rz n8n"><b>n8n</b><span class="kw"><i class="p cale"></i></span><span class="mono">1 execution</span></div>
</div>'''),
    figura('Comparison table of n8n, Make, and Zapier: ease of use, technical knowledge, where the data lives', '''<div class="tab-wrap"><table class="tab">
  <thead><tr><th></th><th>Zapier</th><th>Make</th><th>n8n</th></tr></thead>
  <tbody>
    <tr><th>Getting started</th><td>Easiest</td><td>Visual editor</td><td>Needs know-how</td></tr>
    <tr><th>Ready-made connections</th><td>10,000+</td><td>3,500+</td><td>About 1,000, plus API</td></tr>
    <tr><th>Data</th><td>Vendor cloud</td><td>Vendor cloud</td><td>Can be your server</td></tr>
    <tr><th>Best for</th><td>Non-technical teams</td><td>Moderate know-how</td><td>Control and scale</td></tr>
  </tbody>
</table></div>'''),
    figura('n8n on AWS in refrigerated transportation: more than 150 vehicles, 20 dispatchers, readings every minute', '''<div class="liczby">
  <div><span class="duza">150+</span><span>vehicles monitored</span></div>
  <div><span class="duza">20</span><span>dispatchers on the dashboard</span></div>
  <div><span class="duza">1 min</span><span>trailer temperature refresh</span></div>
</div>'''),
]

GRAFIKI_EN = {
    'ai-act-dla-malej-firmy': AI_ACT,
    'ile-firm-uzywa-ai': AUTOMATYZACJA,
    'automatyczny-odczyt-dokumentow': DOKUMENTY,
    'voice-bot-dla-firmy': VOICE_BOT,
    'n8n-make-czy-zapier': NARZEDZIA,
}

MINIATURY_EN = {
    'ai-act-dla-malej-firmy': svg(C, f'''
<text x="28" y="44" {MONO} font-size="14" fill="{K}">AI ACT · AUG. 2, 2026</text>
<rect x="28" y="66" width="300" height="176" fill="{P}" stroke="{K}" stroke-width="4"/>
<rect x="28" y="66" width="300" height="30" fill="{K}"/><circle cx="46" cy="81" r="6" fill="{C}"/>
<rect x="44" y="114" width="268" height="46" rx="4" fill="{Y}" stroke="{K}" stroke-width="3"/>
<text x="56" y="143" {NAG} font-size="16" fill="{K}">I'm an AI assistant</text>
<rect x="150" y="176" width="160" height="42" rx="4" fill="{K}"/>
<rect x="166" y="194" width="110" height="7" fill="{P}"/>
<circle cx="400" cy="150" r="52" fill="{K}"/><path d="M376 150l16 16 32-34" fill="none" stroke="{Y}" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/>''',
        "Chat window with a bot that says I'm an AI assistant, next to an AI Act compliance check mark"),
    'ile-firm-uzywa-ai': svg(M, f'''
<text x="28" y="44" {MONO} font-size="14" fill="{P}">COMPANIES USING AI · 2025</text>
<text x="28" y="132" {NAG} font-size="74" fill="{P}">8.36%</text>
<text x="30" y="160" {MONO} font-size="14" fill="{P}">POLAND</text>
<rect x="28" y="196" width="66" height="22" fill="{Y}"/><text x="104" y="213" {MONO} font-size="14" fill="{P}">PL</text>
<rect x="28" y="228" width="158" height="22" fill="{P}"/><text x="196" y="245" {MONO} font-size="14" fill="{P}">EU 19.95%</text>
<g fill="none" stroke="{K}" stroke-width="5" stroke-linejoin="round"><rect x="330" y="70" width="120" height="150" fill="{P}"/></g>
<path d="M352 196h76M352 170h76M352 144h50" stroke="{K}" stroke-width="6"/><circle cx="420" cy="96" r="14" fill="{Y}" stroke="{K}" stroke-width="4"/>''',
        'Large figure of 8.36 percent of companies in Poland using AI according to Eurostat, compared with the European Union'),
    'automatyczny-odczyt-dokumentow': svg(Y, f'''
<text x="28" y="44" {MONO} font-size="14" fill="{K}">PDF → DATABASE</text>
<rect x="44" y="78" width="120" height="156" fill="{P}" stroke="{K}" stroke-width="4"/>
<rect x="30" y="66" width="120" height="156" fill="{P}" stroke="{K}" stroke-width="4"/>
<path d="M48 96h84M48 118h84M48 140h56M48 162h84M48 184h50" stroke="{K}" stroke-width="6"/>
<path d="M190 150h64" stroke="{K}" stroke-width="6"/><path d="M248 134l18 16-18 16" fill="none" stroke="{K}" stroke-width="6" stroke-linejoin="round"/>
<rect x="286" y="76" width="166" height="148" fill="{P}" stroke="{K}" stroke-width="4"/>
<path d="M286 113h166M286 150h166M286 187h166" stroke="{K}" stroke-width="3"/>
<path d="M300 96l8 8 14-14M300 133l8 8 14-14" fill="none" stroke="{C}" stroke-width="5"/>
<rect x="296" y="160" width="146" height="22" fill="{C}"/><text x="306" y="177" {MONO} font-size="14" fill="{K}">? review</text>
<path d="M300 207l8 8 14-14" fill="none" stroke="{C}" stroke-width="5"/>''',
        'Stack of documents, an arrow, and a data table with one row flagged for review'),
    'voice-bot-dla-firmy': svg(C, f'''
<text x="28" y="44" {MONO} font-size="14" fill="{K}">FORM → PHONE CALL</text>
<text x="24" y="190" {NAG} font-size="108" fill="{K}">2:00</text>
<circle cx="404" cy="140" r="56" fill="{K}"/>
<path transform="translate(12 0)" d="M366 112c-6 6-6 18 6 34s28 26 38 22l10-10-16-14-8 6c-6-2-16-12-18-18l6-8-12-18z" fill="{Y}"/>
<path transform="translate(12 0)" d="M418 104a26 26 0 0 1 18 18M414 86a44 44 0 0 1 36 36" fill="none" stroke="{Y}" stroke-width="5" stroke-linecap="round"/>
<rect x="28" y="222" width="300" height="20" fill="{P}"/><text x="38" y="237" {MONO} font-size="13" fill="{K}">note: need, budget</text>''',
        'Large 2:00 text and a phone handset, the bot calls the customer back within two minutes'),
    'n8n-make-czy-zapier': svg(M, f'''
<text x="28" y="44" {MONO} font-size="14" fill="{P}">TRIGGER + 4 ACTIONS</text>
<text x="28" y="98" {NAG} font-size="22" fill="{P}">Zapier</text>
<text x="28" y="160" {NAG} font-size="22" fill="{P}">Make</text>
<text x="28" y="222" {NAG} font-size="22" fill="{P}">n8n</text>
{"".join(f'<rect x="{130 + i * 62}" y="{y}" width="52" height="40" fill="{P}" stroke="{K}" stroke-width="3"/>' for y, n in ((70, 4), (132, 5)) for i in range(n))}
<rect x="130" y="194" width="300" height="40" fill="{Y}" stroke="{K}" stroke-width="3"/>
<text x="146" y="221" {MONO} font-size="16" fill="{K}">1 execution</text>''',
        'Unit comparison: four tasks in Zapier, five operations in Make, one execution in n8n'),
}


def main():
    styl = (KATALOG / 'styl.css').read_text()
    artykuly = ''.join(
        f'<section><article id="{n}" class="wpis" style="--pl:{PLYTY[i]}"><div class="wpis-tresc">{"".join(GRAFIKI_EN[n])}</div></article></section>'
        for i, n in enumerate(KOLEJNOSC))
    karty = ''.join(f'<article class="karta" style="--pl:{PLYTY[i]}"><a class="mini" href="#{n}">{MINIATURY_EN[n]}</a></article>'
                    for i, n in enumerate(KOLEJNOSC))
    strona = f'''<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>English graphics</title>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Anybody:wdth,wght@50..150,400..900&family=Onest:wght@400;500;600;700&family=Spline+Sans+Mono:wght@400;500;600&display=swap">
<style>{styl}</style></head><body><main class="sheet"><section id="spis"><div class="karty">{karty}</div></section>{artykuly}</main></body></html>'''
    (KATALOG / 'grafiki-en.html').write_text(strona)
    print('Zapisano', KATALOG / 'grafiki-en.html')


if __name__ == '__main__':
    main()

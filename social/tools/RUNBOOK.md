# Paramind Brief: TikTok + Facebook carousel run (Mon / Wed / Fri, 17:17 UK)

This is the procedure each scheduled run follows. The run **publishes the carousel to TikTok and to the Paramind Facebook Page automatically** through Native (Mark approved auto-posting to TikTok on 20 Oct 2026, and added Facebook on 23 Nov 2026). It is one Native post with two destinations. Nobody reviews it first, so the self-check in step 5 is mandatory. If any doubt remains, leave the post as a draft and tell Mark rather than publishing.

Since 21 Nov 2026 the same stories also feed the website: the **Paramedic news page** (`news.html`) and the headline strip on the home page both read `social/latest.json`. Step 5b updates that file. Nobody reviews that either, so it is only updated when the self-check has passed.

## 0. Which news to use

George sends a news email **every day, including weekends** (since 20 Oct 2026). Read every news email received since the previous run, i.e. after the previous run day:

| Run day   | George emails to read                         |
|-----------|-----------------------------------------------|
| Monday    | Saturday's, Sunday's and today's              |
| Wednesday | Tuesday's and today's                         |
| Friday    | Thursday's and today's                        |

Put all the stories from those emails into one pool and choose from it. If one of the expected emails is missing, carry on with the ones that arrived.

The emails come from `admin@fmsportal.co.uk` to `hello@paramind.co.uk`, with subjects starting "UK paramedic news for students". Use the Gmail connector to search, then read each email in full (`get_thread`, plain text). Ignore the "Paramind mentions" emails.

If there are no news emails for the period, stop and tell Mark (see step 7). Do not make up stories.

## 1. Pick the stories (3 to 5, ideally 5)

Audience: **qualified UK paramedics first, with students in mind.** Use a grown-up, professional tone.

Prefer stories that matter across the profession: workforce, jobs and NQP prospects, pressure on services, service changes, notable practice, and good-news outcomes. Prefer variety across regions and themes. End on a positive or human story if there is one.

Leave out:
- **Fitness-to-practise or disciplinary stories naming an individual.**
- **Names of patients**, and of children in any role. Use "a 13-year-old" or "a woman in her 60s".
- Near-duplicates of the previous carousel. Read the last `social/<date>/content.json` in the repo and don't repeat a story.
- Narrow local items (a single postcode's FOI data, minor local awards) unless the news is thin.

## 2. Write each story

For each story, write in your own words. Do not copy the email text verbatim.

| Field      | What to write |
|------------|---------------|
| `region`   | Short label: "England", "Wales", "Scotland", "Northern Ireland", "London", "North East", "UK-wide", etc. |
| `headline` | Up to about 60 characters. Factual, no clickbait. |
| `body`     | 2 to 3 sentences, up to about 260 characters. Keep figures exactly as the email gives them. Never round up a figure or turn "second highest" into "record". |
| `why`      | 1 to 2 sentences, up to about 130 characters. Why it matters to a working paramedic. Mention students only where it is natural. |
| `source`   | The outlet named in the email (e.g. "BBC News", "HSJ", "NHS England"). |
| `link`     | The web address of the original article, copied **exactly** from the email (it appears in angle brackets `<https://...>` beside that story's headline). Never guess, shorten or build a link. If the email gives no link for a story, use `""`. |

| `keywords` | A list of 6 to 10 **search terms** for the website's news search. They are never shown on the page or the slides. Add what a paramedic might type to find this story that is *not* already in the headline or body: the wider theme ("winter pressure", "handover delays"), jargon and abbreviations ("W45", "OHCA", "NQP"), the fuller name of anything abbreviated, and plain-English alternatives ("jobs" for a recruitment story). Lower case unless it is an abbreviation. No drug names, and no names of patients or private individuals. |

### Content policy (non-negotiable)

- No drug names, doses, treatment protocols or clinical management guidance. Service and pathway news is fine (e.g. "taken straight to the ECMO team"), but not how to treat.
- Never call Hollie "AI".
- Any percentage you compute must be checked by arithmetic, e.g. a fall from 793,000 to 676,000 is 15%.

## 3. Build the slides

```bash
git clone --depth 1 https://github.com/markdevonuk/paramind /home/claude/paramind   # if not already present
cd /home/claude/paramind/social/tools
npm install --silent
DATE=$(TZ=Europe/London date +%F)          # e.g. 2026-10-23
mkdir -p ../$DATE
# write ../$DATE/content.json  (format below)
CHROMIUM_PATH=/opt/pw-browsers/chromium-1194/chrome-linux/chrome node brief.mjs ../$DATE/content.json ../$DATE
```

If `/opt/pw-browsers/chromium-1194` doesn't exist, use whichever `chrome` binary is under `/opt/pw-browsers/`. Never run `playwright install`.

`content.json` format:

```json
{
  "date": "20–22 October 2026",
  "stories": [
    { "region": "England", "headline": "…", "body": "…", "why": "…", "source": "BBC News", "link": "https://www.bbc.co.uk/news/articles/…", "keywords": ["handover delays", "winter pressure", "W45"] }
  ]
}
```

The slide builder ignores `link` and `keywords`; they are there for the website (step 5b).

For `date`, use the span of the emails used, e.g. "24–26 October 2026" for a Monday run, or "Thursday 22 – Friday 23 October 2026".

The script exits with code 2 and prints `OVERFLOW` if any text would not fit. If that happens, shorten that story's body or why text and run it again. Then **look at every PNG** (Read tool) to check that the text is readable and nothing is cut off.

## 4. Publish the images to the website

Commit only the new `social/<DATE>/` folder (PNGs plus `content.json`) to `main` and push. Use the commit message `Add Paramind Brief images (<DATE>)`.

- Never touch any other file.
- Pull with `--rebase` before pushing.
- Wait about 90 seconds for GitHub Pages. Then check that `https://paramind.co.uk/social/<DATE>/01-intro.png` loads (e.g. with WebFetch, which reports "image content", or an HTTP 200).

## 5. Create the post in Native (TikTok + Facebook)

- Workspace "Paramind's Workspace", brand **Paramind**, brandId `da13bb6f-3b9d-4e1c-9488-729854a56327`.
- For each PNG in slide order, call `upload_image` with `sourceUrl=https://paramind.co.uk/social/<DATE>/<file>.png` and a description like "Paramind Brief <DATE> slide 3 of 7".
- Call `create_draft` with:
  - `mediaIds`: all the uploaded image ids, **in slide order**
  - `platforms: ["TIKTOK", "FACEBOOK"]`
  - `caption` (this is the TikTok caption): in this pattern: "This week's Brief: <one short clause per story, comma-separated>. #paramedic #ambulance #NHS #studentparamedic #prehospital". Keep it under 2,200 characters.
- Then give Facebook its own caption with `update_post`, `platform: "FACEBOOK"`, `text`: the same opening sentence ("This week's Brief: …."), then a blank line, then "Tap the images to read each story. Full stories and links: https://paramind.co.uk/news.html", then a blank line, then "#paramedic #NHS". Facebook shows links as clickable, TikTok does not, so the link goes in the Facebook caption only.
- Check the draft with `view_post`: the image count matches the slides, the order is right, the destinations are exactly TIKTOK and FACEBOOK (nothing else), each caption is within its own limit, and the Facebook caption contains the news-page link.

### Self-check before publishing (mandatory, because no human reviews the post)

Re-read each story against its source email and confirm all of the following. If any check fails, fix it and rebuild. If you can't fix it, **leave the post as a draft**, skip the publish step and tell Mark.

- Every figure, date and name on the slides matches the email exactly.
- No drug names, doses or treatment guidance appear.
- No patient, child or individual fitness-to-practise case is named.
- Hollie is not called "AI".
- No slide reported `OVERFLOW`, and every PNG looked right when you viewed it.
- The story is not a repeat of the previous carousel.
- No `keywords` entry is a drug name or the name of a patient or private individual.
- Every `link` is copied exactly from the email, starts with `https://`, and belongs to that story (not the story above or below it).

### Publish

- Call `publish_post_now` with the post id and `platforms: ["TIKTOK", "FACEBOOK"]`. Call it **once only**.
- Read `publishResults`; there is one entry per platform, and each is judged on its own:
  - `published` means it is live.
  - `pending` / `publishing_in_progress` is normal: do not retry. Wait about a minute, then call `get_post_status` to get the live URL.
  - `failed`: report the code. Only retry if `retryable` is true, and only once, and then pass **only the failed platform** in `platforms` (a destination that already published is never re-sent, but name only the failed one anyway).
  - One platform failing does not undo the other. If TikTok went live and Facebook failed (or the other way round), report which went out and which did not.
  - TikTok photo posts usually come back with `url: null` even when they succeed (seen on 20 Oct 2026). If the status is `published` / `SUCCESS`, treat it as live and point Mark to https://www.tiktok.com/@paramindapp rather than retrying. The same applies to Facebook: if it shows published with no URL, point Mark to https://facebook.com/paramind.

If any Native call returns `cancelled`, `forbidden`, `insufficient_scope` or `writes_disabled`, or the TikTok or Facebook channel needs reconnecting, stop and report it. Do not retry in a loop.

## 5b. Update the Paramedic news page on the website

Do this **only if the self-check passed**. If the post was left as a draft because a check failed, skip this step so the website keeps the previous round-up. If the self-check passed but TikTok or Facebook failed for a technical reason (channel needs reconnecting, Native error), still do this step.

Write `social/latest.json` in the repo. It is this run's `content.json` with two extra fields:

```json
{
  "date": "20–22 October 2026",
  "folder": "2026-10-23",
  "published": "2026-10-23T17:25:00Z",
  "stories": [
    { "region": "England", "headline": "…", "body": "…", "why": "…", "source": "BBC News", "link": "https://…" }
  ],
  "earlier": [
    { "folder": "2026-10-21", "date": "20–21 October 2026" },
    { "folder": "2026-10-20", "date": "Monday 20 October 2026" }
  ]
}
```

- `folder` is this run's `<DATE>` folder name.
- `published` is the time now in UTC, from `date -u +%Y-%m-%dT%H:%M:%SZ`. It matters: Paramind's own news articles (which Mark adds in admin) drop off the page once a round-up with a later `published` time appears.
- `stories` are the same stories, in the same order, with the same wording as the slides.
- `earlier` is the list behind the "Earlier news" section of the page. **Read the existing `social/latest.json` before you overwrite it.** The new `earlier` list is one new entry for the round-up being replaced, `{ "folder": <old folder>, "date": <old date> }`, followed by the old file's `earlier` list unchanged. Newest first. Do not add the entry if the old `folder` is the same as this run's folder (a re-run on the same day), and never drop or reorder existing entries.

Also update `social/stories.json`, the file the news page's **search** reads. It holds every story from every round-up, newest first, in one list called `stories`. Add this run's stories to the **top** of that list, in slide order. Each entry is the story from `content.json` (region, headline, body, why, source, link, keywords) plus two extra fields, `"folder"` (this run's `<DATE>`) and `"date"` (the same `date` text as the round-up), like this:

```json
{ "folder": "2026-10-23", "date": "20–22 October 2026", "region": "England", "headline": "…", "body": "…", "why": "…", "source": "BBC News", "link": "https://…", "keywords": ["…", "…"] }
```

Never change, reorder or remove the entries already in `social/stories.json`. The one exception is a re-run on the same day: if entries with this run's `folder` are already there, replace them rather than adding duplicates. Check the file is still valid JSON before committing (`python3 -c "import json;json.load(open('social/stories.json'))"`). Do not touch `social/jargon.json`; Mark maintains that.

Then commit **only** `social/latest.json` and `social/stories.json` with the message `Update Paramedic news page (<DATE>)`, pull with `--rebase`, and push. Wait about 90 seconds and check that `https://paramind.co.uk/social/latest.json` shows the new date. Do not change `news.html` or any other file.

## 6. Tidy up

Nothing else needs doing. The images stay on the site, and old dated folders can be removed later.

## 7. Report back to Mark

Finish with a short summary:
- whether it went live on TikTok and on Facebook, with the links (or the reason it was left as a draft, or which platform failed)
- whether the Paramedic news page (https://paramind.co.uk/news.html) was updated
- the stories used, and any left out with the reason
- any editorial call he may want to look at
- the Native post link (`appUrl`)
- anything that failed

On failure, say exactly which step failed and what Mark needs to do.

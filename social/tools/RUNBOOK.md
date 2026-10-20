# Paramind Brief: TikTok carousel run (Mon / Wed / Fri, 17:17 UK)

This is the procedure each scheduled run follows. The run **publishes the carousel to TikTok automatically** through Native (Mark approved auto-posting on 20 Oct 2026). Nobody reviews it first, so the self-check in step 5 is mandatory. If any doubt remains, leave the post as a draft and tell Mark rather than publishing.

## 0. Which news to use

| Run day   | George emails to read                         |
|-----------|-----------------------------------------------|
| Monday    | the previous Friday's and today's             |
| Wednesday | Tuesday's and today's                         |
| Friday    | Thursday's and today's                        |

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
    { "region": "England", "headline": "…", "body": "…", "why": "…", "source": "BBC News" }
  ]
}
```

For `date`, use the span of the emails used, e.g. "Thursday 22 – Friday 23 October 2026" or "20–21 October 2026".

The script exits with code 2 and prints `OVERFLOW` if any text would not fit. If that happens, shorten that story's body or why text and run it again. Then **look at every PNG** (Read tool) to check that the text is readable and nothing is cut off.

## 4. Publish the images to the website

Commit only the new `social/<DATE>/` folder (PNGs plus `content.json`) to `main` and push. Use the commit message `Add Paramind Brief images (<DATE>)`.

- Never touch any other file.
- Pull with `--rebase` before pushing.
- Wait about 90 seconds for GitHub Pages. Then check that `https://paramind.co.uk/social/<DATE>/01-intro.png` loads (e.g. with WebFetch, which reports "image content", or an HTTP 200).

## 5. Create the TikTok draft in Native

- Workspace "Paramind's Workspace", brand **Paramind**, brandId `da13bb6f-3b9d-4e1c-9488-729854a56327`.
- For each PNG in slide order, call `upload_image` with `sourceUrl=https://paramind.co.uk/social/<DATE>/<file>.png` and a description like "Paramind Brief <DATE> slide 3 of 7".
- Call `create_draft` with:
  - `mediaIds`: all the uploaded image ids, **in slide order**
  - `platforms: ["TIKTOK"]`
  - `caption`: in this pattern: "This week's Brief: <one short clause per story, comma-separated>. #paramedic #ambulance #NHS #studentparamedic #prehospital". Keep it under 2,200 characters.
- Check the draft with `view_post`: the image count matches the slides, the order is right, the only destination is TIKTOK, and the caption is within its limit.

### Self-check before publishing (mandatory, because no human reviews the post)

Re-read each story against its source email and confirm all of the following. If any check fails, fix it and rebuild. If you can't fix it, **leave the post as a draft**, skip the publish step and tell Mark.

- Every figure, date and name on the slides matches the email exactly.
- No drug names, doses or treatment guidance appear.
- No patient, child or individual fitness-to-practise case is named.
- Hollie is not called "AI".
- No slide reported `OVERFLOW`, and every PNG looked right when you viewed it.
- The story is not a repeat of the previous carousel.

### Publish

- Call `publish_post_now` with the post id and `platforms: ["TIKTOK"]`. Call it **once only**.
- Read `publishResults`:
  - `published` means it is live.
  - `pending` / `publishing_in_progress` is normal: do not retry. Wait about a minute, then call `get_post_status` to get the live URL.
  - `failed`: report the code. Only retry if `retryable` is true, and only once.
  - TikTok photo posts usually come back with `url: null` even when they succeed (seen on 20 Oct 2026). If the status is `published` / `SUCCESS`, treat it as live and point Mark to https://www.tiktok.com/@paramindapp rather than retrying.

If any Native call returns `cancelled`, `forbidden`, `insufficient_scope` or `writes_disabled`, or the TikTok channel needs reconnecting, stop and report it. Do not retry in a loop.

## 6. Tidy up

Nothing else needs doing. The images stay on the site, and old dated folders can be removed later.

## 7. Report back to Mark

Finish with a short summary:
- whether it went live, with the TikTok link (or the reason it was left as a draft)
- the stories used, and any left out with the reason
- any editorial call he may want to look at
- the Native post link (`appUrl`)
- anything that failed

On failure, say exactly which step failed and what Mark needs to do.

#!/bin/bash
# Updates faculty records on production WordPress via abit/v1 REST API.
# Run after deploying api/faculties.php or standalone to persist CMS data.

API="https://www.vsau.ru/wp-json/abit/v1/faculties"

strip_phone() {
  echo "$1" | sed -E 's/[[:space:]]*\(WhatsApp,?[[:space:]]*Telegram\)//gi'
}

curl -s "$API" | python3 -c "
import json, sys, urllib.request

data = json.load(sys.stdin)
api = '$API'

def strip_phone(s):
    import re
    return re.sub(r'\s*\(WhatsApp,?\s*Telegram\)', '', s or '', flags=re.I).strip()

def norm_vk(link):
    if not link:
        return link
    return link.replace('https://', '').replace('http://', '').strip('/')

updates = []
for f in data:
    payload = dict(f)
    payload['tel1'] = strip_phone(payload.get('tel1', ''))
    payload['tel2'] = strip_phone(payload.get('tel2', ''))
    payload['tel3'] = strip_phone(payload.get('tel3', ''))
    payload['vk_link'] = norm_vk(payload.get('vk_link', ''))

    if 'Отделение СПО' in payload.get('faculty', ''):
        payload['faculty'] = 'Факультет СПО'
        payload['teacher_position'] = payload.get('teacher_position', '').replace(
            'отделением', 'факультетом'
        )

    if f['id'] in (43878, 42574):
        payload['vk_link'] = 'vk.com/abitvsau'

    body = json.dumps({
        'faculty': payload['faculty'],
        'teacher': payload['teacher'],
        'teacher_position': payload['teacher_position'],
        'vk_link': payload['vk_link'],
        'tel1': payload['tel1'],
        'tel2': payload['tel2'],
        'tel3': payload['tel3'],
        'order': payload['order'],
    }).encode()

    req = urllib.request.Request(
        f\"{api}/{f['id']}\",
        data=body,
        headers={'Content-Type': 'application/json'},
        method='PUT',
    )
    with urllib.request.urlopen(req) as resp:
        print(f\"Updated {f['id']}: {resp.status}\")
"

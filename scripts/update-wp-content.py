#!/usr/bin/env python3
"""Generate and push abit WordPress post/page content updates."""

from __future__ import annotations

import json
import re
import urllib.error
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / "docs/abit-2026/wp-content"
OUT = ROOT / "docs/abit-2026/wp-content-updated"
API = "https://www.vsau.ru/wp-json/abit/v1"

BTN_SVG = (
    '<svg class="icon" width="20" height="20" viewBox="0 0 17 17" fill="none" '
    'xmlns="http://www.w3.org/2000/svg"><path d="M17 17H0V15.5833H17V17ZM10.0158 '
    "13.5363L16.9717 6.375H12.0487V0H4.95833V6.375H0.0495833L6.99125 13.5363C7.395 "
    "13.9471 7.92625 14.1667 8.49292 14.1667C9.05958 14.1667 9.59792 13.9471 "
    '10.0017 13.5363H10.0158Z" fill="#fff"></path></svg>'
)


def blue_button(href: str, title: str) -> str:
    return (
        f'<a href="{href}" style="color:#fff" '
        f'class="wp-block-create-block-block-link block-link_content blue front">'
        f"{BTN_SVG}<p>{title}</p></a>\n\n"
    )


def build_foreign_citizens() -> str:
    features = (
        "http://www.vsau.ru/wp-content/uploads/2026/01/"
        "1_Особенности-проведения-приема-иностранных-граждан_2026.pdf"
    )
    programs = (
        "http://www.vsau.ru/wp-content/uploads/2026/05/"
        "Bachelor-Programs-and-Masters-degree-Programs.pdf"
    )
    return (
        blue_button(
            features,
            "Особенности приема иностранных граждан<br>и лиц без гражданства",
        )
        + blue_button(
            programs,
            "Bachelor Programs and Master's degree Programs",
        )
    )


def build_olympiads() -> str:
    return (
        '<div class="block_switch_content_container">'
        '<div id="switch_arr" class="block_switch_content_head_container blue">'
        '<h2 class="block_switch_content_head">'
        "Химия и биология — основы жизни (Результаты)"
        "</h2>"
        '<span class="block_switch_content_head_icon">'
        '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" '
        'xmlns="http://www.w3.org/2000/svg">'
        '<path d="M6 9L12 15L18 9" stroke="#ffffff" stroke-width="2" '
        'stroke-linecap="round" stroke-linejoin="round"></path></svg></span></div>'
        '<div class="switch_hand" id="switch_hand">'
        '<div class="block_switch_content" style="position:relative">'
        "<p>Результаты олимпиады и дополнительная информация размещены на сайте "
        'кафедры химии:</p>'
        '<p><a href="https://chemistry.vsau.ru/shkolnikam-i-ix-nastavnikam-2/">'
        "https://chemistry.vsau.ru/shkolnikam-i-ix-nastavnikam-2/</a></p>"
        "</div></div></div>\n"
    )


def renumber_list_items(html: str, start: int, end: int = 15) -> str:
    for n in range(end, start - 1, -1):
        html = html.replace(f">{n})&nbsp;", f">{n + 1})&nbsp;")
    return html


def insert_after_numbered_item(html: str, after: int, insert_html: str) -> str:
    pattern = rf"(<p class=\"wp-block-paragraph\">{after}\)&nbsp;.*?</p>\n\n)"
    match = re.search(pattern, html, flags=re.S)
    if not match:
        raise ValueError(f"Item {after}) not found")
    pos = match.end()
    tail = html[pos:]
    tail = renumber_list_items(tail, after + 1)
    return html[:pos] + insert_html + tail


def append_form_buttons(html: str, buttons: list[tuple[str, str]]) -> str:
    block = '<h3 class="wp-block-heading">Формы и образцы заполнения заявлений:</h3>\n\n\n'
    for href, title in buttons:
        block += blue_button(href, title)
    if "Формы и образцы заполнения заявлений" in html:
        html = re.sub(
            r"<h3 class=\"wp-block-heading\">Формы и образцы заполнения заявлений:</h3>.*",
            block.rstrip() + "\n",
            html,
            flags=re.S,
        )
        return html
    return html + "\n" + block


def fix_bachelor(html: str) -> str:
    consent_item = (
        '<p class="wp-block-paragraph">7)&nbsp;<strong>заявление о согласии на '
        "зачисление</strong> (на бюджетной основе)</p>\n\n\n"
    )
    marker = (
        '<p class="wp-block-paragraph">6)&nbsp;<strong>заявление о приеме&nbsp;</strong>'
        "(на бюджетной основе)</p>\n\n\n"
    )
    parts = html.split(marker)
    if len(parts) < 2:
        raise ValueError("Bachelor budget application marker not found")
    html = parts[0] + marker + consent_item
    for part in parts[1:]:
        html += renumber_list_items(part, 7)

    buttons = [
        (
            "http://www.vsau.ru/wp-content/uploads/2026/05/Заявление-о-согласии-на-зачисление_2026.pdf",
            "Форма заявления о согласии на зачисление",
        ),
        (
            "http://www.vsau.ru/wp-content/uploads/2026/05/Заявление-о-согласии-на-зачисление_образец_2026.pdf",
            "Образец заполнения заявления о согласии на зачисление",
        ),
        (
            "http://www.vsau.ru/wp-content/uploads/2026/05/Заявление-о-приеме_платное_2026.pdf",
            "Форма заявления о приеме (на договорной основе)",
        ),
        (
            "http://www.vsau.ru/wp-content/uploads/2026/05/Заявление-о-приеме_платное_образец_2026.pdf",
            "Образец заполнения заявления о приеме (на договорной основе)",
        ),
    ]
    html = append_form_buttons(html, buttons)
    html = html.replace(
        "Форма заявления о приемеФорма заявления о приеме",
        "Форма заявления о приеме",
    )
    return html


def fix_master(html: str) -> str:
    consent_item = (
        '<p class="wp-block-paragraph">8)&nbsp;<strong>заявление о согласии на '
        "зачисление</strong> (на бюджетной основе)</p>\n\n\n"
    )
    html = insert_after_numbered_item(html, 7, consent_item)

    buttons = [
        (
            "http://www.vsau.ru/wp-content/uploads/2026/05/Заявление-о-согласии-на-зачисление_маг_2026.pdf",
            "Форма заявления о согласии на зачисление",
        ),
        (
            "http://www.vsau.ru/wp-content/uploads/2026/05/Заявление-о-согласии-на-зачисление_маг_образец_2026.pdf",
            "Образец заполнения заявления о согласии на зачисление",
        ),
        (
            "http://www.vsau.ru/wp-content/uploads/2026/05/Заявление-о-приеме_платное_маг_2026.pdf",
            "Форма заявления о приеме (на договорной основе)",
        ),
        (
            "http://www.vsau.ru/wp-content/uploads/2026/05/Заявление-о-приеме_платное_маг_образец_2026.pdf",
            "Образец заполнения заявления о приеме (на договорной основе)",
        ),
    ]
    html = append_form_buttons(html, buttons)
    html = html.replace(
        "Форма заявления о приемеФорма заявления о приеме",
        "Форма заявления о приеме",
    )
    return html


BUILDERS = {
    "post-42529.html": build_foreign_citizens,
    "page-42396.html": build_olympiads,
    "post-42544.html": lambda: fix_bachelor((SRC / "post-42544.html").read_text(encoding="utf-8")),
    "post-42542.html": lambda: fix_master((SRC / "post-42542.html").read_text(encoding="utf-8")),
}


def push_post(post_id: int, content: str) -> None:
    url = f"{API}/news/{post_id}"
    body = json.dumps({"content": content}).encode()
    req = urllib.request.Request(
        url,
        data=body,
        headers={"Content-Type": "application/json"},
        method="PUT",
    )
    with urllib.request.urlopen(req) as resp:
        print(f"  post {post_id}: {resp.status}")


def push_page(page_id: int, content: str) -> None:
    url = f"{API}/page/{page_id}/html"
    body = json.dumps({"content": content}).encode()
    req = urllib.request.Request(
        url,
        data=body,
        headers={"Content-Type": "application/json"},
        method="PUT",
    )
    with urllib.request.urlopen(req) as resp:
        print(f"  page {page_id}: {resp.status}")


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)

    for name, builder in BUILDERS.items():
        content = builder()
        (OUT / name).write_text(content, encoding="utf-8")
        print(f"built {name}")

    pushes = [
        (42529, "post-42529.html", push_post),
        (42396, "page-42396.html", push_page),
        (42544, "post-42544.html", push_post),
        (42542, "post-42542.html", push_post),
    ]

    print("\nPushing to WordPress (requires deployed api/api.php and api/menus.php)...")
    for post_id, filename, push_fn in pushes:
        content = (OUT / filename).read_text(encoding="utf-8")
        try:
            push_fn(post_id, content)
        except urllib.error.HTTPError as exc:
            print(f"  FAILED {filename}: HTTP {exc.code} — deploy theme then re-run")


if __name__ == "__main__":
    main()

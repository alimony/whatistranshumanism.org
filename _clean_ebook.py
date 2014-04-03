#!/usr/bin/env python3
# encoding: utf-8

import sys
from bs4 import BeautifulSoup


if len(sys.argv) < 2:
    sys.exit('No input file specified.')

with open(sys.argv[1], 'r+') as f:
    print('Preparing HTML for ebook generation...')

    html = f.read()
    soup = BeautifulSoup(html)

    print('Stripping ids from h2 and h3 tags to avoid internal references.')
    for selector in ('h2', 'h3'):
        for t in soup.select(selector):
            del t['id']

    print('Stripping links inside headers, for the same reason.')
    for selector in ('h2 a', 'h3 a'):
        for t in soup.select(selector):
            t['name'] = t['href'].replace('#', '')
            del t['href']

    print('Stripping some unnecessary divs.')
    for selector in ('#wrapper', '#content', '#table-of-contents'):
        for t in soup.select(selector):
            t.unwrap()

    print('Removing script, link and img tags entirely.')
    for selector in ('script', 'link', 'img'):
        for t in soup.select(selector):
            t.decompose()

    print('Removing some more unused elements entirely.')
    for selector in ('#languages-and-books', '.print-only',
        '.back-to-top', '#footer'):
        for t in soup.select(selector):
            t.decompose()

    f.seek(0)
    f.truncate()
    f.write(soup.prettify())

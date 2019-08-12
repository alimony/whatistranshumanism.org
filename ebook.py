# coding=utf-8
from bs4 import BeautifulSoup
import os
import subprocess
import sys

directory = os.path.dirname(os.path.realpath(__file__))
dist = os.path.join(directory, "dist")


def clean():
    with open(sys.argv[1], "r+", encoding="utf-8") as f:
        print("Preparing HTML for e-book generation...")

        html = f.read()
        soup = BeautifulSoup(html, features="lxml")

        print("Stripping ids from h2 and h3 tags to avoid internal references.")
        for selector in ("h2", "h3"):
            for t in soup.select(selector):
                del t["id"]

        print("Stripping links inside headers, for the same reason.")
        for selector in ("h2 a", "h3 a"):
            for t in soup.select(selector):
                t["name"] = t["href"].replace("#", "")
                del t["href"]

        print("Stripping some unnecessary divs.")
        for selector in ("#wrapper", "#content", "#TableOfContents"):
            for t in soup.select(selector):
                t.unwrap()

        print("Removing script, link and img tags entirely.")
        for selector in ("script", "link", "img"):
            for t in soup.select(selector):
                t.decompose()

        print("Removing some more unused elements entirely.")
        for selector in ("#widget", "#footer"):
            for t in soup.select(selector):
                t.decompose()

        f.seek(0)
        f.truncate()
        f.write(soup.prettify())


if __name__ == "__main__":
    subprocess.run("pandoc -o download/transhumanist-faq.epub dist/index.html --toc")
    clean()

    subprocess.run("kindlegen download/transhumanist-faq.epub")

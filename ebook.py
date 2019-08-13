# coding=utf-8
import os
import subprocess

directory = os.path.dirname(os.path.realpath(__file__))
dist = os.path.join(directory, "dist")
temp = os.path.join(directory, "tmp")

html = os.path.join(dist, "index.html")
epub = os.path.join(temp, "transhumanist-faq.epub")

if __name__ == "__main__":
    subprocess.run("pandoc -o " + epub + " dist/index.html --toc")
    subprocess.run("kindlegen " + epub)

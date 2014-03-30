#!/usr/bin/env sh
# encoding: utf-8

# This script will generate ebook files from the main web page content. This
# works by rebuilding the site while passing an extra config file to Jekyll.
# This extra file sets an 'ebook' variable that in turn modifies the output to
# hide a few elements, and such, that would othersize clutter the ebook.

# TODO: Build for all languages.

# Generate .epub file for various readers.
jekyll build --config _config.yml,_ebook.yml &&
pandoc --output what-is-transhumanism.epub \
       --epub-metadata=_site/epub.xml \
       --epub-stylesheet=_epub.css \
       _site/index.html

# Generate .mobi file for Kindle.
kindlegen what-is-transhumanism.epub

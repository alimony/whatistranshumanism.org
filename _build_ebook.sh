#!/usr/bin/env sh
# encoding: utf-8

# This script will generate e-book files from the main web page content. This
# works by first rebuilding the site, then making various preparations to the
# built files so they can finally be converted to e-books.

FILES="./index.html"

# Build the site to make sure we are on the latest version.
jekyll build &&

for f in $FILES; do
	DIRECTORY=${f/index.html/}
	LANGUAGE_CODE=${f/\/index.html/}
	if [ "$LANGUAGE_CODE" = "." ]; then
		LANGUAGE_CODE="en-US"
	fi

	# Clean up HTML to make it more suitable for e-book generation.
	python3 _clean_ebook.py "_site/$f" &&

	# Generate .epub file for various readers.
	pandoc --output "$DIRECTORY/what-is-transhumanism-$LANGUAGE_CODE.epub" \
		--epub-cover-image="$DIRECTORY/img/_cover-$LANGUAGE_CODE.png" \
		--epub-metadata="$DIRECTORY/_epub-$LANGUAGE_CODE.xml" \
		--epub-stylesheet=_epub.css \
		"_site/$DIRECTORY/index.html" &&

	# DEBUG: Uncomment this to create an uncompressed EPUB folder, for inspection.
	# unzip -o what-is-transhumanism.epub -d what-is-transhumanism-epub &&

	# Generate .mobi file for Kindle.
	kindlegen "$DIRECTORY/what-is-transhumanism-$LANGUAGE_CODE.epub"
done

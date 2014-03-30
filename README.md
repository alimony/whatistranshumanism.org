What is Transhumanism?
======================
#### Transhumanist FAQ – version 3.0

This is the source repository for [whatistranshumanism.org](http://whatistranshumanism.org/)

There is only the `gh-pages` branch, which when pushed to will build the live site.


Development
-----------
To run the site locally, just make sure you have [Jekyll](http://jekyllrb.com/) installed, then `cd` to the root directory of this repository and run `jekyll serve --watch --baseurl=`. By default, the site will then be available at [localhost:4000](http://localhost:4000). Improvements are much welcomed, just suggest them by opening a [pull request](https://github.com/alimony/whatistranshumanism.org/pulls). If you need more information on how this works, see the [GitHub documentation](https://help.github.com/articles/using-pull-requests).

Translations
------------
Each translation lives in a directory in the site root named after its [IETF language tag](https://en.wikipedia.org/wiki/IETF_language_tag). This means a two-letter [ISO 639-1](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) language code plus a two-letter <a href="https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2">ISO 3166-1 alpha-2</a> country code.

When adding or updating a translation, the variable `based_on_commit` should be set to the value of `latest_commit` in `_config.yml`. This way, it can later easily be detected what has changed in the original text, and the diff can be viewed on GitHub.

There is a translation status page at [/translation/](http://whatistranshumanism.org/translation/) that will list all translations that need to be updated because the commit they are based on differs from what is considered the latest commit. Note that this is not in fact the latest git commit, as keeping that value in source code would be logically impossible, but a variable called `latest_commit` in `_config.yml`. This also means minor changes can be made to the original without marking translations as outdated, just by not bumping the commit value of `latest_commit`.

For detailed instructions on how to create or update a translation, see <a href="http://alimony.github.io/whatistranshumanism.org/translation/">this page</a>.

Graphics
--------
The graphics in the page header and footer have been generated through a piece of [Processing](http://processing.org/) code, using the [Mesh](http://leebyron.com/else/mesh/) library by Lee Byron. This code lives in `processing/whatistranshumanism/whatistranshumanism.pde`. Running it will display a window with a random graphic. Clicking the window will generate a new graphic with its gravity towards the corner of the window nearest the clicked coordinate.

The window can be resized to get a graphic of a different size, and holding the tab key will display the current size (width × height) in pixels. Pressing space will save the current graphic to the `processing/whatistranshumanism` directory as a `.png` file named incrementally.

Ebook
-----
Generating `.epub` and `.mobi` files from the HTML is currently work-in-progress. Running the `_build_ebook.sh` script will attempt it, using [pandoc](http://johnmacfarlane.net/pandoc/) and [kindlegen](http://www.amazon.com/gp/feature.html?docId=1000765211), but the latter currently fails of reasons not yet figured out. Basic `.epub` generation works, although the output is still a bit confused regarding table of contents, cover page, etc.

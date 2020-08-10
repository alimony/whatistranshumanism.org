# Transhumanist FAQ

[![License](https://img.shields.io/github/license/iinfin/whatistranshumanism.org?style=flat&colorA=000000&colorB=000000)](https://opensource.org/licenses/MIT)
[![Deploy to Netlify](https://img.shields.io/badge/deploy%20to-Netlify-000000.svg?style=flat&colorA=000000)](https://app.netlify.com/start/deploy?repository=https://github.com/iinfin/whatistranshumanism.org&stack=cms)
[![Mozilla Observatory](https://img.shields.io/mozilla-observatory/grade-score/transhumanism.netlify.com.svg?style=flat&colorA=000000&colorB=000000)](https://observatory.mozilla.org/analyze/transhumanism.netlify.com)

**Transhumanism** is a way of thinking about the future that is based on the premise that the human species in its current form does not represent the end of our development but rather a comparatively early phase.

## Development

> Requirements: [Hugo](https://gohugo.io/getting-started/installing) and [Node.js](https://nodejs.org/en/download/current)

```
git clone https://github.com/iinfin/whatistranshumanism.org.git
npm install
npm run dev
```

### Generating ebooks

> Requirements: [Python](https://python.org/downloads), [Pandoc](https://pandoc.org/installing.html), and [KindleGen](https://amazon.com/gp/feature.html?docId=1000765211)

// TODO

## Deployment

- [Create a new site on Netlify](https://app.netlify.com/start) and link the repository.

## Translation

- Add [`index.[lang-code].md`](https://www.w3schools.com/tags/ref_language_codes.asp) to [`content/`](content/)
- Add language to [`config.yml`](config.yml)
- Add `lang-code.toml` to [`i18n/`](i18n/)

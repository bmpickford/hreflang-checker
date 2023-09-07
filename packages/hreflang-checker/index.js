import { load } from 'cheerio';
import fs from 'fs'

const loadJSON = (path) => JSON.parse(fs.readFileSync(new URL(path, import.meta.url)));
const countries = loadJSON('./data/iso-3166-1.json');
const langs = loadJSON('./data/iso-639-1.json');
const isValidCountryCode = (country) => {
  return countries.find(c => c['alpha-2'] === country || c['alpha-3'] === country || c['country-code'] === country)
}

export const validateIsoCode = (code) => {
  if (!code) return false
  if (code.length !== 2 && code.length !== 5) return false

  if (code.length === 5) {
    const [lang, country] = code.split('-')
    if (lang.length !== 2 || country.length !== 2) return false
    return langs.includes(lang) && !!isValidCountryCode(country.toUpperCase())
  }
  return langs.includes(code)
}

const fetchPage = async (url) => {
  const response = await fetch(url, { redirect: 'manual' }).catch(e => {
    throw new Error(`${url} did not return a 200 response: ${e.message}`)
  })
  if (!response.ok) {
    throw new Error(`Expected ${url} to return a 200 response, instead got ${response.status}`)
  }

  const data = await response.text()
  return load(data)
}

export const validateHreflang = async (url) => {
  const $page = await fetchPage(url)
  const alternates = $page('link[rel="alternate"][hreflang]')
  if (!alternates.length) {
    throw new Error(`There are no hreflang tags at ${url}`)
  }
  const hreflangs = alternates.map((_, el) => $page(el).attr('hreflang')).get()
  const links = alternates.map((_, el) => $page(el).attr('href')).get()

  // are langs valid
  for (const hreflang of hreflangs) {
    if (hreflang === 'x-default') continue
    if (!validateIsoCode(hreflang)) throw new Error(`"${hreflang}" is not the correct format or is not a valid language and locale combination`);
  }

  // includes an x default
  if (!hreflangs.includes('x-default')) {
    throw new Error(`There is no x-default hreflang tag at ${url}`)
  }

  // is self referenced
  if (!links.includes(url)) {
    throw new Error(`There is no self referenced hreflang tag at ${url}`)
  }

  // are links valid
  const $altPages = await Promise.all(links.map(async (link) => ({ $altPage: await fetchPage(link), link })))
  for (const { $altPage, link } of $altPages) {
    const backlink = $altPage(`link[rel="alternate"][href=${url}]`)
    if (!backlink || !backlink.length) {
      throw new Error(`There is no backlink at ${link} that points to ${url}`)
    }
  }

  return true;
}
import { startups } from '../data/data.js'

export const getAllDataController = (req, res) => {
  let { industry, country, continent, is_seeking_funding, has_mvp } = req.query
  if (has_mvp === 'true') {
    has_mvp = true
  } else if (has_mvp === 'false') {
    has_mvp = false
  } else {
    has_mvp = undefined
  }

  if (is_seeking_funding === 'true') {
    is_seeking_funding = true
  } else if (is_seeking_funding === 'false') {
    is_seeking_funding = false
  } else {
    is_seeking_funding = undefined
  }

  let filteredData = startups.filter(startup => {
    if (industry && startup.industry.toLowerCase() !== industry.toLowerCase()) {
      return false
    }
    if (country && startup.country.toLowerCase() !== country.toLowerCase()) {
      return false
    }
    if (continent && startup.continent.toLowerCase() !== continent.toLowerCase()) {
      return false
    }
    if (is_seeking_funding !== undefined && startup.is_seeking_funding !== is_seeking_funding) {
      return false
    }
    if (has_mvp !== undefined && startup.has_mvp !== has_mvp) {
      return false
    }
    return true
  })

  res.json(filteredData)
}
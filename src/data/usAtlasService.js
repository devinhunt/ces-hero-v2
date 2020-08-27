import { json, geoPath } from 'd3'

const SOURCE_URL = `https://unpkg.com/us-atlas@1/us/10m.json`

export const getUsMapData = async () => {
  const data = await json(SOURCE_URL)
  return data
}

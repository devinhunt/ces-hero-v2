export const groupTrend = (data, prefix, startingIndex = 0, minIntegerDigits = 1, reverse = true) => {
  let index = startingIndex
  const getKey = i => `${prefix}${i.toLocaleString('en-US', {
    minimumIntegerDigits: minIntegerDigits, 
    useGrouping: false
  })}`
  const trend = []

  while(getKey(index) in data) {
    trend.push(data[getKey(index)])
    index ++
  }

  if(reverse) {
    trend.reverse()
  }

  return trend
}

export const groupTrendByISODate = (data, startDate, prefix = '', step = 24 * 60 * 60 * 1000, reverse = true) => {
  const getKey = dateObj => `${prefix}${dateObj.toISOString().substring(0, 10)}`

  let targetDate = startDate
  const trend = []

  console.log('start at: ',startDate)

  while(getKey(targetDate) in data) {
    trend.push({
      date: targetDate,
      value: data[getKey(targetDate)]
    })

    targetDate = new Date(targetDate - step)
  }

  if(reverse) {
    trend.reverse()
  }

  return trend
}

export const roundToPercision = (num, percision = 1) => Math.round(num / percision) * percision
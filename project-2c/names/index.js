// const names = require('../utilities/utils/index')
// const ListOfNames = require('../country/state/city/index')
// const getPeopleInCity = array => {
//   return names(ListOfNames)
// }

// module.exports = getPeopleInCity

const peopleNames = require('../country/state/city/index')
const getFirstNames = require('../utilities/utils/index')

const getPeopleInCity = peopleNames => {
  return getFirstNames(peopleNames)
}

module.exports = getPeopleInCity

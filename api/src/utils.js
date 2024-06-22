import crypto from "crypto"

export const randomString = (bytesSize = 32) =>
  crypto.randomBytes(bytesSize).toString("hex")

// export const extractPrefixedColumns = ({ prefixedObject, prefix }) => {
//   const prefixRexp = new RegExp(`^${prefix}_(.*)`)
//   return Object.entries(prefixedObject).reduce((acc, [key, value]) => {
//     const match = key.match(prefixRexp)
//     if (match) {
//       acc[match[1]] = value
//     }
//     return acc
//   }, {})
// }

export const numbersInRangeObject = (begin, end) => {
  if (end < begin) {
    throw Error(`Invalid range because ${end} < ${begin}`)
  }
  let sum = 0
  let count = 0
  let avg = 0
  for (let i = begin; i <= end; i++) {
    sum += i
    count++
    avg = sum / 2
  }
  return { sum, count, avg }
}

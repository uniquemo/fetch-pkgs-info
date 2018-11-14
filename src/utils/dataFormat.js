export const convertDataToArray = (data) => {
  if (data) {
    if (Array.isArray(data)) {
      return data
    } else {
      return [data]
    }
  }
  return []
}

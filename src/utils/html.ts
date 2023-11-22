export function areNodeListsEqual(nodeList1: NodeList, nodeList2: NodeList) {
  if (nodeList1?.length !== nodeList2?.length) {
    return false
  }

  const largerList =
    nodeList1?.length > nodeList2?.length ? nodeList1 : nodeList2

  // classic for loops are most performant 🤷🏻‍♀️
  for (let i = 0; i < largerList?.length; i++) {
    if (nodeList1[i] !== nodeList2[i]) {
      return false
    }
  }

  return true
}

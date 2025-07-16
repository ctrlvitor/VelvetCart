export function getRandomAsset() {
  const max = 9
  const id = Math.floor(Math.random() * max) + 1
  return `/assets/asset-${id}.jpg`
}

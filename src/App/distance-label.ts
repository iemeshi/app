export const makeDistanceLabelText = (distance: number | void) => {
  let distanceTipText = ""
  if(typeof distance === 'number') {
    if(distance > 1000) {
      distanceTipText = Math.round(distance / 1000) + ' km'
    } else {
      distanceTipText = Math.round(distance) + ' m'
    }
  }
  return distanceTipText
}

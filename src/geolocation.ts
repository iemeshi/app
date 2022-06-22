export const askGeolocationPermission = () => {
  return new Promise<Pwamap.LngLat | null>((resolve, reject) => {

    if(!window.navigator.geolocation || !window.navigator.geolocation.getCurrentPosition) {
      resolve(null)
    }

    window.navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude
        const lng = pos.coords.longitude
        resolve([lng, lat])
      },
      (error) => {
        resolve(null)
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      }
    )
  })
}

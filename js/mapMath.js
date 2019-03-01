
  export function latLongToMerc(lat_deg, lon_deg) {
     var lon_rad = (lon_deg / 180.0 * Math.PI)
     var lat_rad = (lat_deg / 180.0 * Math.PI)
     var sm_a = 6378137.0
     var xmeters  = sm_a * lon_rad
     var ymeters = sm_a * Math.log((Math.sin(lat_rad) + 1) / Math.cos(lat_rad))
     return ({x:xmeters, y:ymeters});
  }

  export function transformPointToAR(lat, long) {
    var objPoint = this._latLongToMerc(lat, long);
    var devicePoint = this._latLongToMerc(this.state.latitude, this.state.longitude);
    // latitude maps to the z axis in AR
    // longitude maps to the x axis in AR
    var objFinalPosZ = objPoint.y - devicePoint.y;
    var objFinalPosX = objPoint.x - devicePoint.x;
    //flip the z, as -z(is in front of us which is north, +z is behind(south).
    return ({x:objFinalPosX, z:-objFinalPosZ});
  }

  export function calculateDistance(lat1,lon1,lat2,lon2) {
    if ((lat1 == lat2) && (lon1 == lon2)) {
      return 0;
    }
    else {
      var radlat1 = Math.PI * lat1/180;
      var radlat2 = Math.PI * lat2/180;
      var theta = lon1-lon2;
      var radtheta = Math.PI * theta/180;
      var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
      if (dist > 1) {
        dist = 1;
      }
      dist = Math.acos(dist);
      dist = dist * 180/Math.PI;
      dist = dist * 60 * 1.1515 * 1.609344 * 1000;
      return dist;
    }
  }
  
  export function randomiseLocation() {
    var newLocation = _pointAtDistance(
    this.state.currentLatitude,
    this.state.currentLongitude,
    100);

    this.setState({
      bitcoinLat = newLocation.latitude;
      bitcoinLong = newLocation.longitude;
    });
  }

  export function pointAtDistance(latitude, longitude, distance) {
    const result = {}
    const coords = toRadians(inputCoords)
    const sinLat =  Math.sin(coords.latitude)
    const cosLat =  Math.cos(coords.latitude)

    const bearing = Math.random() * (Math.PI * 2)
    const theta = distance/6371000 //Earth radius in meters (todo)
    const sinBearing = Math.sin(bearing)
    const cosBearing =  Math.cos(bearing)
    const sinTheta = Math.sin(theta)
    const cosTheta =    Math.cos(theta)

    result.latitude = Math.asin(sinLat*cosTheta+cosLat*sinTheta*cosBearing);
    result.longitude = coords.longitude + 
        Math.atan2( sinBearing*sinTheta*cosLat, cosTheta-sinLat*Math.sin(result.latitude )
    );

    result.longitude = ((result.longitude+(Math.PI *3))%(Math.PI * 2))-Math.PI

    return toDegrees(result)
}

  export function toRadians(deg) {
    return (deg / 180.0 * Math.PI);
  }

  export function pointInCircle(latitude, longitude, distance) {
   // const rnd =  Math.random()
    
  //  const randomDist = Math.sqrt(rnd) * distance
    return pointAtDistance(latitude, longitude, randomDist)
  }
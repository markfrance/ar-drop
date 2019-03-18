
//Math functions used for location in AR
export default class locationMath {

  //Converts latitude and longitude point in degrees to
  //mercator projected meter value
  static latLongToMerc(lat_deg, lon_deg) {
     var lon_rad = (lon_deg / 180.0 * Math.PI)
     var lat_rad = (lat_deg / 180.0 * Math.PI)
     var sm_a = 6378137.0
     var xmeters  = sm_a * lon_rad
     var ymeters = sm_a * Math.log((Math.sin(lat_rad) + 1) / Math.cos(lat_rad))
     return ({x:xmeters, y:ymeters});
  }

  //Transforms latitude and longitude point in degrees to
  //3D world space Coordinate system used by viro
  //relative to current device location
  static transformPointToAR(lat, lon, deviceLat, deviceLon) {
    var objPoint = this.latLongToMerc(lat, lon);
    var devicePoint = this.latLongToMerc(deviceLat, deviceLon);
    // latitude maps to the z axis in AR
    // longitude maps to the x axis in AR
    var objFinalPosZ = objPoint.y - devicePoint.y;
    var objFinalPosX = objPoint.x - devicePoint.x;
   
    return ({x:objFinalPosX, z:-objFinalPosZ});
  }

  //Calculates distance from one latitude, longitude position to another
  static calculateDistance(lat1,lon1,lat2,lon2) {
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

  //calculates world space distance between two 3d vectors
  static distanceBetweenTwoPoints(point1, point2) {
    
    return Math.sqrt((Math.pow(point1.x - point2.x,2)) 
      + (Math.pow(point1.y - point2.y, 2))
      + (Math.pow(point1.z - point2.z, 2)))
  }

  //Generates random point a certain distance away (radius in meters)
  //from lat lon location 
  static randomPoint(lat, lon, radius) {
    var x0 = lon;
    var y0 = lat;
    var rd = radius/111300;

    var u = Math.random();
    var v = Math.random();

    var w = rd;
    var t = 2 * Math.PI * v;
    var x = w * Math.cos(t);
    var y = w * Math.sin(t);

    return {'lat': y+y0, 'lon': x+x0};
  }
}

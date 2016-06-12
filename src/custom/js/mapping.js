var data;
var markers = [];

jQuery( document ).ready(function(){
  jQuery.getJSON('../data.json', function(json){
    data = json;
    console.log(data);
    initMap();
  })
});
// This function will iterate over markersData array
// creating markers with createMarker function
function displayMarkers(){

   // this variable sets the map bounds and zoom level according to markers position
   var bounds = new google.maps.LatLngBounds();

   // For loop that runs through the info on markersData making it possible to createMarker function to create the markers
   for (var i = 0; i < data.buildings.length; i++){

      var latlng = new google.maps.LatLng(data.buildings[i].coordinates[0], data.buildings[i].coordinates[1]);
      var name = data.buildings[i].name;
      var desc1 = data.buildings[i].desc1;
      var image =  data.buildings[i].image;
      createMarker(latlng, name, desc1, image);

      // Marker’s Lat. and Lng. values are added to bounds variable
      bounds.extend(latlng);

   }

   // Finally the bounds variable is used to set the map bounds
   // with API’s fitBounds() function
   map.fitBounds(bounds);

}
// This function creates each marker and sets their Info Window content
function createMarker(latlng, name, desc1, image){
   var marker = new google.maps.Marker({
      map: map,
      position: latlng,
      title: name
   });
markers.push(marker);
   // This event expects a click on a marker
   // When this event is fired the infowindow content is created
   // and the infowindow is opened
   google.maps.event.addListener(marker, 'click', function() {

      // Variable to define the HTML content to be inserted in the infowindow
      var iwContent = '<div id="iw_container"><div class="iw_image"><img src="images/'+ image + '"/></div>' +
      '<div class="iw_title">' + name + '</div>' +
      '<div class="iw_content">' + desc1 + '</div></div>';

      // including content to the infowindow
      infoWindow.setContent(iwContent);

      // opening the infowindow in the current map and at the current marker location
      infoWindow.open(map, marker);
   });

}
function initMap() {
   var mapOptions = {
      center: new google.maps.LatLng(40.601203,-8.668173),
      zoom: 9,
      mapTypeId: 'roadmap',
   };

   map = new google.maps.Map(document.getElementById('map-canv'), mapOptions);

   // a new Info Window is created
   infoWindow = new google.maps.InfoWindow();

   // Event that closes the InfoWindow with a click on the map
   google.maps.event.addListener(map, 'click', function() {
      infoWindow.close();
   });

   // Finally displayMarkers() function is called to begin the markers creation
   displayMarkers();
   var mc = new MarkerClusterer(map, markers);


}
//google.maps.event.addDomListener(window, 'load', initialize);
/*function initMap(){
//function based on this tutorial on map markers: http://wrightshq.com/playground/placing-multiple-markers-on-a-google-map-using-api-3/
    var map;
    var bounds = new google.maps.LatLngBounds();
    var mapOptions = {
        mapTypeId: 'roadmap'
    };
    // Display a map on the page
    map = new google.maps.Map(document.getElementById("map-canv"), mapOptions);
    // Display multiple markers on a map
    var markers = [];
    // Loop through our array of markers & place each one on the map
    for( i = 0; i < data.buildings.length; i++ ) {
        var position = new google.maps.LatLng(data.buildings[i].coordinates[0], data.buildings[i].coordinates[1]);
        console.log(position);
        bounds.extend(position);
        marker = new google.maps.Marker({
            position: position,
            map: map,
            title: data.buildings[i].name
        });
        markers.push(marker);
        // Automatically center the map fitting all markers on the screen
        map.fitBounds(bounds);
    }
//the MarkerClusterer library groups markers together - I used this because some venues have multiple rooms available for hire, but their coordinates are the same, so different markers wouldn't be visible.
    var mc = new MarkerClusterer(map, markers);
  }*/

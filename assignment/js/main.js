$(document).ready(function() {


var parseData = function(data) {

  return JSON.parse(data);};
arr = [];
var makeMarkers = function(parsed) {
  return _.each(_.keys(parsed), function(keys) {
    arr.push(L.marker([parsed[keys][$('input:nth(1)').val()],
                       parsed[keys][$('input:nth(2)').val()]]));
  }
);
}
;
var plotMarkers = function(markers) {
  _.each(arr, function(add) {
    add.addTo(map);
  }
);
};


var removeMarkers = function(markers) {
  _.each(arr, function(remove) {
    map.removeLayer(remove);
  }
);
}
;


var map = L.map('map', {
  center: [39.9522, -75.1639],
  zoom: 14
});
var Stamen_TonerLite = L.tileLayer('http://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}.{ext}', {
  attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  subdomains: 'abcd',
  minZoom: 0,
  maxZoom: 20,
  ext: 'png'
}).addTo(map);

var parsed;
var markers;
$("button").click(function() {

    removeMarkers(markers);
  var url_value = $('input:first()').val();
  var downloadData = $.ajax(url_value);

  downloadData.done(function(data) {
  parsed = parseData(data);
  markers = makeMarkers(parsed);
  plotMarkers(markers);
  });
});

});

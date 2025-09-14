// Google Maps with Shades of Grey styling for Storm Inc Contact Page

// Custom map styling - Shades of Grey
const mapStyles = [
  {
    featureType: "all",
    elementType: "labels.text.fill",
    stylers: [
      {
        saturation: 36,
      },
      {
        color: "#000000",
      },
      {
        lightness: 40,
      },
    ],
  },
  {
    featureType: "all",
    elementType: "labels.text.stroke",
    stylers: [
      {
        visibility: "on",
      },
      {
        color: "#000000",
      },
      {
        lightness: 16,
      },
    ],
  },
  {
    featureType: "all",
    elementType: "labels.icon",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "administrative",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#000000",
      },
      {
        lightness: 20,
      },
    ],
  },
  {
    featureType: "administrative",
    elementType: "geometry.stroke",
    stylers: [
      {
        color: "#000000",
      },
      {
        lightness: 17,
      },
      {
        weight: 1.2,
      },
    ],
  },
  {
    featureType: "landscape",
    elementType: "geometry",
    stylers: [
      {
        color: "#000000",
      },
      {
        lightness: 20,
      },
    ],
  },
  {
    featureType: "poi",
    elementType: "geometry",
    stylers: [
      {
        color: "#000000",
      },
      {
        lightness: 21,
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#000000",
      },
      {
        lightness: 17,
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "geometry.stroke",
    stylers: [
      {
        color: "#000000",
      },
      {
        lightness: 29,
      },
      {
        weight: 0.2,
      },
    ],
  },
  {
    featureType: "road.arterial",
    elementType: "geometry",
    stylers: [
      {
        color: "#000000",
      },
      {
        lightness: 18,
      },
    ],
  },
  {
    featureType: "road.local",
    elementType: "geometry",
    stylers: [
      {
        color: "#000000",
      },
      {
        lightness: 16,
      },
    ],
  },
  {
    featureType: "transit",
    elementType: "geometry",
    stylers: [
      {
        color: "#000000",
      },
      {
        lightness: 19,
      },
    ],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [
      {
        color: "#000000",
      },
      {
        lightness: 17,
      },
    ],
  },
];

// Storm Inc location coordinates (3 Argus Place, Hillcrest, Auckland 0627)
const stormIncLocation = {
  lat: -36.7692, // Approximate latitude for Hillcrest, Auckland
  lng: 174.7141, // Approximate longitude for Hillcrest, Auckland
};

// Initialize map
function initMap() {
  // Create map
  const map = new google.maps.Map(document.getElementById("google-map"), {
    zoom: 15,
    center: stormIncLocation,
    styles: mapStyles,
    mapTypeControl: false,
    streetViewControl: false,
    fullscreenControl: false,
    zoomControl: false,
    scrollwheel: false,
    disableDoubleClickZoom: true,
    draggable: true,
    keyboardShortcuts: false,
    disableDefaultUI: true,
  });

  // Create marker with default pin
  const marker = new google.maps.Marker({
    position: stormIncLocation,
    map: map,
    title: "Storm Inc",
    animation: google.maps.Animation.DROP,
  });

  // Make map responsive
  google.maps.event.addDomListener(window, "resize", function () {
    const center = map.getCenter();
    google.maps.event.trigger(map, "resize");
    map.setCenter(center);
  });
}

// Initialize map when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  // Check if Google Maps API is loaded
  if (typeof google !== "undefined" && google.maps) {
    initMap();
  } else {
    console.error("Google Maps API not loaded");
  }
});

// Global function for Google Maps callback
window.initMap = initMap;

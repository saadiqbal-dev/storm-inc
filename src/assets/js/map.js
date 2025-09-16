// Google Maps with Shades of Grey styling for Storm Inc Contact Page

// Custom map styling - Shades of Grey
const mapStyles = [
  {
    featureType: "all",
    elementType: "geometry.stroke",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
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
        visibility: "off",
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
        visibility: "off",
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
  lat: -36.785857, // Exact latitude for Storm Inc
  lng: 174.741898, // Exact longitude for Storm Inc
};

// Initialize map
function initMap() {
  // Create map
  const map = new google.maps.Map(document.getElementById("google-map"), {
    zoom: 14, // Zoomed out from 15 to 14
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

  // Create custom SVG icon for marker
  const customIcon = {
    url:
      "data:image/svg+xml;charset=UTF-8," +
      encodeURIComponent(
        '<svg xmlns="http://www.w3.org/2000/svg" width="61" height="93" viewBox="0 0 61 93" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M28.4053 91.8423C29.3585 93.3932 30.9322 93.3932 31.8964 91.8641C31.8964 91.8641 61 46.6584 61 30.068C61 13.4776 47.3459 0 30.5 0C13.6541 0 0 13.4558 0 30.0571C0 46.6584 28.4053 91.8423 28.4053 91.8423ZM30.2118 45.3368C38.934 45.3368 46.016 38.3686 46.016 29.7622C46.016 21.1557 38.9451 14.1876 30.2118 14.1876C21.4786 14.1876 14.4077 21.1557 14.4077 29.7622C14.4077 38.3686 21.4786 45.3368 30.2118 45.3368Z" fill="#FF5964"/></svg>'
      ),
    scaledSize: new google.maps.Size(40, 60), // Scale down the icon size
    anchor: new google.maps.Point(20, 60), // Center the anchor at the bottom of the pin
  };

  // Create marker with custom icon
  const marker = new google.maps.Marker({
    position: stormIncLocation,
    map: map,
    title: "Storm Inc",
    icon: customIcon,
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

function initMap() {
    const posicion = {
        lat: -25,
        lng: 131
    }

    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 4,
        center: posicion
    });

    const marker = new google.maps.Marker({
        position: posicion,
        map,
        title: "Posición actual"
    });

    geoPos();
    marker.setPosition({lat, lng});
}

function geoPos() {
    if (navigator.geolocation) {
        const geoLoc = navigator.geolocation;
        const posicion = geoLoc.watchPosition(pos => {
            console.log(pos.coords);
        });
    } else {
        alert("Tu navegador no admite geolocalización.");
    }
}
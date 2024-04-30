mapboxgl.accessToken = 'pk.eyJ1IjoiY3dob25nIiwiYSI6IjAyYzIwYTJjYTVhMzUxZTVkMzdmYTQ2YzBmMTM0ZDAyIn0.owNd_Qa7Sw2neNJbK6zc1A';
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v12',
    center: [-73.99300, 40.70184],
    zoom: 14
});

map.addControl(new mapboxgl.NavigationControl());

// wait!
map.on('load', () => {

    console.log(
        map.getStyle().layers
    )

    // add the pluto data

    map.addSource('subway', {
        "type": "geojson",
        "data": 'data/subway.geojson'
    })

    map.addLayer({
        'id': 'subway-line',
        'type': 'line',
        'source': 'subway',
        'layout': {},
        'paint': {
            'line-color': '#000',
            'line-width': 2,
        }
    });


    // click on a line and it highlights

    // click on a line and information appears about the line

    // use the map to choose a line to highlight
})
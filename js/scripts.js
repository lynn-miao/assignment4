mapboxgl.accessToken = 'pk.eyJ1IjoiY3dob25nIiwiYSI6IjAyYzIwYTJjYTVhMzUxZTVkMzdmYTQ2YzBmMTM0ZDAyIn0.owNd_Qa7Sw2neNJbK6zc1A';
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v12',
    center: [-73.92081, 40.72278],
    zoom: 10
});

map.addControl(new mapboxgl.NavigationControl());

// wait!
map.on('load', () => {

    console.log(
        map.getStyle().layers
    )

    // add the subway data

    map.addSource('subway', {
        "type": "geojson",
        "data": 'data/subway.geojson'
    })

    // color the subway lines by color
    map.addLayer({
        'id': 'subway-line',
        'type': 'line',
        'source': 'subway',
        'layout': {},
        'paint': {
            'line-color': [
                'match',
                ['get', 'rt_symbol'],
                'A',
                '#0039A6',
                'C',
                '#0039A6',
                'E',
                '#0039A6',
                'B',
                '#FF6319',
                'D',
                '#FF6319',
                'F',
                '#FF6319',
                'M',
                '#FF6319',
                'G',
                '#6CBE45',
                'J',
                '#996633',
                'Z',
                '#996633',
                'L',
                '#A7A9AC',
                'R',
                '#FCCC0A',
                'W',
                '#FCCC0A',
                'N',
                '#FCCC0A',
                'Q',
                '#FCCC0A',
                '1',
                '#EE352E',
                '2',
                '#EE352E',
                '3',
                '#EE352E',
                '4',
                '#00933C',
                '5',
                '#00933C',
                '6',
                '#00933C',
                '7',
                '#B933AD',
                '#ccc'
            ],
            'line-width': 2,
        }
    });


    // click on a line and it highlights

    // click on a line and information appears about the line

    // use the map to choose a line to highlight
})
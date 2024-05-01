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
            'line-width': 4,
            'line-opacity': 0.5
        }
    });

    // click on a line and it highlights

    // this is a variable to store the id of the feature that is currently being hovered.
    let hoveredPolygonId = null

    // whenever the mouse moves on the 'borough-boundaries-fill' layer, we check the id of the feature it is on top of, and set featureState for that feature.  The featureState we set is hover:true or hover:false
    map.on('mousemove', 'subway-line', (e) => {
        // don't do anything if there are no features from this layer under the mouse pointer
        if (e.features.length > 0) {
            // if hoveredPolygonId already has an id in it, set the featureState for that id to hover: false
            if (hoveredPolygonId !== null) {
                map.setFeatureState(
                    { source: 'subway', id: hoveredPolygonId },
                    { hover: false }
                );
            }

            // set hoveredPolygonId to the id of the feature currently being hovered
            hoveredPolygonId = e.features[0].properties.id;

            // set the featureState of this feature to hover:true
            map.setFeatureState(
                { source: 'subway', id: hoveredPolygonId },
                { hover: true }
            );

            // make the cursor a pointer to let the user know it is clickable
            map.getCanvas().style.cursor = 'pointer'

            // resets the feature state to the default (nothing is hovered) when the mouse leaves the 'borough-boundaries-fill' layer
            map.on('mouseleave', 'subway-line', () => {
                // set the featureState of the previous hovered feature to hover:false
                if (hoveredPolygonId !== null) {
                    map.setFeatureState(
                        { source: 'subway', id: hoveredPolygonId },
                        { hover: false }
                    );
                }

                // clear hoveredPolygonId
                hoveredPolygonId = null;

                // set the cursor back to default
                map.getCanvas().style.cursor = ''
            });

        }
    });


    // if the user clicks on a line
    map.on('click', 'subway-line', (e) => {
        // get the boro_name from the first item in the array e.features
        var line_name = e.features[0].properties.rt_symbol

        // insert the  name into the sidebar using jQuery
        $('#line_name').text(`You clicked on the ${line_name} and other interconnected lines!`)

        // highlight the line
        map.setPaintProperty('subway-line', 'line-opacity', [
            'case',
            ['==', ['get', 'rt_symbol'], line_name], // If line matches the clicked line, set opacity to 1
            1,
            0.3 // Otherwise, set opacity to 0.3
        ])
    });

    // use the map to choose a line to highlight
})
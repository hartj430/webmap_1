'use strict'       


console.log('Loaded map.js')


mapboxgl.accessToken = 'pk.eyJ1IjoiaGFydGo0MzAiLCJhIjoiY2puZjc3c3BrMGJuYjN3bmJnZnNjNjJ0dSJ9.dvHzfzL7lwR6Xul3ukLqPA'

let map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v10',
    center: [-73.96024, 40.80877],
    zoom: 12
})

let navigation = new mapboxgl.NavigationControl({
    showCompass: false
})

map.addControl(navigation, 'top-left')

let scale = new mapboxgl.ScaleControl({
    maxWidth: 80,
    unit: 'imperial'
    })

    map.addControl(scale, 'bottom-right')

    let geolocate = new mapboxgl.GeolocateControl({
    positionOptions: {
        enableHighAccuracy: true
    },
    trackUserLocation: true,
    showUserLocation: true,
    fitBoundsOptions: {
    }
})
    map.addControl(geolocate, 'top-left')

    geolocate.on('geolocate', function(event) {

    let lng = event.coords.longitude
    let lat = event.coords.latitude

    console.log('geolocated:', lng, lat)

  document.getElementById('info').innerHTML = lng.toFixed(5) + "," + lat.toFixed(5)

})

map.on('click', function(event) {

    let lng = event.lngLat.lng
    let lat = event.lngLat.lat

    console.log("clicked:", lng, lat)

    document.getElementById('info').innerHTML = lng.toFixed(5) + "," + lat.toFixed(5)

})

let marker = new mapboxgl.Marker()
marker.setLngLat([-73.97748,40.77448])
marker.addTo(map)


let popup = new mapboxgl.Popup()
popup.setHTML('This is the building i grew up in<br /><img src="https://cdn-img2.streeteasy.com/nyc/image/74/304593974.jpg" />')
marker.setPopup(popup)

let data = [
    {
        location: [-73.98133,40.77273],
        content: 'my favorite chinese food restaurant'
    },
    {
        location: [-73.98175,40.77499],
        content: 'my favorite movie theater'
    },
    {
        location: [-73.98028,40.77084],
        content: 'my elementary school'
    },
    {
        location: [-73.97664,40.77112],
        content: 'where i finished the nyc marathon twice'
    },
    ]


    data.forEach(function(d) {

    let marker = new mapboxgl.Marker()    
    marker.setLngLat(d.location)
    marker.addTo(map)  

    let popup = new mapboxgl.Popup()
    popup.setHTML(d.content)
    marker.setPopup(popup)

})
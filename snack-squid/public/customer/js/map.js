// Select all the vans
let vans = document.querySelectorAll('.vanListing')

// Load the map
window.onload = async function() {
    L.mapquest.key = 'A1HigpvtAiVmfrECeAqUXlsnN6wDUshM';
    vans = document.querySelectorAll('.vanListing')

    let map = L.mapquest.map('map', {
        center: [-37.816166, 144.966639],
        layers: L.mapquest.tileLayer('map'),
        zoom: 15
    });
    // Get the location of the customer
    await geoFindMe(map)

    // If the customer's location cannot be found, it will choose 5 vans by default
    vans = document.querySelectorAll('.vanListing')
    console.log(vans)
    for (let i = 0; i < 5; i++) {
        let vanName = vans[i].querySelector('.vanName').innerHTML
        console.log(vanName)
        let vanbtn = vans[i].querySelector(".oneVan")
        vanbtn.addEventListener('click', function() {

            const options = {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ 'vanName': vanName }),
                redirect: 'follow'
            }
            try {
                url = window.location.href + '/' + vanName
                fetch(url, options).then(res => {
                    if (res.redirected) {
                        window.location.href = "/customer/menu/van=" + vanName
                    }
                })
            } catch (err) {
                console.log(err)
            }
        })
    }
}

async function geoFindMe(map) {
    function success(position) {
        const latitude = -37.816166 //position.coords.latitude.toFixed(4);
        const longitude = 144.966639 //position.coords.longitude.toFixed(4);
        coordinate = [latitude, longitude]
        L.mapquest.textMarker(coordinate, {
            text: 'Me',
            position: 'right',
            type: 'marker',
            title: 'Me',
            icon: {
                primaryColor: 'ff0000',
                secondaryColor: '#ff0000',
                size: 'sm'
            }
        }).addTo(map);
        dict = {}

        // Find five vans have least distances
        for (i = 0; i < vans.length; i++) {
            let vanName = vans[i].querySelector('.vanName').innerHTML
            let vanLocation = vans[i].querySelector('.geoLocation').innerHTML
            let textLocation = vans[i].querySelector('.vanLocation').innerHTML
            let vancoord = [JSON.parse(vanLocation).latitude, JSON.parse(vanLocation).longitude]
            dict[[vanName, textLocation, vancoord]] = getdistance(coordinate, vancoord)
        }
        //  Get sorted vans
        let sorted = sortObject(dict)
        let vanContainer = document.querySelector('.vanContainer')
        vanContainer.innerHTML = ``

        // Change innerHTML
        for (i = 0; i < sorted.length; i++) {
            vanName = sorted[i].split(',')[0]
            textLocation = sorted[i].split(',').slice(1, sorted[i].split(',').length - 2).join(',')

            let latitude = sorted[i].split(',')[sorted[i].split(',').length - 2]
            let longitude = sorted[i].split(',')[sorted[i].split(',').length - 1]

            vanContainer.innerHTML += `
                    <div class="vanListing">
                        <div class="oneVan">
                            <p class="vanName">${vanName}</p>
                            <p class="vanLocation">${textLocation}</p>
                            <br>
                        </div>
                    </div>
                    <div id="lineMap" class="line"></div>`
            coordinate = [latitude, longitude]

            // Add van markers to map
            L.mapquest.textMarker(coordinate, {
                text: vanName,
                position: 'right',
                type: 'marker',
                title: vanName,
                icon: {
                    primaryColor: '#333333',
                    secondaryColor: '#333333',
                    size: 'sm'
                }
            }).addTo(map);
        }

        // Make each van clickable and after click, it will send van's name to the server
        vans = document.querySelectorAll('.vanListing')
        console.log(vans)
        for (let i = 0; i < vans.length; i++) {
            let vanName = vans[i].querySelector('.vanName').innerHTML
            console.log(vanName)
            let vanbtn = vans[i].querySelector(".oneVan")
            vanbtn.addEventListener('click', function() {

                const options = {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ 'vanName': vanName }),
                    redirect: 'follow'
                }
                try {
                    url = window.location.href + '/' + vanName
                    fetch(url, options).then(res => {
                        if (res.redirected) {
                            window.location.href = "/customer/menu/van=" + vanName
                        }
                    })
                } catch (err) {
                    console.log(err)
                }
            })
        }
    }

    function error() {
        alert('Unable to retrieve your location');
    }

    if (!navigator.geolocation) {
        console.log('Geolocation is not supported by your browser');
    } else {
        console.log('Locating…');
        navigator.geolocation.getCurrentPosition(success, error);

    }
}

// Calculate the distance by latitude and longitude
const getdistance = (cusLocation, vanLocation) => {
    let distance = Math.sqrt(Math.pow((cusLocation[0] - vanLocation[0]), 2) +
        Math.pow((cusLocation[1] - vanLocation[1]), 2))
    return distance
}

// Sort the van dictionary by its value distance
const sortObject = (dict) => {
    let keys = Object.keys(dict);

    let i, len = keys.length;
    keys.sort();

    let sortedDict = [];
    if (len > 5) {
        len = 5
    }

    for (i = 0; i < len; i++) {
        k = keys[i];
        sortedDict[i] = k;
    }
    return sortedDict
}
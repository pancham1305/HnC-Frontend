let map;

async function initMap() {
    //@ts-ignore
    const { Map } = await google.maps.importLibrary( "maps" );
    const id = new URLSearchParams( window.location.search ).get( "id" );
    const [ b, hospitalinfo ] = id.split( ":" );
    
    const data = await fetch( "https://hnc-backend.pancham1305.repl.co/api/hospital", {
        method: "POST",
        body: JSON.stringify( { hospitalinfo, b } ),
        headers: {
            "Content-Type": "application/json",
        },
    } ).then( ( r ) => r.json() );
    const arr = data.split( ":" );
    console.log( arr );
    const [lat,lng] = arr[1].split(",").map(x => parseFloat(x));
    map = new Map(document.getElementById("map"), {
        center: { lat, lng},
        zoom: 20,
    } );
    const infoWindow = new google.maps.InfoWindow({
        content: `
        Name: ${arr[ 0 ].split( "," )[ 0 ]} <br>
        Address: ${arr[ 5 ]} <br>
        Rating: ${arr[ 3 ]} <br>
        Timings: ${arr[ 4 ].split(",") .join(" to ")} <br>
        `,
    disableAutoPan: true,
  });

    const marker = new google.maps.Marker( {
        position: { lat, lng },
        label:"H",
    } );

    marker.addListener( "click", () =>
    {
        infoWindow.open( map, marker );
    }
    );

    marker.setMap( map );

}

initMap();

const login = document.getElementById("login");

const user = JSON.parse(localStorage.getItem("user"));
if (user) {
    login.innerHTML = `${user.username}
            <span class="material-symbols-outlined" id="loginicon">
              login
            </span>`;
}

document.addEventListener("DOMContentLoaded", () => {
    const login = document.getElementById("login");
    const error = document.getElementById("error");
    error.style.height = "0px";
    error.style.top = "-30px";

    const closebtn = document.getElementById("closeerrorbtn");
    console.log({ closebtn });

    login.addEventListener("click", async (e) => {
        try {
            e.preventDefault();

            const phone = document.getElementById("email").value;
            const password = document.getElementById("pass").value;
            const data = {
                phone,
                password,
                token: localStorage.getItem("token"),
            };

            const resData = await fetch(
                "https://HnC-Backend.pancham1305.repl.co/api/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                },
            ).then((d) => d.json());
            if (resData.status === 200) {
                localStorage.setItem("user", JSON.stringify(resData.data));
                window.location.href = "./services.html";
            } else {
                const error = document.getElementById("error");
                error.style.height = "";
                error.style.top = "";
                error.innerHTML += `<div class='etext'>${resData.message}</div>`;
            }
        } catch (e) {
            console.log(e);
        }
    } );
    
    const guestbtn = document.getElementById( "guest" );
    guestbtn.addEventListener( "click", async( e ) =>
    { 
        const data = {
            phone: "0000000000",
            password: "thisisguest",
            token: "guest.token.somethingig",
        }

        const res = await fetch( "https://HnC-Backend.pancham1305.repl.co/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify( data ),
        } ).then( ( d ) => d.json() );
        if ( res.status === 200 )
        {
            localStorage.setItem( "user", JSON.stringify( res.data ) );
            window.location.href = "./services.html";
        }
        else
        {
            const error = document.getElementById( "error" );
            error.style.height = "";
            error.style.top = "";
            error.innerHTML += `<div class='etext'>${res.message}</div>`;
        }
    } );
});

document.addEventListener("click", (e) => {
    if (e.target.id !== "closeerrorbtn") return;
    const error = document.getElementById("error");
    error.innerHTML =
        '  <div class="closebtn" id="closeerrorbtn">&times;</div>';
    error.style.height = "0px";
    error.style.top = "-30px";
});

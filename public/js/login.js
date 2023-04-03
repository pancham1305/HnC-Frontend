const login = document.getElementById( 'login' );
        const error = document.getElementById("error");
error.style.height = "0px";
error.style.top = "-30px";
        
const closebtn = document.getElementById("closeerrorbtn");

closebtn.addEventListener("click", () => {
    const error = document.getElementById("error");
    error.innerHTML = '  <div class="closebtn" id="close">&times;</div>';
    error.style.height = "0px";
    error.style.top = "-30px";
});
login.addEventListener( 'click', async( e ) =>
{
    try
    {
        e.preventDefault();

        const phone = document.getElementById( 'email' ).value;
        const password = document.getElementById( 'pass' ).value;
        console.log(email, password)
        const data = {
            phone,
            password,
            token: localStorage.getItem( 'token' ),
        };


        const resData = await fetch(
            "https://HnC-Backend.pancham1305.repl.co/api/login",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify( data ),
            },
        ).then( ( d ) => d.json() );
        console.log(resData)
        if ( resData.status === 200 )
        {
            localStorage.setItem( 'user', JSON.stringify(resData.data) );
            window.location.href = './services.html';
        } else
        {
            const error = document.getElementById( 'error' );
            error.style.height = '';
            error.innerHTML += `<div class='etext'>${ resData.message }</div>`;
        }
    }catch(e)
    {
        console.log(e);
    }
} );
 

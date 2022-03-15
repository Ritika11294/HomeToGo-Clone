import footer from "../components/footer.js";

document.querySelector("#footer").innerHTML = footer();

if(document.querySelector("#login-button"))
    document.querySelector("#login-button").addEventListener("click", login);

    if(document.querySelector("#register-button"))
    document.querySelector("#register-button").addEventListener("click", register);

async function login() {
    let email = document.querySelector("#email").value;
    let password = document.querySelector("#password").value;
    
    if(email == "") {
        alert("Email is Mandatory!")
        return;
    }

    if(password == "") {
        alert("Password is Mandatory!")
        return;
    }

    let object = {
        email: email,
        password: password
    };

    let api = "https://home2gowebapi.herokuapp.com/login";
    let data;
    try {
        let response = await fetch(api, {
            method: "POST",
            body: JSON.stringify(object),
            headers: {
                "Content-Type" : "application/json"
            }
        });
        data = await response.json();
    } catch(err) {
        console.log(err.message);
    }

     
        localStorage.setItem("token", data.token);
        window.location.href = "./index.html";
    

}

async function register() {
    let name = document.querySelector("#name").value;
    let email = document.querySelector("#email").value;
    let password = document.querySelector("#password").value;
    
    if(name == "") {
        alert("Name is Mandatory!")
        return;
    }

    if(email == "") {
        alert("Email is Mandatory!")
        return;
    }

    if(password == "") {
        alert("Password is Mandatory!")
        return;
    }

    let object = {
        name: name,
        email: email,
        password: password
    };

    let api = "https://home2gowebapi.herokuapp.com/register";
    let data;
    try {
        let response = await fetch(api, {
            method: "POST",
            body: JSON.stringify(object),
            headers: {
                "Content-Type" : "application/json"
            }
        });
        data = await response.json();
    } catch(err) {
        console.log(err.message);
    }

        localStorage.setItem("token", data.token);
        window.location.href = "./index.html";
}
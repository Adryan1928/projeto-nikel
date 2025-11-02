const myModal = new bootstrap.Modal("#registerModal");

(function onAccess(){
    let logged = localStorage.getItem("session");
    let loggedSession = sessionStorage.getItem("session");
    logged = JSON.parse(logged)
    loggedSession = JSON.parse(loggedSession)

    if( !logged && !loggedSession ) return

    sessionStorage.setItem("session", JSON.stringify(logged));
    window.location.href = "home.html";
}())


document.querySelector("#login-form").addEventListener("submit",(e)=>{
    e.preventDefault();
    const email = document.querySelector("#loginInputEmail1").value;
    const password = document.querySelector("#loginInputPassword1").value;
    const session = document.querySelector("#loginCheck1").checked;

    const dataLocal = getAccount(email)

    if(
        !dataLocal || 
        !(email == dataLocal.email && password == dataLocal.password)
    ){
        alert("Email ou senha inválidos.");
        return;
    }

    saveSession({email, password, transactions: []}, session);

    alert("Logado com sucesso!")
    window.location.href = "home.html";
})


document.querySelector("#create-form").addEventListener("submit",(e)=>{
    e.preventDefault();
    const email = document.querySelector("#registerInputEmail1").value;
    const password = document.querySelector("#registerInputPassword1").value;


    if(password < 4) {
        alert("preencha a senha com no minimo 4 digitos");
        return;
    }

    saveAccount({email, password, transactions: []});

    myModal.hide();
        
    alert(`Conta criada com sucesso!`);
})


function saveAccount(data){
    localStorage.setItem(data.email, JSON.stringify(data));
}

function getAccount(email){
    return JSON.parse(localStorage.getItem(email)); 
}

function saveSession(data, session){
    if(!session) {
        sessionStorage.setItem("session", JSON.stringify(data));
        return
    }
    sessionStorage.setItem("session", JSON.stringify(data));
    localStorage.setItem("session", JSON.stringify(data));
}
const myModal = new bootstrap.Modal("#transactionModal");

(function onAccess(){
    let logged = localStorage.getItem("session");
    let loggedSession = sessionStorage.getItem("session");
    logged = JSON.parse(logged)
    loggedSession = JSON.parse(loggedSession)

    if( !logged && !loggedSession) {
        window.location.href = "index.html";
    }

    if(logged)  sessionStorage.setItem("session", JSON.stringify(logged));
    reloadTransactions();
}())


document.querySelector("#button-sair").addEventListener("click", (e)=>{
    e.preventDefault();
    logout();
});


function logout(){
    let localStoragelogged = localStorage.getItem("session");
    let sessionStorageloggede = localStorage.getItem("session");
    if(localStoragelogged) localStorage.removeItem("session");
    if(sessionStorageloggede) sessionStorage.removeItem("session");

    window.location.href = "index.html";
}


document.querySelector("#transaction-form").addEventListener("submit", (e)=>{
    e.preventDefault();

    let valor = parseFloat(document.querySelector("#transactionInputValor1").value);
    let descricao = document.querySelector("#transactionInputDescricao1").value;
    let data = document.querySelector("#transactionInputDate1").value;
    let type = document.querySelector('input[name="type-input"]:checked').value;

    let dataSession = sessionStorage.getItem("session");
    dataSession = JSON.parse(dataSession)
    let DatabaselocalStorage = localStorage.getItem(dataSession.email);
    DatabaselocalStorage = JSON.parse(DatabaselocalStorage)

    DatabaselocalStorage.transactions.unshift({
        valor, type,  descricao, data
    });

    sessionStorage.setItem("session", JSON.stringify(DatabaselocalStorage));
    localStorage.setItem(dataSession.email, JSON.stringify(DatabaselocalStorage));

    if(localStorage.getItem("session")){
        localStorage.setItem("session", JSON.stringify(DatabaselocalStorage))
    }
    reloadTransactions();

    myModal.hide();

    alert("Lançamento adicionado com sucesso!")
});

function cashIn(){
    let dataSession = sessionStorage.getItem("session");
    dataSession = JSON.parse(dataSession)
    let DatabaselocalStorage = localStorage.getItem(dataSession.email);
    DatabaselocalStorage = JSON.parse(DatabaselocalStorage)

    const cashIn = DatabaselocalStorage.transactions.filter((i) => i.type == "entrada")

    if(cashIn.length > 0){
        let cashInHtml = ``;
        if(cashIn.length > 5){limit = 5;}else{limit = cashIn.length;}  
        for (let i = 0; i < limit; i++){
            cashInHtml += `
                <div class="container">
                    <div class="row">
                        <div class="col fs-2">
                            ${cashIn[i].valor.toFixed(2)}
                        </div>
                    </div>
                    <div class="row small-letters-c">
                        <div class="col">
                            ${cashIn[i].descricao}
                        </div>
                        <div class="col d-flex justify-content-end">
                            ${cashIn[i].data}
                        </div>
                    </div>
                </div>
            `;
        }
        document.querySelector("#cashInList").innerHTML = cashInHtml;
    }
}

function cashOut(){
    let dataSession = sessionStorage.getItem("session");
    dataSession = JSON.parse(dataSession)
    let DatabaselocalStorage = localStorage.getItem(dataSession.email);
    DatabaselocalStorage = JSON.parse(DatabaselocalStorage)

    const cashOut = DatabaselocalStorage.transactions.filter((i) => i.type == "saida")

    if(cashOut.length > 0){
        let cashOutHtml = ``;
        if(cashOut.length > 5){limit = 5;}else{limit = cashOut.length;}  
        for (let i = 0; i < limit; i++){
            cashOutHtml += `
                <div class="container">
                    <div class="row">
                        <div class="col fs-2">
                            ${cashOut[i].valor.toFixed(2)}
                        </div>
                    </div>
                    <div class="row small-letters-c">
                        <div class="col">
                            ${cashOut[i].descricao}
                        </div>
                        <div class="col d-flex justify-content-end">
                            ${cashOut[i].data}
                        </div>
                    </div>
                </div>
            `;
        }
        document.querySelector("#cashOutList").innerHTML = cashOutHtml;
    }
}

function getTotal(){
    let dataSession = sessionStorage.getItem("session");
    dataSession = JSON.parse(dataSession)
    let DatabaselocalStorage = localStorage.getItem(dataSession.email);
    DatabaselocalStorage = JSON.parse(DatabaselocalStorage)

    let total = 0;
    for (let item of DatabaselocalStorage.transactions){
        if(item.type == "saida"){
            total -= item.valor;
        }
         if(item.type == "entrada"){
            total += item.valor;
        }
    }

    document.querySelector("#valores-totais").innerHTML = `<p>R$ : ${total.toFixed(2)}</p>`;
}

function reloadTransactions(){
    cashIn();
    cashOut();
    getTotal();
}

document.querySelector("#transactions-button").addEventListener("click", (e)=>{
    e.preventDefault();
    window.location.href = "transactions.html"
});
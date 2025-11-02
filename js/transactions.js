const myModal = new bootstrap.Modal("#transactionModal");
(function onAccess(){
    let logged = localStorage.getItem("session");
    let loggedSession = sessionStorage.getItem("session");
    logged = JSON.parse(logged)

    if( !logged && !loggedSession) {
        window.location.href = "index.html";
    }

    if(logged)  sessionStorage.setItem("session", JSON.stringify(logged));
    
    settingTransactions();
}())


function settingTransactions(){
    let dataSession = sessionStorage.getItem("session");
    dataSession = JSON.parse(dataSession)
    let DatabaselocalStorage = localStorage.getItem(dataSession.email);
    DatabaselocalStorage = JSON.parse(DatabaselocalStorage)

    const transactionsList = DatabaselocalStorage.transactions;

    if(transactionsList.length > 0){
        let transactionsListHtml = ``;
        
        for (let i = 0; i < transactionsList.length; i++){
            transactionsListHtml += `
                <tr>
                    <th scope="row">${transactionsList[i].data}</th>
                    <td>${transactionsList[i].valor.toFixed(2)}</td>
                    <td>${transactionsList[i].type}</td>
                    <td> ${transactionsList[i].descricao}</td>
                </tr>
            `;
        }
        document.querySelector("#table-rows-list").innerHTML = transactionsListHtml;
    }
}

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

    settingTransactions();

    myModal.hide();

    alert("Lançamento adicionado com sucesso!")
});


document.querySelector("#button-sair").addEventListener("click", (e)=>{
    e.preventDefault();
    logout();
});
class Painel{
    constructor(){} 

    sair(){
        document.querySelector("#btnSair").addEventListener("click",()=>{
            localStorage.removeItem("hash");
            alert("Deslogado com sucesso");
            window.location.href = "http://localhost/smd/projeto/";
        });
        
    }

}

const painel = new Painel();
painel.sair();

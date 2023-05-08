export default class ModelCategorias{
    constructor() {
        this.path = "http://localhost/smd/projeto/api/";  
     }

     async pegarUm(id){
      const endpoint = `${this.path}categorias/get.php/?id=${id}`;
              
        try {            
            const response = await fetch(endpoint);           
            
            return response.json();
                        
          } catch(e) {
            console.log(e);
          }     
   }

   async pegarTodos(){
        const endpoint = this.path+"categorias/getall.php";
        
        try {            
            const response = await fetch(endpoint);           
            
            return await response.json();
                        
          } catch(e) {
            console.log(e);
          }

     }

     inserir(nome, telaAnt){ //telaAnt é a tela que chamou o cadastro de categorias, para eu poder ser redirecionado para lar, visto que a tela de obj e de categorias chama ela
      const endpoint = this.path+"categorias/insert.php";
      
      let dados = {
        nome:nome
      }
      
      jQuery.ajax({              
        type:'POST',
        url:endpoint,
        data:dados,
        success:function(resposta){          
          if(!resposta.error){                              
            alert("Cadastrado com Sucesso");
            
            if(telaAnt == "objetos"){              
              window.location.href = `http://localhost/smd/projeto/src/telas/adm/${telaAnt}/subtelas/cadastro/`;

            }else{
              window.location.href = `http://localhost/smd/projeto/src/telas/adm/${telaAnt}/`;
            }

          }else{
              alert(resposta.error);
          }     
          
        }       

      });

      

   }

   editar(id, nome){
    const endpoint = this.path+"categorias/update.php";
    
    try {            
      const dados = {
        id:id,
        nome:nome
      }
      
      jQuery.ajax({              
        type:'PUT',
        url:endpoint,
        data:dados,
        success:function(resposta){          
          if(!resposta.error){                              
            alert("Editado com Sucesso");                 
            window.location.href = "http://localhost/smd/projeto/src/telas/adm/categorias/";

          }else{
              alert(resposta.error);
          }
          
        }       

      });
                    
      } catch(e) {
        console.log(e);
      }

 }

 excluir(id){
  const endpoint = this.path+"categorias/delete.php";
  
  try {            
    const dados = {
      id:id     
    }
    
    jQuery.ajax({              
      type:'DELETE',
      url:endpoint,
      data:dados,
      success:function(resposta){          
        if(!resposta.error){                              
          alert("Excluido com Sucesso");                 
          window.location.href = "http://localhost/smd/projeto/src/telas/adm/categorias/";

        }else{
            alert(resposta.error);
        }
        
      }       

    });
                  
    } catch(e) {
      console.log(e);
    }

}

}

/*
   
   async function postData(url = "", data = {}) {
  // *
  const response = await fetch(url, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
}

postData("https://example.com/answer", { answer: 42 }).then((data) => {
  console.log(data); // JSON data parsed by `data.json()` call
});
*/


 /*
      let data = {
        id:id
      }
      
      try {            
        const response = await fetch(endpoint,{
            method: "POST",
            mode: "cors",
            cache: "no-cache", 
            credentials: "same-origin", 
            headers: {
              "Content-Type": "application/json",     
        },
            redirect: "follow", 
            referrerPolicy: "no-referrer", 
            body: JSON.stringify(data),
        });           
          
          return response.json();
                      
        } catch(e) {
          console.log(e);
        }
      */
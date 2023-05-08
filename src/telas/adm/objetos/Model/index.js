export default class ModelObjetos{
    constructor() {
        this.path = "http://localhost/smd/projeto/api/";  
     }

     async pegarUm(id){
      const endpoint = `${this.path}objetos/get.php/?id=${id}`;
              
        try {            
            const response = await fetch(endpoint);           
            const json = await response.json();            
            
            return json;
                        
          } catch(e) {
            console.log(e);
          }     
   }

   async pegarPorCategoria(idCategoria){
          
    const endpoint = `${this.path}objetos/getallbycategory.php/?idCategoria=${idCategoria}`;
    
    try {   
           
        const response = await fetch(endpoint);          
        
        return await response.json();
                    
      } catch(e) {
        console.log(e);
      }

 }

   async pegarTodos(){
          
        const endpoint = `${this.path}objetos/getall.php`;
        
        try {   
               
            const response = await fetch(endpoint);          
            
            return await response.json();
                        
          } catch(e) {
            console.log(e);
          }

     }

     inserir(nome, local, id_categoria, descricao){       
      const endpoint = `${this.path}objetos/insert.php`;
      
      let dados = { nome, local, id_categoria, descricao };
      
      jQuery.ajax({              
        type:'POST',
        url:endpoint,
        data:dados,
        success:function(resposta){          
          if(!resposta.error){                              
            alert("Cadastrado com Sucesso");
            window.location.href = `http://localhost/smd/projeto/src/telas/adm/objetos`;
          }else{
              alert(resposta.error);
          }     
          
        }       

      });

      

   }

   editar(id, nome, local, id_categoria, descricao, status_retirada, status_reservado){    
    const endpoint = `${this.path}objetos/update.php`;
    
    try {            
      const dados = { id, nome, local, id_categoria, descricao, status_retirada, status_reservado}; 
      
      jQuery.ajax({              
        type:'PUT',
        url:endpoint,
        data:dados,
        success:function(resposta){          
          if(!resposta.error){                              
            alert("Editado com Sucesso");                 
            window.location.href = "http://localhost/smd/projeto/src/telas/adm/objetos/";

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
  const endpoint = `${this.path}objetos/delete.php`;
  
  try {            
    const dados = {
      id:id     
    }
    console.log(dados.id);
    jQuery.ajax({              
      type:'DELETE',
      url:endpoint,
      data:dados,
      success:function(resposta){          
        if(!resposta.error){                              
          alert("Excluido com Sucesso");                 
          window.location.href = "http://localhost/smd/projeto/src/telas/adm/objetos/";

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

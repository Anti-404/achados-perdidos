export default class Model{
    constructor(tabela) {
        this.path = "http://localhost/smd/projeto/api/public/";  
        this.tabela = tabela;
     }


     async pegarUm(id){
      const endpoint = `${this.path}${this.tabela}/get/${id}`;
              
        try {            
            const response = await fetch(endpoint);           
            
            return response.json();
                        
          } catch(e) {
            console.log(e);
          }     
      }


   async pegarTodos(){

        const endpoint = `${this.path}${this.tabela}`;
        
        try {            
            const response = await fetch(endpoint);           
            
            return await response.json();
                        
          } catch(e) {
            console.log(e);
          }

     }

     inserir(endRedirec, campos){       
      const endpoint = `${this.path}${this.tabela}/insert`;      

      let dados = campos;     

      jQuery.ajax({              
        type:'POST',
        url:endpoint,
        data:dados,
        success:function(resposta){          
          if(!resposta.error){                              
            alert("Cadastrado com Sucesso");
            window.location.href = endRedirec;

          }else{
              alert(resposta.error);
          }     

          
        }       

      });
      

   }

   editar(endRedirec, campos){
    const endpoint = `${this.path}${this.tabela}/update`;
                   
      const dados =  campos;            
      
      jQuery.ajax({              
        type:'POST',
        url:endpoint,
        data:dados,
        success:function(resposta){          
          if(!resposta.error){                              
            alert("Editado com Sucesso");                 
            window.location.href = `${endRedirec}`;

          }else{
              alert(resposta.error);
          }
          
        }       

      });      

 }

 excluir(endRedirec, id){
  
  const endpoint = `${this.path}${this.tabela}/delete/${id}`;

  try {            
    
    jQuery.ajax({              
      type:'GET',
      url:endpoint,
      success:function(resposta){          
        if(!resposta.error){                              
          alert("Excluido com Sucesso");                           
          window.location.href = `${endRedirec}`;

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

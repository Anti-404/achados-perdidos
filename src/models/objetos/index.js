import Model from '../index.js';

export default class ModelObjetos extends Model{
    constructor() {
        super('objetos');
   }    

   async pegarPorCategoria(idCategoria){
          
    const endpoint = `${this.path}objetos/getallbycategory/${idCategoria}`;
    
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
    },
    
    cache: false,
    contentType: false,
    processData: false,
    xhr: function() { // Custom XMLHttpRequest
        var myXhr = $.ajaxSettings.xhr();
        if (myXhr.upload) { // Avalia se tem suporte a propriedade upload
            myXhr.upload.addEventListener('progress', function() {
                /* faz alguma coisa durante o progresso do upload */
            }, false);
        }
        return myXhr;
    } 

  });
  

}


}
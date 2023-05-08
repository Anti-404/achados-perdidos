<?php
require('../config.php');

$method = strtolower($_SERVER['REQUEST_METHOD']);

if($method === 'post') {

    $nome = filter_input(INPUT_POST, 'nome');
    $descricao = filter_input(INPUT_POST, 'descricao');
    $local = filter_input(INPUT_POST, 'local');    
    $id_categoria = filter_input(INPUT_POST, 'id_categoria');    

    if($nome && $descricao && $local) {

        $sql = $pdo->prepare("INSERT INTO objetos (nome, descricao, local, id_categoria ) VALUES (:nome, :descricao, :local, :id_categoria)");
        $sql->bindValue(':nome', $nome);
        $sql->bindValue(':descricao', $descricao);
        $sql->bindValue(':local', $local);        
        $sql->bindValue(':id_categoria', $id_categoria);              
        $sql->execute();

        $id = $pdo->lastInsertId();

        $array['result'] = [
            'id' => $id,
            'nome' => $nome,
            'descricao' => $descricao,
            'local' => $local,
            'id_categoria' => $id_categoria
        ];

    } else {
        $array['error'] = 'Campos não enviados';
    }

} else {
    $array['error'] = 'Método não permitido (apenas POST)';
}

require('../return.php');
<?php
require('../config.php');

$method = strtolower($_SERVER['REQUEST_METHOD']);

if($method === 'post') {

    $nome = filter_input(INPUT_POST, 'nome');    

    if($nome) {

        $sql = $pdo->prepare("INSERT INTO categorias (nome) VALUES (:nome)");
        $sql->bindValue(':nome', $nome);        
        $sql->execute();

        $id = $pdo->lastInsertId();

        $array['result'] = [
            'id' => $id,
            'nome' => $nome
        ];

    } else {
        $array['error'] = 'Campos não enviados';
    }

} else {
    $array['error'] = 'Método não permitido (apenas POST)';
}

require('../return.php');
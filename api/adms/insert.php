<?php
require('../config.php');

$method = strtolower($_SERVER['REQUEST_METHOD']);

if($method === 'post') {

    $usuario = filter_input(INPUT_POST, 'usuario');
    $senha = md5(filter_input(INPUT_POST, 'senha'));    
    $hash = md5(time().rand(0, 9999));
    $email = filter_input(INPUT_POST, 'email');

    if($usuario && $senha && $email ) {

        $sql = $pdo->prepare("INSERT INTO adms (usuario, senha, hash, email) VALUES (:usuario, :senha, :hash, :email)");
        $sql->bindValue(':usuario', $usuario);
        $sql->bindValue(':senha', $senha);
        $sql->bindValue(':hash', $hash);
        $sql->bindValue(':email', $email);
        $sql->execute();

        $id = $pdo->lastInsertId();

        $array['result'] = [
            'id' => $id,
            'usuario' => $usuario,
            'senha' => $senha, 
            'hash' => $hash,
            'email' => $email
        ];

    } else {
        $array['error'] = 'Campos não enviados';
    }

} else {
    $array['error'] = 'Método não permitido (apenas POST)';
}

require('../return.php');
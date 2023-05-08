<?php
require('../config.php');

$method = strtolower($_SERVER['REQUEST_METHOD']);

if($method === 'post') {
    
    $usuario = filter_input(INPUT_POST, 'usuario');
    $senha = md5(filter_input(INPUT_POST, 'senha'));    
   
    
    if($senha && $usuario) {

        $sql = $pdo->prepare("SELECT * FROM adms WHERE usuario = :usuario and senha = :senha ");
        $sql->bindValue(':usuario', $usuario);
        $sql->bindValue(':senha', $senha);
        $sql->execute();

        if($sql->rowCount() > 0) {

            $data = $sql->fetch(PDO::FETCH_ASSOC);

            $array['result'] = [
                'hash' => $data['hash'],
                'usuario' => $usuario,
            ];

        } else {
            $array['error'] = 'Usuario inexistente';
        }

    } else {
        $array['error'] = 'Usuario ou Senha nao enviado';
    }

} else {
    $array['error'] = 'Método não permitido (apenas POST)';
}

require('../return.php');
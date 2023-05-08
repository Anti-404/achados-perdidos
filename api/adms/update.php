<?php
require('../config.php');

$method = strtolower($_SERVER['REQUEST_METHOD']);

if($method === 'put') {

    parse_str(file_get_contents('php://input'), $input);

    $id = $input['id'] ?? null;
    $usuario = $input['usuario'] ?? null;
    $senha = $input['senha'] ?? null;
    $email = $input['email'] ?? null;

    $id = filter_var($id);
    $usuario = filter_var($usuario);
    $senha = filter_var($senha);
    $hash = md5($usuario." ".date("Y-m-d H:i:s"));
    $email = filter_var($email);

    if($id && $usuario && $senha) {

        $sql = $pdo->prepare("SELECT * FROM adms WHERE id = :id");
        $sql->bindValue(':id', $id);
        $sql->execute();

        if($sql->rowCount() > 0) {

            $sql = $pdo->prepare("UPDATE adms SET usuario = :usuario, senha = :senha, hash = :hash, email = :email WHERE id = :id");
            $sql->bindValue(':id', $id);
            $sql->bindValue(':usuario', $usuario);
            $sql->bindValue(':senha', $senha);
            $sql->bindValue(':hash', $hash);
            $sql->bindValue(':email', $email);
            $sql->execute();

            $array['result'] = [
                'id' => $id,
                'usuario' => $usuario,
                'senha' => $senha, 
                'hash' => $hash, 
                'email' => $email
            ];

        } else {
            $array['error'] = 'ID inexistente';
        }

    } else {
        $array['error'] = 'Dados não enviados';
    }

} else {
    $array['error'] = 'Método não permitido (apenas PUT)';
}

require('../return.php');
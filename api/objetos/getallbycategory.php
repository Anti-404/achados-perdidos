<?php
require('../config.php');

$method = strtolower($_SERVER['REQUEST_METHOD']);

if($method === 'get') {

    $idCategoria = filter_input(INPUT_GET, 'idCategoria');

    if($idCategoria) {

        $sql = $pdo->prepare("SELECT * FROM objetos WHERE id_categoria = :id_categoria ORDER BY id DESC");
        $sql->bindValue(':id_categoria', $idCategoria);
        $sql->execute();

        if($sql->rowCount() > 0) {

            $data = $sql->fetchAll(PDO::FETCH_ASSOC);

            foreach($data as $item) {
                $array['result'][] = [
                    'id' => $item['id'],
                    'nome' => $item['nome'],
                    'descricao' => $item['descricao'],
                    'local' => $item['local'],
                    'data' => $item['data'],
                    'status_retirada' => $item['status_retirada'],
                    'status_reservado' => $item['status_reservado'],                
                    'id_categoria' => $item['id_categoria']
                ];
            }

        } else {
            $array['error'] = 'ID inexistente';
        }

    } else {
        $array['error'] = 'ID não enviado';
    }

} else {
    $array['error'] = 'Método não permitido (apenas GET)';
}

require('../return.php');
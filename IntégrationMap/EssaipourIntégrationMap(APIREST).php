<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");


if($_SERVER['REQUEST_METHOD']==='GET'){

    include_once 'EssaipourIntégrationMap(Connexion).php';
    include_once 'EssaipourIntégrationMap(Classe).php';

    $database = new Database();
    $db = $database->getConnection();

    $ville = new Villes($db);

    $stmt = $ville ->lire();

    if($stmt->rowCount()>0){

        $tableauVilles = [];
        $tableauVilles['villes']=[];

        while($row = $stmt->fetch(PDO::FETCH_ASSOC)){
            extract($row);
            $terrain=[
                "id" => $id_ville,
                "nom"=>$nom,
                "latitude"=>$latitude,
                "longitude"=>$longitude
            ];
            $tableauVilles['villes'][]= $terrain;
        }

        http_response_code(200);

        echo json_encode($tableauVilles);
    }

}else{
    http_response_code(405);
    echo json_encode(["message"=>"La méthode n'est pas autorisée"]);
}
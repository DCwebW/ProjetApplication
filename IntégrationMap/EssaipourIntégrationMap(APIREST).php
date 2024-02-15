<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");


if($_SERVER['REQUEST_METHOD']==='GET'){
// Ceci est le début de la syntaxe pour la création d'une API 
    include_once 'EssaipourIntégrationMap(Connexion).php';
    include_once 'EssaipourIntégrationMap(Classe).php';

    $database = new Database(); 
    $db = $database->getConnection(); 
// Ici on rappelle la classe Database qui est réalité la connexion à la base de données ensuite on rappelle sa public function getConnection
    $ville = new Villes($db);
//Ici on rappelle la classe Villes , qui contient les villes contenues dans la table villes de la base de données
    $stmt = $ville ->lire();
//On rappelle sa public function lire avec sa requête SQL on la met dans une variable 
    if($stmt->rowCount()>0){
// rowCount() est une méthode associé au PDO , qui renvoie le nombre de ligne affectées par une requête SQL 
        $tableauVilles = [];
        $tableauVilles['villes']=[];
//Ici 2 tableaux sont crées , le principal et un spécifique pour contenir les données des villes 
        while($row = $stmt->fetch(PDO::FETCH_ASSOC)){
            // Ici on récupère les données récupérées par la requête et on les met en tableau associatif que l'on met dans une variable
            extract($row);
            // On extrait les éléments du tableau associatif , et les transforme en variable 
            //Par conséquent 'nom'='Paris' dans la ligne devient $nom='Paris'
            $terrain=[
                "id" => $id_ville,
                "nom"=>$nom,
                "latitude"=>$latitude,
                "longitude"=>$longitude
            ];
            // Ici on crée un tableau avec les variables obtenues grace à extract 
            $tableauVilles['villes'][]= $terrain;
        }

        http_response_code(200);

        echo json_encode($tableauVilles);
    }

}else{
    http_response_code(405);
    echo json_encode(["message"=>"La méthode n'est pas autorisée"]);
}
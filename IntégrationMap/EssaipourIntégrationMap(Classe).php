<?php

class Villes{

    private $connexion;
    private $table= "villes";

    public $id_ville;
    public $nom;
    public $latitude;
    public $longitude;

    public function __construct($db){
        $this->connexion = $db;
    }
    public function lire(){

        $sql="SELECT * FROM " . $this->table;

        $query = $this->connexion->prepare($sql);
        $query->execute();

        return $query;
    }


}
?>
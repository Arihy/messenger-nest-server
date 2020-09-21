# Messenger Nest Server

## Description

Le serveur de messagerie permet de créer un compte, de se connecter et créer des conversations avec d'autres utilisateurs de la messagerie.

## Configuration

Ajouter un fichier .env à la racine du projet et ajouter la config suivante:

```
PORT=9000
JWT_SECRET=uneclesecrete
JWT_EXPIRATION_TIME=3600
DB_URI=url_de_la_bdd_mongo
```

## Pour lancer le serveur

Installer les packages et lancer le serveur avec les commandes suivantes:

```bash
$ yarn install
$ yarn start
```

## Client

Lancer le client se trouvant sur le répo suivant [Arihy/messenger-react-client](https://github.com/Arihy/messenger-react-client).

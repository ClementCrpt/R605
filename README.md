#HelloCiné - Guide d'Utilisation#

Bienvenue dans l'application HelloCiné ! Ce fichier README fournit toutes les informations nécessaires pour configurer et utiliser correctement l'application.

### Présentation du Projet

HelloCiné est une application backend construite à l'aide des outils Node.js, Hapi.js ainsi que Schwifty, permettant la gestion d'une bibliothèque de films et la collaboration entre les différents utilisateurs. L'application propose des fonctionnalités telles que la gestion des favoris, l'envoi de notifications par e-mail, et l'intégration avec l'API TMDB pour récupérer des informations sur les films.

### Configuration de l'Environnement

Avant de lancer l'application, veuillez configurer les variables d'environnement requises. Créez un fichier `.env` à la racine du projet avec les valeurs appropriées.

Exemple de fichier `.env` :

```env
# Configuration de la base de données MySQL
DB_HOST=localhost
DB_PORT=3306
DB_USER=myuser
DB_PASSWORD=mypassword
DB_NAME=hellocine

# Clé API TMDB (pour récupérer des films depuis l'API TMDB)
TMDB_API_KEY=your_tmdb_api_key

# Configuration Ethereal (pour les tests d'envoi d'e-mails)
ETHEREAL_USER=your_ethereal_username
ETHEREAL_PASS=your_ethereal_password

# Informations administrateur pour le seed
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=adminpassword
```

### Exécution des Migrations

Avant de lancer l'application, assurez-vous d'avoir exécuté les migrations pour créer les tables nécessaires dans la base de données.

```bash
npm run migrate
```

### Installation des Dépendances

Installez les dépendances nécessaires en exécutant la commande suivante :

```bash
npm install
```

### Lancement de l'Application

Une fois les migrations exécutées et les dépendances installées, lancez l'application avec la commande :

```bash
npm start
```

L'application sera accessible à l'adresse [http://localhost:3000](http://localhost:3000).

### Utilisation de l'API

L'API HelloCiné propose divers endpoints pour la gestion des films, des utilisateurs, et des favoris. Consultez la documentation API ou les commentaires dans le code pour plus de détails.

### Tests Automatisés

Pour exécuter les tests automatisés, utilisez la commande :

```bash
npm test
```
# #

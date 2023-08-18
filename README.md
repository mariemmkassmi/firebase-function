# firebase-function

Environnement local 
Cloner le projet sur votre machine :
git clone https://github.com/mariemmkassmi/firebase-function

Se déplacer dans le projet et installer les dépendances :
cd slack && npm install

Configuration 
-il faut changer dans le fichier index.js (à adapter selon votre besoins):

le slack api de slack bot token (se trouve dans Oauth &Permissions) 

le pipe drive api key (se trouve) dans Tools & integration )

les nomes de channel que vous avez 

les types deal que vous souhaitez l'afficher 

Pour installer le Firebase , il suffit de faire simplement un :
npm install -g firebase-tools

Pour connection to Firebase :
firebase login

Initialisation du Projet :
firbase init 

Déploiement d'un projet : 
firebase deploy --only functions  

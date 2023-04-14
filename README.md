# Pré-requis

* [Git](https://git-scm.com/download/win)
* [Node.js](https://nodejs.org/en/)
* [nodemon](https://www.npmjs.com/package/nodemon)
* [Concurrently](https://www.npmjs.com/package/concurrently)
* [PM2](https://www.npmjs.com/package/pm2)
* [Parcel](https://www.npmjs.com/package/parcel-bundler)

## Installation et lancement

- Pour apporter une modification sur le projet, clonez-le en local (développement), créez une nouvelle branche, ajoutez vos modifications puis faites une demande de fusion (pull request)

- Pour créer un nouveau projet à partir du prototype, téléchargez le projet

*Pensez bien à télécharger et installer le package [assets](http://srv-gitlab.audiar.net/rfroger/assets-dataudiar/-/blob/master/README.md) (voir ci-dessus la partie pré-requis)*

Pour installer l'application

```
npm install
```

#### Lancement

Pour lancer l'application

```
npm run dev
```

En environnement de production (pour définir et paramétrer les environnements, voir la [documentation](http://srv-gitlab.audiar.net/rfroger/obs-prototype/-/tree/master/doc/config.md)) :
```
npm start
```
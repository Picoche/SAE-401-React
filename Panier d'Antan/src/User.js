export default class User {
  constructor(data) {
    this.nom_user = data.nom_user;
    this.prenom_user = data.prenom_user;
    this.pseudo = data.pseudo;
    this.mail = data.mail;
    this.mdp = data.MDP;
    this.adresse = data.adresse;
  }
}

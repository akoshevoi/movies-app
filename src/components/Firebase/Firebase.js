// @flow
import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const config = {
  apiKey: 'AIzaSyCrwAC3Ua6RsvRwlaOPZXQCHd3jIDlObgc',
  authDomain: 'react-redux-firebase-d314b.firebaseapp.com',
  databaseURL: 'https://react-redux-firebase-d314b.firebaseio.com',
  projectId: 'react-redux-firebase-d314b',
  storageBucket: 'react-redux-firebase-d314b.appspot.com',
  messagingSenderId: '649476664365',
  appId: '1:649476664365:web:cf922586d4eff4be2d1ca4',
  measurementId: 'G-CHJVGW8EH2'
};

class Firebase {
  auth: Function;
  db: Function;
  googleProvider: Function;
  facebookProvider: Function;
  constructor() {
    app.initializeApp(config);

    this.auth = app.auth();
    this.db = app.database();

    this.googleProvider = new app.auth.GoogleAuthProvider();
    this.facebookProvider = new app.auth.FacebookAuthProvider();
  }

  // *** Auth API *** //

  doCreateUserWithEmailAndPassword = (email: string, password: string) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email: string, password: string) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignInWithGoogle = () => this.auth.signInWithPopup(this.googleProvider);

  doSignInWithFacebook = () => this.auth.signInWithPopup(this.facebookProvider);

  doSignOut = () => this.auth.signOut();

  doPasswordReset = (email: string) => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = (password: string) =>
    this.auth.currentUser.updatePassword(password);

  // *** Merge Auth and DB User API *** //

  onAuthUserListener = (next: Function, fallback: Function) =>
    this.auth.onAuthStateChanged(authUser => {
      if (authUser) {
        this.user(authUser.uid)
          .once('value')
          .then(snapshot => {
            const dbUser = snapshot.val();

            authUser = {
              uid: authUser.uid,
              email: authUser.email,
              username: authUser.username,
              provider: authUser.providerData,
              favouritesMovies: authUser.favouritesMovies,
              ...dbUser
            };

            next(authUser);
          });
      } else {
        fallback();
      }
    });

  // *** User API *** //

  user = (uid: string) => this.db.ref(`users/${uid}`);

  users = () => this.db.ref('users');

  // *** Movies API *** //

  movies = (authUser: Object) =>
    this.db.ref(`users/${authUser.uid}/favouritesMovies`);

  movie = (authUser: Object, idx: number) =>
    this.db.ref(`users/${authUser.uid}/favouritesMovies/${idx}`);

  addFavoriteMovieToDatabase = (authUser: Object, movie: Object) => {
    this.db
      .ref(`users/${authUser.uid}`)
      .once('value')
      .then(snapshot => {
        const userDB = snapshot.val();
        const favouritesMoviesDB = snapshot.val().favouritesMovies;

        if (favouritesMoviesDB) {
          const matchesMovies = favouritesMoviesDB.filter(
            cinema => cinema.id === movie.id
          );

          if (matchesMovies.length === 0) {
            this.db.ref(`users/${authUser.uid}`).set({
              ...userDB,
              favouritesMovies: [...favouritesMoviesDB, movie]
            });
          }
        } else {
          this.db.ref(`users/${authUser.uid}`).set({
            ...userDB,
            favouritesMovies: [movie]
          });
        }
      });
  };
}

export default Firebase;

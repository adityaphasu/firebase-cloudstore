# Firebase CloudStore

A CRUD application using Firebase CloudStore to store data. The user who is logged in and authenticated can add, update, delete and read the data from the database. It is a simple application to understand the basic concepts of Firebase CloudStore.

## Technologies Used

![Firebase](https://img.shields.io/badge/Firebase-FFCA28.svg?style=for-the-badge&logo=Firebase&logoColor=black)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E.svg?style=for-the-badge&logo=JavaScript&logoColor=black)
![HTML5](https://img.shields.io/badge/HTML5-E34F26.svg?style=for-the-badge&logo=HTML5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6.svg?style=for-the-badge&logo=CSS3&logoColor=white)

## How to install

1. Clone the repository
2. npm install

```
npm install
```

3. Setup Firebase and get the configuration

```
// You can get the configuration from Firebase Console after creating a new project

const firebaseConfig = {
  apiKey: // Your API Key,
  authDomain: // Your Auth Domain,
  projectId: // Your Project ID,
  storageBucket: // Your Storage Bucket,
  messagingSenderId: // Your Messaging Sender ID,
  appId: // Your App ID
```

4. Start the development server

```
npm run dev
```

5. Open the browser and go to [http://localhost:5173](http://localhost:5173)

## Step 1

- starting from my template project, using firebase and monorepo
- run setup with `npx firebase init`
  - use hosting, function, firestore, authentication
  - need enable on firebase
- setup settings and vite working
- haven't test deploy to firebase yet

## Question 1

```
You are developerGPT who speciailise in the following technology
- typescript
- react
- node js
- firebase
- material ui
- css in javascript

I have this new project about developing a progressive web app for planning poker
- user will be able to use google single sign-on to login and create account
- user will be able to create a room
- user will be able to share a link to the room to invite other users
- each user in the room will be able to vote using tshirt sizing
- result will be shown once all user in the room finished their vote
- a graph will be used to show number of vote
- subscription is used to listen to results so all users in the room will see results in real time
```

```
To develop this progressive web app (PWA) for planning poker, you can follow these steps:

1. Set up the development environment:

- Install Node.js and npm (the Node.js package manager).
- Create a new project directory and initialize a new Node.js project with npm init.

2. Create a new React application using the Create React App toolchain:

- Run npx create-react-app planning-poker --template typescript.

3. Add required dependencies:

- Install Material-UI: npm install @mui/material @emotion/react @emotion/styled.
- Install Firebase: npm install firebase.
- Install React Router for navigation: npm install react-router-dom @types/react-router-dom.

4. Set up Firebase:

- Create a new project on the Firebase Console.
- Enable Google Sign-In authentication.
- Set up Firestore for storing rooms and votes.
- Create a firebaseConfig.ts file and import and initialize Firebase with the configuration details from the Firebase Console.

5. Create components for the application:

- App.tsx: Main application component.
- Login.tsx: Login page with Google Sign-In button.
- RoomCreation.tsx: Form for creating a room.
- Room.tsx: Room component for voting and displaying results.
- TshirtSize.tsx: Component for rendering T-shirt size buttons.
- VoteGraph.tsx: Component for rendering a graph of votes.

6. Set up React Router for navigation between components in `App.tsx`.

7. Implement Google Sign-In functionality in the `Login.tsx` component using Firebase.

8. Implement room creation in the `RoomCreation.tsx` component:

- Create a new document in the Firestore collection for rooms.
- Generate a unique room ID and store the room details in Firestore.

9. Implement room joining functionality:

- Allow users to enter a room ID or click a shared link.
- Retrieve room details from Firestore and validate the ID.

10. Implement voting functionality in the `Room.tsx` component:

- Create a Firestore collection for votes within the room document.
- Allow users to cast votes using T-shirt sizing.
- Store each vote as a document in the Firestore votes collection.

11. Implement real-time subscription to voting results:

- Use Firestore's onSnapshot method to listen for changes in the votes collection.
- Update the application state and display the voting results.

12. Implement the `VoteGraph.tsx` component to visualize voting results as a graph.

13. Test the application thoroughly and fix any bugs or issues.

14. Deploy the application to a hosting platform like Firebase Hosting or Netlify.

15. Configure the PWA by adding a `manifest.json` file and a service worker for offline support and caching.

Following these steps, you'll have a fully functional progressive web app for planning poker.
```

## Question 2

I have done the following

- setup firebase with firestore in native mode, authentication with firebase, hosting with firebase
- use mono repo structure
- ci/cd with firebase init
- vite server can now start
- installed react and react-dom

Effectively I have completed all steps including step 5. What is the code required for step 6 App.tsx?

## Question 3

Function component is not a function declarationeslintreact/function-component-definition)

maybe use `export default function` instead for the component?

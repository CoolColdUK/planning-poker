## Day 2

## Question 1

```
what other components do I need now?
```

```
Based on the requirements you mentioned earlier for the planning poker progressive web app, here are some additional components you might need:

CreateRoom: A component that allows users to create a room for planning poker. It could have a form that takes a room name or generates a random unique identifier for the room. After creating the room, the user should be redirected to the Room component.

Room: A component that displays the planning poker room. It should show the room name or identifier and a list of users who have joined the room. This component should also have the voting functionality, where each user can vote using T-shirt sizing (XS, S, M, L, XL). Additionally, it should provide a way to share the room link with other users.

VotingResults: A component that displays the voting results once all users in the room have finished voting. This component should show a graph or a chart representing the number of votes for each T-shirt size. You can use a library like Recharts or Chart.js to create the visualization.

InviteLink: A component that generates and displays the invite link for the room, allowing users to easily share it with others. You could use the room's unique identifier to generate the link.

To navigate between components and create a smooth user experience, you can utilize the React Router library that you have already implemented. This way, you can create routes for each component and use navigation links or programmatic navigation to move between different parts of the application.

Remember to consider best practices for state management, prop drilling, and real-time updates using Firebase subscriptions while building out these components.
```

## Question 2

give me the code for create room component. I want the room creation to be automatic so some logged in user visiting a link will automatically create the room. The user will also be able to see other users within the room. 


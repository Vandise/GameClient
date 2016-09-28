# Utilizing React and Redux to manage UI Components in Phaser.
Let me start by saying I am not the most versed with Phaser, in fact this is my first larger project aside from the provided tutorials and examples on the website. In all my previous projects I've always ran into the issue with forms, user input, and updating game state to reflect the changes. Such an example was a simple interactive game to navigate a finite amount of states and render a different scene to reflect the change -- potentially prompt a scenario where the user would utilze a previously found item. A popular approach to form management to engage and prompt a user for input is to structure the forms within the page and hide them by default -- eventually displaying the form through keybindings in Phaser and having javascript set a display attribute. This approach is doable and I could build my projects with webpack and ES6 without incident. Unit testing, however, became a major issue with validating the results of the user interaction. Headless browser testing with mocha and Phaser, due to limitations with Pixi, also became a struggle.

## Contents
- [Architecture](#architecture)
- [Philosophy](#philosophy)
- [The Project](#the-project)
- [Masking The Sockets](#socket-middleware)

## Architecture
![Client Arch](https://github.com/Vandise/GameClient/blob/master/doc/images/client_arch.png)

## Philosophy
It has become embedded in my mind to always include supporting unit tests with any project I include on Github. If a project does not have supporting unit tests to assure its quality and functionality; it's not, in my opinion, worth utilizing. This tells me that the developer either A.) brute-force tested every possible scenario they throught of (which may or may not be documented) or B.) tested against a few scenarios on only their thought process and did not document it -- which brings me to Phaser. Stand alone Phaser is difficult to write supporting unit tests for due to its required functionality, difficult enough that its core does not include supporting tests (the libraries it utilizes do include tests though). However, it is one of the best documented frameworks I've come across. I may not agree with the testability issues, which I hope will be addressed soon, but I chose to utilize Phaser as opposed to other 2D engines based on the excellent documentation. This has allowed me to begin constructing the equivelent of basic MMO's with canvas.

## The Project
I began constructing an MMO with the thought in mind of utilizing Phaser once the game got to a state where it would be required to render sprites, maps, objects, etc. I was going to simply boot up the game instantly and change the game state as a user transitioned between an initial loading screen, login, character select, then actually physically having a sprite interact with the world. This would work fine and I could change the game state through socket messages. This is where my first issue arose: managing socket *connections* (yes connections) in Phaser did NOT go well in a few different aspects:

- Server and client events were becoming intermingled / mixed (code wasn't modular, clean, well structured)
- Mocking server events was a nightmare without utilizing a live connection
- Sockets should not be directly accessible in an application -- Had to be bound to the game object *opinion*

Some of these aspects may have been the fault of my inital code structure. Two of alarms in my mind was attempting to test the functionality of server messages and the global treatment of socket connections. The other fault was the need for a global socket to update a UI component, such as player inventory, on specific events from the server. The project spec ultimately became:

- Maintain a global state that updates UI components listening to a specific property
- Capture user events from Phaser (shortcut keys) and update the global state to display a form
- Create a well-structured design for different sockets containing: server events, client events, and socket-state events
- Sockets should not be directly accessible by any part of the application
- Socket events should affect either the global state, phaser game state, or UI state. Or all/any combination of the three.
- Socket events should be easibly testible, mocked without a live connection, and its functionality/impact validated

A few key words stood out to me when gathering up these ideas: *component*, *global state*, and *events*. My daily tasks at the workplace revolves around React Components and Flux Architecture. A global state represents the contents a component may output and a dispatcher executes a function that updates the global state when an event is send (ie user presses the "I" key to open the inventory menu). This got me to thinking: What if I treat the Phaser game client as part of the global state and pass any state changes to the client based on user input. As long as I initialize an identifier saying the client has rendered, React will never reload/write over what Phaser has displayed on the canvas. I would then be able to pass the global state to phaser, dispatch actions from phaser, and socket events from the server would be handled through an event handler bound to the client. 

The one issue that arose from this was being able to capture isolated socket events from the server and send them to the client.

## Socket Middleware
There are many "Flux" implementations out there for React, but I've found Redux to be a more testable approach to building unidirectional dataflow applications. My goal was to isolate the socket connections. I didn't want to know anything about them aside from the configuration options passed to them. If they weren't connected, a loading modal would appear. If a socket disconnects unexpectedly, the user is sent back to a specific state. All of these requirements and it absolutely had to be testible in order to confirm this functionality. 

The concept of middleware came to mind. In Redux middleware is initialized to capture an event dispatched from the dispatcher before it's sent to the reducer to update the global application state. We have to handle several scenarios in the middleware:

- dispatch a socket event to the server: skip to the next action in the queue since there's no state to update
- capture a server event and update either the client state or the global state (UI or user data)
- handle any disconnect or connection events, display appropriate modals, forms, or redirects

There were no considerable packages to handle the specific needs of this project: so I created an extremely generic, but powerful middleware to handle multiple socket connections and provides easy testibility. [Redux Socket-IO Middleware](https://github.com/Vandise/redux-socket.io-middleware)

Through this middleware I was able to access the global state (including the client), dispatch events to update the UI, client state, and global state. For example I am able to construct various functions the middleware will pass a variety of parameters to that I could simply pass a mock socket to the middleware with mocha:

```javascript
//client/getActiveServers.js
const dispatch = (socket, store, action) => {
  store.dispatch(displayModal(modal.FETCHING_SERVERS));
  socket.emit(action.type, action.payload);
};
export default {
  action: GET_ACTIVE_SERVERS,
  dispatch,
};

//test/client/getActiveServers
it('Dispatches a list of servers', () => {
  ...
  mockServerEvent(CS,
    init.data,
    init.store
  );
  const arg = init.store.dispatch.lastCall.args[0];
  expect(arg.payload).to.eql(init.mockData);
});
it('Closes the message modal', () => {
  ...
  mockServerEvent(CS, init.data, init.store);
  const arg = init.store.dispatch.firstCall.args[0];
  expect(arg.type).to.equal('CLOSE_MODAL');
});
```

With this extra automated layer, our client socket events turn out like this:

```javascript
this.game.dispatch(fetchCharacters(
  this.game.playerData.user
));
this.game.dispatch(setMenu('characterList', true));
```



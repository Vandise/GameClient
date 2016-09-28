# Utilizing React and Redux to manage UI Components in Phaser.
Let me start by saying I am not the most versed with Phaser, in fact this is my first larger project aside from the provided tutorials and examples on the website. In all my previous projects I've always ran into the issue with forms, user input, and updating game state to reflect the changes. Such an example was a simple interactive game to navigate a finite amount of states and render a different scene to reflect the change -- potentially prompt a scenario where the user would utilze a previously found item. A popular approach to form management to engage and prompt a user for input is to structure the forms within the page and hide them by default -- eventually displaying the form through keybindings in Phaser and having javascript set a display attribute. This approach is doable and I could build my projects with webpack and ES6 without incident. Unit testing, however, became a major issue with validating the results of the user interaction. Headless browser testing with mocha and Phaser, due to limitations with Pixi, also became a struggle.

## Contents
- [Architecture](#architecture)
- [Philosophy](#philosophy)
- [The Project](#the-project)
- [Masking The Sockets](#socket-middleware)
- [UI Components and Phaser](#ui-components)
- [Known Architecture Issues](#known-architecture-issues)
- [What Role Does Phaser Play In All This](#what-role-does-phaser-play-in-all-this)
- [Does This Work With Non Multiplayer Games](#does-this-work-with-non-multiplayer-games)

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

## UI Components
Like any other standard React components, we can bind user interaction to functions within our components that can *dispatch* an action. These actions can be mapped to the *socket middleware* and send a message to the client and generally get a response from the server to update some sort of state, update the global redux state, or even the phaser state (through the middleware) if required. For brevity a short example requesting the user login through a login form would send an event to the socket middleware and get a server response saying the login was successful or failed. We can then dispatch a new state or keep the current state based on this scenario.

```javascript
...
  loginAttempt() {
    const username = ReactDOM.findDOMNode(this.refs.account).value;
    const password = ReactDOM.findDOMNode(this.refs.password).value;
    this.props.dispatch(
      loginActions.requestLogin(username, password)
    );
  }
  render() {
    ... inputs here
    <div className="user-actions">
      <a
        id="login"
        className="button red"
        onClick={this.loginAttempt}
      >Ok
      </a>
      <a to="/" className="button red">Cancel</a>
    </div>
    ...
  }
```

Of course the position of these components entirely depends on the styles applied to the classes. Simple CSS allows us to make these menus appear how we see fit.

## Known Architecture Issues
Like all patterns and architectures, there are known issues with this approach. The main companint being:

- It's a lot of code to mask the sockets

To be fair updating a global state or game state and handling user events to send to the server (such as character walking) is a lot for a single socket wrapper function to handle. These functions need to be isolated to be effectively tested. I don't use the term "over-engineered" lightly, but it is a fair claim. It serves one general purpose and it does it well if the implementation described in the readme is followed. Otherwise you may have a problem.

- We cannot validate events actually emitted from within Phaser *kind of*

If you have the "I" key bound to open the inventory menu within Phaser -- I have no way to validate that the "I" key is bound to the inventory menu. I can, however, validate that after the "I" key is pressed, the action it dispatches will indeed open the inventory menu. Phaser is entirely bypassed in this case and is only mocked in the unit tests when server events are being sent to the event handler. 

## What Role Does Phaser Play In All This
Phaser, in this sense, does what it's intended to do: render sprites and apply a physics/partical engine to the canvas. Canvas objects that interact with one another can send events, and events received, such as a player moved, can cause phaser to redraw/animate a sprite. Adding the multiplayer option just adds a level of complexity. 

## Does This Work With Non Multiplayer Games
Absolutely.
The flow of your game with this architecture entirely depends on the middleware. It's the heart and soul of this architecture. You cannot use the middleware I've provided as it's socket-io specific. It's only a single file though and you could use it as a guideline to designing your own middleware. In this specific case, you would only need to handle dispatcher messages that would go to either the phaser event handler or directly to the reducer. 

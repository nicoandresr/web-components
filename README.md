# Web-Components
Repo for test the capabilities of web components, using databinding with Flux pattern.
this demo project uses only vanilla JavaScript for build a Snake game, the main goal
of this project is build a game only using web components api.

## Data binding.
Web components dont offers a solution out of the box for databinding, you need build
your own data binding. I choice the Flux pattern because is simpler and offers a good
solution for data binding.

Remember Flux pattern:

      Action -> Dispatcher -> Store -> View

The Flux pattern enables to dispatchs actions to a store and the view is updated.

Flux pattern was made for react applications then the view can be updated automatically
by react. I addapt the pattern to web components because in web components you dont have
the common react lifecycle. Then was necessary to define a Listener for update the
web component, additionally I define a HANDLER to update the store for avoid to have
a big Swith/Case.

Flux pattern addapt to web components:

      Action -> Dispatcher -> HANDLER -> Store -> LISTENER -> View

When one Action is Dispatched, one or many Handlers updates the Store, and one or many Listeners updates the View(s) (Web Component).

## Architecture
In vanilla javascript I decided to define everything in the window context, I separates
each web component by files, and the same for the flux functions and the store implementation.
Every file is loaded in the index.html file in a "script" tag. the order there is important because
you can't use a function or a variable before that was be loaded.

The global view of this architecture is:

 - flux.js            // The flux pattern definition, this is the heart of the app.
 - actions.js         // The actions definitions, ej: setFoot, setMotion, setPoint, setGameOver.
 - store.js           // Store is the definition of the app state.
 - web-component-1.js
 - web-component-2.js
 - web-component-n.js // They are the views. And are the bricks of the app.
 - app.js             // Where each web component is registered and the main actions are binded to window events.

The Store is composed by two things: An Initial State and Handlers that updates the state.

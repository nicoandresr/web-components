class Store {
  constructor(dispatcher, initialState) {
    this.__listeners = [];
    this.__actionHandlers = [];
    const localStg = localStorage['snake-storage'];
    this.__state = localStg ? JSON.parse(localStg) : { ...initialState };
    dispatcher.register(this.__onDispatch.bind(this));
  }

  addListener(listener) {
    this.__listeners.push(listener);
  }

  addHandler(handler) {
    const actionHandler = action => {
      if (handler[action.type]) {
        handler[action.type](this.__state, action);
        this.__emitChange();
      }
    };
    this.__actionHandlers.push(actionHandler);
  }

  __onDispatch(action) {
    this.__actionHandlers.forEach(actionHandler => actionHandler(action));
  }

  __emitChange() {
    this.__listeners.forEach(listener => listener(this.__state));
    localStorage['snake-storage'] = JSON.stringify(this.__state);
  }
}

class Dispatcher {
  constructor() {
    this.__listeners = [];
  }

  dispatch(action) {
    this.__listeners.forEach(listener => listener(action));
  }

  register(listener) {
    this.__listeners.push(listener);
  }
}

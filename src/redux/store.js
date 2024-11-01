import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import RootReducers from "./rootReducer";

export function configureStore(InitialState) {
  const Store = createStore(
    RootReducers,
    InitialState,
   applyMiddleware(thunk)
  );
  return Store;
}
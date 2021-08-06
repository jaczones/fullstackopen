import { createStore, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import anecdoteReducer from './reducers/anecdoteReducer'
import filterReducer from './reducers/filterReducer'
import notificationsReducer from './reducers/notificationReducer'

const reducer = combineReducers({
    notification: notificationsReducer,
    anecdotes: anecdoteReducer,
    filter: filterReducer
})

const store = createStore(
    reducer,
    composeWithDevTools()
)

export default store
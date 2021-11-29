import React from 'react'
import { Switch, Route, Redirect } from 'react-router'
import cookie from 'cookie'
import Home from './components/Home'
import About from './components/About'
import Car from './components/Car'
import Login from './components/Login'

// Write checkAuth function here
// Check the cookies for a cookie called "loggedIn"
const checkAuth = () => {
    const cookies = cookie.parse(document.cookie)
    return cookies["loggedIn"] ? true : false
}

// Write ProtectedRoute function here
const ProtectedRoute = ({component: Component, ...rest}) => {
    return (
      <Route
        // spread the rest of the props that are needed in this component
        {...rest}
        // define the value of the render method as a ternary that checks to see if checkAuth returns true or false
        render={(props) => checkAuth() === true
            // if true render the component with all the props
            ? <Component {...props} />
            // if false, use the Redirect component to update the url to `/login` so they are redirected to the login component
            : <Redirect to={{pathname: '/login', state: {from: props.location}}} />}
      />
    )
  }

const Router = () => {
    return (
        <Switch>
            <Route path="/login" component={Login} />
            <ProtectedRoute exact path="/" component={Home} />
            <ProtectedRoute path="/about" component={About} />
            <ProtectedRoute path="/car/:id" component={Car} />
        </Switch>
    );
};

export default Router;
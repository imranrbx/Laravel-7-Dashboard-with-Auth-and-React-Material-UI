import React from "react";
import ReactDOM from "react-dom";
import AppBar from "@material-ui/core/AppBar";
import Link from "@material-ui/core/Link";
import Button from "@material-ui/core/Button";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    HashRouter,
    Redirect
} from "react-router-dom";
import Auth from "../ContextApi";
import Login from "./Login";
import Register from "./Register";
import Dashboard from "./Dashboard";
const useStyles = makeStyles(theme => ({
    "@global": {
        ul: {
            margin: 0,
            padding: 0,
            listStyle: "none"
        }
    },
    appBar: {
        borderBottom: `1px solid ${theme.palette.divider}`
    },
    toolbar: {
        flexWrap: "wrap"
    },
    toolbarTitle: {
        flexGrow: 1
    },
    link: {
        margin: theme.spacing(1, 1.5)
    },
    heroContent: {
        padding: theme.spacing(8, 0, 6)
    },
    cardHeader: {
        backgroundColor:
            theme.palette.type === "dark"
                ? theme.palette.grey[700]
                : theme.palette.grey[200]
    },
    cardPricing: {
        display: "flex",
        justifyContent: "center",
        alignItems: "baseline",
        marginBottom: theme.spacing(2)
    },
    footer: {
        borderTop: `1px solid ${theme.palette.divider}`,
        marginTop: theme.spacing(8),
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(3),
        [theme.breakpoints.up("sm")]: {
            paddingTop: theme.spacing(6),
            paddingBottom: theme.spacing(6)
        }
    }
}));

function PrivateRoute({ children, ...rest }) {
    const [state, setState] = React.useState(false);
    const [loggedIn, setLoggedIn] = React.useState(false);
    React.useEffect(() => {
        axios
            .get("/api/user")
            .then(res => setLoggedIn(res.data))
            .catch(err => setLoggedIn(err));
    }, [state]);
    if (!loggedIn) {
        return null;
    }
    return (
        <Route
            {...rest}
            render={({ location }) =>
                loggedIn.id ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: "/",
                            state: { from: location }
                        }}
                    />
                )
            }
        />
    );
}
function App() {
    const classes = useStyles();
    return (
        <HashRouter>
            <div>
                <AppBar
                    position="static"
                    color="default"
                    elevation={0}
                    className={classes.appBar}
                >
                    <Toolbar className={classes.toolbar}>
                        <Typography
                            variant="h6"
                            color="inherit"
                            noWrap
                            className={classes.toolbarTitle}
                        >
                            Perfect Web Solutions
                        </Typography>
                        <nav>
                            <Link
                                variant="button"
                                color="textPrimary"
                                href="#/dashboard"
                                className={classes.link}
                            >
                                Dashboard
                            </Link>

                            <Link
                                variant="button"
                                color="textPrimary"
                                href="#/register"
                                className={classes.link}
                            >
                                Register
                            </Link>
                        </nav>
                        <Button
                            href="#/"
                            color="primary"
                            variant="outlined"
                            className={classes.link}
                        >
                            Login
                        </Button>
                    </Toolbar>
                </AppBar>
                <Switch>
                    <Route path="/register">
                        <Register />
                    </Route>
                    <PrivateRoute path="/dashboard">
                        <Dashboard />
                    </PrivateRoute>
                    <Route path="/">
                        <Login />
                    </Route>
                </Switch>
            </div>
        </HashRouter>
    );
}
ReactDOM.render(<App />, document.querySelector("#app"));

import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";
import Copyright from "./Copyright";
import { Redirect, useHistory } from "react-router-dom";
import Auth from "../ContextApi";

const useStyles = makeStyles(theme => ({
    root: {
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh"
    },
    main: {
        marginTop: theme.spacing(8),
        marginBottom: theme.spacing(2)
    },
    footer: {
        padding: theme.spacing(3, 2),
        marginTop: "auto",
        backgroundColor:
            theme.palette.type === "dark"
                ? theme.palette.grey[800]
                : theme.palette.grey[200]
    },
    mainButtons: {
        display: "flex",
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-evenly"
    }
}));

export default function Dashboard(props) {
    const classes = useStyles();
    let history = useHistory();
    const [name, setName] = React.useState("");
    const [state, setState] = React.useState(false);
    const [token, setToken] = React.useState("");

    React.useEffect(() => {
        axios
            .get("/api/user")
            .then(res => setName(res.data.email))
            .catch(err => console.log(err));
    }, [token]);
    function logmeout() {
        console.log(history);
        history.push("/");
    }
    return (
        <div className={classes.root}>
            <CssBaseline />
            <Container component="main" className={classes.main} maxWidth="sm">
                <Typography variant="h2" component="h1" gutterBottom>
                    Welcome {name ? name : "Guest"}
                </Typography>
                <Typography gutterBottom>
                    Your Token is: {token ? token : ""}
                </Typography>
                <Typography variant="h5" component="h2" gutterBottom>
                    {"Pin a footer to the bottom of the viewport."}
                    {
                        "The footer will move as the main element of the page grows."
                    }
                    <Container className={classes.mainButtons}>
                        <button
                            onClick={() => {
                                axios
                                    .post("/logout")
                                    .then(res => history.push("/"))
                                    .catch(err => console.log(err));
                            }}
                        >
                            Logout
                        </button>
                        <button
                            onClick={() => {
                                axios
                                    .post("/api/token")
                                    .then(res => setToken(res.data))
                                    .catch(err => console.log(err));
                            }}
                        >
                            Generate Token
                        </button>
                        <button
                            onClick={() => {
                                axios
                                    .post("/api/get-tokens")
                                    .then(res => console.log(res.data))
                                    .catch(err => console.log(err));
                            }}
                        >
                            Get All Tokens
                        </button>
                        <button
                            onClick={() => {
                                axios
                                    .post("/api/delete-tokens")
                                    .then(res => console.log(res.data))
                                    .catch(err => console.log(err));
                            }}
                        >
                            Delete All Tokens
                        </button>
                    </Container>
                </Typography>
            </Container>
            <footer className={classes.footer}>
                <Container maxWidth="sm">
                    <Copyright />
                </Container>
            </footer>
        </div>
    );
}

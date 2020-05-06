import React from 'react';
import { Router, Route } from 'react-router-dom';

import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';

import history from '../history';
import SignUp from './SignUp';
import SignIn from './SignIn';
import NavBar from './NavBar';
import Footer from './Footer';
import Homepage from './Homepage';

export default function App() {
	const useStyles = makeStyles((theme) => ({
		root: {
			display: 'flex',
			flexDirection: 'column',
			minHeight: '100vh',
		},
		main: {
			//marginTop: theme.spacing(8),
			//marginBottom: theme.spacing(2),
			//display: 'flex',
			//flexDirection: 'column',
			minHeight: '85vh',
		},
	}));
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<CssBaseline />
			<Router history={history}>
				<NavBar />
				<Container component='main' className={classes.main}>
					<Route path='/' exact component={Homepage} />
					<Route path='/register' component={SignUp} />
					<Route path='/login' component={SignIn} />
				</Container>
				<Footer />
			</Router>
		</div>
	);
}

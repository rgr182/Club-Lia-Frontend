import FuseSplashScreen from '@fuse/core/FuseSplashScreen';
import auth0Service from 'app/services/auth0Service';
import firebaseService from 'app/services/firebaseService';
import jwtService from 'app/services/jwtService';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from '@reduxjs/toolkit';
import { hideMessage, showMessage } from 'app/store/fuse/messageSlice';

import { setUserDataFirebase, setUserDataAuth0, setUserData, logoutUser } from './store/userSlice';
import axios from "axios";
import store from "../store";

class Auth extends Component {
	state = {
		waitAuthCheck: true
	};

	componentDidMount() {
		let currentRoute = this.props.history.location.pathname;
		if(currentRoute !== '/logout') {
			return Promise.all([
				// Comment the lines which you do not use
				//this.firebaseCheck(),
				// this.auth0Check(),
				this.jwtCheck()
			]).then(() => {
				this.setState({waitAuthCheck: false});
			});
		}else{
			var token = window.localStorage.getItem('jwt_access_token');
			axios.defaults.headers.common.Authorization = `Bearer ${token}`; 	
			jwtService
					.signInWithToken()
					.then(user => {
						this.props.setUserData(user);
						this.props.showMessage({ message: 'Logout' });
						this.setState({waitAuthCheck: false});
					})
					.catch(error => {
						this.props.logoutUser();
						this.setState({waitAuthCheck: false});
					})
			localStorage.removeItem('jwt_access_token');
			delete axios.defaults.headers.common.Authorization;
				
		
		}
	}

	jwtCheck = () =>
		new Promise(resolve => {
			jwtService.on('onAutoLogin', () => {
				this.props.showMessage({ message: 'Logging in with JWT' });

				/**
				 * Sign in and retrieve user data from Api
				 */
				jwtService
					.signInWithToken()
					.then(user => {
						this.props.setUserData(user);

						resolve();

						this.props.showMessage({ message: 'Sesión iniciada' });
					})
					.catch(error => {
						//this.props.showMessage({ message: 'Logged in with JWT' });
						this.props.logoutUser();
						//resolve();
					});
			});

			jwtService.on('onAutoLogout', message => {
				if (message) {
					this.props.showMessage({ message });
				}

				this.props.logoutUser();

				resolve();
			});

			jwtService.on('onNoAccessToken', () => {
				resolve();
			});

			jwtService.init();

			return Promise.resolve();
		});

	auth0Check = () =>
		new Promise(resolve => {
			auth0Service.init(success => {
				if (!success) {
					resolve();
				}
			});

			if (auth0Service.isAuthenticated()) {
				this.props.showMessage({ message: 'Logging in with Auth0' });

				/**
				 * Retrieve user data from Auth0
				 */
				auth0Service.getUserData().then(tokenData => {
					this.props.setUserDataAuth0(tokenData);

					resolve();

					this.props.showMessage({ message: 'Logged in with Auth0' });
				});
			} else {
				resolve();
			}

			return Promise.resolve();
		});

	firebaseCheck = () =>
		new Promise(resolve => {
			firebaseService.init(success => {
				if (!success) {
					resolve();
				}
			});

			firebaseService.onAuthStateChanged(authUser => {
				if (authUser) {
					this.props.showMessage({ message: 'Ingresando...' });

					/**
					 * Retrieve user data from Firebase
					 */
					firebaseService.getUserData(authUser.uid).then(
						user => {
							this.props.setUserDataFirebase(user, authUser);

							resolve();

							this.props.showMessage({ message: 'Usuario autenticado' });
						},
						error => {
							resolve();
						}
					);
				} else {
					resolve();
				}
			});

			return Promise.resolve();
		});

	render() {
		return this.state.waitAuthCheck ? <FuseSplashScreen /> : <>{this.props.children}</>;
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(
		{
			logoutUser,
			setUserData,
			setUserDataAuth0,
			setUserDataFirebase,
			showMessage,
			hideMessage
		},
		dispatch
	);
}

export default connect(null, mapDispatchToProps)(Auth);

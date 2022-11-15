const prodConfig = {
	apiKey           : "AIzaSyBmFtE1xcDxRXp-DTgt88L_cbXF0--3Tpw",
	authDomain       : "mundolia-dev.firebaseapp.com",
	databaseURL      : "https://mundolia-dev.firebaseio.com",
	projectId        : "mundolia-dev",
	storageBucket    : "mundolia-dev.appspot.com",
	messagingSenderId: "373775297828"
};

const devConfig = {
    apiKey           : "AIzaSyBmFtE1xcDxRXp-DTgt88L_cbXF0--3Tpw",
    authDomain       : "mundolia-dev.firebaseapp.com",
    databaseURL      : "https://mundolia-dev.firebaseio.com",
    projectId        : "mundolia-dev",
    storageBucket    : "mundolia-dev.appspot.com",
    messagingSenderId: "373775297828"
};

const config = process.env.NODE_ENV === 'production' ? prodConfig : devConfig;

export default config;

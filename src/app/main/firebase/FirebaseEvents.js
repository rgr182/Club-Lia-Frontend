import { initializeApp } from 'firebase/app';
import { getAnalytics, logEvent } from 'firebase/analytics';

export const FirebaseEvent = {
	// GALAXIES
	GREEN_GALAXY: {
		value: 'G1',
		displayValue: 'G_Club_Verde'
	},
	HAPPY_GALAXY: {
		value: 'G2',
		displayValue: 'G_Club_Felicidad'
	},
	ART_GALAXY: {
		value: 'G3',
		displayValue: 'G_Club_Arte'
	},
	FUTURE_GALAXY: {
		value: 'G4',
		displayValue: 'G_Club_Futuro'
	},
	LETTER_GALAXY: {
		value: 'G5',
		displayValue: 'G_Club_Letras'
	},

	// ISLANDS
	ART_ISLAND: {
		value: 'I1',
		displayValue: 'I_Arte'
	},
	HISTORY_ISLAND: {
		value: 'I2',
		displayValue: 'I_Historia'
	},
	MY_CLASSES_ISLAND: {
		value: 'I3',
		displayValue: 'I_Mis_Clases'
	},
	WORLD_LIA_ISLAND: {
		value: 'I4',
		displayValue: 'I_Mundo_LIA'
	},
	NATURAL_SCIENCES_ISLAND: {
		value: 'I5',
		displayValue: 'I_Ciencias_Naturales'
	},
	GEOGRAPHY_ISLAND: {
		value: 'I6',
		displayValue: 'I_Geografia'
	},
	TECH_ISLAND: {
		value: 'I7',
		displayValue: 'I_Tecnologia_Habilidades_Digitales'
	},
	CIVIC_FORMATION_ISLAND: {
		value: 'I8',
		displayValue: 'I_Formacion_Civica_Etica'
	},
	HEALTH_ISLAND: {
		value: 'I9',
		displayValue: 'I_Salud_Bienestar'
	},
	SOCIO_EMOTIONAL_ISLAND: {
		value: 'I10',
		displayValue: 'I_Educacion_Sociemocional'
	},
	SPANISH_ISLAND: {
		value: 'I11',
		displayValue: 'I_Espanol'
	},
	ENGLISH_ISLAND: {
		value: 'I12',
		displayValue: 'I_Ingles'
	},
	MATH_ISLAND: {
		value: 'I13',
		displayValue: 'I_Matematicas'
	}
};

const firebaseConfig = {
	apiKey: process.env.REACT_APP_FIREBASE_EVENT_API_KEY,
	authDomain: process.env.REACT_APP_FIREBASE_EVENT_AUTH_DOMAIN,
	projectId: process.env.REACT_APP_FIREBASE_EVENT_PROJECT_ID,
	storageBucket: process.env.REACT_APP_FIREBASE_EVENT_STORAGE_BUCKET,
	messagingSenderId: process.env.REACT_APP_FIREBASE_EVENT_MESSAGING_SENDER_ID,
	appId: process.env.REACT_APP_FIREBASE_EVENT_APP_ID,
	measurementId: process.env.REACT_APP_FIREBASE_EVENT_MEASUREMENT_ID
};

let firebase;

async function initFirebaseAnalytics() {
	// if (!firebase) {
	// 	firebase = await initializeApp(firebaseConfig);
	// }
	// return getAnalytics(firebase);
}

const getEventName = eventName => Object.values(FirebaseEvent).find(_event => _event.value === eventName)?.displayValue;

export default function logFirebaseEvent(_event, user) {
	// const analytics = initFirebaseAnalytics();
	// const eventName = getEventName(_event);
	// const userInfo = {
	// 	rol: user.data.role ?? '',
	// 	grado: user.data.grade ?? '',
	// 	nombre: `${user.data.displayName ?? ''} ${user.data.lastName ?? ''}`
	// };
	// logEvent(analytics, eventName ?? _event, userInfo);
}

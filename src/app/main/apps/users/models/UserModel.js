export const IUserStatus = {
	ACEPTADO: { value: 'aceptado', displayValue: 'Aceptado' },
	NO_CANDIDATO: { value: 'no candidato', displayValue: 'No candidato' },
	IN_PROCESS: { value: 'en proceso', displayValue: 'En proceso' }
};

export const IGlobalStatus = {
	POR_REVISAR: { value: 1, displayValue: 'Por revisar', backgroundColor: '#F8CA27' },
	EN_PROCESO: { value: 2, displayValue: 'En proceso', backgroundColor: '#FF9457' },
	ACTUALIZADO: { value: 3, displayValue: 'Actualizado', backgroundColor: '#FF6CC4' },
	APROBADO: { value: 4, displayValue: 'Aprobado', backgroundColor: '#1CD17A' }
};

const PrimaryGrades = {
	FIRST: {
		id: 0,
		grade: '1° de primaria'
	},
	SECOND: {
		id: 1,
		grade: '2° de primaria'
	},
	THIRD: {
		id: 2,
		grade: '3° de primaria'
	},
	FOURTH: {
		id: 3,
		grade: '4° de primaria'
	},
	FIFTH: {
		id: 4,
		grade: '5° de primaria'
	},
	SIXTH: {
		id: 5,
		grade: '6° de primaria'
	}
};

const MiddleGrades = {
	MIDDLE_FIRST: {
		id: 6,
		grade: '1° de secundaria'
	},
	MIDDLE_SECOND: {
		id: 7,
		grade: '2° de secundaria'
	},
	MIDDLE_THIRD: {
		id: 8,
		grade: '3° de secundaria'
	}
};

export const IGrades = {
	...PrimaryGrades,
	...MiddleGrades
};

export const IEducationProgram = {
	PUBLIC: {
		id: 0,
		program: 'Escuela pública'
	},
	PRIVATE: {
		id: 1,
		program: 'Escuela privada'
	},
	ONSITE: {
		id: 2,
		program: 'Escuela presencial'
	},
	ONLINE: {
		id: 3,
		program: 'Escuela en línea'
	},
	HOME_SCHOOL: {
		id: 4,
		program: 'Homeschool'
	},
	NO_SCHOOL: {
		id: 5,
		program: 'Sin escuela'
	},
	AMERICAN_PROGRAM: {
		id: 6,
		program: 'Programa americano'
	},
	ANOTHER_PLATFORM: {
		id: 7,
		program: 'Otra plataforma de contenido sin clases'
	}
};

export const IStarDate = {
	IMMEDIATELY: 'Inmediato (Ciclo actual)',
	NEXT_CICLE: 'Siguiente ciclo escolar'
};

/**
 * Authorization Roles
 */
const authRoles = {
	admin: ['admin'],
	admin_escuela: ['admin', 'admin_escuela','director_escuela', 'Escuela-I', 'Escuela-M', 'Escuela-A'],
	teacher: ['maestro_preescolar', 'maestro_secundaria', 'maestro', 'maestroe1', 'maestroe2', 'maestroe3', 'Escuela-I', 'Escuela-M', 'Escuela-A', 'Maestro-I', 'Maestro-M', 'Maestro-A', 'Maestro-I-preescolar', 'Maestro-M-preescolar', 'Maestro-A-preescolar', 'Maestro-I-secundaria', 'Maestro-M-secundaria', 'Maestro-A-secundaria'],
	aulaVirtual: ['maestro_preescolar', 'maestro_secundaria', 'profesor_summit_2021', 'maestro', 'alumno', 'alumno_secundaria', 'preescolar', 'alumnoe0', 'alumnoe1', 'alumnoe2', 'alumnoe3', 'maestroe1', 'maestroe2', 'maestroe3', 'Maestro-I', 'Maestro-M', 'Maestro-A', 'Alumno-I', 'Alumno-M', 'Alumno-A', 'Maestro-I-preescolar', 'Maestro-M-preescolar', 'Maestro-A-preescolar', 'Maestro-I-secundaria', 'Maestro-M-secundaria', 'Maestro-A-secundaria'],
	user: ['admin', 'admin_escuela', 'user'],
	alumno:['admin', 'admin_escuela', 'alumno', 'alumno_secundaria', 'preescolar', 'maestro_preescolar', 'maestro_secundaria', 'maestro', 'padre', 'profesor_summit_2021', 'alumnoe0', 'alumnoe1', 'alumnoe2', 'alumnoe3', 'maestroe1', 'maestroe2', 'maestroe3', 'Escuela-I', 'Escuela-M', 'Escuela-A', 'Maestro-I', 'Maestro-M', 'Maestro-A', 'Padre-I', 'Padre-M', 'Padre-A', 'Alumno-I', 'Alumno-M', 'Alumno-A', 'director_escuela', 'Maestro-I-preescolar', 'Maestro-M-preescolar', 'Maestro-A-preescolar', 'Maestro-I-secundaria', 'Maestro-M-secundaria', 'Maestro-A-secundaria'],
	dashboard:['alumno', 'alumno_secundaria', 'preescolar', 'alumnoe0', 'alumnoe1', 'alumnoe2',	'alumnoe3', 'Alumno-I', 'Alumno-M', 'Alumno-A'],
	memberships: ['padre', 'Escuela-I', 'Escuela-M', 'Escuela-A', 'Maestro-I', 'Maestro-M', 'Maestro-A', 'Padre-I', 'Padre-M', 'Padre-A', 'Maestro-I-preescolar', 'Maestro-M-preescolar', 'Maestro-A-preescolar', 'Maestro-I-secundaria', 'Maestro-M-secundaria', 'Maestro-A-secundaria'],
	activities:['alumno', 'alumno_secundaria', 'preescolar', 'maestro_preescolar', 'maestro_secundaria', 'maestro', 'profesor_summit_2021', 'alumnoe0', 'alumnoe1', 'alumnoe2',	'alumnoe3',	'maestroe1', 'maestroe2', 'maestroe3', 'Maestro-I',	'Maestro-M', 'Maestro-A', 'Alumno-I', 'Alumno-M', 'Alumno-A', 'Maestro-I-preescolar', 'Maestro-M-preescolar', 'Maestro-A-preescolar', 'Maestro-I-secundaria', 'Maestro-M-secundaria', 'Maestro-A-secundaria'],
	onlyGuest: [],
	licencias: ['Maestro-R'],
	grupos: ['admin', 'admin_escuela', 'director_escuela', 'director_escuela', 'maestro_preescolar', 'maestro_secundaria', 'profesor_summit_2021', 'maestro', 'Escuela-I', 'Escuela-M', 'Escuela-A', 'maestroe1', 'maestroe2', 'maestroe3', 'Maestro-I', 'Maestro-M', 'Maestro-A', 'Maestro-I-preescolar', 'Maestro-M-preescolar', 'Maestro-A-preescolar', 'Maestro-I-secundaria', 'Maestro-M-secundaria', 'Maestro-A-secundaria'],
	clases: ['director_escuela', 'maestro_preescolar', 'maestro_secundaria', 'profesor_summit_2021', 'maestro', 'Escuela-I', 'Escuela-M', 'Escuela-A', 'maestroe1', 'maestroe2', 'maestroe3', 'Maestro-I', 'Maestro-M', 'Maestro-A', 'Maestro-I-preescolar', 'Maestro-M-preescolar', 'Maestro-A-preescolar', 'Maestro-I-secundaria', 'Maestro-M-secundaria', 'Maestro-A-secundaria'],
	usuarios: ['admin', 'admin_escuela','director_escuela', 'Escuela-I', 'Escuela-M', 'Escuela-A'],
	usuariosTeachers: ['Maestro-I', 'Maestro-M', 'Maestro-A','maestro_preescolar', 'maestro_secundaria', 'maestro', 'profesor_summit_2021', 'maestroe1', 'maestroe2', 'maestroe3', 'Maestro-I-preescolar', 'Maestro-M-preescolar', 'Maestro-A-preescolar', 'Maestro-I-secundaria', 'Maestro-M-secundaria', 'Maestro-A-secundaria'],
	recursosLia: ['admin', 'admin_escuela','director_escuela', 'maestro_preescolar', 'maestro_secundaria', 'profesor_summit_2021', 'maestro', 'Escuela-I', 'Escuela-M', 'Escuela-A', 'maestroe1', 'maestroe2', 'maestroe3', 'Maestro-I', 'Maestro-M', 'Maestro-A', 'Maestro-I-preescolar', 'Maestro-M-preescolar', 'Maestro-A-preescolar', 'Maestro-I-secundaria', 'Maestro-M-secundaria', 'Maestro-A-secundaria'],
	mundoLia: ['maestro_preescolar', 'Maestro-I-preescolar', 'Maestro-M-preescolar', 'Maestro-A-preescolar'],
	grabaciones: ['admin', 'admin_escuela','director_escuela', 'maestro_preescolar', 'maestro_secundaria', 'profesor_summit_2021', 'maestro', 'maestroe1', 'maestroe2', 'maestroe3', 'Escuela-I', 'Escuela-M', 'Escuela-A', 'Maestro-I', 'Maestro-M', 'Maestro-A', 'Maestro-I-preescolar', 'Maestro-M-preescolar', 'Maestro-A-preescolar', 'Maestro-I-secundaria', 'Maestro-M-secundaria', 'Maestro-A-secundaria'],
	liaU: ['admin', 'maestro_preescolar', 'maestro_secundaria', 'profesor_summit_2021', 'maestro', 'maestroe1', 'maestroe2', 'maestroe3', 'Escuela-I', 'Escuela-M', 'Escuela-A', 'Maestro-I', 'Maestro-M', 'Maestro-A', 'Maestro-I-preescolar', 'Maestro-M-preescolar', 'Maestro-A-preescolar', 'Maestro-I-secundaria', 'Maestro-M-secundaria', 'Maestro-A-secundaria'],
	parents: ['Padre-I', 'Padre-M', 'Padre-A', 'padre'],
};

export default authRoles;

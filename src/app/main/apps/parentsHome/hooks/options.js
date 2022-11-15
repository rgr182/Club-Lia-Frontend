import React from 'react';
import Courses from '../components/Courses/Courses';
import GlobalSchool from '../components/GlobalSchool/GlobalSchool';
import Membership from '../components/Membership/Membership';

const options = [
	{ name: 'Cursos', value: 'cursos', image: 'liaU.svg', content: <Courses /> },
	{ name: 'Membresías de Reforzamiento', value: 'membresias', image: 'logoComunidad.png', content: <Membership /> },
	{ name: 'Global Schooling', value: 'global', image: 'globalSchool.png', content: <GlobalSchool /> }
];

export default options;

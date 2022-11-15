export const includeSpecialCharacters = str => /^[a-z, áéíóúñÑ]+$/i.test(str);

export const camelToSnakeCase = str => str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);

export const formatSnakeCase = str => str.replace(/_/g, ' ')[0].toUpperCase() + str.replace(/_/g, ' ').slice(1);

export const capitalize = str => str[0].toUpperCase() + str.slice(1);

export const pipe = (...fns) => x => fns.reduce((v, f) => f(v), x);

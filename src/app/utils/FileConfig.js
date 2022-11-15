// The limit Size is in Bytes 1'000,000 Bytes = 1MB
export const FileConfig = {
	teacherDoc: {
		image: {
			// JPEG, PNG, JPG
			accepted: ['image/jpeg', 'image/png', 'image/jpg'],
			limitSize: 3000000 // 3MB
		},
		documents: {
			//PDF
			accepted: ['application/pdf'],
			limitSize: 10000000 // 10MB
		}
	},
	teacherHomework: {
		image: {
			// JPEG, PNG, JPG
			accepted: ['image/jpeg', 'image/png', 'image/jpg'],
			limitSize: 3000000 // 3MB
		},
		documents: {
			// PDF, EXCEL, WORD
			accepted: [
				'application/pdf',
				'application/vnd.ms-excel',
				'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
				'application/msword',
				'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
			],
			limitSize: 10000000 // 10MB
		}
	},
	studentHomework: {
		image: {
			// JPEG, PNG, JPG
			accepted: ['image/jpeg', 'image/png', 'image/jpg'],
			limitSize: 5000000 // 5MB
		},
		documents: {
			// PDF, EXCEL, WORD
			accepted: [
				'application/pdf',
				'application/vnd.ms-excel',
				'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
				'application/msword',
				'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
			],
			limitSize: 10000000 // 10MB
		}
	},
	teacherVideo:  248000000 // 248MB
};

function validFileType(rolConfig, file) {
	if (!file) return false;
	return [...rolConfig.image.accepted, ...rolConfig.documents.accepted].includes(file.type);
}

function validFileSize(rolConfig, file) {
	if (!file) return false;
	if (rolConfig.image.accepted.includes(file.type)) {
		return file.size <= rolConfig.image.limitSize;
	}
	if (rolConfig.documents.accepted.includes(file.type)) {
		return file.size <= rolConfig.documents.limitSize;
	}
	return false;
}

function getLimitSize(rolConfig, file) {
	if (rolConfig.image.accepted.includes(file.type)) {
		return rolConfig.image.limitSize / 1000000;
	}
	if (rolConfig.documents.accepted.includes(file.type)) {
		return rolConfig.documents.limitSize / 1000000;
	}
}

export function validFile(rolConfig, file) {
	let errorMessage = null;
	if (!validFileType(rolConfig, file)) {
		errorMessage = `El formato del archivo no es valido.`;
	}
	if (!errorMessage && !validFileSize(rolConfig, file)) {
		errorMessage = `El archivo seleccionado pesa mas de ${getLimitSize(rolConfig, file)} MB.`;
	}
	return errorMessage;
}

export function validVideo(limitSize, file) {
	let errorMessage = null;
	if (file.size > limitSize) {
		errorMessage = `El archivo seleccionado pesa mas de ${limitSize / 1000000} MB.`;
	}
	return errorMessage;
}

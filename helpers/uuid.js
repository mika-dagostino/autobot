import { v4 as uuidv4 } from 'uuid';
import { version as uuidVersion } from 'uuid';
import { validate as uuidValidate } from 'uuid';

export function validateUUID(uuid) {
	return uuidValidate(uuid) && uuidVersion(uuid) === 4;
}

export default function createUUID() {
	return uuidv4();
}

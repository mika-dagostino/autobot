import xssFilters from 'xss-filters';
import validator from 'validator';
import mongoSanitize from 'mongo-sanitize';
import { clean } from 'xss-clean/lib/xss';

export function validateEmail(email) {
	return validator.isEmail(email);
}

export function sanitize(input) {
	return mongoSanitize(xssFilters.inHTMLData(clean(validator.escape(input.trim()))));
}

export function sanitizeEmail(email) {
	return mongoSanitize(xssFilters.inHTMLData(clean(validator.normalizeEmail(email.trim()))));
}

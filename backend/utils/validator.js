/**
 * Comprehensive Validation Engine for the ETC Apparel Backend.
 * Standardizes Field-Level, Data Type, and Constraint Checks.
 */

const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(String(email).toLowerCase());
};

const validatePhone = (phone) => {
    // Basic international or standard 11-digit mobile validation (e.g., Bangladesh)
    const phoneRegex = /^(\+?880|0)1[3-9]\d{8}$/;
    return phoneRegex.test(String(phone).replace(/\s+/g, ''));
};

const validateFields = (body, rules) => {
    const errors = {};

    for (const [field, rule] of Object.entries(rules)) {
        const val = body[field];

        // 1. Required Check
        if (rule.required && (val === undefined || val === null || String(val).trim() === '')) {
            errors[field] = `${rule.label || field} is required.`;
            continue;
        }

        // Skip other rules if field is optional and not provided
        if (val === undefined || val === null || String(val).trim() === '') {
            continue;
        }

        // 2. Data Type Check
        if (rule.type) {
            if (rule.type === 'number') {
                if (isNaN(Number(val))) {
                    errors[field] = `${rule.label || field} must be a valid number.`;
                    continue;
                }
            } else if (rule.type === 'integer') {
                if (!Number.isInteger(Number(val))) {
                    errors[field] = `${rule.label || field} must be a valid integer.`;
                    continue;
                }
            }
        }

        // 3. Email Format Check
        if (rule.isEmail && !validateEmail(val)) {
            errors[field] = `Please enter a valid email address.`;
            continue;
        }

        // 4. Phone Format Check
        if (rule.isPhone && !validatePhone(val)) {
            errors[field] = `Please enter a valid 11-digit mobile number.`;
            continue;
        }

        // 5. Min/Max Constraints
        if (rule.type === 'number' || rule.type === 'integer') {
            const numVal = Number(val);
            if (rule.min !== undefined && numVal < rule.min) {
                errors[field] = `${rule.label || field} cannot be less than ${rule.min}.`;
            }
            if (rule.max !== undefined && numVal > rule.max) {
                errors[field] = `${rule.label || field} cannot be greater than ${rule.max}.`;
            }
        } else {
            const strVal = String(val);
            if (rule.min !== undefined && strVal.length < rule.min) {
                errors[field] = `${rule.label || field} must be at least ${rule.min} characters long.`;
            }
            if (rule.max !== undefined && strVal.length > rule.max) {
                errors[field] = `${rule.label || field} cannot exceed ${rule.max} characters.`;
            }
        }
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors
    };
};

module.exports = {
    validateEmail,
    validatePhone,
    validateFields
};

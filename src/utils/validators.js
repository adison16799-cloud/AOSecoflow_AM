export const validators = {
  email: (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email) ? null : 'Invalid email address';
  },

  password: (password) => {
    if (password.length < 6) return 'Password must be at least 6 characters';
    if (!/[A-Z]/.test(password)) return 'Password must contain uppercase letter';
    if (!/[0-9]/.test(password)) return 'Password must contain number';
    return null;
  },

  phone: (phone) => {
    const re = /^[0-9\-\+\(\)]{7,}$/;
    return re.test(phone) ? null : 'Invalid phone number';
  },

  required: (value, fieldName = 'This field') => {
    return value && value.trim() ? null : `${fieldName} is required`;
  },

  minLength: (value, min, fieldName = 'This field') => {
    return value && value.length >= min ? null : `${fieldName} must be at least ${min} characters`;
  },

  maxLength: (value, max, fieldName = 'This field') => {
    return value && value.length <= max ? null : `${fieldName} must be at most ${max} characters`;
  },

  number: (value) => {
    return !isNaN(value) && value !== '' ? null : 'Must be a valid number';
  },

  positive: (value) => {
    return value > 0 ? null : 'Must be a positive number';
  },
};

export const validateForm = (formData, validationRules) => {
  const errors = {};

  Object.keys(validationRules).forEach((field) => {
    const rules = validationRules[field];
    const value = formData[field];

    for (const rule of rules) {
      const error = rule(value);
      if (error) {
        errors[field] = error;
        break;
      }
    }
  });

  return errors;
};

export default validators;

type Validator = (value: unknown) => string | null;

export const validateCity: Validator = (value) => {
  // City is required for both positions
  if (!value || typeof value !== 'string' || value.trim() === '') {
    return "Выберите город";
  }
  return null;
}; 
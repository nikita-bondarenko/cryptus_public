type Validator = (value: unknown) => string | null;

export const validateBank: Validator = (value) => {
  // Bank is required for both positions
  if (!value) {
    return "Выберите банк";
  }
  return null;
}; 
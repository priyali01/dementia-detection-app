// Basic shared validation helpers

export const isValidEmail = (email) => {
  if (!email) return false;
  const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return pattern.test(email);
};

export const isNonEmptyString = (value) =>
  typeof value === "string" && value.trim().length > 0;

export const isPastDate = (value) => {
  if (!value) return false;
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return false;
  return d.getTime() <= Date.now();
};

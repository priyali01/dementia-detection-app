// Lightweight description of a user shape (for docs / JSDoc)

/**
 * @typedef {Object} User
 * @property {string} id
 * @property {string} firstName
 * @property {string} lastName
 * @property {string} email
 * @property {"patient"|"caregiver"|"clinician"|string} [userType]
 * @property {string} [phone]
 * @property {string} [organization]
 * @property {string} [role]
 */

/** @type {User} */
export const userExample = {
  id: "demo-1",
  firstName: "Priya",
  lastName: "Sharma",
  email: "priya@example.com",
  userType: "caregiver",
  phone: "",
  organization: "",
  role: "",
};

export const UserValidationRules  = {
  id: ['string'],
  password: 'string',
  email: ['email', 'required'],
  roles: { 'list_of': 'any_object' }
};

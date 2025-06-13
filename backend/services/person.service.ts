import { PersonRepository } from '../repositories/person.repository';

export const PersonService = {
  createPerson: async (firstname: string, lastname: string, email: string, phone: string) => {
    return PersonRepository.createPerson({ firstname, lastname, email, phone });
  },
};

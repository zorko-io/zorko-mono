import { repositoryValidationSchema } from '../repository.validation.schema';
import { Repository } from '../repository';
import { repositoryFakeGenerator } from '../repository.fake.generator';

describe('repositoryValidationSchema', () => {

  let schema;
  let data: Repository;

  beforeEach(() => {
    schema = repositoryValidationSchema();
  });

  it('passes validation for random repo', () => {
    data = repositoryFakeGenerator.getOneRandomValidRepository();
    expect(schema.isValidSync(data)).toBeTruthy();
  });

  it('fails validation for missed name', () => {
    data = repositoryFakeGenerator.getOneWrongName();
    expect(()=> {
      schema.validateSync(data);
    }).toThrowErrorMatchingSnapshot();
  });

  it('fails validation for missed description', () => {
    data = repositoryFakeGenerator.getOneWrongDescription();
    expect(()=> {
      schema.validateSync(data);
    }).toThrowErrorMatchingSnapshot();
  });

  it('fails validation for missed owner', () => {
    data = repositoryFakeGenerator.getOneMissedOwner();
    expect(() => {
      schema.validateSync(data);
    }).toThrowErrorMatchingSnapshot();
  });

});

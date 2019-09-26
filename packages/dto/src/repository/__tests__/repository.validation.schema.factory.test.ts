import { RepositoryValidationSchemaFactory } from '../repository.validation.schema.factory';
import { Repository } from '../repository';
import { repositoryFakeGenerator } from '../repository.fake.generator';

describe('RepositoryValidationSchemaFactory', () => {

  let schema;
  let data: Repository;
  let schemaFactory;

  beforeEach(() => {
    schemaFactory = new RepositoryValidationSchemaFactory();
    schema = schemaFactory.create();
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

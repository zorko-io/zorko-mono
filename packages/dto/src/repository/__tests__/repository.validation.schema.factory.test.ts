import { RepositoryValidationSchemaFactory } from '../repository.validation.schema.factory';
import { Repository } from '../repository';
import * as repositoryFixtures from '../repository.fixtures';

describe('RepositoryValidationSchemaFactory', () => {

  let schema;
  let data: Repository;
  let schemaFactory;

  beforeEach(() => {
    schemaFactory = new RepositoryValidationSchemaFactory();
    schema = schemaFactory.create();
  });

  it('passes validation for random repo', () => {
    data = repositoryFixtures.getOneRandomValidRepository();
    expect(schema.isValidSync(data)).toBeTruthy();
  });

  it('fails validation for missed name', () => {
    data = repositoryFixtures.getOneWrongName();
    expect(()=> {
      schema.validateSync(data);
    }).toThrowErrorMatchingSnapshot();
  });

  it('fails validation for missed description', () => {
    data = repositoryFixtures.getOneWrongDescription();
    expect(()=> {
      schema.validateSync(data);
    }).toThrowErrorMatchingSnapshot();
  });

  it('fails validation for missed owner', () => {
    data = repositoryFixtures.getOneMissedOwner();
    expect(() => {
      schema.validateSync(data);
    }).toThrowErrorMatchingSnapshot();
  });

});

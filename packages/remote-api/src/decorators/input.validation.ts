import { ObjectSchema } from 'yup';

export function InputValidation (schema: ObjectSchema, options?: any) {
  // TODO: connect in with state of API somehow to be able to turn-on/off client validation during e2e tests
  return function (
    target: Object,
    propertyName: string,
    propertyDescriptor: PropertyDescriptor): PropertyDescriptor {

    const method = propertyDescriptor.value;

    propertyDescriptor.value = function (...args: any[]) {

      // to will throw exception in case of failed validation
      schema.validateSync(args[0], options);

      return method.apply(this, args);
    };

    return propertyDescriptor;
  }
}

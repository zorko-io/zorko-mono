import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { ObjectSchema } from 'yup';

@Injectable()
export class YupValidationPipe implements PipeTransform {
  constructor(private readonly schema: ObjectSchema, private readonly options?: any) {}

  transform(value: any, metadata: ArgumentMetadata) {
    try {
      this.schema.validateSync(value, this.options);
    }catch (error) {
      throw new BadRequestException(error);
    }

    return value;
  }
}

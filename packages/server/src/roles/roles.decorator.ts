import { SetMetadata} from '@nestjs/common';
import { RolesEnum } from '@zorko/dto';

export const RolesMetadataKey = 'roles';

export const Roles = (...roles: RolesEnum[]) => SetMetadata(RolesMetadataKey, roles);

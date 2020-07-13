import { plainToClass } from 'class-transformer';
import { ClassType } from 'class-transformer/ClassTransformer';

const PTC = <T>(clazz: ClassType<T>, obj: object) =>
  plainToClass(clazz, obj, { excludeExtraneousValues: true });

export { PTC };

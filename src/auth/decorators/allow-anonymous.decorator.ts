import { SetMetadata } from '@nestjs/common';

export const AllowAnonymousDecorator = () => {
  return SetMetadata('isPublic', true);
  // return (
  //   target: any,
  //   propertyKey: string,
  //   propertyDescriptor: PropertyDescriptor,
  // ) => {
  //   console.log(
  //     'The function is decorated with AllowAnonymousDecorator',
  //     target,
  //     propertyKey,
  //     propertyDescriptor,
  //   );
  // };
};

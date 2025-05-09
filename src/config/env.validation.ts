import * as Joi from 'joi';

export default Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test')
    .default('development')
    .required(),
  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.number().port().default(5432).required(),
  DB_USERNAME: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  DB_NAME: Joi.string().required(),
  DB_SYNC: Joi.boolean().required(),
  DB_AUTO_LOAD: Joi.boolean().required(),
  JWT_TOKEN_SECRET: Joi.string().required(),
});

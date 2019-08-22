require('ts-node/register');

module.exports = async function() {
  const core = require('@nestjs/core');
  const appModule = require('../../src/app.module');
  const typeOrm = require('typeorm');

  // attach app to global scope
  global.__app__ = await core.NestFactory.create(appModule.AppModule, {
    logger: false,
  });

  // listen for requests
  await global.__app__.listen(3000);
  return null;
};

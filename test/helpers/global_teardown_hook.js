require('ts-node/register');

module.exports = async function() {
  await global.__app__.close();
};

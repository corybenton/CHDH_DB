const db = require('../config/connection');
const { Members } = require('../models');
const memberSeeds = require('./MemberData.json');
const cleanDB = require('./cleanDB');

db.once('open', async () => {
  try {
    await cleanDB('Members', 'members');

    await Members.create(memberSeeds);

  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log('all done!');
  process.exit(0);
});

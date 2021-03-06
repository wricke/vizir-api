import mongoose from 'mongoose';
import Random from 'meteor-random';

import CallModel from '../modules/calls/models/calls';
import PlanModel from '../modules/plans/models/plans';

import callsArray from '../lib/calls';
import plansArray from '../lib/plans';

const seedCalls = () => new Promise(async (resolve, reject) => {
  if (process.argv[2] === 'force') await CallModel.deleteMany();
  const callsDb = await CallModel.find();
  if (callsDb.length) {
    resolve(false);
  }
  callsArray.forEach(async (call, index) => {
    call.destinys.forEach(x => x.id = Random.id(24));
    const newCall = new CallModel(call);
    try {
      await newCall.save();
      if (index === (callsArray.length - 1)) resolve(true);
    } catch (err) {
      reject(err);
    }
  });
  return null;
});

const seedPlans = () => new Promise(async (resolve, reject) => {
  if (process.argv[2] === 'force') await PlanModel.deleteMany();
  const plansDb = await PlanModel.find();
  if (plansDb.length) {
    resolve(false);
  }
  plansArray.forEach(async (plan, index) => {
    const newPlan = new PlanModel(plan);
    try {
      await newPlan.save();
      if (index === (plansArray.length - 1)) resolve(true);
    } catch (err) {
      reject(err);
    }
  });
  return null;
});

const seed = async (db) => {
  const seederCalls = await seedCalls();
  const seederPlans = await seedPlans();
  if (seederCalls && seederPlans) process.stdout.write('Dados salvos no banco :D');
  else process.stdout.write('Valeu por me executar... Mas seu banco já tá preenchido! ;)');
  db.close();
};

mongoose.connect('mongodb://localhost:27017/vizir', { useCreateIndex: true, useNewUrlParser: true }, (err, db) => {
  if (err) throw new Error(err);
  seed(db);
});

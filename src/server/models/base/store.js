import lowdb from 'lowdb';
import storage from 'lowdb/lib/storages/file-sync';
import path from 'path';
import fs from 'fs';

export default (state) => {
  const folder = path.resolve('.', 'store');
  if (!fs.existsSync(folder)) fs.mkdirSync(folder);

  const db = lowdb(`${folder}/${state.file}.json`, { storage });
  const defaults = {};
  defaults[state.key] = [];
  db.defaults(defaults).value();
  state.db = db;

  return state;
};

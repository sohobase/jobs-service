import uuid from 'uuid';

export default state => ({

  insert(props = {}) {
    const { db, key, schema } = state;
    const store = db.get(key);
    const id = uuid();

    store.push({ ...schema, id, createdAt: new Date(), ...props }).write();

    return store.find({ id }).value();
  },

});

import uuid from 'uuid';

export default state => ({

  update({ query, data, upsert = false }) {
    const { db, key, schema } = state;
    const store = db.get(key);
    const item = store.find(query).value();
    let id;

    if (item) {
      store
        .find(query)
        .assign({ ...schema, updatedAt: new Date(), ...item, ...data })
        .write();
    } else if ((!item || !item.id) && data && upsert) {
      id = uuid();
      store
        .push({ ...schema, id, createdAt: new Date(), ...query, ...data })
        .write();
    }

    return store.find({ id: id || item.id }).value();
  },

});

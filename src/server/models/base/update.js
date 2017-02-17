import uuid from 'uuid';

export default state => ({

  update({ query, data, upsert = false }) {
    const store = state.db.get(state.key);
    const item = store.find(query).value();
    let id;

    if (item) {
      store.find(query).assign({ updatedAt: new Date(), ...data }).write();
    } else if ((!item || !item.id) && data && upsert) {
      id = uuid();
      store.push({ id, createdAt: new Date(), ...query, ...data }).write();
    }

    return store.find({ id: id || item.id }).value();
  },

});

import uuid from 'uuid';

export default state => ({

  insert(props = {}) {
    const store = state.db.get(state.key);
    const id = uuid();

    store.push({ id, createdAt: new Date(), ...props }).write();

    return store.find({ id }).value();
  },

});

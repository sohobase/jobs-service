export default state => ({

  remove(props = {}) {
    return state.db.get(state.key)
      .remove(props.query)
      .write();
  },

});

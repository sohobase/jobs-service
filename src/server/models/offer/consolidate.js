export default state => ({

  consolidate(provider, providerId, data = {}) {
    const query = { provider, providerId };

    return state.update({ query, data, upsert: true });
  },
});

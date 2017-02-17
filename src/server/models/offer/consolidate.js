export default state => ({

  consolidate(provider, providerId, data = {}) {
    const query = { provider, providerId };
    const offerInStore = state.find({ query });

    if (offerInStore) {
      //@TODO: Notify to our telegram group
    }

    return state.update({ query, data, upsert: true });
  },
});

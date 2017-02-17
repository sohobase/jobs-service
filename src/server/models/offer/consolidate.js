import telegramBot from '../../services/telegramBot';

export default state => ({

  consolidate(provider, providerId, data = {}) {
    const query = { provider, providerId };
    const offerInStore = state.find({ query });

    if (!offerInStore) {
      telegramBot(`✅ "${data.position}" from #${provider} saved correctly.`);
    }

    return state.update({ query, data, upsert: true });
  },
});

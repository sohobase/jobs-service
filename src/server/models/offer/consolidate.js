import { ServiceTelegram } from '../../services';

export default state => ({

  consolidate(provider, providerId, data = {}) {
    const query = { provider, providerId };
    const offerInStore = state.find({ query });

    if (!offerInStore) {
      const { position, url } = data;
      const message = `✅ "${position}" from #${provider} saved correctly.`;
      ServiceTelegram(url, { markup: url });
    }

    return state.update({ query, data, upsert: true });
  },
});

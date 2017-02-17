import Model from '../base';
import consolidate from './consolidate';

export default (() => {
  const state = new Model({ file: 'db', key: 'offers' });

  return Object.assign(
    state,
    consolidate(state),
  );
})();

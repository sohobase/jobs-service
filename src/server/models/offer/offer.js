import Model from '../base';
import consolidate from './consolidate';

export default (() => {
  const state = new Model({
    file: 'db',
    key: 'offers',
    schema: {
      category: undefined,
      position: undefined,
      url: undefined,
      remote: false,
      location: undefined,

      company: undefined,
      companyUrl: undefined,
      companyAbout: undefined,
      companyImage: undefined,

      text: undefined,
      salary: undefined,
      skills: [],
      state: 'draft',
      highlight: false,
      createdAt: undefined,
    },
  });

  return Object.assign(
    state,
    consolidate(state),
  );
})();

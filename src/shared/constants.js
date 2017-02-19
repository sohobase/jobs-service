export default {
  environment: { development: 'development', production: 'production' },

  offer: {
    state: {
      ready: 'ready',
    },
  },

  categories: {
    design: 'UX/UI Designer',
    programming: 'programming',
    customer_support: 'customer support',
    content_writing: 'content_writing',
    sysadmin: 'sysadmin',
    marketing: 'marketing',
    business_management: 'business management',
    other: 'other',
  },

  stripe: {
    test_publishable_key: 'pk_test_YYW5M78kfafaamwkUWFOQtml',
    live_publishable_key: 'pk_live_fLoMQV2Aap4BjkNku8NtHbA9',
  },
};

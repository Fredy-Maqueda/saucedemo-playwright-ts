export const TEST_USERS = {
  STANDARD_USER: {
    username: process.env.STANDARD_USER || 'standard_user',
    password: process.env.TEST_PASSWORD || 'secret_sauce',
  },
  LOCKED_OUT_USER: {
    username: process.env.LOCKED_OUT_USER || 'locked_out_user',
    password: process.env.TEST_PASSWORD || 'secret_sauce',
  },
  PROBLEM_USER: {
    username: process.env.PROBLEM_USER || 'problem_user',
    password: process.env.TEST_PASSWORD || 'secret_sauce',
  },
  PERFORMANCE_GLITCH: {
    username: process.env.PERF_USER || 'performance_glitch_user',
    password: process.env.TEST_PASSWORD || 'secret_sauce',
  },
};

export const ERROR_MESSAGES = {
  LOCKED_OUT: 'Epic sadface: Sorry, this user has been locked out.',
};

export const INVENTORY_DATA = {
  SORT_LOW_TO_HIGH: 'lohi',
  SAMPLE_ITEM: 'Sauce Labs Backpack',
};

export const CHECKOUT_DATA = {
  FIRST_NAME: 'Test',
  LAST_NAME: 'User',
  POSTAL_CODE: '30023',
  SUCCESS_MESSAGE: 'Thank you for your order!',
  INITIAL_CART_COUNT: '1',
};
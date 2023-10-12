const title = 'Bat Mírialta';

const email = 'sloanjo@tcd.ie';

const repository = 'https://github.com/phonlab-tcd/bat-mirialta';

const production = true;

const domain = production ? 'https://bat-mirialta.abair.ie' : 'http://localhost:8000';

const batDelayMultiplier = production ? 1 : 0.7;

// const errorCheckURL = production
//   ? 'https://error-check.detail-design-develop.com/run-full-check'
//   : 'http://localhost:8002/run-full-check';

const errorCheckURL = 'https://error-check.detail-design-develop.com/run-full-check';

const messages = {
  app: {
    crash: {
      title: 'Something went wrong here. You can:',
      options: {
        email: `contact with author by this email - ${email}`,
        reset: 'Press here to reset the application',
      },
    },
  },
  loader: {
    fail: 'Hmmmmm, there is something wrong with this component loading process... Maybe trying later would be the best idea',
  },
  images: {
    failed: 'something went wrong during image loading :(',
  },
  404: 'Not found',
};

const dateFormat = 'MMMM DD, YYYY';

const loader = {
  // no more blinking in your app
  delay: 300, // if your asynchronous process is finished during 300 milliseconds you will not see the loader at all
  minimumLoading: 700, // but if it appears, it will stay for at least 700 milliseconds
};

const defaultMetaTags = {
  image: '/cover.png',
  description: 'Irregular verb bot for Irish',
};
const giphy404 = 'https://giphy.com/embed/xTiN0L7EW5trfOvEk0';

export {
  loader,
  dateFormat,
  messages,
  repository,
  email,
  title,
  defaultMetaTags,
  giphy404,
  production,
  domain,
  errorCheckURL,
  batDelayMultiplier,
};

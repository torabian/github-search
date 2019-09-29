import {memoize} from './memoize';

export const githubConfig = {
  clientId: 'a6d7a5258ec164594703',
  clientSecret: 'deca709758b2725783c4bea89d1a1da6cfbb31a9',
  redirectUrl: 'mobidex://auth',
  customHeaders: {
    authorize: {
      accept: 'application/json',
    },
    token: {
      accept: 'application/json',
    },
  },
  scopes: ['repo'],
  serviceConfiguration: {
    authorizationEndpoint: 'https://github.com/login/oauth/authorize',
    tokenEndpoint: `https://github.com/login/oauth/access_token`,
  },
};

export const queryGithub = memoize(async function(params = {}) {
  const prefix = 'https://api.github.com/search/repositories';
  const qs = new URLSearchParams({
    sort: 'stars',
    order: 'desc',
    per_page: params.itemsPerPage || 10,
    page: params.page,
    q: params.q,
  });
  const api = `${prefix}?${qs.toString()}`;
  return fetch(api).then(res => res.json());
});

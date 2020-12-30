const GetResources = async (url) => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Could not fetch ${url}, received ${res.status}`);
  }
  return await res.json();
};

const GetAllRepo = async (sortParam, page, perPage) => {
  const res = await GetResources(`https://api.github.com/search/repositories?q=${sortParam}&sort=stars&order=desc&page=${page}&per_page=${perPage}`);
  return res;
};

const GetOneRepo = async (user) => {
  return await GetResources(`https://api.github.com/repos/${user}`);
};

const GetContributors = async (user) => {
  return await GetResources(`https://api.github.com/repos/${user}/contributors?q=contributions&order=desc`);
};

export { GetAllRepo, GetOneRepo, GetContributors };

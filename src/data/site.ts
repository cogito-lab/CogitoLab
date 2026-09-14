const repositoryFromCi = process.env.GITHUB_REPOSITORY
  ? `https://github.com/${process.env.GITHUB_REPOSITORY}`
  : undefined;

export const siteConfig = {
  name: 'Cogito Lab',
  repositoryUrl:
    import.meta.env.PUBLIC_REPOSITORY_URL || repositoryFromCi || 'https://github.com/cogito-lab/CogitoLab',
} as const;

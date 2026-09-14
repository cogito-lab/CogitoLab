import { describe, expect, it } from 'vitest';
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();

describe('content sources', () => {
  it('contains the verified wiki people, initiatives, and news', () => {
    const people = readdirSync(join(root, 'src/content/people')).filter((file) => file.endsWith('.md'));
    const initiatives = readdirSync(join(root, 'src/content/initiatives')).filter((file) => file.endsWith('.md'));
    const news = readdirSync(join(root, 'src/content/news')).filter((file) => file.endsWith('.md'));
    expect(people).toHaveLength(11);
    expect(initiatives).toHaveLength(12);
    expect(news.length).toBeGreaterThanOrEqual(4);
  });

  it('does not publish candidate placeholder identities or publications', () => {
    const sourceFiles = ['src/content/people', 'src/content/publications'].flatMap((directory) =>
      readdirSync(join(root, directory))
        .filter((file) => file.endsWith('.md'))
        .map((file) => readFileSync(join(root, directory, file), 'utf8'))
    );
    expect(sourceFiles.join('\n')).not.toMatch(/Ana Silva|Prof\. Pesquisador Principal|example-pub/i);
  });
});

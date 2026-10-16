import { describe, expect, it } from 'vitest';
import { localizedPath, pick, skillLabel } from '../src/utils/i18n';

describe('localization helpers', () => {
  it('keeps English at canonical root routes', () => {
    expect(localizedPath('/people', 'en')).toBe('/people');
    expect(localizedPath('/', 'en')).toBe('/');
  });

  it('prefixes Portuguese routes', () => {
    expect(localizedPath('/people/mateus-dutra', 'pt')).toBe('/pt/people/mateus-dutra');
    expect(localizedPath('/', 'pt')).toBe('/pt/');
  });

  it('selects localized content', () => {
    expect(pick({ en: 'Research', pt: 'Pesquisa' }, 'pt')).toBe('Pesquisa');
  });
  it('translates editorial skills while preserving technology names and stored identifiers', () => {
    expect(skillLabel('Security', 'pt')).toBe('Segurança');
    expect(skillLabel('Security', 'en')).toBe('Security');
    expect(skillLabel('TypeScript', 'pt')).toBe('TypeScript');
  });
});

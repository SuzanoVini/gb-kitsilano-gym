import { canonicalizeStaffName } from '../canonicalizeStaffName';

const STAFF = ['Jack Bottyan', 'Steve Silva', 'Vinicius Gomes'];

describe('canonicalizeStaffName', () => {
  it('returns exact vocabulary matches unchanged', () => {
    expect(canonicalizeStaffName('Jack Bottyan', STAFF)).toBe('Jack Bottyan');
  });

  it('maps a bare first name to its single full-name match', () => {
    expect(canonicalizeStaffName('Jack', STAFF)).toBe('Jack Bottyan');
    expect(canonicalizeStaffName('jack', STAFF)).toBe('Jack Bottyan');
  });

  it('never merges when two entries share a first name', () => {
    const ambiguous = [...STAFF, 'Jack Miller'];
    expect(canonicalizeStaffName('Jack', ambiguous)).toBe('Jack');
  });

  it('returns unknown names unchanged', () => {
    expect(canonicalizeStaffName('Leona', STAFF)).toBe('Leona');
    expect(canonicalizeStaffName('  Leona  ', STAFF)).toBe('Leona');
  });

  it('returns empty input unchanged', () => {
    expect(canonicalizeStaffName('', STAFF)).toBe('');
  });
});

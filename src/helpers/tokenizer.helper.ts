class Tokenizer implements Tokenizer.Interface {
  private _replacements: Tokenizer.Replacements = {};
  private readonly _regex = {
    parsing: /^__REPLACE_|__$/g,
    tokenizing: /__REPLACE_(\w+)__/g,
  };

  tokenize(content: string) {
    const tokenized = content.replace(this._regex.tokenizing, (token) => {
      const keys = this._getKeysWithToken(token);
      return this._getReplacementWithKeys(keys, this._replacements);
    });

    return tokenized;
  }

  with(replacements: Tokenizer.Replacements) {
    this._mergeReplacements(replacements);
    return this;
  }

  private _getKeysWithToken(token: string) {
    return token.replace(this._regex.parsing, '').toLowerCase().split('_');
  }

  private _getReplacementWithKeys(keys: string[], initial: any): any {
    const MIN_KEYS_LENGTH = 1;

    if (Array.isArray(initial) || typeof initial !== 'object') {
      return initial;
    }

    if (keys.length > MIN_KEYS_LENGTH) {
      const newInitial = initial[keys.shift()!];
      return this._getReplacementWithKeys(keys, newInitial);
    }

    const result = initial[keys.shift()!];
    return result;
  }

  private _mergeReplacements(replacements: Tokenizer.Replacements) {
    this._replacements = {
      ...this._replacements,
      ...replacements,
    };
  }
}

export default Tokenizer;

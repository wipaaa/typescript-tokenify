class Tokenizer implements Tokenizer.Interface {
  private _replacements: Tokenizer.Replacements = {};
  private readonly _regex = {
    parsing: /^__REPLACE_|__$/g,
    tokenizing: /__REPLACE_(\w+)__/g,
  };

  tokenize(content: string): string {
    const tokenized = content.replace(this._regex.tokenizing, (token) => {
      const keys = this._getKeysWithToken(token);
      return this._getReplacementWithKeys(keys, this._replacements);
    });

    return tokenized;
  }

  with(replacements: Tokenizer.Replacements): this {
    this._mergeReplacements(replacements);
    return this;
  }

  private _getKeysWithToken(token: string): string[] {
    return token.replace(this._regex.parsing, '').toLowerCase().split('_');
  }

  private _getReplacementWithKeys(keys: string[], replacements: any): any {
    const MIN_KEYS_LENGTH = 1;

    if (typeof replacements !== 'object') {
      return replacements;
    }

    if (keys.length > MIN_KEYS_LENGTH) {
      const result = replacements[keys.shift()!];
      return this._getReplacementWithKeys(keys, result);
    }

    const result = replacements[keys.shift()!];
    return result;
  }

  private _mergeReplacements(replacements: Tokenizer.Replacements): void {
    this._replacements = {
      ...this._replacements,
      ...replacements,
    };
  }
}

export default Tokenizer;

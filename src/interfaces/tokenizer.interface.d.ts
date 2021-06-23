declare namespace Tokenizer {
  interface Interface {
    tokenize(content: string): string;
    with(replacements: Replacements): this;
  }

  type Replacements = {
    [key: string]: string | number | { [key: string]: string | number };
  };
}

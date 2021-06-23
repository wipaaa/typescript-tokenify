declare namespace Compiler {
  type Input = {
    language: Language;
    sources: Sources;
    settings: {
      optimizer: {
        enabled: boolean;
      };
      outputSelection: {
        [key: string]: {
          [key: string]: string[];
        };
      };
    };
  };

  type Language = 'Solidity';

  type Output = { [key: string]: string | number | boolean | Output };

  type Source = {
    content: string;
  };

  type Sources = {
    [key: string]: Source;
  };

  interface Interface {
    compile(): Output;
    from(directory: string): this;
    with(replacements: Tokenizer.Replacements): this;
  }
}

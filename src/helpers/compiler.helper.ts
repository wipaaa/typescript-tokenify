import solc, { Output as SolcOutput } from 'solc';
import Resolver from './resolver.helper';
import Tokenizer from './tokenizer.helper';

class Compiler implements Compiler.Interface {
  private _resolver = new Resolver();
  private _tokenizer = new Tokenizer();

  compile() {
    const sources = this._getSources();
    const input = this._getInputWithSources(sources);
    const parsed = this._compile(input);

    return this._processOutput(parsed);
  }

  from(directory: string) {
    this._resolver.from(directory);
    return this;
  }

  with(replacements: Tokenizer.Replacements) {
    this._tokenizer.with(replacements);
    return this;
  }

  private _compile(input: string): SolcOutput {
    return JSON.parse(solc.compile(input));
  }

  private _getInputWithSources(sources: Compiler.Sources) {
    return JSON.stringify({
      language: 'Solidity',
      sources,
      settings: {
        optimizer: {
          enabled: true,
        },
        outputSelection: {
          ['*']: {
            ['*']: ['abi', 'evm.bytecode'],
          },
        },
      },
    });
  }

  private _getSources(): Compiler.Sources {
    return Object.entries(this._resolver.resolve()).reduce(
      (previous: Compiler.Sources, [key, source]) => {
        const content = this._tokenizer.tokenize(source.content);

        return {
          ...previous,
          [key]: { content },
        };
      },
      {}
    );
  }

  private _processOutput(output: SolcOutput): Compiler.Output {
    return Object.entries(output.contracts!).reduce(
      (previous: Compiler.Output, [, contract]) => {
        const [name, data] = Object.entries(contract)[0];

        return {
          ...previous,
          [name]: data,
        };
      },
      {}
    );
  }
}

export default Compiler;

import fs from 'fs';
import path from 'path';

class Resolver implements Resolver.Interface {
  private directory = '';
  private sources: Resolver.Sources = {};

  from(directory: string) {
    if (!this._isExists(directory)) {
      const message = `Can't find directory at '${directory}'!`;
      throw new Error(message);
    }

    this.directory = directory;
    return this;
  }

  resolve() {
    if (!!!this.directory) {
      const message = `Can't read empty or null directory!`;
      throw new Error(message);
    }

    this._readDirectory((filePath) => {
      const fileName = path.basename(filePath);

      return {
        name: this._getSourceName(fileName),
        content: this._getSourceContent(filePath),
        path: filePath,
      };
    });

    return this._pullResult();
  }

  private _getSourceName(fileName: string) {
    return fileName.replace('.txt', '.sol');
  }

  private _getSourceContent(path: string) {
    return fs.readFileSync(path, 'utf-8').toString();
  }

  private _isExists(directory: string) {
    return fs.existsSync(directory);
  }

  private _pullResult() {
    const result = this.sources;

    this.directory = '';
    this.sources = {};

    return result;
  }

  private _readDirectory(callback: (path: string) => Resolver.Source) {
    this.sources = fs
      .readdirSync(this.directory, 'utf-8')
      .reduce((previous: Resolver.Sources, current) => {
        return {
          ...previous,
          [this._getSourceName(current)]: callback(
            path.join(this.directory, current)
          ),
        };
      }, {});
  }
}

export default Resolver;

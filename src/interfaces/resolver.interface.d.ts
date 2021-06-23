declare namespace Resolver {
  export type Source = {
    name: string;
    content: string;
    path: string;
  };

  export type Sources = {
    [key: string]: Source;
  };

  export interface Interface {
    from(directory: string): this;
    resolve(): { [key: string]: Source };
  }
}

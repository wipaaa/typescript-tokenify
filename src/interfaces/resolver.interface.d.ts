declare namespace Resolver {
  type Source = {
    name: string;
    content: string;
    path: string;
  };

  type Sources = {
    [key: string]: Source;
  };

  interface Interface {
    from(directory: string): this;
    resolve(): { [key: string]: Source };
  }
}

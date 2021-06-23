declare module 'solc' {
  const features: Features;
  const lowlevel: LowLevel;

  const license: () => string;
  const version: () => string;
  const compile: (input: string, callback: any) => string;
  const loadRemoteVersion: (
    version: string,
    callback: (snapshot: any, error: any) => void
  ) => void;
  const semver: () => string;
  const setupMethods: (soljson: any) => {
    features: Features;
    lowlevel: LowLevel;
    license: () => string;
    version: () => string;
    compile: (input: string, callback: any) => string;
    loadRemoteVersion: (
      version: string,
      callback: (snapshot: any, error: any) => void
    ) => void;
    semver: () => string;
    setupMethods: typeof setupMethods;
  };

  type Features = {
    importCallback: boolean;
    legacySingleInput: boolean;
    multipleInputs: boolean;
    nativeStandardJSON: boolean;
  };

  type LowLevel = {
    compileCallback: (input: string, optimize: boolean, callback: any) => any;
    compileMulti: any;
    compileSingle: any;
    compileStandard: (input: string, callback: any) => any;
  };
}

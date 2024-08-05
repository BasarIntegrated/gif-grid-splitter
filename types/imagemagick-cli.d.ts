declare module "imagemagick-cli" {
  export function exec(
    command: string,
    args?: string[],
    options?: { cwd?: string }
  ): Promise<string>;
  export function convert(input: string, options: string[]): Promise<void>;
  export function identify(input: string): Promise<string>;
}

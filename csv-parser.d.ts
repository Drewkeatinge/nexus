declare module 'csv-parser' {
  import { Transform } from 'stream';

  interface CsvParserOptions {
    headers?: boolean | string[];
    separator?: string;
    quote?: string;
    escape?: string;
    // Add more options as needed
  }

  function csvParser(options?: CsvParserOptions): Transform;

  export default csvParser;
}

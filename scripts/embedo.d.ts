/* tslint:disable */
/* eslint-disable */
/**
* @param {string} text
* @param {number} n
* @returns {string}
*/
export function ceasar_cipher_encrypt(text: string, n: number): string;
/**
* @param {string} text
* @param {number} n
* @returns {string}
*/
export function ceasar_cipher_decrypt(text: string, n: number): string;
/**
* @param {string} text
* @param {string} key
* @returns {string}
*/
export function columnar_transposition_encrypt(text: string, key: string): string;
/**
* @param {string} text
* @param {string} key
* @returns {string}
*/
export function columnar_transposition_decrypt(text: string, key: string): string;

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly ceasar_cipher_encrypt: (a: number, b: number, c: number, d: number) => void;
  readonly ceasar_cipher_decrypt: (a: number, b: number, c: number, d: number) => void;
  readonly columnar_transposition_encrypt: (a: number, b: number, c: number, d: number, e: number) => void;
  readonly columnar_transposition_decrypt: (a: number, b: number, c: number, d: number, e: number) => void;
  readonly __wbindgen_add_to_stack_pointer: (a: number) => number;
  readonly __wbindgen_malloc: (a: number) => number;
  readonly __wbindgen_realloc: (a: number, b: number, c: number) => number;
  readonly __wbindgen_free: (a: number, b: number) => void;
}

/**
* If `module_or_path` is {RequestInfo} or {URL}, makes a request and
* for everything else, calls `WebAssembly.instantiate` directly.
*
* @param {InitInput | Promise<InitInput>} module_or_path
*
* @returns {Promise<InitOutput>}
*/
export default function init (module_or_path?: InitInput | Promise<InitInput>): Promise<InitOutput>;

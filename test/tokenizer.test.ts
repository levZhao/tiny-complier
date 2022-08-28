import { expect, test } from 'vitest'
import { tokenizer } from '../src/tokenizer';

test('tokenizer', () => {
    const code = "(add 2 (subtract 4 2))"; //tokenizer的参数
    const tokens = [   //tokenizer的预期值
      { type: 'paren',  value: '('        },
      { type: 'name',   value: 'add'      },
      { type: 'number', value: '2'        },
      { type: 'paren',  value: '('        },
      { type: 'name',   value: 'subtract' },
      { type: 'number', value: '4'        },
      { type: 'number', value: '2'        },
      { type: 'paren',  value: ')'        },
      { type: 'paren',  value: ')'        }
    ];

    expect(tokenizer(code)).toEqual(tokens)
})

test('add', () => {
    const code = "add"; //tokenizer的参数
    const tokens = [   //tokenizer的预期值
      { type: 'name',  value: 'add'        },
    ];

    expect(tokenizer(code)).toEqual(tokens)
})

test('paren', () => {
    const code = "("; //tokenizer的参数
    const tokens = [   //tokenizer的预期值
      { type: 'paren',  value: '('        },
    ];

    expect(tokenizer(code)).toEqual(tokens)
})

test('number', () => {
    const code = "2"; //tokenizer的参数
    const tokens = [   //tokenizer的预期值
      { type: 'number',  value: '2'        },
    ];

    expect(tokenizer(code)).toEqual(tokens)
})
import { test, expect } from 'vitest'
import { parser } from '../src/parser';
import { NodesType, TokenType } from '../src/type';

test('parser', () => {
    const tokens = [
      { type: TokenType.Paren,  value: '('        },
      { type: TokenType.Name,   value: 'add'      },
      { type: TokenType.Number, value: '2'        },
      { type: TokenType.Paren,  value: '('        },
      { type: TokenType.Name,   value: 'subtract' },
      { type: TokenType.Number, value: '4'        },
      { type: TokenType.Number, value: '2'        },
      { type: TokenType.Paren,  value: ')'        },
      { type: TokenType.Paren,  value: ')'        }
    ];

    const ast = {
        type: NodesType.Program,
        body: [
            {
                type: NodesType.CallExpression,
                name: 'add',
                params: [
                    {
                        type: NodesType.NumberLiteral,
                        value: '2'
                    },
                    {
                        type: NodesType.CallExpression,
                        name: 'subtract',
                        params: [
                            {
                                type: NodesType.NumberLiteral,
                                value: '4'
                            },
                            {
                                type: NodesType.NumberLiteral,
                                value: '2'
                            }
                        ]
                    }
                ]
            }
        ]
    }

    expect(parser(tokens)).toEqual(ast)
})

test('number', () => {
    const tokens = [   //tokenizer的预期值
      { type: TokenType.Number,  value: '2'        },
    ];

    const ast = {
        type: NodesType.Program,
        body: [
            {
                type: NodesType.NumberLiteral,
                value: '2'
            }
        ]
    }

    expect(parser(tokens)).toEqual(ast)
})

test('CallExpression', () => {
    const tokens = [   //tokenizer的预期值
        { type:TokenType.Paren,  value: '('        },
        { type:TokenType.Name,   value: 'add'      },
        { type: TokenType.Number, value: '4'        },
        { type: TokenType.Number, value: '2'        },
        { type:TokenType.Paren,  value: ')'        },
    ];

    const ast = {
        type: NodesType.Program,
        body: [
            {
                type: NodesType.CallExpression,
                name: 'add',
                params: [
                    {
                        type: NodesType.NumberLiteral,
                        value: '4'
                    },
                    {
                        type: NodesType.NumberLiteral,
                        value: '2'
                    }
                ]
            }
        ]
    }

    expect(parser(tokens)).toEqual(ast)
})
import { test, expect } from 'vitest'
import { codegen } from '../src/codegen'
import { NodesType, RootNode } from '../src/type'

test('codegen', () => {
    const ast = {
        type: NodesType.Program,
        body: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'CallExpression',
                    callee: {
                        type: 'Identifier',
                        name: 'add'
                    },
                    arguments: [
                        {
                            type: 'NumberLiteral',
                            value: '2'
                        },
                        {
                            type: 'CallExpression',
                            callee: {
                                type: 'Identifier',
                                name: 'subtract'
                            },
                            arguments: [
                                {
                                    type: 'NumberLiteral',
                                    value: '4'
                                },
                                {
                                    type: 'NumberLiteral',
                                    value: '2'
                                },
                            ]
                        }
                    ]
                }
            },
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'CallExpression',
                    callee: {
                        type: 'Identifier',
                        name: 'add'
                    },
                    arguments: [
                        {
                            type: 'NumberLiteral',
                            value: '2'
                        },
                        {
                            type: 'CallExpression',
                            callee: {
                                type: 'Identifier',
                                name: 'subtract'
                            },
                            arguments: [
                                {
                                    type: 'NumberLiteral',
                                    value: '4'
                                },
                                {
                                    type: 'NumberLiteral',
                                    value: '2'
                                },
                            ]
                        }
                    ]
                }
            }
        ]
    }

    expect(codegen(ast)).toMatchInlineSnapshot('"add(2, subtract(4, 2));add(2, subtract(4, 2));"')
})
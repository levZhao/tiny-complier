import { test, expect } from 'vitest'
import { transformer } from '../src/transformer'
import { NodesType, RootNode } from '../src/type'

test('transformer', () => {
    const ast: RootNode = {
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

    const transformedAST = {
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
            }
        ]
    }

    expect(transformer(ast)).toEqual(transformedAST)
})
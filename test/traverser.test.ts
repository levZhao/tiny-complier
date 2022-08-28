import { test, expect } from 'vitest'
import { traverser, traverser1 } from '../src/traverser';
import { NodesType, RootNode, Visitor } from '../src/type';

test('traverser', () => {
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

    const callArr: any = []
    const options: Visitor = {
        Program: {
            enter(node, parent) {
                callArr.push('program-enter')
            },
            exit(node, parent) {
                callArr.push('program-exit')
            }
        },
        CallExpression: {
            enter(node, parent) {
                callArr.push('callExpression-enter')
            },
            exit(node, parent) {
                callArr.push('callExpression-exit')
            }
        },
        NumberLiteral: {
            enter(node, parent) {
                callArr.push('numberLiteral-enter')
            },
            exit(node, parent) {
                callArr.push('numberLiteral-exit')
            }
        }
    }
    
    traverser(ast, options)
    expect(callArr).toEqual([
        'program-enter',
        'callExpression-enter',
        'numberLiteral-enter',
        'numberLiteral-exit',
        'callExpression-enter',
        'numberLiteral-enter',
        'numberLiteral-exit',
        'numberLiteral-enter',
        'numberLiteral-exit',
        'callExpression-exit',
        'callExpression-exit',
        'program-exit',
    ])
})
test('traverser1', () => {
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

    const callArr: any = []
    const options: Visitor = {
        Program: {
            enter(node, parent) {
                callArr.push('program-enter')
            },
            exit(node, parent) {
                callArr.push('program-exit')
            }
        },
        CallExpression: {
            enter(node, parent) {
                callArr.push('callExpression-enter')
            },
            exit(node, parent) {
                callArr.push('callExpression-exit')
            }
        },
        NumberLiteral: {
            enter(node, parent) {
                callArr.push('numberLiteral-enter')
            },
            exit(node, parent) {
                callArr.push('numberLiteral-exit')
            }
        }
    }
    
    traverser1(ast, options)
    expect(callArr).toEqual([
        'program-enter',
        'callExpression-enter',
        'numberLiteral-enter',
        'callExpression-enter',
        'numberLiteral-enter',
        'numberLiteral-enter',
    ])
})
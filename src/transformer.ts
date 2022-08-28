import { traverser } from "./traverser";
import { NodesType, RootNode } from "./type";

export function transformer(ast: RootNode) {
    const newAst = {
        type: NodesType.Program,
        body: []
    }

    ast.context = newAst.body

    traverser(ast, {
        CallExpression: {
            enter: (node, parent) => {
                if(node.type === NodesType.CallExpression) {
                    let expression: any = {
                        type: 'CallExpression',
                        callee: {
                            type: 'Identifier',
                            name: node.name
                        },
                        arguments: []
                    }
                    node.context = expression.arguments
                    if(parent?.type !== NodesType.CallExpression) {
                        expression = {
                            type: 'ExpressionStatement',
                            expression
                        }
                    }

                    parent?.context?.push(expression)
                }
            }
        },
        NumberLiteral: {
            enter: (node, parent) => {
                if(node.type === NodesType.NumberLiteral) {
                    const expression: any = {
                        type: 'NumberLiteral',
                        value: node.value
                    }

                    parent?.context?.push(expression)
                }
            }
        }
    })

    return newAst
}

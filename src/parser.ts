import { NodesType, CallExpressionNode, NumberNode, RootNode, ChildNode, Token, TokenType } from "./type"

function createRootNode () : RootNode{
    return {
        type: NodesType.Program,
        body: []
    }
}
function createNumberNode (value: string) : NumberNode{
    return {
        type: NodesType.NumberLiteral,
        value
    }
}
function createCallExpressionNode (name: string) : CallExpressionNode{
    return {
        type: NodesType.CallExpression,
        name,
        params: []
    }
}

export function parser(tokens: Token[]) {
    let current = 0
    const root = createRootNode()
    // 递归
    function walk() {
        let token = tokens[current]
        if(token.type === TokenType.Number) {
            current++
            return createNumberNode(token.value)
        }
        if(token.type === TokenType.Paren && token.value === '(') {
            token = tokens[++current]
            const node = createCallExpressionNode(token.value)
            token = tokens[++current]
            while(!(token.type === TokenType.Paren && token.value === ')')) {
                node.params.push(walk()) //递归将嵌套函数正确放置到node中
                token = tokens[current]
            }
            current++
            return node
        }
        throw new Error(`error token: ${token}`)
    }

    while(current < tokens.length) {
        root.body.push(walk())
    }

    return root
}
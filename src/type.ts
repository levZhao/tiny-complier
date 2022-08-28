export const enum  TokenType {
    Number = 'number',
    Paren = 'paren',
    Name = 'name'
}

export interface Token {
    type: TokenType
    value: string
}

export const enum NodesType {
    Program = 'Program',
    NumberLiteral = 'NumberLiteral',
    CallExpression = 'CallExpression'
}

interface Node {
    type: NodesType
}

export interface RootNode extends Node {
    body: ChildNode[]
    type: NodesType.Program
    context?: ChildNode[]
}

export type ChildNode = NumberNode | CallExpressionNode
export type ParentNode = RootNode | CallExpressionNode | undefined

export interface NumberNode extends Node {
    value: string
    type: NodesType.NumberLiteral
}

export interface CallExpressionNode extends Node{
    name: string
    params: ChildNode[]
    type: NodesType.CallExpression
    context?: ChildNode[]
}

interface VisitorOption {
    enter: (node: RootNode | ChildNode, parent: ParentNode) => void
    exit?: (node: RootNode | ChildNode, parent: ParentNode) => void
}

export interface Visitor {
    Program?: VisitorOption
    CallExpression?: VisitorOption
    NumberLiteral?: VisitorOption
}

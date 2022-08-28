import { NodesType, ChildNode, RootNode, ParentNode, Visitor } from "./type";

export function traverser(root: RootNode, visitor: Visitor) {
    // 递归 深度优先遍历
    function traverseArray(arr: ChildNode[], parent: ParentNode) {
        arr.forEach(node => {
            traverseNode(node, parent)
        })
    }

    function traverseNode(node: ChildNode | RootNode, parent: ParentNode) {
        const visitorObj = visitor[node.type]
        visitorObj?.enter(node, parent)
        switch(node.type) {
            case NodesType.Program:
                traverseArray(node.body, node)
                break
            case NodesType.CallExpression:
                traverseArray(node.params, node)
                break
            case NodesType.NumberLiteral:
                break
        }
        if(visitorObj?.exit) {
            visitorObj?.exit(node, parent)
        }
    }

    traverseNode(root, undefined)
}

export function traverser1(root: RootNode, visitor: Visitor) {
    // 利用栈实现深度优先遍历
    const stack: (ChildNode | RootNode)[] = []
    stack.push(root)
    while(stack.length) {
        const node = stack.pop()
        const visitorObj = visitor[node!.type]
        visitorObj?.enter(node!, undefined)
        switch(node?.type) {
            case NodesType.Program:
                // traverseArray(node.body, node)
                while(node.body.length) {
                    stack.push(node.body.pop()!)
                }
                break
            case NodesType.CallExpression:
                // traverseArray(node.params, node)
                while(node.params.length) {
                    stack.push(node.params.pop()!)
                }
                break
            case NodesType.NumberLiteral:
                break
        }
    }
}
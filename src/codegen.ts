export function codegen(ast) {
    switch(ast.type) {
        case 'Program':
            return ast.body.map(codegen).join('')
        case 'NumberLiteral':
            return ast.value
        case 'CallExpression':
            return ast.callee.name + '(' + ast.arguments.map(codegen).join(', ') + ')'
        case 'ExpressionStatement':
            return codegen(ast.expression) + ';'
    }
}
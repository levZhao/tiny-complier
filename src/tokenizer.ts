import { Token, TokenType } from "./type"

export function tokenizer(code: string) {
    const tokens: Token[] = []
    let current = 0
    while (current < code.length) {
        // 判断空格
        let char = code[current]
        const spaceRE = /\s/
        if (spaceRE.test(char) && current < code.length) {
            current++
            continue
        }
        // 判断左括号
        if (char === '(') {
            tokens.push({
                type: TokenType.Paren,
                value: '('
            })
            current++
            continue
        }
        // 判断右括号
        if (char === ')') {
            tokens.push({
                type: TokenType.Paren,
                value: ')'
            })
            current++
            continue
        }
        // 判断字母
        const letterRE = /[a-z]/i
        if (letterRE.test(char) && char) {
            let val = ''
            while (letterRE.test(char) && current < code.length) {
                val += char
                char = code[++current]
            }
            tokens.push({
                type: TokenType.Name,
                value: val
            })
            continue
        }
        // 判断数字
        const numberRE = /[0-9]/
        if (numberRE.test(char)) {
            let val = ''
            while (numberRE.test(char) && current < code.length) {
                val += char
                char = code[++current]
            }
            tokens.push({
                type: TokenType.Number,
                value: val
            })
            continue
        }

        throw new Error('error code')
    }
    return tokens
}
export function grade(responses: string[], answers: string[]): Boolean {
    const hashmap = answers.map(answer => [answer, true] as const);
    for (const response in responses){
        if (!hashmap[response]){
            return false
        }
    }
    return true
}
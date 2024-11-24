export function grade(responses: string[], answers: string[]): Boolean {
    let hashmap: Map<String, Boolean> = new Map();
    answers.map(answer => hashmap.set(answer, true));
    for (const response of responses){
        if (!hashmap.has(response)){
            return false
        }
    }
    if (responses.length !== answers.length) return false // More answers are required or extra answers are included
    return true
}
export const arrCordsToXYZ = (arr) => {
    const result = []
    let field = {}

    for(let i = 0; i < arr.length; i++) {
        if((i + 1) % 3 === 1) {
            field.x = arr[i].toFixed()
        }
        if((i + 1) % 3 === 2) {
            field.y = arr[i].toFixed()
        }
        if((i + 1) % 3 === 0) {
            field.z = arr[i].toFixed()
            result.push(field)
            field = {}
        }
    }
    return result
}
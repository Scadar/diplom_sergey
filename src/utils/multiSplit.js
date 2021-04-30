 // eslint-disable-next-line
export const multiSplit = (str, tokens) => {
    let tempChar = tokens[0];
    for(let i = 1; i < tokens.length; i++){
        str = str.split(tokens[i]).join(tempChar);
    }
    str = str.split(tempChar);
    return str;
}
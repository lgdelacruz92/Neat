const prettifyJSON = json => {
    const keys = Object.keys(json);
    const result = [];
    result.push('{\n');
    for (let i = 0; i < keys.length; i++) {
        result.push(`\t\"${keys[i]}\": ${typeof keys[i] === 'number' ? json[keys[i]] : `\"${json[keys[i]]}\"`},\n`);
    }
    result.push('}');
    return result.join('');
}
const prettifyJSON = (json, level = 0) => {
    const keys = Object.keys(json);
    const result = [];
    result.push('{\n');
    for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        const val = json[key];
        if (isObject(val)) {
            result.push(duplicate('\t', level + 1));
            result.push(`\"${key}\": `);
            result.push(prettifyJSON(val, level + 1));
            result.push('\n');
        }
        else if (Array.isArray(val)) {
            result.push(duplicate('\t', level + 1));
            result.push(`\"${key}\": [\n`);
            for (let i = 0; i < val.length; i++) {
                result.push(duplicate('\t', level + 1));
                result.push(prettifyJSON(val[i], level + 1));
                result.push(',');
            }
            result.push(']\n');
        }
        else {
            result.push(duplicate('\t', level + 1));
            result.push(`\"${key}\": ${format(json[key])},`);
            result.push('\n');
        }
    }
    result.push(duplicate('\t', level));
    result.push('}');
    return result.join('');
}

const duplicate = (v, x) => {
    const result = [];
    for (let i = 0; i < x; i++) {
        result.push(v);
    }
    return result.join('');
}

const format = v => {
    if (isNumber(v)) {
        return v;
    }
    else if (isChar(v)) {
        return `\"${v}\"`;
    }
    else if (isBool(v)) {
        if (v) return 'true';
        else  return 'false';
    }
}

const isNumber = x => {
    return typeof x === 'number';
}

const isChar = x => {
    return typeof x === 'string';
}

const isBool = x => {
    return typeof x === 'boolean';
}

const isObject = x => {
    return typeof x === 'object' && !Array.isArray(x);
}
export function truncate(text) {
    return text.length > 32 ? `${text.substr(0, 32)}...` : text;
}

export function truncate2(text,num) {
    return text.length > num ? `${text.substr(0, num)}...` : text;
}

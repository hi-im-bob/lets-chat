export const isFalseyOrWhiteSpace = (value) => {
    return !value || value.match(/^ *$/) !== null;
}

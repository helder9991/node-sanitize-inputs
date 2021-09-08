module.exports = (array) => {
    return array.map(value => {
        // Remove os caracteres especiais da string
        let sanitizeValue = value.replace(/[^a-zA-Z0-9\u00C0-\u00FF '"]/g, '');

        // Remove os espaços no inicio e no final da string
        sanitizeValue = sanitizeValue.trim();

        return sanitizeValue;
    });
}
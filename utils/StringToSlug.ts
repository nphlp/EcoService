export const StringToSlug = (text: string) => {
    return text
        .toLowerCase()
        .replace(/œ/g, "oe")
        .replace(/æ/g, "ae")
        .replace(/ç/g, "c")
        .replace(/'/g, "-")
        .replace(/&/g, "et")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/\s+/g, "-");
};

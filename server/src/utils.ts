export const decode = (encodedId: string) => {
    return parseInt(atob(encodedId));
}
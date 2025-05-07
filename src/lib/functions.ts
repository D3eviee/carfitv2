export const createLinkFormat = (id:string, companyName:string) : string  => {
    const companyNameToLowerCase = companyName.toLowerCase()
    const companyLink = companyNameToLowerCase.replaceAll(" ", "-")
    return `/service/${companyLink}-${id}`
}
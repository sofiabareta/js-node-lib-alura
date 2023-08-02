function extractLinks(linksList) {
    return linksList.map(linkObj => Object.values(linkObj).join())
}

function handleError(error) {
    if (error.cause.code === 'ENOTFOUND') {
        return 'URL not found'
    } else {
        return 'Something went wrong'
    }
}

async function checkStatus(URLList) {
    const listStatus = await Promise.all(
        URLList.map(async url => {
            try {
                const response = await fetch(url)
                return response.status
            } catch(error) {
                return handleError(error)
            }
        })
    )

    return listStatus
}

async function validatedList(linksList) {
    const urls = extractLinks(linksList)
    const status = await checkStatus(urls)

    return linksList.map((obj, index) => ({
        ...obj,
        status: status[index]
    }))

}

export default validatedList
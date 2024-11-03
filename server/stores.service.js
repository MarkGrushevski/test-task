export async function getStores() {
    return (await import('./db/stores-by-city.js')).default
}

export function getFilteredStoresByName(stores, name) {
    if (name?.length < 3) return []

    try {
        const nameRegexp = new RegExp(name, 'gi')
        return stores.filter((store) => nameRegexp.test(store.name))
    } catch (e) {
        console.error(e)
        return []
    }
}

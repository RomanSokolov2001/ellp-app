export default function getMetaValue(product: any, key: string): string | null {
    const found = product.meta_data.find((meta: any) => meta.key === key);

    if (key === "event_date") {
        return found ? formatEventDate(found.value) : null;
    }

    return found ? found.value : null;
}

function formatEventDate(rawDate: string): string {
    const year = parseInt(rawDate.substring(0, 4));
    const month = parseInt(rawDate.substring(4, 6)) - 1;
    const day = parseInt(rawDate.substring(6, 8));
    const date = new Date(year, month, day);

    return new Intl.DateTimeFormat("es-ES", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric"
    }).format(date);
}

const DOMAIN = import.meta.env.VITE_NODE_URL;
const URL = DOMAIN + 'api/v1/'
const ADMIN_KEY = import.meta.env.VITE_ADMIN_KEY;
const INVOICE_KEY = import.meta.env.VITE_INVOICE_KEY;

//función para consultar a la api de LNBits
const fetchData = async (action, method, key, body) => {
    const response = await fetch(URL + action,
        {
            method: method,
            headers: {
                "X-Api-Key": key,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        }
    )
    const result = await response.json();
    return result;
}

export const getWalletDetails = async () => {
    const data = await fetchData('wallet', 'GET', INVOICE_KEY);

    return data;
}

export const createInvoice = async (amount, memo) => {
    const data = await fetchData('payments', 'POST', INVOICE_KEY, {
        out: false,
        amount: amount,
        memo: memo,
        expiry: 3600
    })

    return data;
}

export const checkInvoice = async (hash) => {
    const data = await fetchData(`payments/${hash}`, 'GET', INVOICE_KEY);

    return data;
}

export const decodeInvoice = async (bolt) => {
    const data = await fetchData('payments/decode', 'POST', null, {
        data: bolt
    })

    return data;
}

export const payInvoice = async (bolt) => {
    const data = await fetchData('payments', 'POST', ADMIN_KEY, {
        out: true,
        bolt11: bolt
    })

    return data;
}
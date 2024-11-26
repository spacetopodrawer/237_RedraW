const API_URL = '/api';

export async function uploadFile(file) {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(`${API_URL}/upload`, {
        method: 'POST',
        body: formData
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Erreur lors de l\'upload');
    }

    return response.json();
}

export async function processFile(filename) {
    const response = await fetch(`${API_URL}/process`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ filename })
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Erreur lors du traitement');
    }

    return response.json();
}
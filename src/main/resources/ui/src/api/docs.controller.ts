import { instance } from "./intance";

export const createDocController = async (data: {
    file: File, data: {
        title: string,
        description: string,
        tags: string[]
    }
}) => {
    const formData = new FormData();
    formData.append('file', data.file);
    (data.data as any).createdAt = new Date().toISOString()
    formData.append('data', JSON.stringify(data.data))
    return instance.post('/document/create', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}

export const fetchDocsController = async () => instance.get('/document/get')
export const filterDocsController = async (params: { query: string }) => instance.get('/document/filter', { params })

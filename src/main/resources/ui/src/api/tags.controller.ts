import { instance } from "./intance"

export const createTagController = async (data: { name: string }) => instance.post('/tags/create', data)
export const getTagsController = async () => instance.get('/tags/get')
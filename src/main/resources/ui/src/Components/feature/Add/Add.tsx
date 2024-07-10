import { createDocController } from "@/api/docs.controller";
import { createTagController, getTagsController } from "@/api/tags.controller";
import Button from "@/Components/common/Button";
import Input from "@/Components/common/Input";
import Modal from "@/Components/common/Modal";
import Select from "@/Components/common/Select";
import { createToast } from "@/Components/common/Toast";
import { useEffect, useState } from "react";


export default function Add() {

    const [openTagModal, setOpenTagModal] = useState(false)
    const [tags, setTags] = useState<any>([])
    const [selectedTags, setSelectedTags] = useState<any>([])

    const fetchTags = () => {
        getTagsController().then(res => {
            setTags(res.data)
        })
    }

    const createTag = (name: string) => {
        createTagController({ name }).then(() => {
            createToast({ message: "Tag created", title: "Tag created", type: "success" })
            fetchTags()
        }).catch(err => {
            createToast({ message: err.message, title: "Failed to create tag", type: "error" })
        })
    }

    const handleTagSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        e.preventDefault()
        if (e.target.value === "-1") {
            setOpenTagModal(true)
        } else if (e.target.value !== "-2") {
            let tag = tags.find((tag: any) => tag.id === e.target.value)
            if (!selectedTags.includes(tag)) setSelectedTags([...selectedTags, tag])
        }
        e.target.value = "-2"
    }

    const handleCreateTagFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setOpenTagModal(false)
        const formData = new FormData(e.currentTarget)
        createTag(formData.get("name") as string)
    }

    const handleInsertSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        let file = (e.target as any).file.files[0]
        let title = (e.target as any).title.value
        let description = (e.target as any).description.value
        let tags = selectedTags

        createDocController({
            file,
            data: {
                title,
                description,
                tags
            }
        }).then(() => {
            createToast({ message: "Document added", title: "Document added", type: "success" });
            (e.target as any).reset()
        }).catch(err => {
            createToast({ message: err.message, title: "Failed to add document", type: "error" })
        })
    }

    useEffect(() => {
        fetchTags()
    }, [])

    return <div className={"w-full h-screen overflow-y-auto bg-secondary"}>
        <Modal isOpen={openTagModal} onClose={() => { setOpenTagModal(false) }}>
            <form onSubmit={handleCreateTagFormSubmit} className="w-96">
                <span className="text-secondary font-bold text-2xl">New tag</span>
                <Input name="name" label="Tag name" type="text" variant="solid" className="mt-5" />
                <Button variant="contained" className="mt-5 w-full ">Add</Button>
            </form>
        </Modal>
        <div className="w-full">
            <div className={"px-10 py-5 flex items-center justify-between"}>
                <div className="flex flex-col">
                    <span className={"text-3xl text-secondary font-semibold"}>Add document</span>
                    <span className={"font-semibold text-gray-500"}>Add new document in image or document formats</span>
                </div>
            </div>
        </div>
        <div className="w-full">
            <div className="px-10 py-5">
                <form onSubmit={handleInsertSubmit} className="w-1/2">
                    <Input name="title" label={"Document name"} type={"text"} variant="solid" />
                    <Input name="description" multiline label={"Description"} variant="solid" className="my-2" />
                    <Input name="file" label={"File"} type={"file"} variant="solid" className="my-2" />
                    <Select variant="solid" label="TAG" onSelect={handleTagSelect}>
                        <option value="-2">select</option>
                        {tags.map((tag: any, index: number) => {
                            return <option key={index} value={tag.id}>{tag.name}</option>
                        })}
                        <option value="-1">New tag</option>
                    </Select>
                    <div className="flex mt-3">
                        {selectedTags.map((tag: any, index: number) => {
                            return <div
                                onClick={() => { setSelectedTags(selectedTags.filter((t: any) => t.id !== tag.id)) }}
                                key={index}
                                className="mr-2 cursor-pointer p-2 w-fit rounded-md font-bold bg-green-700 bg-opacity-20 text-sm text-green-950">
                                {tag.name}
                            </div>
                        })}
                    </div>
                    <span className="text-xs text-gray-500">click on tag to remove</span>
                    <Button variant="contained" className="mt-5 w-full !py-3">Add document</Button>
                </form>

            </div>
        </div>
    </div>
}
"use client";

import Button from "@comps/UI/button/button";
import Card from "@comps/UI/card";
import Feedback, { FeedbackMode } from "@comps/UI/feedback";
import ImageRatio from "@comps/UI/imageRatio";
import Input from "@comps/UI/input/input";
import InputFile from "@comps/UI/inputImage";
import { useState } from "react";
import { CreateFruit } from "./utils/FruitActions";
import { ImageValidation } from "./utils/ImageUploads";

export default function AddFruitClient() {
    const [isLoading, setIsLoading] = useState(false);

    const [message, setMessage] = useState<string>("");
    const [mode, setMode] = useState<FeedbackMode>("none");
    const [isFeedbackOpen, setIsFeedbackOpen] = useState<boolean>(false);

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState<File | null>(null);

    const handleImageChange = async (file: File | null) => {
        const imageFile = file;

        const { status, message } = await ImageValidation({ imageFile });

        if (status) {
            setMessage(message);
            setMode("info");
            setIsFeedbackOpen(true);
            setImage(imageFile);
        } else {
            setMessage(message);
            setMode("warning");
            setIsFeedbackOpen(true);
        }
    };

    const handleSubmit = async () => {
        setIsLoading(true);

        if (!name || !description || !image) {
            setMessage("Please fill all fields.");
            setMode("warning");
            setIsFeedbackOpen(true);
            setIsLoading(false);
            return;
        }

        const fruitData = await CreateFruit({
            name,
            description,
            imageFile: image,
        });

        if (fruitData === "Already exists") {
            setMessage("This fruit already exists.");
            setMode("warning");
            setIsFeedbackOpen(true);
            setIsLoading(false);
            return;
        } else if (!fruitData) {
            setMessage("Upload failed, please try again later.");
            setMode("error");
            setIsFeedbackOpen(true);
            setIsLoading(false);
            return;
        }

        setMessage("Fruit added with success.");
        setMode("success");
        setIsFeedbackOpen(true);
        setIsLoading(false);
    };

    return (
        <div className="flex flex-col gap-4 lg:flex-row">
            <Card className="h-fit w-[400px] overflow-hidden p-0">
                <ImageRatio src={image ? URL.createObjectURL(image) : null} alt="Preview" mode="onPageLoad" />
                <div className="space-y-2 p-7">
                    <div className="text-xl font-bold">{name !== "" ? name : "Fruit Preview"}</div>
                    <div className="line-clamp-3 text-sm text-wrap">
                        {description !== ""
                            ? description
                            : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam excepturi unde expedita debitis ea ducimus..."}
                    </div>
                </div>
            </Card>
            <Card className="flex w-[400px] flex-col items-center gap-4">
                <div className="space-y-2">
                    <h1 className="text-center text-2xl font-bold">Add fruit</h1>
                    <div className="text-center text-xs text-wrap text-gray-500">
                        Fill the fields to add a new fruit.
                    </div>
                </div>
                <Input label="Name" className={{ component: "w-full" }} setValue={setName} value={name} />
                <Input
                    label="Description"
                    className={{ component: "w-full" }}
                    setValue={setDescription}
                    value={description}
                />
                <InputFile label="Image" onChange={handleImageChange} imagePreview={image} classComponent="w-full" />
                <Feedback message={message} mode={mode} isFeedbackOpen={isFeedbackOpen} />
                <Button label="add-fruit" onClick={handleSubmit} isLoading={isLoading}>
                    Add new fruit
                </Button>
            </Card>
        </div>
    );
}

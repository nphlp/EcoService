"use client";

import { CreateFruit } from "@actions/database/Fruit";
import { ImageValidation } from "@actions/utils/ImageUploads";
import ButtonClient from "@comps/client/Button";
import InputClient from "@comps/client/Input";
import Card from "@comps/server/Card";
import FeedbackClient, { FeedbackProps } from "@comps/server/Feedback";
import { Content, ImageCard, Img, Text, Title } from "@comps/server/ImageCard";
import { ChangeEvent, useState } from "react";

export default function AddFruitClient() {
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState<FeedbackProps["message"]>("");
    const [mode, setMode] = useState<FeedbackProps["mode"]>("");

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState<File | null>();

    const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
        const imageFile = e.target.files?.[0] as File;

        if (!imageFile) {
            setMessage("No file selected.");
            setMode("warning");
            return;
        }

        if (imageFile.size > 1 * 1024 * 1024) {
            // 1MB
            setMessage("Image file too large.");
            setMode("warning");
            return;
        }

        const isValidImage = await ImageValidation({ imageFile });

        if (!isValidImage.status) {
            setMessage(isValidImage.message);
            setMode("warning");
            return;
        }

        // Store raw file list
        setMessage(isValidImage.message);
        setMode("info");
        setImage(imageFile);
    };

    const handleSubmit = async () => {
        setIsLoading(true);

        if (!name || !description || !image) {
            setMessage("Please fill all fields.");
            setMode("warning");
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
            setIsLoading(false);
            return;
        } else if (!fruitData) {
            setMessage("Upload failed, please try again later.");
            setMode("error");
            setIsLoading(false);
            return;
        }

        setMessage("Fruit added with success.");
        setMode("success");
        setIsLoading(false);
    };

    return (
        <div className="space-y-4">
            <ImageCard>
                <Img src={image ? URL.createObjectURL(image) : null} alt="Preview" />
                <Content>
                    <Title>{name !== "" ? name : "Fruit Preview"}</Title>
                    <Text>
                        {description !== ""
                            ? description
                            : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam excepturi unde expedita debitis ea ducimus..."}
                    </Text>
                </Content>
            </ImageCard>
            <Card className="flex flex-col items-center gap-4">
                <h1 className="text-center text-xl font-bold">Add fruit</h1>
                <div className="text-wrap text-center text-xs text-gray-500">Fill the fields to add a new fruit.</div>
                <InputClient
                    type="text"
                    label="name"
                    classDiv="w-full"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                />
                <InputClient
                    type="text"
                    label="description"
                    classDiv="w-full"
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                />
                <InputClient label="file" type="file" onChange={handleImageChange} />
                <FeedbackClient message={message} mode={mode} />
                <ButtonClient type="button" label="add-fruit" onClick={handleSubmit} isLoading={isLoading}>
                    Add new fruit
                </ButtonClient>
            </Card>
        </div>
    );
}

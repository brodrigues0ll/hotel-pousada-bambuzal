import Image from "next/image";
import React, { useState } from "react";

const apiKey = process.env.NEXT_PUBLIC_API_AUTH_KEY;
const apiURL = process.env.NEXT_PUBLIC_API_URL;

const Test = () => {
  const [files, setFiles] = useState([]);
  const [eventId, setEventId] = useState("c02a9433a93b4b1793460d2ecd9d96b5");
  const [images, setImages] = useState([]);

  const handleFileChange = (e) => {
    const selectedFiles = e.target.files;
    setFiles(Array.from(selectedFiles));
  };

  const uploadImage = async () => {
    try {
      const formData = new FormData();
      formData.append("eventId", eventId);

      const uploadNextImage = async (index) => {
        if (index < files.length) {
          formData.set("image", files[index]);

          try {
            const result = await fetch(`${apiURL}/images/create`, {
              method: "POST",
              headers: {
                Authorization: apiKey,
              },
              body: formData,
            });

            const data = await result.json();

            if (result.ok) {
              console.log(`Image ${index + 1} uploaded successfully:`, data);
            } else {
              console.error(`Failed to upload image ${index + 1}:`, data.error);
            }

            // Upload the next image in the queue
            uploadNextImage(index + 1);
          } catch (error) {
            console.error(
              `Unexpected error during image upload ${index + 1}:`,
              error
            );
          }
        }
      };

      // Start the upload queue with the first image
      uploadNextImage(0);
    } catch (error) {
      console.error("Unexpected error during image upload:", error);
    }
  };
  const fetchImages = async () => {
    try {
      const result = await fetch(`${apiURL}/images/${eventId}`, {
        method: "GET",
        headers: {
          Authorization: apiKey,
        },
      });

      const data = await result.json();

      if (result.ok) {
        console.log("Images fetched successfully:", data);
        setImages(data);
      }
    } catch (error) {
      console.error("Unexpected error during image fetch:", error);
    }
  };

  const cleanImages = async () => {
    try {
      const result = await fetch(`${apiURL}/table/clean`, {
        method: "PUT",
        headers: {
          Authorization: apiKey,
          "Content-Type": "application/json", // Specify content type
        },
        body: JSON.stringify({
          name: "images",
        }),
      });

      const data = await result.json();
      fetchImages();

      if (result.ok) {
        console.log("Images deleted successfully:");
      } else {
        console.error("Error deleting images:", data.message);
      }
    } catch (error) {
      console.error("Unexpected error during image delete:", error);
    }
  };

  return (
    <div style={{ color: "#fff" }}>
      <h1>TEST</h1>

      <input
        type="file"
        name="image"
        onChange={handleFileChange}
        multiple={true}
        accept="image/*"
      />

      <button onClick={uploadImage}>Enviar</button>

      <button onClick={fetchImages}>Ver imagens</button>

      <button onClick={cleanImages}>Limpar Tudo</button>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
        }}
      >
        {images.map((image) => (
          <Image
            key={image.id}
            src={`data:image/png;base64,${image.image}`}
            alt="Imagem"
            width="200"
            height="200"
            style={{
              border: "1px solid #fff",
              borderRadius: "5px",
              margin: "5px",
              objectFit: "cover",
            }}
            loading="lazy"
          />
        ))}
      </div>
    </div>
  );
};

export default Test;

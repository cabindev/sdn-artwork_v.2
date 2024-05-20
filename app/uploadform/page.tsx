'use client';
import { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';

interface ImageData {
  files: string[];
  zips: string[];
}

export default function Home() {

  const [allImage, setAllImage] = useState<string[]>([]);
  const [allZip, setAllZip] = useState<string[]>([]);
  const [image, setImage] = useState<File | null>(null);
  const [zipFile, setZipFile] = useState<File | null>(null);

  const fetchFiles = async () => {
    try {
      const response = await axios.get<ImageData>("/api/uploads");
      const data = await response.data;
      setAllImage(data?.files);
      setAllZip(data?.zips);
    } catch (error) {
      console.error("Error fetching files:", error);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!image && !zipFile) {
      alert("Please upload an image or a zip file");
      return;
    }

    const formData = new FormData();
    if (image) {
      formData.append("image", image);
    }
    if (zipFile) {
      formData.append("zip", zipFile);
    }

    try {
      const response = await axios.post("/api/uploads", formData);
      const data = await response.data;
      fetchFiles();
      console.log({ data });
    } catch (error) {
      console.error("Error uploading files:", error);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 gap-5">
      <form onSubmit={handleSubmit} className="w-1/2 mx-auto flex flex-col gap-5">
      <input
            type="file"
            name="image"
            id="image"
            onChange={(e) => setImage(e.target.files?.[0] || null)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
      <input
            type="file"
            name="zip"
            id="zip"
            onChange={(e) => setZipFile(e.target.files?.[0] || null)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        <div className="flex justify-center items-center">
          <button type='submit' className="px-12 py-3 rounded text-white bg-red-500">Upload</button>
        </div>
      </form>

      <div className="w-full flex flex-wrap">
        {allImage && allImage.length > 0 && allImage.map((cur, i) => (
          <div key={i} className='w-1/3 mx-auto p-4 border border-purple-500 ring-2'>
            <img src={`./images/${cur}`} alt={`image${i}`} />
          </div>
        ))}
        {allZip && allZip.length > 0 && allZip.map((cur, i) => (
          <div key={i} className='w-1/3 mx-auto p-4 border border-blue-500 ring-2'>
            <a href={`./zip/${cur}`} download>
              <button className="px-12 py-3 rounded text-white bg-blue-500">Download ZIP {i + 1}</button>
            </a>
          </div>
        ))}
      </div>
    </main>
  );
}

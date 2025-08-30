"use client";

import Image from "next/image";

interface GalleryItem {
  src: string;
  alt: string;
}

interface GalleryProps {
  items: GalleryItem[];
}

export default function Gallery({ items }: GalleryProps) {
  return (
    <div className="thumb-list">
      {items.map((item, index) => (
        <div key={index} className="thumb">
          <Image
            src={item.src}
            alt={item.alt}
            width={500}
            height={500}
            style={{ width: "100%", height: "auto", display: "block", objectFit: "cover" }}
          />
          <div className="thumb-title">{item.alt}</div>
        </div>
      ))}
      <style jsx>{`
        .thumb-list {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          grid-auto-rows: 10px;
          gap: 10px;
        }

        .thumb {
          position: relative;
        }

        .thumb-title {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          padding: 5px 10px;
          background: rgba(0, 0, 0, 0.5);
          color: white;
          font-size: 14px;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .thumb:hover .thumb-title {
          opacity: 1;
        }
      `}</style>
    </div>
  );
}

import React, { useState } from "react";
import FilterListIcon from '@mui/icons-material/FilterList';

const photos = [
  { src: "https://www.distritofoto.com/wp-content/uploads/2021/07/montejo-front.jpg", title: "LA MONTEJO", category: "alimentos" },
  { src: "https://www.distritofoto.com/wp-content/uploads/2017/05/corporativa4.jpg", title: "IMPRENTA SELECTA", category: "corporativa" },
  { src: "https://www.distritofoto.com/wp-content/uploads/2021/07/ajol-front.jpg", title: "AJOLOTIUS", category: "producto" },
  { src: "https://www.distritofoto.com/wp-content/uploads/2021/07/hutfront.jpg", title: "H.U.T. INTERNACIONAL", category: "producto" },
  { src: "https://www.distritofoto.com/wp-content/uploads/2021/07/hutfront.jpg", title: "TIENDA X", category: "ecommerce" },
  { src: "https://www.distritofoto.com/wp-content/uploads/2021/07/hutfront.jpg", title: "EDIFICIO Y", category: "arquitectura" },
  { src: "https://www.distritofoto.com/wp-content/uploads/2021/07/hutfront.jpg", title: "EVENTO Z", category: "eventos" },
  { src: "https://www.distritofoto.com/wp-content/uploads/2021/07/hutfront.jpg", title: "FOOD W", category: "alimentos" },
];

const categories = ["all", "producto", "ecommerce", "alimentos", "arquitectura", "corporativa", "eventos"];

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [selectedPhoto, setSelectedPhoto] = useState<{ src: string; title: string } | null>(null);

  // Filtramos y limitamos a 8 imágenes
  const filteredPhotos = photos.filter(
    (photo) => activeCategory === "all" || photo.category === activeCategory
  ).slice(0, 8); // solo 8 imágenes

  return (
    <div style={{ width: "83%", margin: "40px auto 0 auto", padding: "20px 0" }}>

      {/* Filtros */}
      <div
        className="filters"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "30px",
          flexWrap: "wrap",
          justifyContent: "center",
          marginBottom: "20px",
        }}
      >
        {categories.map((cat) => (
          <span
            key={cat}
            onClick={() => setActiveCategory(cat)}
            style={{
              cursor: "pointer",
              color: activeCategory === cat ? "#fff" : "#aaa",
              fontWeight: activeCategory === cat ? "bold" : "normal",
              display: "flex",
              alignItems: "center",
              gap: cat === "all" ? "5px" : 0,
              transition: "all 0.3s",
            }}
          >
            {cat === "all" && <FilterListIcon style={{ fontSize: 18, color: "#fff" }} />}
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </span>
        ))}
      </div>

      {/* Grid de imágenes: 4 columnas x 2 filas */}
      <div
        className="grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gridTemplateRows: "repeat(2, 200px)", // fuerza 2 filas
          gap: "20px",
        }}
      >
        {filteredPhotos.map((photo, index) => (
          <div
            className="item"
            key={index}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            onClick={() => setSelectedPhoto(photo)}
            style={{
              position: "relative",
              overflow: "hidden",
              borderRadius: "0px",
              cursor: "pointer",
              transition: "all 0.5s",
            }}
          >
            <img
              src={photo.src}
              alt={photo.title}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                filter:
                  hoveredIndex === index
                    ? "grayscale(0%) brightness(100%)"
                    : "grayscale(100%) brightness(20%)",
                transition: "all 0.5s",
              }}
            />
            <div
              className="title"
              style={{
                position: "absolute",
                bottom: 0,
                width: "100%",
                textAlign: "center",
                backgroundColor: "rgba(0,0,0,0.6)",
                color: "white",
                fontSize: "0.8rem",
                padding: "5px 0",
              }}
            >
              {photo.title}
            </div>
          </div>
        ))}
      </div>

      {/* Modal de imagen seleccionada */}
      {selectedPhoto && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0,0,0,0.9)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              position: "relative",
              width: "95vw",
              height: "95vh",
            }}
          >
            {/* Botón cerrar */}
            <span
              onClick={() => setSelectedPhoto(null)}
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                color: "#fff",
                fontSize: "2rem",
                cursor: "pointer",
                fontWeight: "bold",
                zIndex: 1001,
              }}
            >
              &times;
            </span>

            <img
              src={selectedPhoto.src}
              alt={selectedPhoto.title}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
                borderRadius: "8px",
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: 0,
                width: "100%",
                textAlign: "center",
                color: "#fff",
                backgroundColor: "rgba(0,0,0,0.6)",
                padding: "10px 0",
                borderBottomLeftRadius: "8px",
                borderBottomRightRadius: "8px",
              }}
            >
              {selectedPhoto.title}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

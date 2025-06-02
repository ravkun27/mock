
const logos = [
  {
    src: "https://cdn.prod.website-files.com/668eeec9e813ea8b3d7706b7/67d2debcf1f87d874e2b57e8_logo1.png",
    alt: "testRigor",
  },
  {
    src: "https://cdn.prod.website-files.com/668eeec9e813ea8b3d7706b7/67d2debcf8d1c0c328ab4b08_logo2.png",
    alt: "Snappt",
  },
  {
    src: "https://cdn.prod.website-files.com/668eeec9e813ea8b3d7706b7/67d2debcbbd838c36e17ce06_logo3.png",
    alt: "BetterWorks",
  },
  {
    src: "https://cdn.prod.website-files.com/668eeec9e813ea8b3d7706b7/67d2debcf5d1bd96955122d1_logo4.png",
    alt: "Sumo Logic",
  },
  {
    src: "https://cdn.prod.website-files.com/668eeec9e813ea8b3d7706b7/67d2debcc8b9b0e7e8b23df7_logo5.png",
    alt: "Elements",
  },
  {
    src: "https://cdn.prod.website-files.com/668eeec9e813ea8b3d7706b7/67d2debcf97f02b77224d36d_logo6.png",
    alt: "Santa Cruz",
  },
  {
    src: "https://cdn.prod.website-files.com/668eeec9e813ea8b3d7706b7/67d2debdbfc05787cd6c02f5_logo7.png",
    alt: "Comply365",
  },
  {
    src: "https://cdn.prod.website-files.com/668eeec9e813ea8b3d7706b7/67d2debdda0d0096fab52609_logo8.png",
    alt: "Kiln",
  },
];

const LogoStrip = () => {
  return (
    <div
      style={{
        width: "100%",
        overflowX: "auto",
        whiteSpace: "nowrap",
        padding: "2rem 1rem",
        backgroundColor: "#ffffff",
        display: "flex",
        justifyContent: "center",
        gap: "1rem",
      }}
    >
      {logos.map((logo, index) => (
        <img
          key={index}
          src={logo.src}
          alt={logo.alt}
          loading="lazy"
          style={{
            height: "36px",
            objectFit: "contain",
            filter: "grayscale(100%)",
            transition: "filter 0.3s ease",
            cursor: "pointer",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.filter = "grayscale(0%)")}
          onMouseLeave={(e) =>
            (e.currentTarget.style.filter = "grayscale(100%)")
          }
        />
      ))}
    </div>
  );
};

export default LogoStrip;

export default function Cards() {
  const cards = [
    {
      id: 1,
      title: "Mountain Landscape",
      imageUrl: "https://digitalinnovation.studio/img/bombay_royal_img_1.JPG",
    },
    {
      id: 2,
      title: "Ocean View",
      imageUrl: "https://digitalinnovation.studio/img/bombay_royal_img_1.JPG",
    },
    {
      id: 3,
      title: "Forest Trail",
      imageUrl: "https://digitalinnovation.studio/img/bombay_royal_img_1.JPG",
    },
  ];

  return (
    <div className="flex flex-col items-center w-full space-y-6 p-4">
      {cards.map((card) => (
        <div
          key={card.id}
          className="relative w-4/5 h-[30vh] my-8 md:h-[70vh] rounded-lg overflow-hidden shadow-lg"
        >
          <img
            src={card.imageUrl}
            alt={card.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 right-1 backdrop-blur-md bg-opacity-50 p-3">
            <h2 className="text-white font-semibold text-lg">{card.title}</h2>
          </div>
        </div>
      ))}
    </div>
  );
}

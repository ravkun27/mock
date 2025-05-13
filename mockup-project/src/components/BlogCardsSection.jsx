import React from "react";

const blogPosts = [
  {
    id: 1,
    image:
      "http://cdn.prod.website-files.com/672a1dc3f9c27f98c24c3703/673355c9219625249d17bf76_service-1-big-p-800.avif",
    date: "May 13, 2025",
    readTime: "5 min read",
    title: "Designing for Impact: Visual Strategies That Work",
  },
  {
    id: 2,
    image:
      "http://cdn.prod.website-files.com/672a1dc3f9c27f98c24c3703/673355c9219625249d17bf76_service-1-big-p-800.avif",
    date: "May 10, 2025",
    readTime: "3 min read",
    title: "The Future of Web Development with AI",
  },
  {
    id: 3,
    image:
      "http://cdn.prod.website-files.com/672a1dc3f9c27f98c24c3703/673355c9219625249d17bf76_service-1-big-p-800.avif",
    date: "May 8, 2025",
    readTime: "4 min read",
    title: "Building Brand Identity Through Digital Innovation",
  },
];

export default function BlogCardsSection() {
  return (
    <section className="py-20 px-4 md:px-10 lg:px-20 bg-white">
      <h2 className="text-4xl font-bold text-center mb-12">Latest Insights</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {blogPosts.map((post) => (
          <div key={post.id} className="flex flex-col">
            <div className="text-sm text-gray-500 mb-2">
              {post.date} · {post.readTime}
            </div>
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-56 object-cover rounded-md mb-4"
            />
            <h3 className="text-xl font-semibold text-gray-900">
              {post.title}
            </h3>
          </div>
        ))}
      </div>
    </section>
  );
}

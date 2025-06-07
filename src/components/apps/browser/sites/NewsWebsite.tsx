
import React from 'react';
import { Clock, User, MessageCircle } from 'lucide-react';

const NewsWebsite: React.FC = () => {
  const articles = [
    {
      title: "RefOS 2.0 Beta Released with Enhanced Security Features",
      excerpt: "The latest version of RefOS introduces advanced security protocols and improved user interface design.",
      author: "Sarah Chen",
      time: "2 hours ago",
      comments: 42
    },
    {
      title: "AI Integration in Modern Operating Systems",
      excerpt: "How artificial intelligence is revolutionizing the way we interact with our computers.",
      author: "Mike Rodriguez",
      time: "4 hours ago",
      comments: 28
    },
    {
      title: "The Future of Web Browsers",
      excerpt: "Exploring next-generation browser technologies and their impact on user experience.",
      author: "Emma Thompson",
      time: "6 hours ago",
      comments: 15
    }
  ];

  return (
    <div className="h-full bg-white overflow-auto">
      <header className="bg-blue-600 text-white p-4">
        <h1 className="text-2xl font-bold">RefNews</h1>
        <p className="text-blue-100">Your source for technology news</p>
      </header>
      
      <nav className="bg-blue-500 text-white p-2">
        <div className="flex space-x-6">
          <a href="#" className="hover:text-blue-200">Home</a>
          <a href="#" className="hover:text-blue-200">Technology</a>
          <a href="#" className="hover:text-blue-200">Science</a>
          <a href="#" className="hover:text-blue-200">Business</a>
          <a href="#" className="hover:text-blue-200">Sports</a>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto p-6">
        <div className="grid gap-6">
          {articles.map((article, index) => (
            <article key={index} className="border-b border-gray-200 pb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-2 hover:text-blue-600 cursor-pointer">
                {article.title}
              </h2>
              <p className="text-gray-600 mb-3">{article.excerpt}</p>
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <div className="flex items-center space-x-1">
                  <User size={14} />
                  <span>{article.author}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock size={14} />
                  <span>{article.time}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <MessageCircle size={14} />
                  <span>{article.comments} comments</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
};

export default NewsWebsite;


import React from 'react';
import { Heart, MessageCircle, Share, MoreHorizontal } from 'lucide-react';

const SocialWebsite: React.FC = () => {
  const posts = [
    {
      user: "Alex Johnson",
      handle: "@alexj",
      time: "1h",
      content: "Just tried the new RefOS update and the performance improvements are incredible! 🚀",
      likes: 24,
      comments: 8,
      shares: 3
    },
    {
      user: "Tech Weekly",
      handle: "@techweekly",
      time: "3h",
      content: "Breaking: New browser technology promises 50% faster page loads. What do you think about this development?",
      likes: 156,
      comments: 42,
      shares: 28
    },
    {
      user: "Lisa Park",
      handle: "@lisap",
      time: "5h",
      content: "Working on some exciting new features for our web app. Can't wait to share them with everyone! 💻✨",
      likes: 89,
      comments: 15,
      shares: 7
    }
  ];

  return (
    <div className="h-full bg-gray-50 overflow-auto">
      <header className="bg-white border-b border-gray-200 p-4">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-xl font-bold text-blue-500">RefSocial</h1>
        </div>
      </header>

      <main className="max-w-2xl mx-auto p-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-4">
          <textarea 
            className="w-full p-3 border border-gray-300 rounded-lg resize-none"
            placeholder="What's happening?"
            rows={3}
          />
          <div className="flex justify-between items-center mt-3">
            <div className="text-sm text-gray-500">0/280</div>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600">
              Post
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {posts.map((post, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                  <span className="text-gray-600 font-semibold">{post.user.charAt(0)}</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="font-semibold text-gray-900">{post.user}</span>
                    <span className="text-gray-500">{post.handle}</span>
                    <span className="text-gray-500">·</span>
                    <span className="text-gray-500">{post.time}</span>
                    <MoreHorizontal size={16} className="text-gray-400 ml-auto cursor-pointer" />
                  </div>
                  <p className="text-gray-900 mb-3">{post.content}</p>
                  <div className="flex items-center space-x-6 text-gray-500">
                    <div className="flex items-center space-x-1 cursor-pointer hover:text-blue-500">
                      <MessageCircle size={16} />
                      <span className="text-sm">{post.comments}</span>
                    </div>
                    <div className="flex items-center space-x-1 cursor-pointer hover:text-green-500">
                      <Share size={16} />
                      <span className="text-sm">{post.shares}</span>
                    </div>
                    <div className="flex items-center space-x-1 cursor-pointer hover:text-red-500">
                      <Heart size={16} />
                      <span className="text-sm">{post.likes}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default SocialWebsite;

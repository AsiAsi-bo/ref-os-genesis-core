
import React from 'react';
import { Search, Edit, Share } from 'lucide-react';

const WikiWebsite: React.FC = () => {
  return (
    <div className="h-full bg-white overflow-auto">
      <header className="border-b border-gray-200 p-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <h1 className="text-xl font-bold">RefWiki</h1>
          <div className="relative">
            <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search RefWiki..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded w-60"
            />
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-6">
        <article>
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold text-gray-900">RefOS Operating System</h1>
            <div className="flex space-x-2">
              <button className="flex items-center space-x-1 text-blue-600 hover:text-blue-800">
                <Edit size={16} />
                <span>Edit</span>
              </button>
              <button className="flex items-center space-x-1 text-blue-600 hover:text-blue-800">
                <Share size={16} />
                <span>Share</span>
              </button>
            </div>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded p-4 mb-6 float-right ml-6 w-80">
            <div className="text-center mb-4">
              <div className="w-full h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded mb-2 flex items-center justify-center text-white text-2xl font-bold">
                RefOS
              </div>
              <p className="text-sm text-gray-600">RefOS Desktop Environment</p>
            </div>
            <table className="w-full text-sm">
              <tr>
                <td className="font-semibold text-gray-700 py-1">Developer</td>
                <td className="py-1">Brin Corporation</td>
              </tr>
              <tr>
                <td className="font-semibold text-gray-700 py-1">Written in</td>
                <td className="py-1">React, TypeScript</td>
              </tr>
              <tr>
                <td className="font-semibold text-gray-700 py-1">Initial release</td>
                <td className="py-1">2024</td>
              </tr>
              <tr>
                <td className="font-semibold text-gray-700 py-1">License</td>
                <td className="py-1">Ref OS Ultimate</td>
              </tr>
            </table>
          </div>

          <div className="text-gray-900 leading-relaxed space-y-4">
            <p>
              <strong>RefOS</strong> is a modern operating system designed with a focus on simplicity, performance, and user experience. 
              Developed using cutting-edge web technologies, RefOS provides a familiar desktop environment while maintaining 
              compatibility with modern applications and services.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">History</h2>
            <p>
              RefOS was first conceptualized in early 2024 as part of an initiative to create a more intuitive and responsive 
              operating system. The development team at Brin Corporation focused on leveraging web technologies to create a lightweight yet powerful 
              desktop environment.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">Features</h2>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Modern web-based desktop environment</li>
              <li>Integrated application suite including file manager, text editor, and calculator</li>
              <li>Built-in web browser with advanced navigation capabilities</li>
              <li>Customizable interface with themes and personalization options</li>
              <li>AI-powered assistant (Refy) for enhanced productivity</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4">System Requirements</h2>
            <p>
              RefOS is designed to run efficiently on modern hardware configurations. The system requirements are 
              minimal due to its optimized architecture and efficient resource management.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">See also</h2>
            <ul className="list-none space-y-1 text-blue-600">
              <li><a href="#" className="hover:underline">• Operating systems comparison</a></li>
              <li><a href="#" className="hover:underline">• Web-based operating systems</a></li>
              <li><a href="#" className="hover:underline">• Modern desktop environments</a></li>
            </ul>
          </div>
        </article>
      </main>
    </div>
  );
};

export default WikiWebsite;

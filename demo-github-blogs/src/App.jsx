import './App.css'
import { BlogList } from './components/blogList';
import { BlogView } from './components/blogView';
import { useState } from 'react';
function App() {

  const [selectedBlog, setSelectedBlog] = useState(null);

  return (
    <div className="bg-black min-h-screen text-white">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4">
        <div className="col-span-1 bg-gray-50 shadow p-4">
          <BlogList onSelect={setSelectedBlog} />
        </div>
        <div className="col-span-3 bg-white shadow p-4">
          <BlogView blog={selectedBlog} />
        </div>
      </div>
    </div>
  );
}

export default App

import { 
  BookOpen, Video, FileText, Users, Search, Filter, 
  Bookmark, Clock, Star, Menu, X, Home 
} from 'lucide-react';
import { useState } from 'react';

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
const [selectedCategory, setSelectedCategory] = useState('All');

const trending = resources.slice(0, 3);   // resources array should be defined
  return (
    <div>
      {/* ==================== MIDDLE CONTENT ==================== */}
<main className="flex-1 overflow-auto bg-gray-50 dark:bg-gray-950 p-6 lg:p-8 space-y-10">

  {/* Welcome Header */}
  <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
    <div>
      <h1 className="text-3xl lg:text-4xl font-semibold tracking-tight text-gray-900 dark:text-white">
        Good morning, Popoola 👋
      </h1>
      <p className="text-gray-600 dark:text-gray-400 mt-2 text-lg">
        Discover top educational resources tailored for you
      </p>
    </div>

    <div className="flex items-center gap-3 text-sm">
      <button className="px-5 py-2.5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-800 transition flex items-center gap-2">
        <Clock size={18} />
        Continue Learning
      </button>
      <button className="px-5 py-2.5 bg-violet-600 hover:bg-violet-700 text-white rounded-2xl flex items-center gap-2 font-medium transition">
        <Bookmark size={18} />
        My Library
      </button>
    </div>
  </div>

  {/* Search Bar (for middle content if needed) */}
  <div className="relative max-w-2xl">
    <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
    <input
      type="text"
      placeholder="Search courses, books, articles, videos, podcasts..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 focus:border-violet-500 pl-14 py-4 rounded-3xl text-base focus:outline-none shadow-sm"
    />
  </div>

  {/* Categories Filter */}
  <div className="flex flex-wrap gap-3">
    {['All', 'Courses', 'Books', 'Videos', 'Articles', 'Podcasts'].map((cat) => (
      <button
        key={cat}
        onClick={() => setSelectedCategory(cat)}
        className={`px-6 py-3 rounded-3xl text-sm font-medium transition-all ${
          selectedCategory === cat 
            ? 'bg-violet-600 text-white shadow-md' 
            : 'bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 hover:border-violet-400 hover:bg-gray-50 dark:hover:bg-gray-800'
        }`}
      >
        {cat}
      </button>
    ))}
  </div>

  {/* Trending This Week */}
  <div>
    <div className="flex items-center justify-between mb-6">
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
        Trending This Week <span className="text-2xl">🔥</span>
      </h2>
      <a href="#" className="text-violet-600 hover:underline text-sm font-medium">View all trending →</a>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {trending.map((resource) => (
        <div 
          key={resource.id} 
          className="bg-white dark:bg-gray-900 rounded-3xl overflow-hidden border border-gray-100 dark:border-gray-800 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
        >
          <div className="relative">
            <img 
              src={resource.image} 
              alt={resource.title} 
              className="w-full h-52 object-cover" 
            />
            <div className="absolute top-4 right-4 bg-black/70 text-white text-xs px-3 py-1 rounded-full backdrop-blur-md">
              {resource.type}
            </div>
          </div>

          <div className="p-6">
            <h3 className="font-semibold text-xl line-clamp-2 group-hover:text-violet-600 transition-colors">
              {resource.title}
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm">{resource.provider}</p>

            <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-100 dark:border-gray-800">
              <div className="flex items-center gap-1">
                <Star className="text-yellow-500" size={20} fill="currentColor" />
                <span className="font-semibold">{resource.rating}</span>
              </div>
              <div className="text-sm text-gray-500">{resource.duration}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>

  {/* Recommended Resources */}
  <div>
    <div className="flex items-center justify-between mb-6">
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Recommended For You</h2>
      <span className="text-sm text-gray-500">Based on your interests</span>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {filteredResources.map((resource) => (
        <div 
          key={resource.id} 
          className="bg-white dark:bg-gray-900 rounded-3xl overflow-hidden border border-gray-100 dark:border-gray-800 hover:border-violet-300 group transition-all hover:shadow-md"
        >
          <div className="relative">
            <img 
              src={resource.image} 
              alt={resource.title} 
              className="w-full h-48 object-cover" 
            />
            <div className="absolute top-4 left-4 bg-white/90 dark:bg-gray-900/90 text-xs font-medium px-3 py-1 rounded-2xl backdrop-blur">
              {resource.type}
            </div>
          </div>

          <div className="p-5">
            <h3 className="font-semibold text-lg line-clamp-2 leading-tight group-hover:text-violet-600 transition">
              {resource.title}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">{resource.provider}</p>

            <div className="flex justify-between items-center mt-6">
              <div className="flex items-center gap-1 text-yellow-500">
                <Star size={18} fill="currentColor" />
                <span className="font-medium text-gray-700 dark:text-gray-300">{resource.rating}</span>
              </div>
              <div className="text-xs text-gray-500 font-medium">{resource.duration}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>

</main>
    </div>
  )
}

export default Dashboard

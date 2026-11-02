import React, { useState } from 'react';
import { MOCK_BLOGS } from '../data/mockData';
import { BlogPost } from '../types';
import { BookOpen, Clock, Calendar, User, ArrowRight, X } from 'lucide-react';

export const BlogView: React.FC = () => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = ['all', 'Kiến thức kỹ thuật', 'Hướng dẫn lựa chọn', 'Bảo trì & Vận hành'];

  const filteredPosts = MOCK_BLOGS.filter(p => {
    if (selectedCategory === 'all') return true;
    return p.category === selectedCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-10">
      {/* Header */}
      <div className="max-w-3xl space-y-3">
        <span className="text-xs font-mono font-bold text-[#FF8A00] uppercase tracking-wider block">
          TRUNG TÂM KIẾN THỨC NGUỒN ĐIỆN
        </span>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Cẩm Nang Kỹ Thuật & Hướng Dẫn Sử Dụng Bộ Lưu Điện
        </h1>
        <p className="text-sm text-slate-600 leading-relaxed">
          Bài viết chuyên sâu từ đội ngũ kỹ sư nguồn điện: công thức tính chọn công suất kVA, phân biệt sóng Sin chuẩn, cách bảo dưỡng ắc quy để đạt tuổi thọ tối đa.
        </p>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200 text-xs">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 rounded-md font-medium transition-colors whitespace-nowrap ${
              selectedCategory === cat
                ? 'bg-[#0F172A] text-white font-bold'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {cat === 'all' ? 'Tất cả bài viết' : cat}
          </button>
        ))}
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredPosts.map(post => (
          <article 
            key={post.id}
            onClick={() => setSelectedPost(post)}
            className="bg-white border border-slate-200 rounded-xl p-6 hover:border-slate-300 hover:shadow-md cursor-pointer transition-all flex flex-col justify-between group"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between text-[11px] font-mono text-slate-500">
                <span className="text-[#1677FF] font-semibold">{post.category}</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>{post.readTime}</span>
                </span>
              </div>

              <h2 className="text-base font-bold text-slate-900 group-hover:text-[#1677FF] transition-colors leading-snug">
                {post.title}
              </h2>

              <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                {post.summary}
              </p>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-mono">
              <span>{post.publishedDate}</span>
              <span className="text-[#1677FF] font-medium flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                <span>Đọc bài viết</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </article>
        ))}
      </div>

      {/* Article Reader Modal */}
      {selectedPost && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-150">
          <div className="bg-white rounded-xl border border-slate-200 shadow-2xl w-full max-w-3xl max-h-[85vh] flex flex-col overflow-hidden">
            <div className="bg-[#0F172A] text-white p-5 flex items-center justify-between border-b border-slate-800">
              <span className="text-xs font-mono text-[#FF8A00] font-bold">
                {selectedPost.category} · {selectedPost.readTime}
              </span>
              <button
                onClick={() => setSelectedPost(null)}
                className="p-1 rounded text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-4">
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 leading-snug">
                {selectedPost.title}
              </h2>

              <div className="flex items-center gap-4 text-xs font-mono text-slate-500 border-b border-slate-100 pb-3">
                <span className="flex items-center gap-1">
                  <User className="w-3.5 h-3.5 text-slate-400" />
                  <span>{selectedPost.author}</span>
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  <span>{selectedPost.publishedDate}</span>
                </span>
              </div>

              <div className="text-xs sm:text-sm text-slate-700 leading-relaxed whitespace-pre-line space-y-3 pt-2">
                {selectedPost.content}
              </div>
            </div>

            <div className="p-4 border-t border-slate-200 bg-slate-50 flex justify-end">
              <button
                onClick={() => setSelectedPost(null)}
                className="px-4 py-2 text-xs font-bold text-slate-700 bg-white border border-slate-300 rounded hover:bg-slate-100"
              >
                Đóng bài đọc
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

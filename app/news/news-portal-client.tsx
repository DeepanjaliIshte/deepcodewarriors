"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { NewsArticle, NEWS_CATEGORIES } from "@/lib/data/news-service";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Search,
  ExternalLink,
  Calendar,
  Clock,
  Sparkles,
  Newspaper,
  BookOpen,
  ArrowRight,
  Bookmark,
} from "lucide-react";

interface Props {
  initialArticles: NewsArticle[];
}

export function NewsPortalClient({ initialArticles }: Props) {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const filteredArticles = useMemo(() => {
    return initialArticles.filter((item) => {
      const matchesCategory =
        selectedCategory === "All" || item.category === selectedCategory;
      const matchesSearch =
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.summary.toLowerCase().includes(search.toLowerCase()) ||
        item.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [initialArticles, search, selectedCategory]);

  const featuredArticle = initialArticles.find((a) => a.isFeatured);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Hero Header */}
      <div className="relative rounded-2xl overflow-hidden border border-cyan-500/20 bg-gradient-to-r from-blue-950/40 via-slate-900/60 to-purple-950/40 p-8 backdrop-blur-xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold tracking-wider uppercase">
            <Newspaper className="w-3.5 h-3.5" />
            Developer News Portal
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Technology &amp; Open Source Updates
          </h1>
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl leading-relaxed">
            Stay ahead with curated developments in Java, Python, Flutter, React, Next.js,
            and AI engineering tools. Clear, source-attributed, and noise-free.
          </p>
        </div>
      </div>

      {/* Featured Story Banner (if matches or displayed at top) */}
      {featuredArticle && selectedCategory === "All" && !search && (
        <div className="relative rounded-2xl border border-cyan-500/30 bg-gradient-to-br from-slate-900/80 via-slate-950/80 to-blue-950/40 p-6 sm:p-8 overflow-hidden backdrop-blur-md">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="space-y-3 max-w-3xl">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                  Featured Headline
                </span>
                <span className="text-xs text-slate-400 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  {featuredArticle.publishedDate}
                </span>
                <span className="text-xs text-slate-400 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {featuredArticle.readTime}
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl font-bold text-white hover:text-cyan-400 transition-colors">
                <a
                  href={featuredArticle.externalUrl || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {featuredArticle.title}
                </a>
              </h2>

              <p className="text-slate-300 text-sm leading-relaxed">
                {featuredArticle.summary}
              </p>

              <div className="flex flex-wrap items-center gap-2 pt-1">
                {featuredArticle.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="outline"
                    className="text-[11px] bg-slate-900/60 text-slate-400 border-slate-800"
                  >
                    #{tag}
                  </Badge>
                ))}
              </div>
            </div>

            <Button
              asChild
              className="bg-cyan-500 hover:bg-cyan-600 text-slate-950 font-semibold shrink-0"
            >
              <a
                href={featuredArticle.externalUrl || "#"}
                target="_blank"
                rel="noopener noreferrer"
              >
                Read Source
                <ExternalLink className="ml-2 w-4 h-4" />
              </a>
            </Button>
          </div>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-stretch sm:items-center">
          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              type="text"
              placeholder="Search news by title, framework, or tag..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 bg-slate-900/80 border-slate-800 text-white placeholder:text-slate-500 focus:border-cyan-500"
            />
          </div>

          <div className="text-xs text-slate-400 font-mono">
            Showing {filteredArticles.length} article{filteredArticles.length === 1 ? "" : "s"}
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
          {NEWS_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? "bg-cyan-500 text-slate-950 font-semibold shadow-md shadow-cyan-500/20"
                  : "bg-slate-900/60 text-slate-400 hover:text-white border border-slate-800 hover:border-slate-700"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Articles Grid */}
      {filteredArticles.length === 0 ? (
        <div className="rounded-2xl border border-slate-800 bg-slate-950/60 py-16 text-center space-y-3">
          <BookOpen className="w-10 h-10 text-slate-600 mx-auto" />
          <h4 className="text-base font-semibold text-slate-300">
            No news articles match your filter
          </h4>
          <p className="text-sm text-slate-500 max-w-sm mx-auto">
            Try a different search query or select another category from the filter list.
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setSearch("");
              setSelectedCategory("All");
            }}
            className="text-xs border-slate-700 text-slate-300"
          >
            Clear Filters
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map((article) => (
            <article
              key={article.id}
              className="rounded-xl border border-slate-800/80 bg-slate-900/40 hover:bg-slate-900/70 hover:border-cyan-500/30 transition-all p-6 flex flex-col justify-between group"
            >
              <div className="space-y-3">
                {/* Meta Header */}
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span className="font-semibold text-cyan-400">
                    {article.category}
                  </span>
                  <span className="flex items-center gap-1 font-mono text-[11px]">
                    <Clock className="w-3 h-3 text-slate-500" />
                    {article.readTime}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-2">
                  {article.title}
                </h3>

                {/* Summary */}
                <p className="text-xs text-slate-400 leading-relaxed line-clamp-3">
                  {article.summary}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {article.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] px-2 py-0.5 rounded bg-slate-800/60 text-slate-400 border border-slate-800"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Footer Info */}
              <div className="pt-5 mt-4 border-t border-slate-800/60 flex items-center justify-between text-xs">
                <div className="text-[11px] text-slate-500 truncate max-w-[140px]">
                  {article.source}
                </div>

                <a
                  href={article.externalUrl || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-xs font-semibold text-cyan-400 hover:text-cyan-300 group-hover:translate-x-0.5 transition-all"
                >
                  Read Article
                  <ExternalLink className="w-3.5 h-3.5 ml-1" />
                </a>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

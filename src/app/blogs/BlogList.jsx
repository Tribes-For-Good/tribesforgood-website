"use client";
import React, { useState, useEffect } from "react";
import Card from "./Card";
import Pagination from "@/components/Pagination";

export default function BlogList({
  initialPosts = [],
  initialTotalPosts = 0,
  postsPerPage,
  currentPage,
}) {
  const [posts, setPosts] = useState(initialPosts);
  const [totalPosts, setTotalPosts] = useState(initialTotalPosts);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // If we have no posts but we expect them (or if server failed), try fetching client-side
    // We assume if initialPosts is empty, we might need to fetch.
    // However, if the page is genuinely empty (e.g. page 100), this might trigger a redundant fetch.
    // Better logic: If initialPosts has data, use it. If not, FETCH.
    // NOTE: This assumes a failed server fetch returns an empty array.

    // Check if we need to fetch:
    // 1. If initialPosts is empty AND we haven't tried fetching yet.
    // But maybe it's just empty results?
    // Let's trust the prop unless it's empty, then try ONCE.

    const fetchData = async () => {
      if (initialPosts.length > 0) return; // We have server data

      setLoading(true);
      try {
        const res = await fetch(
          `https://wp.tribesforgood.com/wp-json/wp/v2/posts?_fields=id,uagb_excerpt,slug,featured_media,title,link&per_page=${postsPerPage}&page=${currentPage}`,
        );
        if (!res.ok) throw new Error(`Status: ${res.status}`);

        const data = await res.json();
        const total = res.headers.get("X-WP-Total");

        setPosts(data);
        if (total) setTotalPosts(total);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [initialPosts, postsPerPage, currentPage]);

  if (loading) {
    return (
      <div className="w-full text-center py-20">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        <p className="mt-2 text-gray-500">Loading content securely...</p>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-wrap max-w-7xl py-10 lg:py-20 p-5 mx-auto justify-center w-full gap-5 lg:gap-10 px-4">
        {posts.length > 0 ? (
          posts.map((post, i) => <Card key={i} {...post} />)
        ) : (
          <div className="w-full text-center py-20">
            <h2 className="text-2xl font-bold text-gray-600">
              {error ? "Unable to load blogs" : "No blogs found"}
            </h2>
            <p className="text-gray-500 mt-2">
              {error ? `Error: ${error}` : "Try checking back later."}
            </p>
          </div>
        )}
      </div>

      <Pagination
        baseUrl="/blogs"
        totalPosts={totalPosts}
        postsPerPage={postsPerPage}
        currentPage={parseInt(currentPage, 10)}
      />
    </>
  );
}

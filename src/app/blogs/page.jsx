import AnimatedBox from "@/common/animation/AnimatedBox";
import Navbar from "@/components/Navbar";
import React from "react";
import CategoryComponent from "./CategoryComponent";
import Footer from "@/components/homepage/Footer";
import BlogList from "./BlogList";

const contentData = {
  title: "Blogs",
  description:
    "Dive deep into the world of TFG, where our changemakers are solving critical societal challenges",
};

export default async function BlogPage({ searchParams }) {
  const postsPerPage = 6;
  const { page } = await searchParams; // Await searchParams in Next.js 15+

  const currentPage = page || 1;

  let posts = [];
  let categories = [];
  let totalPosts = 0;

  try {
    // Attempt Server-Side Fetch (good for SEO)
    const res = await fetch(
      `https://wp.tribesforgood.com/wp-json/wp/v2/posts?_fields=id,uagb_excerpt,slug,featured_media,title,link&per_page=${postsPerPage}&page=${currentPage}`,
      {
        next: { revalidate: 60 },
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        },
      },
    );
    if (res.ok) {
      posts = await res.json();
      totalPosts = res.headers.get("X-WP-Total");
    }
    // If res.ok is false (403), posts is [], handled by BlogList fallback

    const catRes = await fetch(
      `https://wp.tribesforgood.com/wp-json/wp/v2/categories?per_page=100`,
      {
        next: { revalidate: 3600 },
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        },
      },
    );
    if (catRes.ok) {
      categories = await catRes.json();
    }
  } catch (error) {
    console.error("Error fetching blog data:", error);
  }

  return (
    <div className="overflow-hidden relative flex flex-col items-center justify-center">
      <Navbar />
      <div className="w-full">
        <div className="relative w-full min-h-[200px] justify-center lg:min-h-[400px]  flex items-center bg-[url('/assets/assets/background.svg')]  bg-cover bg-center overflow-hidden">
          <div className="max-w-md  lg:max-w-3xl py-16 pt-20 flex flex-col gap-2 w-full lg:gap-5 items-center justify-center">
            <AnimatedBox>
              <h1 className="font-extrabold  text-[20px] lg:text-[48px] font-raleway">
                {contentData?.title}
              </h1>
            </AnimatedBox>
            <AnimatedBox>
              <p className="font-mulish  w-full   px-10 text-center text-muted text-[14px] lg:text-[20px]">
                {contentData?.description}
              </p>
            </AnimatedBox>
          </div>
        </div>
      </div>

      <CategoryComponent categories={categories} />

      <BlogList
        initialPosts={posts}
        initialTotalPosts={totalPosts}
        postsPerPage={postsPerPage}
        currentPage={currentPage}
      />

      <Footer />
    </div>
  );
}

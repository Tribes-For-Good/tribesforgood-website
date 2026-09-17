import React from "react";
import Pagination from "../../../components/Pagination";
import Navbar from "@/components/Navbar";
import Footer from "@/components/homepage/Footer";
import AnimatedBox from "@/common/animation/AnimatedBox";
import Card from "../Card";
import { toTitleCase } from "../util";
import CategoryComponent from "../CategoryComponent";
import WhatsAppButton from "@/components/WhatsAppButton";
// import Pagination from "./Pagination";
// import Pagination from "./Pagination";

const contentData = {
  title: "Blogs",
  description:
    "Dive deep into the world of TFG, where our changemakers are solving critical societal challenges",
};

export default async function PostsPage({ params }) {
  const postsPerPage = 6;
  const { slug } = params;

  const currentPage = slug ? slug : 1; // Get current page from query params or default to 1

  // Fetch posts from WordPress API
  const res = await fetch(
    `https://wp.tribesforgood.com/wp-json/wp/v2/posts?_fields=id,uagb_excerpt,slug,featured_media,title,link&per_page=${postsPerPage}&page=${currentPage}`,
  );
  const posts = await res.json();

  // ?_fields=id,uagb_excerpt,slug,featured_media,title,link

  const catRes = await fetch(
    `https://wp.tribesforgood.com/wp-json/wp/v2/categories?per_page=100`,
  );
  // const postsWithMedia = await Promise.all(posts.map(fetchMedia));
  const categories = await catRes.json();

  // Get the total number of posts from the response headers
  const totalPosts = res.headers.get("X-WP-Total");

  return (
    <div className="overflow-hidden relative flex flex-col   items-center justify-center">
      <Navbar />
      <div className="w-full">
        <div className="relative w-full min-h-[200px] justify-center lg:min-h-[400px]  flex items-center bg-[url('/assets/assets/background.svg')]  bg-cover bg-center overflow-hidden">
          {/* <Image width={10} height={10} alt="" src="/assets/assets/background.svg" className="border w-full object-cover" /> */}
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
      {/* Render posts */}
      <div className="flex flex-wrap max-w-7xl py-10 lg:py-20 p-5   mx-auto justify-center w-full gap-5 lg:gap-10  px-4">
        {posts.map((post, i) => (
          <Card key={i} {...post} />
        ))}
      </div>

      {/* Pagination */}
      <Pagination
        baseUrl="/blogs"
        totalPosts={totalPosts}
        postsPerPage={postsPerPage}
        currentPage={parseInt(currentPage, 10)}
      />
      <Footer />
      {/* <WhatsAppButton/> */}
    </div>
  );
}

{
  /* Render content */
}
{
  /* <div
  className="post-content"
  dangerouslySetInnerHTML={{ __html: post.content.rendered }}
/> */
}
